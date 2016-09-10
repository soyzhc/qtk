
import {Point} from "../point";
import {Widget} from "./widget";
import Events = require("../events");
import {WidgetFactory} from "./widget-factory";
import {HtmlInputText} from "../html/html-input-text";
import {RecyclableCreator} from "../recyclable-creator";

export class Edit extends Widget {
	protected _isEditing : boolean;
	protected _input : HtmlInputText; 
	protected _eChange = Events.ChangeEvent.create();

	constructor() {
		super(Edit.TYPE);
	}

	public dispose() {
		super.dispose();
		Edit.recyclbale.recycle(this);
	}

	protected showEditor() {
		this._input = <HtmlInputText>HtmlInputText.input;
		var style = this.getStyle();
		var input = this._input;
		var p = this.toViewPoint(Point.point.init(0, 0));
		input.move(p.x, p.y);
		input.resize(this.w, this.h);
		input.text = this.text; 
		input.show();
		input.fontSize = style.fontSize;
		input.textColor = style.textColor;
		input.fontFamily = style.fontFamily;

		this.dispatchEvent({type:Events.FOCUS});
		input.on(Events.HIDE, evt => {
			this._isEditing = false;
			this.dispatchEvent({type:Events.BLUR});
		});
		
		input.on(Events.CHANGING, evt => {
			this.text = evt.value;
			this.dispatchEvent(evt);
		});
		
		input.on(Events.CHANGE, evt => {
			this.text = evt.value;
			this.dispatchEvent(evt);
		});
	}

	public reset(type:string) : Widget {
		super.reset(type);
		this.padding = 5;

		return this;
	}

	protected dispatchClick(evt:any) {
		super.dispatchClick(evt);
		if(!this._isEditing) {
			this.showEditor();
			this._isEditing = true;
		}
	}

	public static TYPE = "edit";
	private static recyclbale = new RecyclableCreator<Edit>(function() {return new Edit()});
	public static create() : Widget {
		return Edit.recyclbale.create().reset(Edit.TYPE);
	}
};

WidgetFactory.register(Edit.TYPE, Edit.create);

