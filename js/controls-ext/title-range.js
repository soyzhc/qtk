"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var range_edit_1 = require("./range-edit");
var title_value_1 = require("./title-value");
var widget_factory_1 = require("../controls/widget-factory");
var recyclable_creator_1 = require("../recyclable-creator");
var TitleRange = (function (_super) {
    __extends(TitleRange, _super);
    function TitleRange(type) {
        _super.call(this, type || TitleRange.TYPE);
    }
    TitleRange.prototype.createValueWidget = function (options) {
        return range_edit_1.RangeEdit.create(options);
    };
    TitleRange.create = function (options) {
        return TitleRange.recycleBin.create().reset(TitleRange.TYPE, options);
    };
    TitleRange.TYPE = "title-range";
    TitleRange.recycleBin = new recyclable_creator_1.RecyclableCreator(function () { return new TitleRange(); });
    return TitleRange;
}(title_value_1.TitleValue));
exports.TitleRange = TitleRange;
;
widget_factory_1.WidgetFactory.register(TitleRange.TYPE, TitleRange.create);
