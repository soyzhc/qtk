
import {Widget} from "./widget";
import {Style} from "../style";
import {WidgetFactory} from "./widget-factory";
import {ImageTile, ImageDrawType} from "../image-tile";
import {RecyclableCreator} from "../recyclable-creator";

export class CheckButton extends Widget {
	constructor(type?:string) {
		super(type || CheckButton.TYPE);
	}

	protected getStyleType() : string {
		var appendix = this.value ? "checked" : "unchecked";
		
		return (this._styleType || this.type) +"."+appendix;
	}
	
	protected drawText(ctx:any, style:Style) : Widget {
		var text = this.getLocaleText();

		if(text && style.fontColor) {
			var x = this.w>>1;
			var y = this.h>>1;
			var img = style.forceGroundImage;
		
			ctx.font = style.font;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = style.fontColor;

			if(img) {
				var textAlign = style.textAlign;
				switch(textAlign) {
					case "right": {
						x = this.h;	
						ctx.textAlign = "left";
						break;
					}
					case "left": {
						x = 0;
						ctx.textAlign = "left";
						break;
					}
					default: {
						break;
					}
				}
			}
			ctx.fillText(text, x, y);
		}

		return this;
	}
	
	protected drawImage(ctx:any, style:Style) : Widget {
		var img = style.forceGroundImage;
		var text = this.text;

		if(img) {
			var x = 0;
			var y = 0;
			var w = this.w;
			var h = this.h;
			if(text && style.fontColor) {
				var textAlign = style.textAlign;
				switch(textAlign) {
					case "right": {
						w = h;
						break;
					}
					case "left": {
						w = h;
						x = this.w - w;
						break;
					}
					default: {
						break;
					}
				}
			}
			img.draw(ctx, ImageDrawType.ICON, x, y, w, h);
		}

		return this;
	}
	
	protected dispatchClick(evt:any) {
		this.value = !this.value;	
		super.dispatchClick(evt);
	}

	public dispose() {
		super.dispose();
		CheckButton.recyclbale.recycle(this);
	}

	public static TYPE = "check-button";
	private static recyclbale = new RecyclableCreator<CheckButton>(function() {return new CheckButton()});
	public static create() : Widget {
		return CheckButton.recyclbale.create().reset(CheckButton.TYPE);
	}
};

WidgetFactory.register(CheckButton.TYPE, CheckButton.create);

