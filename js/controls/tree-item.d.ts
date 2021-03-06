import { Style } from "../style";
import { TreeItemData } from "./tree-item-data";
import { ImageTile } from "../image-tile";
import { Widget, WidgetState } from "./widget";
/**
 * 树形视图中，显示的一个子项。
 */
export declare class TreeItem extends Widget {
    protected _level: number;
    protected _indention: number;
    protected _data: TreeItemData;
    protected _parentItem: TreeItem;
    protected _childrenItems: Array<TreeItem>;
    constructor();
    /**
     * 显示的文本，从data中获取。
     */
    readonly text: string;
    /**
     * 显示的图标，从data中获取。
     */
    readonly icon: ImageTile;
    /**
     * 显示的图标，从data中获取。
     */
    readonly userData: any;
    readonly desireWidth: number;
    /**
     * 可见性判断：要求父控件没有折叠。
     */
    readonly visible: boolean;
    parentItem: TreeItem;
    readonly childrenItems: Array<TreeItem>;
    level: number;
    selected: boolean;
    readonly isLeaf: boolean;
    data: TreeItemData;
    indention: number;
    expanded: boolean;
    protected getStateForStyle(): WidgetState;
    protected getStyleType(): string;
    protected drawImage(ctx: any, style: Style): Widget;
    protected drawText(ctx: any, style: Style): Widget;
    protected dispatchDblClick(evt: any): void;
    protected dispatchClick(evt: any): void;
    dispose(): void;
    protected onReset(): void;
    static TYPE: string;
    private static recycleBin;
    static create(options?: any): TreeItem;
}
