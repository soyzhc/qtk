"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Events = require("../events");
var emitter_1 = require("../emitter");
var PropDesc = (function () {
    function PropDesc(type) {
        this.type = type;
    }
    PropDesc.prototype.toJson = function () {
        var _this = this;
        var json = {};
        PropDesc.keys.forEach(function (key) {
            var value = _this[key];
            if (value !== undefined) {
                json[key] = value;
            }
        });
        return json;
    };
    PropDesc.prototype.fromJson = function (json) {
        var _this = this;
        PropDesc.keys.forEach(function (key) {
            var value = _this[key];
            if (value !== undefined) {
                _this[key] = value;
            }
        });
    };
    PropDesc.prototype.setBasic = function (name, value, desc) {
        this.name = name;
        this.desc = desc;
        this.value = value;
    };
    PropDesc.prototype.setDataBindingRule = function (path, converter, validationRule) {
        this.path = path;
        this.converter = converter;
        this.validationRule = validationRule;
        return this;
    };
    PropDesc.keys = ["type", "name", "desc", "value", "path", "converter", "validationRule"];
    return PropDesc;
}());
exports.PropDesc = PropDesc;
;
var NumberPropDesc = (function (_super) {
    __extends(NumberPropDesc, _super);
    function NumberPropDesc(min, max) {
        _super.call(this, NumberPropDesc.TYPE);
        this.min = min;
        this.max = max;
    }
    NumberPropDesc.prototype.toJson = function () {
        var json = _super.prototype.toJson.call(this);
        json.min = this.min;
        json.max = this.max;
        return json;
    };
    NumberPropDesc.prototype.fromJson = function (json) {
        _super.prototype.fromJson.call(this, json);
        this.min = json.min;
        this.max = json.max;
    };
    NumberPropDesc.create = function (min, max) {
        return new NumberPropDesc(min, max);
    };
    NumberPropDesc.TYPE = "number";
    return NumberPropDesc;
}(PropDesc));
exports.NumberPropDesc = NumberPropDesc;
;
var TextPropDesc = (function (_super) {
    __extends(TextPropDesc, _super);
    function TextPropDesc() {
        _super.call(this, TextPropDesc.TYPE);
    }
    TextPropDesc.create = function () {
        return new TextPropDesc();
    };
    TextPropDesc.TYPE = "text";
    return TextPropDesc;
}(PropDesc));
exports.TextPropDesc = TextPropDesc;
var LinkPropDesc = (function (_super) {
    __extends(LinkPropDesc, _super);
    function LinkPropDesc() {
        _super.call(this, LinkPropDesc.TYPE);
    }
    LinkPropDesc.create = function () {
        return new LinkPropDesc();
    };
    LinkPropDesc.TYPE = "link";
    return LinkPropDesc;
}(PropDesc));
exports.LinkPropDesc = LinkPropDesc;
var ReadonlyTextPropDesc = (function (_super) {
    __extends(ReadonlyTextPropDesc, _super);
    function ReadonlyTextPropDesc() {
        _super.call(this, ReadonlyTextPropDesc.TYPE);
    }
    ReadonlyTextPropDesc.create = function () {
        return new ReadonlyTextPropDesc();
    };
    ReadonlyTextPropDesc.TYPE = "text-readonly";
    return ReadonlyTextPropDesc;
}(PropDesc));
exports.ReadonlyTextPropDesc = ReadonlyTextPropDesc;
var SliderPropDesc = (function (_super) {
    __extends(SliderPropDesc, _super);
    function SliderPropDesc() {
        _super.call(this, SliderPropDesc.TYPE);
    }
    SliderPropDesc.create = function () {
        return new SliderPropDesc();
    };
    SliderPropDesc.TYPE = "slider";
    return SliderPropDesc;
}(PropDesc));
exports.SliderPropDesc = SliderPropDesc;
var RangePropDesc = (function (_super) {
    __extends(RangePropDesc, _super);
    function RangePropDesc() {
        _super.call(this, RangePropDesc.TYPE);
    }
    RangePropDesc.create = function () {
        return new RangePropDesc();
    };
    RangePropDesc.TYPE = "range";
    return RangePropDesc;
}(PropDesc));
exports.RangePropDesc = RangePropDesc;
var Vector2PropDesc = (function (_super) {
    __extends(Vector2PropDesc, _super);
    function Vector2PropDesc(xTitle, yTitle) {
        _super.call(this, Vector2PropDesc.TYPE);
        this.xTitle = xTitle;
        this.yTitle = yTitle;
    }
    Vector2PropDesc.prototype.toJson = function () {
        var json = _super.prototype.toJson.call(this);
        json.xTitle = this.xTitle;
        json.yTitle = this.yTitle;
        return json;
    };
    Vector2PropDesc.prototype.fromJson = function (json) {
        _super.prototype.fromJson.call(this, json);
        this.xTitle = json.xTitle;
        this.yTitle = json.yTitle;
    };
    Vector2PropDesc.create = function (xTitle, yTitle) {
        return new Vector2PropDesc(xTitle, yTitle);
    };
    Vector2PropDesc.TYPE = "vector2";
    return Vector2PropDesc;
}(PropDesc));
exports.Vector2PropDesc = Vector2PropDesc;
var Vector3PropDesc = (function (_super) {
    __extends(Vector3PropDesc, _super);
    function Vector3PropDesc(xTitle, yTitle, zTitle) {
        _super.call(this, Vector3PropDesc.TYPE);
        this.xTitle = xTitle;
        this.yTitle = yTitle;
        this.zTitle = zTitle;
    }
    Vector3PropDesc.prototype.toJson = function () {
        var json = _super.prototype.toJson.call(this);
        json.xTitle = this.xTitle;
        json.yTitle = this.yTitle;
        json.zTitle = this.zTitle;
        return json;
    };
    Vector3PropDesc.prototype.fromJson = function (json) {
        _super.prototype.fromJson.call(this, json);
        this.xTitle = json.xTitle;
        this.yTitle = json.yTitle;
        this.zTitle = json.zTitle;
    };
    Vector3PropDesc.create = function (xTitle, yTitle, zTitle) {
        return new Vector3PropDesc(xTitle, yTitle, zTitle);
    };
    Vector3PropDesc.TYPE = "vector3";
    return Vector3PropDesc;
}(PropDesc));
exports.Vector3PropDesc = Vector3PropDesc;
var Vector4PropDesc = (function (_super) {
    __extends(Vector4PropDesc, _super);
    function Vector4PropDesc(xTitle, yTitle, zTitle, wTitle) {
        _super.call(this, Vector4PropDesc.TYPE);
        this.xTitle = xTitle;
        this.yTitle = yTitle;
        this.zTitle = zTitle;
        this.wTitle = wTitle;
    }
    Vector4PropDesc.prototype.toJson = function () {
        var json = _super.prototype.toJson.call(this);
        json.xTitle = this.xTitle;
        json.yTitle = this.yTitle;
        json.zTitle = this.zTitle;
        json.wTitle = this.wTitle;
        return json;
    };
    Vector4PropDesc.prototype.fromJson = function (json) {
        _super.prototype.fromJson.call(this, json);
        this.xTitle = json.xTitle;
        this.yTitle = json.yTitle;
        this.zTitle = json.zTitle;
        this.wTitle = json.wTitle;
    };
    Vector4PropDesc.create = function (xTitle, yTitle, zTitle, wTitle) {
        return new Vector4PropDesc(xTitle, yTitle, zTitle, wTitle);
    };
    Vector4PropDesc.TYPE = "vector4";
    return Vector4PropDesc;
}(PropDesc));
exports.Vector4PropDesc = Vector4PropDesc;
var LinePropDesc = (function (_super) {
    __extends(LinePropDesc, _super);
    function LinePropDesc() {
        _super.call(this, LinePropDesc.TYPE);
    }
    LinePropDesc.create = function () {
        return new LinePropDesc();
    };
    LinePropDesc.TYPE = "line";
    return LinePropDesc;
}(PropDesc));
exports.LinePropDesc = LinePropDesc;
var BoolPropDesc = (function (_super) {
    __extends(BoolPropDesc, _super);
    function BoolPropDesc() {
        _super.call(this, BoolPropDesc.TYPE);
    }
    BoolPropDesc.create = function () {
        return new BoolPropDesc();
    };
    BoolPropDesc.TYPE = "bool";
    return BoolPropDesc;
}(PropDesc));
exports.BoolPropDesc = BoolPropDesc;
var OptionsPropDesc = (function (_super) {
    __extends(OptionsPropDesc, _super);
    function OptionsPropDesc(options) {
        _super.call(this, OptionsPropDesc.TYPE);
        this.options = options;
    }
    OptionsPropDesc.prototype.toJson = function () {
        var json = _super.prototype.toJson.call(this);
        json.options = this.options;
        return json;
    };
    OptionsPropDesc.prototype.fromJson = function (json) {
        _super.prototype.fromJson.call(this, json);
        this.options = json.options;
    };
    OptionsPropDesc.create = function (options) {
        return new OptionsPropDesc(options);
    };
    OptionsPropDesc.TYPE = "options";
    return OptionsPropDesc;
}(PropDesc));
exports.OptionsPropDesc = OptionsPropDesc;
var PropsDesc = (function (_super) {
    __extends(PropsDesc, _super);
    function PropsDesc() {
        _super.apply(this, arguments);
    }
    PropsDesc.prototype.notifyChange = function () {
        var e = Events.ChangeEvent.create().init(Events.CHANGE, { value: null });
        this.dispatchEvent(e);
        e.dispose();
        return this;
    };
    PropsDesc.prototype.forEach = function (func) {
        var items = this._items;
        items.forEach(function (item) {
            func(item);
        });
    };
    PropsDesc.prototype.toJson = function () {
        var json = {};
        json.items = this._items.map(function (item) {
            return item.toJson();
        });
        return json;
    };
    ;
    PropsDesc.prototype.fromJson = function (json) {
        this.parse(json.items);
    };
    PropsDesc.prototype.parse = function (json) {
        var items = [];
        json.forEach(function (data) {
            var desc = null;
            var type = data.type;
            if (type === NumberPropDesc.TYPE) {
                desc = NumberPropDesc.create(data.min, data.max);
            }
            else if (type === SliderPropDesc.TYPE) {
                desc = SliderPropDesc.create();
            }
            else if (type === TextPropDesc.TYPE) {
                desc = TextPropDesc.create();
            }
            else if (type === LinkPropDesc.TYPE) {
                desc = LinkPropDesc.create();
            }
            else if (type === ReadonlyTextPropDesc.TYPE) {
                desc = ReadonlyTextPropDesc.create();
            }
            else if (type === RangePropDesc.TYPE) {
                desc = RangePropDesc.create();
            }
            else if (type === Vector2PropDesc.TYPE) {
                desc = Vector2PropDesc.create(data.xTitle, data.yTitle);
            }
            else if (type === Vector3PropDesc.TYPE) {
                desc = Vector3PropDesc.create(data.xTitle, data.yTitle, data.zTitle);
            }
            else if (type === Vector4PropDesc.TYPE) {
                desc = Vector4PropDesc.create(data.xTitle, data.yTitle, data.zTitle, data.wTitle);
            }
            else if (type === OptionsPropDesc.TYPE) {
                desc = OptionsPropDesc.create(data.options);
            }
            else if (type === LinePropDesc.TYPE) {
                desc = LinePropDesc.create();
            }
            else if (type === BoolPropDesc.TYPE) {
                desc = BoolPropDesc.create();
            }
            else {
                console.log("not supported:" + type);
                return;
            }
            items.push(desc);
            desc.setBasic(data.name, data.value, data.desc);
            desc.setDataBindingRule(data.path, data.converter, data.validationRule);
        });
        this._items = items;
        return this;
    };
    PropsDesc.create = function (json) {
        var propsDesc = new PropsDesc();
        if (json) {
            propsDesc.parse(json);
        }
        return propsDesc;
    };
    return PropsDesc;
}(emitter_1.Emitter));
exports.PropsDesc = PropsDesc;
;
var PagePropsDesc = (function () {
    function PagePropsDesc(title, propsDesc) {
        this.title = title;
        this.propsDesc = propsDesc;
    }
    PagePropsDesc.prototype.toJson = function () {
        return { title: this.title, propsDesc: this.propsDesc.toJson() };
    };
    PagePropsDesc.prototype.fromJson = function (json) {
        this.title = json.title;
        this.propsDesc = PropsDesc.create(json.propsDesc.items);
    };
    PagePropsDesc.create = function (title, json) {
        var propsDesc = PropsDesc.create(json);
        var pagePropsDesc = new PagePropsDesc(title, propsDesc);
        return pagePropsDesc;
    };
    return PagePropsDesc;
}());
exports.PagePropsDesc = PagePropsDesc;
;
