import { Emitter } from "../emitter";
import { ICommand } from "./icommand";
import { IValueConverter } from "./ivalue-converter";
import { IValidationRule } from "./ivalidation-rule";
import { IViewModal, BindingMode } from "./iview-modal";
export declare class ViewModalDefault extends Emitter implements IViewModal {
    private _data;
    private _commands;
    private _converters;
    private _validationRules;
    private _ePropChange;
    isCollectionViewModal: boolean;
    constructor(data: any);
    getBindingMode(): BindingMode;
    onChange(callback: Function): void;
    offChange(callback: Function): void;
    protected notifyChange(type: string, path: string, value: any, trigger?: any): void;
    protected fixPath(path: string): string;
    getProp(path: string): any;
    delProp(path: string, trigger: any): IViewModal;
    setProp(path: string, value: any, trigger?: any): IViewModal;
    getCommand(name: string): ICommand;
    execCommand(name: string, args: any): boolean;
    registerCommand(name: string, cmd: ICommand): IViewModal;
    unregisterCommand(name: string, cmd: ICommand): IViewModal;
    getValueConverter(name: string): IValueConverter;
    registerValueConverter(name: string, converter: IValueConverter): IViewModal;
    unregisterValueConverter(name: string, converter: IValueConverter): IViewModal;
    getValidationRule(name: string): IValidationRule;
    registerValidationRule(name: string, validationRule: IValidationRule): IViewModal;
    unregisterValidationRule(name: string, validationRule: IValidationRule): IViewModal;
}
