
import {Rect} from "../rect";
import {Widget} from "./widget";
import {ScrollView} from "./scroll-view";
import {WidgetFactory} from "./widget-factory";
import {RecyclableCreator} from "../recyclable-creator";
import {Layouter} from "../layouters/layouter";
import {ListLayouter} from "../layouters/list-layouter";

export class ListView extends ScrollView {
	public set itemSpacing(value:number) {
		this._itemSpacing = value;
		var layouter = <ListLayouter>this._childrenLayouter;
		layouter.spacing = value;
	}
	public get itemSpacing() : number {
		return this._itemSpacing;
	}
	
	public set itemHeight(value:number) {
		this._itemHeight = value;
		var layouter = <ListLayouter>this._childrenLayouter;
		layouter.height = value;
	}
	public get itemHeight() : number {
		return this._itemHeight;
	}

	public get childrenLayouter() : Layouter{
		return this._childrenLayouter;
	}
	public set childrenLayouter(layouter:Layouter) {
	}
	
	protected doDrawChildren(ctx:any) : Widget {
		var top = this.offsetY;
		var bottom = top + this.h;

		this._children.forEach(function(child) {
			var visible = child.visible && child.y < bottom && (child.y + child.h) > top;
			if(visible) {
				child.draw(ctx);
			}
		});

		return this;
	}

	public relayoutChildren() : Rect {
		var r = super.relayoutChildren();
		this.contentWidth = r.w;
		this.contentHeight = r.h;
		
		return r;
	}

	protected _itemHeight : number;
	protected _itemSpacing : number;

	constructor() {
		super(ListView.TYPE);
	}

	public reset(type:string) : Widget {
		super.reset(type);
		this._itemSpacing = 0;
		this._itemHeight = 80;
		this._childrenLayouter = ListLayouter.create({height:this.itemHeight, spacing:0});
		
		return this;
	}

	public dispose() {
		super.dispose();
		ListView.recyclbaleListView.recycle(this);
	}

	public static TYPE = "list-view";
	private static recyclbaleListView = new RecyclableCreator<ListView>(function() {return new ListView()});
	public static create() : Widget {
		return ListView.recyclbaleListView.create().reset(ListView.TYPE);
	}
};

WidgetFactory.register(ListView.TYPE, ListView.create);
