
import Events = require("../events");
import {Label} from "../controls/label";
import {Widget} from "../controls/widget";
import {TitleValue} from "./title-value";
import {WidgetFactory} from "../controls/widget-factory";
import {RecyclableCreator} from "../recyclable-creator";

export class TitleLink extends TitleValue {
	constructor(type?:string) {
		super(type || TitleLink.TYPE);
	}

	protected createValueWidget(options?:any) : Widget {
		var link = Label.create(options);
		
		link.styleType = "link";
		link.on(Events.CLICK, function(evt) {
			window.open(this.text, "_blank");
		});

		link.on(Events.POINTER_ENTER, function(evt) {
			document.body.style.cursor = "pointer";
		});

		link.on(Events.POINTER_LEAVE, function(evt) {
			document.body.style.cursor = "default";
		});

		return link;
	}

	public static TYPE = "title-link";
	private static recycleBin = new RecyclableCreator<TitleLink>(function() {return new TitleLink()});
	public static create(options?:any) : TitleLink {
		return <TitleLink>TitleLink.recycleBin.create().reset(TitleLink.TYPE, options);
	}
};

WidgetFactory.register(TitleLink.TYPE, TitleLink.create);
