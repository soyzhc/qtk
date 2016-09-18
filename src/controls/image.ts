
import {Style} from "../style";
import {WidgetState, Widget} from "./widget";
import {WidgetFactory} from "./widget-factory";
import {ImageTile, ImageDrawType} from "../image-tile";
import {RecyclableCreator} from "../recyclable-creator";

/**
 * 图片控件。 
 */
export class Image extends Widget {
	private _style : Style;

	constructor() {
		super(Image.TYPE);
	}

	public get image() : ImageTile {
		return this._style.backGroundImage;
	}

	public set image(image:ImageTile) {
		this._style.backGroundImage = image;
	}
	
	public get drawType() : ImageDrawType {
		return this._style.backGroundImageDrawType;
	}

	public set drawType(drawType:ImageDrawType) {
		this._style.backGroundImageDrawType = drawType;
	}

	public set value(url:string) {
		this._style.backGroundImage = ImageTile.create(url, evt => {
			this.requestRedraw();
		});
	}

	public get value() : string {
		var image = this._style.backGroundImage;
		
		return image ? image.src : null;
	}

	public setStyle(state:WidgetState, style:Style):Widget{
		this._style = style;

		return this;
	}

	public reset(type:string) : Widget {
		super.reset(type);

		this._style = Style.create();
		this._style.fontSize = 12;
		this._style.textColor = "Black";
		this.drawType = ImageDrawType.DEFAULT;

		return this;
	}

	public getStyle() : Style {
		return this._style;
	}
	
	public dispose() {
		super.dispose();
		Image.recycleBin.recycle(this);
	}

	public static TYPE = "image";
	private static recycleBin = new RecyclableCreator<Image>(function() {return new Image()});
	public static create(options?:any) : Image{
		return <Image>Image.recycleBin.create().reset(Image.TYPE).set(options);
	}
};

WidgetFactory.register(Image.TYPE, Image.create);

