/// <reference path="../typings/globals/node/index.d.ts"/>
/// <reference path="../typings/globals/eventemitter3/index.d.ts"/>
/// <reference path="../typings/globals/whatwg-fetch/index.d.ts"/>

import "whatwg-fetch";
import path = require("path");
import Events = require("./events");
import {Emitter} from "./emitter";

export const AUDIO = "audio";
export const IMAGE = "image";
export const BLOB = "blob";
export const JSON = "json";
export const TEXT = "text";

export declare class Image {
    public width : number;
    public height : number;
    public src : string;

    public onload : Function;
    public onerror : Function;
};

var assetsCache = {};
function load(url:string, type:string) : Promise<any> {
    var item = assetsCache[url];

    if(!item) {
        item = fetch(url).then(function ok(response:Response) {
        	if(response.status !==  200) {
				return Promise.reject(null);
			}

            if(type === JSON) {
                return response.json();
            }else if(type === BLOB) {
                return response.blob();
            }else{
                return response.text();
            }
         }, function fail(err:Error) {
            return null;
        })

        assetsCache[url] = item;
    }

    return item;
}

/**
 * Load JSON Data and Cache It.
 * @param url URL Of JSON.
 * @returns Promise
 */
export function loadJSON(url:string) : Promise<any> {
    return load(url, JSON);
}

/**
 * Load Text Data and Cache It.
 * @param url URL Of Text.
 * @returns Promise
 */
export function loadText(url:string) : Promise<string> {
    return load(url, TEXT);
}

/**
 * Load Blob Data and Cache It.
 * @param url URL Of Blob.
 * @returns Promise
 */
export function loadBlob(url:string) : Promise<Blob> {
    return load(url, BLOB);
}

/**
 * Load Image and Cache It.
 * @param url URL Of Image.
 * @returns Promise
 */
export function loadImage(url:string) : Promise<Image> {
    var item = assetsCache[url];

    if(!item) {
        item = new Promise ((resolve: (img: any)=>void, reject: (err: any)=>void) => {
            var image = new Image();
            image.onload = function (){
                resolve(image);
            }
            image.onerror = function(err) {
                reject(err);
            }
            image.src = url
        });
    }
    assetsCache[url] = item;

    return item;
}

/**
 * Load Script
 * @param url URL Of Script.
 * @returns Promise
 */
export function loadScript(url:string) : Promise<any> {
	var item = new Promise ((resolve: (script: any)=>void, reject: (err: any)=>void) => {
		var node = document.head ? document.head : document.body;
		var script = document.createElement("script");
		script.onload = function (){
			resolve(script);
		}
		script.onerror = function(err) {
			reject(err);
		}
		script.src = url;
		node.appendChild(script);
	});

    return item;
}

/**
 * Load Audio and Cache It.
 * @param url URL Of Audio.
 * @returns Promise
 */
export function loadAudio(url:string) : Promise<any> {
    var item = assetsCache[url];

    if(!item) {
        item = new Promise ((resolve: (img: any)=>void, reject: (err: any)=>void) => {
            var audio = new Audio();
            audio.onload = function (){
                resolve(audio);
            }
            audio.onerror = function(err) {
                reject(err);
            }
            audio.src = url
        });
    }
    assetsCache[url] = item;

    return item;
}


/**
 * Clear asset cache
 * @param url URL Of asset.
 */
export function clear(url:string) {
	delete assetsCache[url];
}

/**
 * Present one asset.
 */
export class Item {
    /**
     * The URL of asset.
     */
    public src : string;
    /**
     * The type of asset, options are TEXT, JSON, BLOB, IMAGE, AUDIO. 
     */
    public type : string;

    constructor(src:string, type?:string) {
    	if(!type) {
        	var name = path.extname(src).toLowerCase();
    		if(name === ".json") {
    			type = JSON;
			}else if(name === ".jpg" || name === ".png" || name === ".svg") {
				type = IMAGE;
			}else if(type === ".txt") {
				type = TEXT;
			}else{
				type = BLOB;
			}
		}

    	this.src = src;
		this.type = type;
	}

	public static create(src:string, type?:string) : Item {
		return new Item(src, type);
	}
};

/**
 * Assets group to preload
 * Example:
 * ```
 *  var items = [
 *    {type:qtk.Assets.TEXT, src:"http://localhost:9876/base/www/test.txt"},
 *    {type:qtk.Assets.JSON, src:"http://localhost:9876/base/www/test.json"},
 *    {type:qtk.Assets.IMAGE, src:"http://localhost:9876/base/www/test.jpg"},
 *    {type:qtk.Assets.BLOB, src:"http://localhost:9876/base/www/test.blob"}
 * ];
 * var assets = new qtk.Assets.Group(items);
 * assets.onProgress(function(info) {
 *   console.log(info.loaded + "/" + info.total);
 * });
 * ```
 */
export class Group extends Emitter {
    public total : number;
    public loaded : number;
    public event = {
        total : 0,
        loaded : 0,
        type:Events.PROGRESS
    };

    constructor(items:Array<Item>, onProgress?:Function) {
        super();
        var i = 0;
        var n = items.length;
        this.loaded = 0;    
        this.total = items.length;
        this.event.total = this.total;

        if(onProgress) {
        	this.onProgress(onProgress);
		}

        items.forEach(this.loadOne.bind(this));
    }

    /**
     * Register of a progress callback function
     */
    onProgress(callback:Function) {
        this.on(Events.PROGRESS, callback);
    }

    private addLoaded() :void {
        this.loaded++;
        this.event.loaded = this.loaded;
        this.dispatchEvent(this.event);
    }

    private loadOne(item:Item) : void {
        var src = item.src;
        var type = item.type;
        var addLoaded = this.addLoaded.bind(this);
        var name = path.extname(src).toLowerCase();
        
        if(type === JSON || (!type && name === '.json')) {
            loadJSON(src).then(addLoaded, addLoaded);
        }else if(type === IMAGE || (!type && (name === ".jpg" || name === ".png" || name === ".svg"))) {
            loadImage(src).then(addLoaded, addLoaded);
        }else if(type === BLOB) {
            loadBlob(src).then(addLoaded, addLoaded);
        }else{
            loadText(src).then(addLoaded, addLoaded);
        }
    }
	
	public static create(items:Array<Item>, onProgress?:Function) {
		return new Group(items, onProgress);
	}

	public static preload(assetsURLS:Array<string>, onProgress:Function) : Group {
		var arr = assetsURLS.map((iter:string) => {
			return Item.create(iter);
		});

		return Group.create(arr, onProgress);
	}
}
