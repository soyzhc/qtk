
import {Rect} from "../rect";
import {Style} from "../style";
import {Point} from "../point";
import {Edit} from "../controls/edit";
import {Button} from "../controls/button";
import {Widget} from "../controls/widget";
import Events = require("../events");
import {WidgetFactory} from "../controls/widget-factory";
import {RecyclableCreator} from "../recyclable-creator";

/**
 * 编辑器+选择按钮。
 */
export class ChoosableEdit extends Widget {
	protected _edit : Edit;
	protected _button : Button;
	protected _inputTips : string;
	public onChoose : Function;

	public set inputTips(value:string) {
		this._inputTips = value;
		if(this._edit) {
			this._edit.set({inputTips:value});
		}
	}

	public get inputTips() : string {
		return this._inputTips;
	}

	public set value(value:any) {
		this._value = value;
		if(this._edit) {
			this._edit.text = value;
		}
	}

	public get value() : any {
		return this._edit ? this._edit.text : this._value;
	}

	public relayoutChildren() : Rect {
		this.requestRedraw();
		if(this._edit && this._button) {
			var x = this.leftPadding;
			var y = this.topPadding;
			var h = this.clientH;
			var w = this.clientW - this.h - 6;
			this._edit.moveResizeTo(x, y, w, h, 0);
			
			w = this.h;
			x = this.w - w - 4;
			this._button.moveResizeTo(x, y, w, h, 0);
		}

		return this.getLayoutRect();
	}

	public dispose() {
		this._edit = null;
		this._button = null;
		super.dispose();
	}

	protected onReset() {
		super.onReset();
		
		this.padding = 0;
		this.onChoose = null;
		this._edit = Edit.create();
		this.addChild(this._edit);
		this._edit.on(Events.CHANGE, evt => {
			this.dispatchEvent(evt);
		});

		this._button = Button.create({text:"..."});
		this.addChild(this._button);
		this._button.on(Events.CLICK, evt => {
			if(this.onChoose) {
				this.onChoose();
			}
		});
	}

	constructor() {
		super(ChoosableEdit.TYPE);
	}

	public static TYPE = "choosable.edit";
	private static rBin = new RecyclableCreator<ChoosableEdit>(function() {
		return new ChoosableEdit()});
	public static create(options?:any) : ChoosableEdit {
		return <ChoosableEdit>ChoosableEdit.rBin.create().reset(ChoosableEdit.TYPE, options);
	}
};

WidgetFactory.register(ChoosableEdit.TYPE, ChoosableEdit.create);

