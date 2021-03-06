
import {Rect} from "../rect";
import {Style} from "../style";
import {Point} from "../point";
import {Label} from "../controls/label";
import {Edit} from "../controls/edit";
import {Button} from "../controls/button";
import {Widget} from "../controls/widget";
import Events = require("../events");
import {WidgetFactory} from "../controls/widget-factory";
import {RecyclableCreator} from "../recyclable-creator";

/**
 * 范围编辑器。
 */
export class RangeEdit extends Widget {
	protected _firstEditor : Edit;
	protected _secondEditor : Edit;
	protected _label : Label;

	public get inputable() {
		return true;
	}

	public get firstEditor() : Edit {
		return this._firstEditor;
	}

	public get secondEditor() : Edit {
		return this._secondEditor;
	}

	public set value(value:any) {
		this._value = value;
		if(this._firstEditor) {
			this._firstEditor.value = value.first;
		}
		if(this._secondEditor) {
			this._secondEditor.value = value.second;
		}
	}

	public get value() : any {
		if(!this._value) {
			this._value = {};
		}
		if(this._firstEditor) {
			this._value.first = +this._firstEditor.value;
		}

		if(this._secondEditor) {
			this._value.second  = +this._secondEditor.value;
		}

		return this._value;
	}
	
	protected onToJson(json:any) {
		delete json._value;
	}

	public relayoutChildren() : Rect {
		this.requestRedraw();
		if(this.w && this.h && this._firstEditor && this._label && this._secondEditor) {
			var x = this.leftPadding;
			var y = this.topPadding;
			var h = this.clientH;
			var labelW = 15;
			var w = (this.clientW-labelW) >> 1 ;

			this._firstEditor.moveResizeTo(x, y, w, h, 0);
			x += w;

			this._label.moveResizeTo(x, y, labelW, h, 0);
			x += labelW;

			this._secondEditor.moveResizeTo(x, y, w, h, 0);
		}

		return this.getLayoutRect();
	}

	public dispose() {
		this._firstEditor = null;
		this._secondEditor = null;
		super.dispose();
	}

	protected forwardChangeEvent(evt:Events.ChangeEvent) {
		var e = this.eChangeEvent;
		e.init(evt.type, {value:this.value});
		this.dispatchEvent(e);
	}

	protected onReset() {
		super.onReset();
		
		this.padding = 0;
		var value = this._value || {first:0, second:0}
		this._firstEditor = Edit.create({value:value.first, inputType:"number"});
		this.addChild(this._firstEditor, false);
		this._firstEditor.on(Events.CHANGE, evt => {
			this.forwardChangeEvent(evt);
		});
		this._firstEditor.on(Events.CHANGING, evt => {
			this.forwardChangeEvent(evt);
		});

		this._label = Label.create({text:"-", multiLineMode:false});
		this.addChild(this._label, false);

		this._secondEditor = Edit.create({value:value.second, inputType:"number"});
		this.addChild(this._secondEditor, false);
		this._secondEditor.on(Events.CHANGE, evt => {
			this.forwardChangeEvent(evt);
		});
		this._secondEditor.on(Events.CHANGING, evt => {
			this.forwardChangeEvent(evt);
		});

		this.relayoutChildren();
	}

	constructor() {
		super(RangeEdit.TYPE);
	}

	public static TYPE = "range.edit";
	private static rBin = new RecyclableCreator<RangeEdit>(function() {
		return new RangeEdit()});
	public static create(options?:any) : RangeEdit {
		return <RangeEdit>RangeEdit.rBin.create().reset(RangeEdit.TYPE, options);
	}
};

WidgetFactory.register(RangeEdit.TYPE, RangeEdit.create);

