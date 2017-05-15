import { Stage } from './Stage';
import { Sprite } from './sprite/Sprite';
export declare type EventHelper = {
    identifier?: number;
    beginX: number;
    beginY: number;
    localX?: number;
    localY?: number;
    stageX?: number;
    stageY?: number;
    _moved?: boolean;
    beginTarget?: Sprite<any>;
    target?: Sprite<any>;
    cancelBubble: boolean;
    stopPropagation();
};
export declare class UIEvent {
    static supportTouch: boolean;
    static TOUCH_BEGIN: string;
    static TOUCH_MOVED: string;
    static TOUCH_ENDED: string;
    static MOUSE_BEGIN: string;
    static MOUSE_MOVED: string;
    static MOUSE_ENDED: string;
    static CLICK: string;
    static ADD_TO_STAGE: string;
    static REMOVED_FROM_STAGE: string;
    static FRAME: string;
    private _registered;
    private _touchHelperMap;
    private _mouseBeginHelper;
    private _mouseMovedHelper;
    stage: Stage;
    element: HTMLElement;
    constructor(stage: Stage);
    register(): void;
    unregister(): void;
    release(): void;
    private _transformLocation(event);
    private _transformTouches(touches, justGet?);
    private _touchBeginHandler;
    private _touchMovedHandler;
    private _touchEndedHandler;
    private _mouseBeginHandler;
    private _mouseMovedHandler;
    private _mouseEndedHandler;
    private _dispatchTouch(sprite, offsetX, offsetY, helpers, event, methodName, eventName, needTriggerClick?);
    private _detectTouchOnClipArea(sprite, offsetX, offsetY, helpers, event, methodName, eventName, needTriggerClick?);
    private _dispatchMouse(sprite, offsetX, offsetY, helper, event, methodName, eventName, needTriggerClick?);
    private _detectMouseOnClipArea(sprite, offsetX, offsetY, helper, event, methodName, eventName, needTriggerClick?);
}
