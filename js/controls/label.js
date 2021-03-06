"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var widget_1 = require("./widget");
var graphics_1 = require("../graphics");
var widget_factory_1 = require("./widget-factory");
var recyclable_creator_1 = require("../recyclable-creator");
/**
 * 文本控件。
 */
var Label = (function (_super) {
    __extends(Label, _super);
    function Label(type) {
        _super.call(this, type || Label.TYPE);
    }
    /**
     * 对文本进行重新排版。
     */
    Label.prototype.relayoutText = function () {
        if (this._inited) {
            var style = this.getStyle();
            var text = this.getLocaleText();
            this._textLines = graphics_1.Graphics.layoutText(text, this.w, style.font);
        }
        return this;
    };
    ;
    Object.defineProperty(Label.prototype, "multiLineMode", {
        /**
         * 是否启用多行模式。
         */
        get: function () {
            return this._mlm;
        },
        set: function (value) {
            this.setProp("mlm", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "value", {
        /**
         * Label的值即它的文本。
         */
        get: function () {
            return this.text;
        },
        set: function (value) {
            this.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Label.prototype.setStyle = function (state, style) {
        _super.prototype.setStyle.call(this, state, style);
        this.relayoutText();
        return this;
    };
    Label.prototype.drawTextSL = function (ctx, text, style) {
        if (text && style.textColor) {
            graphics_1.Graphics.drawTextSL(ctx, text, style, this.getTextRect(style));
        }
        return this;
    };
    Label.prototype.drawTextML = function (ctx, style) {
        if (style.textColor) {
            graphics_1.Graphics.drawTextML(ctx, this._textLines, style, this.getTextRect(style));
        }
        return this;
    };
    Label.prototype.drawText = function (ctx, style) {
        if (this._textLines && this._textLines.length) {
            if (this._mlm) {
                this.drawTextML(ctx, style);
            }
            else {
                var text = this._textLines[0].text;
                this.drawTextSL(ctx, text, style);
            }
        }
        return this;
    };
    Label.prototype.setProp = function (prop, newValue, notify) {
        _super.prototype.setProp.call(this, prop, newValue, notify);
        if (prop === "w" || prop === "h" || prop === "value" || prop === "text") {
            this.relayoutText();
        }
        return this;
    };
    Label.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this.relayoutText();
    };
    Label.prototype.getDefProps = function () {
        return Label.defProps;
    };
    Label.create = function (options) {
        return Label.recycleBin.create().reset(Label.TYPE, options);
    };
    Label.defProps = Object.assign({}, widget_1.Widget.defProps, { _mlm: true, _lp: 5, _tp: 5, _rp: 5, _bp: 5 });
    Label.TYPE = "label";
    Label.recycleBin = new recyclable_creator_1.RecyclableCreator(function () { return new Label(); });
    return Label;
}(widget_1.Widget));
exports.Label = Label;
;
widget_factory_1.WidgetFactory.register(Label.TYPE, Label.create);
