/**
 * canvas2djs v1.6.0
 * Copyright (c) 2013-present Todd Fon <tilfon@live.com>
 * All rights reserved.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('canvas2d', ['exports'], factory) :
	(factory((global.canvas2d = global.canvas2d || {})));
}(this, (function (exports) { 'use strict';

var Keys = {
    MOUSE_LEFT: 1,
    MOUSE_MID: 2,
    MOUSE_RIGHT: 3,
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    RETURN: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    CONTEXT_MENU: 93,
    NUM0: 96,
    NUM1: 97,
    NUM2: 98,
    NUM3: 99,
    NUM4: 100,
    NUM5: 101,
    NUM6: 102,
    NUM7: 103,
    NUM8: 104,
    NUM9: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123
};

var Tween = {
    easeInQuad: function (pos) {
        return Math.pow(pos, 2);
    },
    easeOutQuad: function (pos) {
        return -(Math.pow((pos - 1), 2) - 1);
    },
    easeInOutQuad: function (pos) {
        if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(pos, 2);
        }
        return -0.5 * ((pos -= 2) * pos - 2);
    },
    easeInCubic: function (pos) {
        return Math.pow(pos, 3);
    },
    easeOutCubic: function (pos) {
        return (Math.pow((pos - 1), 3) + 1);
    },
    easeInOutCubic: function (pos) {
        if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(pos, 3);
        }
        return 0.5 * (Math.pow((pos - 2), 3) + 2);
    },
    easeInQuart: function (pos) {
        return Math.pow(pos, 4);
    },
    easeOutQuart: function (pos) {
        return -(Math.pow((pos - 1), 4) - 1);
    },
    easeInOutQuart: function (pos) {
        if ((pos /= 0.5) < 1)
            return 0.5 * Math.pow(pos, 4);
        return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
    },
    easeInQuint: function (pos) {
        return Math.pow(pos, 5);
    },
    easeOutQuint: function (pos) {
        return (Math.pow((pos - 1), 5) + 1);
    },
    easeInOutQuint: function (pos) {
        if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow((pos - 2), 5) + 2);
    },
    easeInSine: function (pos) {
        return -Math.cos(pos * (Math.PI / 2)) + 1;
    },
    easeOutSine: function (pos) {
        return Math.sin(pos * (Math.PI / 2));
    },
    easeInOutSine: function (pos) {
        return (-.5 * (Math.cos(Math.PI * pos) - 1));
    },
    easeInExpo: function (pos) {
        return (pos == 0) ? 0 : Math.pow(2, 10 * (pos - 1));
    },
    easeOutExpo: function (pos) {
        return (pos == 1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    },
    easeInOutExpo: function (pos) {
        if (pos == 0)
            return 0;
        if (pos == 1)
            return 1;
        if ((pos /= 0.5) < 1)
            return 0.5 * Math.pow(2, 10 * (pos - 1));
        return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
    },
    easeInCirc: function (pos) {
        return -(Math.sqrt(1 - (pos * pos)) - 1);
    },
    easeOutCirc: function (pos) {
        return Math.sqrt(1 - Math.pow((pos - 1), 2));
    },
    easeInOutCirc: function (pos) {
        if ((pos /= 0.5) < 1)
            return -0.5 * (Math.sqrt(1 - pos * pos) - 1);
        return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
    },
    easeOutBounce: function (pos) {
        if ((pos) < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        }
        else if (pos < (2 / 2.75)) {
            return (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
        }
        else if (pos < (2.5 / 2.75)) {
            return (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
        }
        else {
            return (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
        }
    },
    easeInBack: function (pos) {
        var s = 1.70158;
        return (pos) * pos * ((s + 1) * pos - s);
    },
    easeOutBack: function (pos) {
        var s = 1.70158;
        return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
    },
    easeInOutBack: function (pos) {
        var s = 1.70158;
        if ((pos /= 0.5) < 1)
            return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));
        return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
    },
    elastic: function (pos) {
        return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
    },
    swingFromTo: function (pos) {
        var s = 1.70158;
        return ((pos /= 0.5) < 1) ? 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
            0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
    },
    swingFrom: function (pos) {
        var s = 1.70158;
        return pos * pos * ((s + 1) * pos - s);
    },
    swingTo: function (pos) {
        var s = 1.70158;
        return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
    },
    bounce: function (pos) {
        if (pos < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        }
        else if (pos < (2 / 2.75)) {
            return (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
        }
        else if (pos < (2.5 / 2.75)) {
            return (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
        }
        else {
            return (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
        }
    },
    bouncePast: function (pos) {
        if (pos < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        }
        else if (pos < (2 / 2.75)) {
            return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
        }
        else if (pos < (2.5 / 2.75)) {
            return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
        }
        else {
            return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
        }
    },
    easeFromTo: function (pos) {
        if ((pos /= 0.5) < 1)
            return 0.5 * Math.pow(pos, 4);
        return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
    },
    easeFrom: function (pos) {
        return Math.pow(pos, 4);
    },
    easeTo: function (pos) {
        return Math.pow(pos, 0.25);
    },
    linear: function (pos) {
        return pos;
    },
    sinusoidal: function (pos) {
        return (-Math.cos(pos * Math.PI) / 2) + 0.5;
    },
    reverse: function (pos) {
        return 1 - pos;
    },
    mirror: function (pos, transition) {
        transition = transition || this.sinusoidal;
        if (pos < 0.5)
            return transition(pos * 2);
        else
            return transition(1 - (pos - 0.5) * 2);
    },
    flicker: function (pos) {
        var pos = pos + (Math.random() - 0.5) / 5;
        return this.sinusoidal(pos < 0 ? 0 : pos > 1 ? 1 : pos);
    },
    wobble: function (pos) {
        return (-Math.cos(pos * Math.PI * (9 * pos)) / 2) + 0.5;
    },
    pulse: function (pos, pulses) {
        return (-Math.cos((pos * ((pulses || 5) - .5) * 2) * Math.PI) / 2) + .5;
    },
    blink: function (pos, blinks) {
        return Math.round(pos * (blinks || 5)) % 2;
    },
    spring: function (pos) {
        return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6));
    },
    none: function (pos) {
        return 0;
    },
    full: function (pos) {
        return 1;
    }
};

var cache = {};
var loaded = {};
var loading = {};
/**
 * Sprite texture
 */
var Texture = (function () {
    /**
     * @param  source  Drawable source
     * @param  rect    Clipping rect
     */
    function Texture(source, rect) {
        this._readyCallbacks = [];
        /**
         * Texture resource loading state
         */
        this.ready = false;
        this.width = 0;
        this.height = 0;
        var name = getName(source, rect);
        if (cache[name]) {
            return cache[name];
        }
        if (typeof source === 'string') {
            this._createByPath(source, rect);
        }
        else if ((source instanceof HTMLImageElement) || (source instanceof HTMLCanvasElement)) {
            this._createByImage(source, rect);
        }
        else {
            throw new Error("Invalid texture source");
        }
        if (name) {
            cache[name] = this;
        }
    }
    /**
     * Create a texture by source and clipping rectangle
     * @param  source  Drawable source
     * @param  rect    Clipping rect
     */
    Texture.create = function (source, rect) {
        var name = getName(source, rect);
        if (name && cache[name]) {
            return cache[name];
        }
        return new Texture(source, rect);
    };
    Texture.prototype.onReady = function (callback) {
        if (this.ready) {
            callback({ width: this.width, height: this.height });
        }
        else {
            this._readyCallbacks.push(callback);
        }
    };
    Texture.prototype._createByPath = function (path, rect) {
        var _this = this;
        var img = new Image();
        img.onload = function () {
            _this._createByImage(img, rect);
            // if (!loaded[path]) {
            //     console.log(`canvas2d: "${path}" loaded.`);
            // }
            loaded[path] = true;
            if (_this._readyCallbacks.length) {
                var size_1 = { width: _this.width, height: _this.height };
                _this._readyCallbacks.forEach(function (callback) {
                    callback(size_1);
                });
                _this._readyCallbacks.length = 0;
            }
            img = null;
        };
        img.onerror = function () {
            img = null;
            console.warn("canvas2d: Texture creating fail, error loading source \"" + path + "\".");
        };
        // if (!loading[path]) {
        //     console.log(`canvas2d: Start to load: "${path}".`);
        // }
        img.src = path;
        loading[path] = true;
    };
    Texture.prototype._createByImage = function (image, rect) {
        if (!rect) {
            rect = {
                x: 0,
                y: 0,
                width: image.width,
                height: image.height
            };
        }
        var source = createCanvas(image, rect);
        this.width = source.width;
        this.height = source.height;
        this.source = source;
        this.ready = true;
    };
    return Texture;
}());
function getName(source, rect) {
    var isStr = typeof source === 'string';
    if (!isStr && !source.src) {
        return null;
    }
    var src = isStr ? source : source.src;
    var str = rect ? [rect.x, rect.y, rect.width, rect.height].join(',') : '';
    return src + str;
}
function createCanvas(image, rect) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    canvas.width = rect.width;
    canvas.height = rect.height;
    context.drawImage(image, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
    return canvas;
}

var Delay = (function () {
    function Delay(duration) {
        this.done = false;
        this.elapsed = 0;
        this.immediate = true;
        this.duration = duration;
    }
    Delay.prototype.step = function (deltaTime) {
        this.elapsed += deltaTime;
        if (this.elapsed >= this.duration) {
            this.done = true;
        }
    };
    Delay.prototype.end = function () {
    };
    return Delay;
}());

var Callback = (function () {
    function Callback(func) {
        this.done = false;
        this.immediate = true;
        this.func = func;
    }
    Callback.prototype.step = function () {
        this.func.call(null);
        this.end();
    };
    Callback.prototype.end = function () {
        this.func = null;
        this.done = true;
    };
    return Callback;
}());

var Animation = (function () {
    function Animation(frameList, frameRate, repetitions) {
        this.done = false;
        this.immediate = false;
        this.elapsed = 0;
        this.count = 0;
        this.frameIndex = 0;
        this.frameList = frameList;
        this.repetitions = repetitions;
        this.interval = 1 / frameRate;
    }
    Animation.prototype.step = function (deltaTime, target) {
        this.elapsed += deltaTime;
        if (this.elapsed >= this.interval) {
            target.texture = this.frameList[this.frameIndex++];
            if (this.frameIndex === this.frameList.length) {
                if (this.repetitions == null || ++this.count < this.repetitions) {
                    this.frameIndex = 0;
                }
                else {
                    this.end();
                }
            }
            this.elapsed = 0;
        }
    };
    Animation.prototype.end = function () {
        this.frameList = null;
        this.done = true;
    };
    return Animation;
}());

var Key = 'canvas2d.uid';
var counter = 0;
var cachedColor = {};
function uid(target) {
    if (typeof target[Key] === 'undefined') {
        Object.defineProperty(target, Key, { value: counter++ });
    }
    return target[Key];
}
function addArrayItem(array, item) {
    if (array.indexOf(item) === -1) {
        array.push(item);
    }
}
function removeArrayItem(array, item) {
    var index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
}
function convertColor(color) {
    if (cachedColor[color]) {
        return cachedColor[color];
    }
    if (typeof color === 'string') {
        if (color[0] != '#' || (color.length != 4 && color.length != 7)) {
            throw new Error("canvas2d: Invalid color string \"" + color + "\".");
        }
        cachedColor[color] = color;
        return color;
    }
    if (typeof color === 'number') {
        var result = color.toString(16);
        while (result.length < 3) {
            result = '0' + result;
        }
        if (result.length !== 3 && result.length !== 6) {
            throw new Error("canvas2d: Invalid hex color \"0x" + result + "\".");
        }
        result = cachedColor[color] = '#' + result;
        return result;
    }
}

var ActionListener = (function () {
    function ActionListener(actions) {
        this._resolved = false;
        this._callbacks = {};
        this._actions = actions;
    }
    ActionListener.prototype.all = function (callback) {
        if (this._resolved) {
            callback();
        }
        else {
            if (!this._callbacks.all) {
                this._callbacks.all = [];
            }
            addArrayItem(this._callbacks.all, callback);
        }
        return this;
    };
    ActionListener.prototype.any = function (callback) {
        if (this._resolved) {
            callback();
        }
        else {
            if (!this._callbacks.any) {
                this._callbacks.any = [];
            }
            addArrayItem(this._callbacks.any, callback);
        }
        return this;
    };
    ActionListener.prototype._step = function () {
        var allDone = true;
        var anyDone = false;
        this._actions.forEach(function (action) {
            if (action._done) {
                anyDone = true;
            }
            else {
                allDone = false;
            }
        });
        if (anyDone && this._callbacks.any) {
            this._callbacks.any.forEach(function (callback) { return callback(); });
            this._callbacks.any = null;
        }
        if (allDone && this._callbacks.all) {
            this._callbacks.all.forEach(function (callback) { return callback(); });
            removeArrayItem(Action._listenerList, this);
            this._resolved = true;
        }
    };
    return ActionListener;
}());

var Transition = (function () {
    function Transition(options, duration, isTransitionBy) {
        this._defaultEasing = Tween.easeInOutQuad;
        this.done = false;
        this.immediate = false;
        this.elapsed = 0;
        this.options = [];
        this.deltaValue = {};
        this.duration = duration;
        this.isTransitionBy = isTransitionBy;
        if (isTransitionBy) {
            this._initAsTransitionBy(options);
        }
        else {
            this._initAsTransitionTo(options);
        }
    }
    Transition.prototype._initAsTransitionTo = function (options) {
        var _this = this;
        Object.keys(options).forEach(function (name) {
            var info = options[name];
            var easing;
            var dest;
            if (typeof info === 'number') {
                dest = info;
            }
            else {
                easing = info.easing;
                dest = info.dest;
            }
            _this.options.push({ name: name, dest: dest, easing: easing });
        });
    };
    Transition.prototype._initAsTransitionBy = function (options) {
        var _this = this;
        var deltaValue = this.deltaValue;
        Object.keys(options).forEach(function (name) {
            var info = options[name];
            var easing;
            var dest;
            if (typeof info === 'number') {
                deltaValue[name] = info;
            }
            else {
                easing = info.easing;
                deltaValue[name] = info.value;
            }
            _this.options.push({ name: name, dest: dest, easing: easing });
        });
    };
    Transition.prototype._initBeginValue = function (target) {
        var beginValue = this.beginValue = {};
        var deltaValue = this.deltaValue;
        if (this.isTransitionBy) {
            this.options.forEach(function (option) {
                beginValue[option.name] = target[option.name];
                option.dest = target[option.name] + deltaValue[option.name];
            });
        }
        else {
            this.options.forEach(function (option) {
                beginValue[option.name] = target[option.name];
                deltaValue[option.name] = option.dest - target[option.name];
            });
        }
    };
    Transition.prototype.step = function (deltaTime, target) {
        var _this = this;
        this.elapsed += deltaTime;
        if (this.beginValue == null) {
            this._initBeginValue(target);
        }
        if (this.elapsed >= this.duration) {
            return this.end(target);
        }
        var percent = this.elapsed / this.duration;
        var beginValue = this.beginValue;
        var deltaValue = this.deltaValue;
        this.options.forEach(function (_a) {
            var name = _a.name, dest = _a.dest, easing = _a.easing;
            easing = easing || _this._defaultEasing;
            target[name] = beginValue[name] + (easing(percent) * deltaValue[name]);
        });
    };
    Transition.prototype.end = function (target) {
        this.options.forEach(function (attr) {
            target[attr.name] = attr.dest;
        });
        this.beginValue = null;
        this.deltaValue = null;
        this.options = null;
        this.done = true;
    };
    return Transition;
}());

(function (ActionType) {
    ActionType[ActionType["TO"] = 0] = "TO";
    ActionType[ActionType["BY"] = 1] = "BY";
    ActionType[ActionType["ANIM"] = 2] = "ANIM";
    ActionType[ActionType["WAIT"] = 3] = "WAIT";
    ActionType[ActionType["CALLBACK"] = 4] = "CALLBACK";
})(exports.ActionType || (exports.ActionType = {}));
var Action = (function () {
    function Action(target) {
        this._queue = [];
        this._done = false;
        /**
         * Action running state
         */
        this.isRunning = false;
        this.target = target;
    }
    /**
     * Stop action by target
     */
    Action.stop = function (target) {
        Action._actionList.slice().forEach(function (action) {
            if (action.target === target) {
                action.stop();
            }
        });
    };
    /**
     * Listen a action list, when all actions are done then publish to listener
     */
    Action.listen = function (actions) {
        var listener = new ActionListener(actions);
        Action._listenerList.push(listener);
        return listener;
    };
    Action.schedule = function (deltaTime) {
        Action._actionList.slice().forEach(function (action) {
            action._step(deltaTime);
            if (action._done) {
                removeArrayItem(Action._actionList, action);
            }
        });
        Action._listenerList.slice().forEach(function (listener) {
            listener._step();
        });
    };
    Action.prototype.queue = function (actions) {
        var _this = this;
        actions.forEach(function (action) {
            switch (action.type) {
                case exports.ActionType.ANIM:
                    _this.animate(action.frameList, action.frameRate, action.repetitions);
                    break;
                case exports.ActionType.BY:
                    _this.by(action.options, action.duration);
                    break;
                case exports.ActionType.TO:
                    _this.to(action.options, action.duration);
                    break;
                case exports.ActionType.WAIT:
                    _this.wait(action.duration);
                    break;
                case exports.ActionType.CALLBACK:
                    _this.then(action.callback);
                    break;
            }
        });
        return this;
    };
    /**
     * Add a callback, it will exec after previous action is done.
     */
    Action.prototype.then = function (callback) {
        this._queue.push(new Callback(callback));
        return this;
    };
    /**
     * Add a delay action.
     */
    Action.prototype.wait = function (time) {
        this._queue.push(new Delay(time));
        return this;
    };
    /**
     * Add a animation action
     */
    Action.prototype.animate = function (frameList, frameRate, repetitions) {
        var anim = new Animation(frameList, frameRate, repetitions);
        this._queue.push(anim);
        anim.step(anim.interval, this.target);
        return this;
    };
    /**
     * TransitionTo action
     */
    Action.prototype.to = function (attrs, duration) {
        this._queue.push(new Transition(attrs, duration));
        return this;
    };
    /**
     * TransitionBy action
     */
    Action.prototype.by = function (attrs, duration) {
        this._queue.push(new Transition(attrs, duration, true));
        return this;
    };
    /**
     * Start the action
     */
    Action.prototype.start = function () {
        if (!this.isRunning) {
            addArrayItem(Action._actionList, this);
            this.isRunning = true;
        }
        return this;
    };
    /**
     * Stop the action
     */
    Action.prototype.stop = function () {
        this._done = true;
        this.isRunning = false;
        this._queue.length = 0;
        removeArrayItem(Action._actionList, this);
    };
    Action.prototype._step = function (deltaTime) {
        if (!this._queue.length) {
            return;
        }
        var action = this._queue[0];
        action.step(deltaTime, this.target);
        if (action.done) {
            this._queue.shift();
            if (!this._queue.length) {
                this._done = true;
                this.isRunning = false;
                this.target = null;
            }
            else if (action.immediate) {
                this._step(deltaTime);
            }
        }
    };
    return Action;
}());
Action._actionList = [];
Action._listenerList = [];

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

var eventCache = {};
var EventEmitter = (function () {
    function EventEmitter() {
    }
    EventEmitter.prototype.addListener = function (type, listener) {
        var id = uid(this);
        if (!eventCache[id]) {
            eventCache[id] = {};
        }
        if (!eventCache[id][type]) {
            eventCache[id][type] = [];
        }
        addArrayItem(eventCache[id][type], listener);
        return this;
    };
    EventEmitter.prototype.on = function (type, listener) {
        return this.addListener(type, listener);
    };
    EventEmitter.prototype.removeListener = function (type, listener) {
        var cache = eventCache[uid(this)];
        if (cache && cache[type]) {
            removeArrayItem(cache[type], listener);
            if (!cache[type].length) {
                delete cache[type];
            }
        }
        return this;
    };
    EventEmitter.prototype.removeAllListeners = function (type) {
        var id = uid(this);
        var cache = eventCache[id];
        if (cache) {
            if (type == null) {
                EventEmitter[id] = null;
            }
            else {
                delete cache[type];
            }
        }
        return this;
    };
    EventEmitter.prototype.emit = function (type) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var id = uid(this);
        var cache = eventCache[id];
        if (cache && cache[type]) {
            cache[type].slice().forEach(function (listener) {
                listener.apply(_this, args);
            });
        }
        return this;
    };
    return EventEmitter;
}());

var instance;
var ReleasePool = (function () {
    function ReleasePool() {
        this._objs = [];
    }
    ReleasePool.prototype.add = function (obj) {
        var _this = this;
        this._objs.push(obj);
        if (this._timerId != null) {
            return;
        }
        this._timerId = setTimeout(function () { return _this._release(); }, 0);
    };
    ReleasePool.prototype._release = function () {
        this._objs.forEach(function (obj) {
            Object.keys(obj).forEach(function (key) { return delete obj[key]; });
        });
        this._timerId = null;
        this._objs.length = 0;
    };
    Object.defineProperty(ReleasePool, "instance", {
        get: function () {
            if (!instance) {
                instance = new ReleasePool();
            }
            return instance;
        },
        enumerable: true,
        configurable: true
    });
    return ReleasePool;
}());

var RAD_PER_DEG = Math.PI / 180;

(function (AlignType) {
    AlignType[AlignType["TOP"] = 0] = "TOP";
    AlignType[AlignType["RIGHT"] = 1] = "RIGHT";
    AlignType[AlignType["BOTTOM"] = 2] = "BOTTOM";
    AlignType[AlignType["LEFT"] = 3] = "LEFT";
    AlignType[AlignType["CENTER"] = 4] = "CENTER";
})(exports.AlignType || (exports.AlignType = {}));
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(attrs) {
        var _this = _super.call(this) || this;
        _this._width = 0;
        _this._height = 0;
        _this._originX = 0.5;
        _this._originY = 0.5;
        _this._rotation = 0;
        _this._rotationRad = 0;
        _this._originPixelX = 0;
        _this._originPixelY = 0;
        _this.x = 0;
        _this.y = 0;
        _this.scaleX = 1;
        _this.scaleY = 1;
        _this.radius = 0;
        _this.opacity = 1;
        _this.sourceX = 0;
        _this.sourceY = 0;
        _this.lighterMode = false;
        _this.autoResize = true;
        _this.flippedX = false;
        _this.flippedY = false;
        _this.visible = true;
        _this.clipOverflow = false;
        _this.touchEnabled = true;
        _this.mouseEnabled = true;
        _this.keyboardEnabled = true;
        _this.id = uid(_this);
        _this._init(attrs);
        return _this;
    }
    Sprite.prototype._init = function (attrs) {
        var _this = this;
        if (attrs) {
            Object.keys(attrs).forEach(function (name) { return _this[name] = attrs[name]; });
        }
    };
    Object.defineProperty(Sprite.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (value) {
            if (this._width === value) {
                return;
            }
            this._width = value;
            this._originPixelX = this._width * this._originX;
            this.adjustAlignX();
            this.children && this.children.forEach(function (sprite) { return sprite.adjustAlignX(); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (this._height === value) {
                return;
            }
            this._height = value;
            this._originPixelY = this._height * this._originY;
            this.adjustAlignY();
            this.children && this.children.forEach(function (sprite) { return sprite.adjustAlignY(); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "originX", {
        get: function () {
            return this._originX;
        },
        set: function (value) {
            if (this._originX === value) {
                return;
            }
            this._originX = value;
            this._originPixelX = this._originX * this._width;
            this.adjustAlignX();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "originY", {
        get: function () {
            return this._originY;
        },
        set: function (value) {
            if (this._originY === value) {
                return;
            }
            this._originY = value;
            this._originPixelY = this._originY * this._height;
            this.adjustAlignY();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (value) {
            if (this._rotation === value) {
                return;
            }
            this._rotation = value;
            this._rotationRad = this._rotation * RAD_PER_DEG;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "texture", {
        get: function () {
            return this._texture;
        },
        set: function (value) {
            var _this = this;
            var texture;
            if (typeof value === 'string') {
                texture = Texture.create(value);
            }
            else {
                texture = value;
            }
            if (texture === this._texture) {
                return;
            }
            this._texture = texture;
            if (!this.autoResize) {
                return;
            }
            if (texture) {
                if (texture.ready) {
                    this.width = texture.width;
                    this.height = texture.height;
                }
                else {
                    texture.onReady(function (size) {
                        _this.width = size.width;
                        _this.height = size.height;
                    });
                }
            }
            else {
                this.width = 0;
                this.height = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (sprite) {
            if (sprite === this._parent) {
                return;
            }
            this._parent = sprite;
            if (sprite) {
                this.adjustAlignX();
                this.adjustAlignY();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "alignX", {
        get: function () {
            return this._alignX;
        },
        set: function (value) {
            if (this._alignX === value || value === exports.AlignType.BOTTOM || value === exports.AlignType.TOP) {
                return;
            }
            this._alignX = value;
            this.adjustAlignX();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "alignY", {
        get: function () {
            return this._alignY;
        },
        set: function (value) {
            if (this._alignY === value || value === exports.AlignType.LEFT || value === exports.AlignType.RIGHT) {
                return;
            }
            this._alignY = value;
            this.adjustAlignY();
        },
        enumerable: true,
        configurable: true
    });
    Sprite.prototype._update = function (deltaTime) {
        this.update(deltaTime);
        if (this.children && this.children.length) {
            this.children.slice().forEach(function (child) {
                child._update(deltaTime);
            });
        }
    };
    Sprite.prototype._visit = function (context) {
        if (!this.visible || this.opacity === 0) {
            return;
        }
        var sx = this.scaleX;
        var sy = this.scaleY;
        context.save();
        if (this.lighterMode) {
            context.globalCompositeOperation = "lighter";
        }
        if (this.x !== 0 || this.y !== 0) {
            context.translate(this.x, this.y);
        }
        if (this.opacity !== 1) {
            context.globalAlpha = this.opacity;
        }
        if (this.flippedX) {
            sx = -sx;
        }
        if (this.flippedY) {
            sy = -sy;
        }
        if (sx !== 1 || sy !== 1) {
            context.scale(sx, sy);
        }
        var rotationRad = this._rotationRad % 360;
        if (rotationRad !== 0) {
            context.rotate(rotationRad);
        }
        if ((this._width !== 0 && this._height !== 0) || this.radius > 0) {
            this.draw(context);
        }
        this._visitAllChildren(context);
        context.restore();
    };
    Sprite.prototype.adjustAlignX = function () {
        if (!this.parent || this._alignX == null) {
            return;
        }
        var x;
        var ox = this._originPixelX;
        switch (this._alignX) {
            case exports.AlignType.LEFT:
                x = ox;
                break;
            case exports.AlignType.RIGHT:
                x = this.parent.width - (this.width - ox);
                break;
            case exports.AlignType.CENTER:
                x = this.parent.width * 0.5 + ox - this.width * 0.5;
                break;
        }
        if (x != null) {
            this.x = x;
        }
    };
    Sprite.prototype.adjustAlignY = function () {
        if (!this.parent || this._alignY == null) {
            return;
        }
        var y;
        var oy = this._originPixelY;
        switch (this._alignY) {
            case exports.AlignType.TOP:
                y = oy;
                break;
            case exports.AlignType.BOTTOM:
                y = this.parent.height - (this.height - oy);
                break;
            case exports.AlignType.CENTER:
                y = this.parent.height * 0.5 + oy - this.height * 0.5;
                break;
        }
        if (y != null) {
            this.y = y;
        }
    };
    Sprite.prototype._visitAllChildren = function (context) {
        if (!this.children || !this.children.length) {
            return;
        }
        if (this._originPixelX !== 0 || this._originPixelY !== 0) {
            context.translate(-this._originPixelX, -this._originPixelY);
        }
        this.children.forEach(function (child) {
            child._visit(context);
        });
    };
    Sprite.prototype._clip = function (context) {
        if (!this.clipOverflow) {
            return;
        }
        context.beginPath();
        if (this.radius > 0) {
            context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
        }
        else {
            context.rect(-this._originPixelX, -this._originPixelY, this._width, this._height);
        }
        context.closePath();
        context.clip();
    };
    Sprite.prototype._drawBgColor = function (context) {
        if (this.bgColor == null) {
            return;
        }
        context.fillStyle = convertColor(this.bgColor);
        context.beginPath();
        if (this.radius > 0) {
            context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
        }
        else {
            context.rect(-this._originPixelX, -this._originPixelY, this._width, this._height);
        }
        context.closePath();
        context.fill();
    };
    Sprite.prototype._drawBorder = function (context) {
        if (this.borderWidth != null) {
            context.lineWidth = this.borderWidth;
            context.strokeStyle = convertColor(this.borderColor || 0x000);
            context.beginPath();
            if (this.radius > 0) {
                context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
            }
            else {
                context.rect(-this._originPixelX, -this._originPixelY, this._width, this._height);
            }
            context.closePath();
            context.stroke();
        }
    };
    Sprite.prototype.draw = function (context) {
        this._clip(context);
        this._drawBgColor(context);
        this._drawBorder(context);
        var texture = this._texture;
        if (texture && texture.ready && texture.width !== 0 && texture.height !== 0) {
            var sx = this.sourceX;
            var sy = this.sourceY;
            var sw = this.sourceWidth == null ? texture.width : this.sourceWidth;
            var sh = this.sourceHeight == null ? texture.height : this.sourceHeight;
            context.drawImage(texture.source, sx, sy, sw, sh, -this._originPixelX, -this._originPixelY, this.width, this.height);
        }
    };
    Sprite.prototype.addChild = function (target, position) {
        if (target.parent) {
            throw new Error("canvas2d.Sprite.addChild(): Child has been added.");
        }
        if (!this.children) {
            this.children = [];
        }
        var children = this.children;
        if (children.indexOf(target) === -1) {
            if (position > -1 && position < children.length) {
                children.splice(position, 0, target);
            }
            else {
                children.push(target);
            }
            target.parent = this;
        }
    };
    Sprite.prototype.removeChild = function (target) {
        if (!this.children || !this.children.length) {
            return;
        }
        var index = this.children.indexOf(target);
        if (index > -1) {
            this.children.splice(index, 1);
            target.parent = null;
        }
    };
    Sprite.prototype.removeAllChildren = function (recusive) {
        if (!this.children || !this.children.length) {
            return;
        }
        while (this.children.length) {
            var sprite = this.children[0];
            if (recusive) {
                sprite.removeAllChildren(true);
                Action.stop(sprite);
            }
            this.removeChild(sprite);
        }
        this.children = null;
    };
    Sprite.prototype.release = function (recusive) {
        Action.stop(this);
        if (recusive && this.children) {
            while (this.children.length) {
                this.children[0].release(recusive);
            }
        }
        else {
            this.removeAllChildren();
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        ReleasePool.instance.add(this);
    };
    Sprite.prototype.update = function (deltaTime) {
    };
    return Sprite;
}(EventEmitter));

var keyDown = "keydown";
var keyUp = "keyup";
var touchBegin = "touchstart";
var touchMoved = "touchmove";
var touchEnded = "touchend";
var mouseBegin = "mousedown";
var mouseMoved = "mousemove";
var mouseEnded = "mouseup";
var onClick = "onClick";
var onKeyUp = "onKeyUp";
var onKeyDown = "onKeyDown";
var onTouchBegin = "onTouchBegin";
var onTouchMoved = "onTouchMoved";
var onTouchEnded = "onTouchEnded";
var onMouseBegin = "onMouseBegin";
var onMouseMoved = "onMouseMoved";
var onMouseEnded = "onMouseEnded";
var UIEvent = (function () {
    function UIEvent(stage) {
        var _this = this;
        this._touchHelperMap = {};
        this._touchBeginHandler = function (event) {
            var stage = _this.stage;
            if (!stage.isRunning || !stage.touchEnabled) {
                return;
            }
            var helpers = _this._transformTouches(event.changedTouches);
            _this._dispatchTouch(stage.sprite, 0, 0, helpers.slice(), event, onTouchBegin);
            helpers.forEach(function (touch) {
                touch.beginTarget = touch.target;
            });
            event.preventDefault();
        };
        this._touchMovedHandler = function (event) {
            var stage = _this.stage;
            if (!stage.isRunning || !stage.touchEnabled) {
                return;
            }
            var helpers = _this._transformTouches(event.changedTouches);
            _this._dispatchTouch(stage.sprite, 0, 0, helpers, event, onTouchMoved);
            event.preventDefault();
        };
        this._touchEndedHandler = function (event) {
            var stage = _this.stage;
            if (stage.isRunning && stage.touchEnabled) {
                var helpers = _this._transformTouches(event.changedTouches, true);
                _this._dispatchTouch(stage.sprite, 0, 0, helpers.slice(), event, onTouchEnded, true);
                helpers.forEach(function (helper) {
                    // target = helper.target;
                    // if (hasImplements(target, ontouchended)) {
                    //     target[ontouchended](helper, helpers, event);
                    // }
                    // if (hasImplements(target, onclick) && target === helper.beginTarget && (!helper._moved || isMovedSmallRange(helper))) {
                    //     target[onclick](helper, event);
                    // }
                    helper.target = null;
                    helper.beginTarget = null;
                    _this._touchHelperMap[helper.identifier] = null;
                });
                helpers = null;
            }
        };
        this._mouseBeginHandler = function (event) {
            var stage = _this.stage;
            if (!stage.isRunning || !stage.mouseEnabled) {
                return;
            }
            var location = _this.transformLocation(event);
            var helper = {
                beginX: location.x,
                beginY: location.y,
                stageX: location.x,
                stageY: location.y,
                cancelBubble: false
            };
            _this._dispatchMouse(stage.sprite, 0, 0, helper, event, onMouseBegin);
            if (helper.target) {
                helper.beginTarget = helper.target;
                _this._mouseBeginHelper = helper;
            }
            event.preventDefault();
        };
        this._mouseMovedHandler = function (event) {
            var stage = _this.stage;
            if (!stage.isRunning || !stage.mouseEnabled) {
                return;
            }
            var location = _this.transformLocation(event);
            var mouseBeginHelper = _this._mouseBeginHelper;
            if (mouseBeginHelper) {
                mouseBeginHelper.stageX = location.x;
                mouseBeginHelper.stageY = location.y;
                mouseBeginHelper._moved = mouseBeginHelper.beginX - location.x !== 0 || mouseBeginHelper.beginY - location.y !== 0;
                _this._dispatchMouse(stage.sprite, 0, 0, mouseBeginHelper, event, onMouseMoved);
            }
            else {
                var mouseMovedHelper = _this._mouseMovedHelper = {
                    beginX: null,
                    beginY: null,
                    stageX: location.x,
                    stageY: location.y,
                    cancelBubble: false
                };
                _this._dispatchMouse(stage.sprite, 0, 0, mouseMovedHelper, event, onMouseMoved);
            }
            event.preventDefault();
        };
        this._mouseEndedHandler = function (event) {
            var stage = _this.stage;
            if (stage.isRunning && stage.mouseEnabled) {
                var location = _this.transformLocation(event);
                var helper = _this._mouseBeginHelper || _this._mouseMovedHelper;
                var target;
                helper.stageX = location.x;
                helper.stageY = location.y;
                target = helper.target;
                // if (hasImplements(target, ON_MOUSE_ENDED)) {
                //     target[ON_MOUSE_ENDED](helper, event);
                // }
                var triggerClick = !helper._moved || isMovedSmallRange(helper);
                _this._dispatchMouse(stage.sprite, 0, 0, helper, event, onMouseEnded, triggerClick);
            }
            _this._mouseBeginHelper = helper.target = helper.beginTarget = null;
        };
        this._keyDownHandler = function (event) {
            var stage = _this.stage;
            if (!stage.isRunning || !stage.keyboardEnabled) {
                return;
            }
            _this._dispatchKeyboard(stage.sprite, event.keyCode, event, onKeyDown);
        };
        this._keyUpHandler = function (event) {
            var stage = _this.stage;
            if (!stage.isRunning || !stage.keyboardEnabled) {
                return;
            }
            _this._dispatchKeyboard(stage.sprite, event.keyCode, event, onKeyUp);
        };
        this.stage = stage;
        this.element = stage.canvas;
    }
    UIEvent.prototype.register = function () {
        if (this._registered) {
            return;
        }
        var _a = this, stage = _a.stage, element = _a.element;
        if (stage.touchEnabled && UIEvent.supportTouch) {
            element.addEventListener(touchBegin, this._touchBeginHandler, false);
            element.addEventListener(touchMoved, this._touchMovedHandler, false);
            element.addEventListener(touchEnded, this._touchEndedHandler, false);
        }
        if (stage.mouseEnabled) {
            element.addEventListener(mouseBegin, this._mouseBeginHandler, false);
            element.addEventListener(mouseMoved, this._mouseMovedHandler, false);
            element.addEventListener(mouseEnded, this._mouseEndedHandler, false);
        }
        if (stage.keyboardEnabled) {
            document.addEventListener(keyDown, this._keyDownHandler, false);
            document.addEventListener(keyUp, this._keyUpHandler, false);
        }
        this._touchHelperMap = {};
        this._registered = true;
    };
    UIEvent.prototype.unregister = function () {
        if (!this._registered) {
            return;
        }
        var element = this.element;
        element.removeEventListener(touchBegin, this._touchBeginHandler, false);
        element.removeEventListener(touchMoved, this._touchMovedHandler, false);
        element.removeEventListener(touchEnded, this._touchEndedHandler, false);
        element.removeEventListener(mouseBegin, this._mouseBeginHandler, false);
        element.removeEventListener(mouseMoved, this._mouseMovedHandler, false);
        element.removeEventListener(mouseEnded, this._mouseEndedHandler, false);
        document.removeEventListener(keyDown, this._keyDownHandler, false);
        document.removeEventListener(keyUp, this._keyUpHandler, false);
        this._mouseBeginHelper = this._mouseMovedHelper = null;
        this._registered = false;
    };
    UIEvent.prototype.release = function () {
        this.unregister();
        this._mouseBeginHandler = this._mouseMovedHandler = this._mouseEndedHandler = null;
        this._touchBeginHandler = this._touchMovedHandler = this._touchEndedHandler = null;
        this._keyUpHandler = this._keyDownHandler = null;
        this._touchHelperMap = null;
        this.element = this.stage = null;
    };
    UIEvent.prototype.transformLocation = function (event) {
        var clientRect = this.element.getBoundingClientRect();
        var scale = this.stage.scale;
        var isRotated = this.stage.isPortrait && this.stage.orientation === exports.Orientation.LANDSCAPE;
        var x;
        var y;
        if (isRotated) {
            x = (event.clientY - clientRect.top) / scale;
            y = this.stage.height - (event.clientX - clientRect.left) / scale;
        }
        else {
            x = (event.clientX - clientRect.left) / scale;
            y = (event.clientY - clientRect.top) / scale;
        }
        return { x: x, y: y };
    };
    UIEvent.prototype._transformTouches = function (touches, justGet) {
        var helpers = [];
        var clientRect = this.element.getBoundingClientRect();
        var scale = this.stage.scale;
        var isRotated = this.stage.isPortrait && this.stage.orientation === exports.Orientation.LANDSCAPE;
        var touchHelperMap = this._touchHelperMap;
        for (var i = 0, x, y, id, helper, touch; touch = touches[i]; i++) {
            id = touch.identifier;
            var x;
            var y;
            if (isRotated) {
                x = (touch.clientY - clientRect.top) / scale;
                y = this.stage.height - (touch.clientX - clientRect.left) / scale;
            }
            else {
                x = (touch.clientX - clientRect.left) / scale;
                y = (touch.clientY - clientRect.top) / scale;
            }
            helper = touchHelperMap[id];
            if (!helper) {
                helper = touchHelperMap[id] = {
                    identifier: id,
                    beginX: x,
                    beginY: y,
                    cancelBubble: false
                };
            }
            else if (!justGet) {
                helper._moved = x - helper.beginX !== 0 || y - helper.beginY !== 0;
            }
            helper.stageX = x;
            helper.stageY = y;
            helpers.push(helper);
        }
        return helpers;
    };
    UIEvent.prototype._dispatchTouch = function (sprite, offsetX, offsetY, helpers, event, methodName, needTriggerClick) {
        if (sprite.touchEnabled === false || !sprite.visible) {
            return;
        }
        offsetX += sprite.x - sprite._originPixelX;
        offsetY += sprite.y - sprite._originPixelY;
        var children = sprite.children;
        var tmpHelpers = helpers.slice();
        var triggerreds = [];
        var result;
        var callback = function (helper) { return result.indexOf(helper) === -1; };
        if (children && children.length) {
            var index = children.length;
            while (--index >= 0) {
                result = this._dispatchTouch(children[index], offsetX, offsetY, tmpHelpers, event, methodName, needTriggerClick);
                if (result && result.length) {
                    triggerreds.push.apply(triggerreds, result);
                    // Remove triggerred touch helper, it won't pass to other child sprites
                    tmpHelpers = tmpHelpers.filter(callback);
                    // All triggerred then exit the loop
                    if (!tmpHelpers.length) {
                        break;
                    }
                }
            }
        }
        var hits = triggerreds.filter(function (helper) { return !helper.cancelBubble; });
        var rect = {
            x: offsetX,
            y: offsetY,
            width: sprite.width,
            height: sprite.height
        };
        var circle = {
            x: offsetX,
            y: offsetY,
            radius: sprite.radius
        };
        var count = 0;
        var detect = rect.width === 0 && rect.height === 0 ? function (helper) {
            return isCircleContainPoint(circle, helper);
        } : function (helper) {
            return isRectContainPoint(rect, helper);
        };
        for (var i = 0, helper = void 0; helper = tmpHelpers[i]; i++) {
            if (detect(helper)) {
                if (!helper.target) {
                    helper.target = sprite;
                }
                helper.localX = helper.stageX - rect.x;
                helper.localY = helper.stageY - rect.y;
                // Add for current sprite hit list
                hits.push(helper);
                count++;
            }
        }
        if (hits.length) {
            var hasMethod = hasImplements(sprite, methodName);
            var hasClickHandler = hasImplements(sprite, onClick);
            if (hasMethod) {
                sprite[methodName](hits, event);
                triggerreds.push.apply(triggerreds, hits.slice(hits.length - count, count));
            }
            // Click event would just trigger by only a touch
            if (hasClickHandler && needTriggerClick && hits.length === 1 && (!hits[0]._moved || isMovedSmallRange(hits[0]))) {
                sprite[onClick](hits[0], event);
                addArrayItem(triggerreds, hits[0]);
            }
        }
        return triggerreds;
    };
    UIEvent.prototype._dispatchMouse = function (sprite, offsetX, offsetY, helper, event, methodName, triggerClick) {
        if (sprite.mouseEnabled === false || !sprite.visible) {
            return false;
        }
        offsetX += sprite.x - sprite._originPixelX;
        offsetY += sprite.y - sprite._originPixelY;
        var children = sprite.children;
        var triggerred = false;
        if (children && children.length) {
            var index = children.length;
            while (--index >= 0) {
                triggerred = this._dispatchMouse(children[index], offsetX, offsetY, helper, event, methodName, triggerClick);
                if (triggerred) {
                    break;
                }
            }
            if (helper.cancelBubble) {
                return true;
            }
        }
        var rect = {
            x: offsetX,
            y: offsetY,
            width: sprite.width,
            height: sprite.height
        };
        var circle = {
            x: offsetX,
            y: offsetY,
            radius: sprite.radius
        };
        var detect = rect.width === 0 && rect.height === 0 ? function (helper) {
            return isCircleContainPoint(circle, helper);
        } : function (helper) {
            return isRectContainPoint(rect, helper);
        };
        if (triggerred || detect(helper)) {
            var hasMethod = hasImplements(sprite, methodName);
            var hasClickHandler = hasImplements(sprite, onClick);
            if (!helper.target) {
                helper.target = sprite;
            }
            helper.localX = helper.stageX - rect.x;
            helper.localY = helper.stageY - rect.y;
            if (hasMethod) {
                sprite[methodName](helper, event);
            }
            if (hasClickHandler && triggerClick) {
                sprite[onClick](helper, event);
            }
            return true;
        }
    };
    UIEvent.prototype._dispatchKeyboard = function (sprite, keyCode, event, methodName) {
        if (sprite.keyboardEnabled === false) {
            return;
        }
        if (hasImplements(sprite, methodName)) {
            sprite[methodName](keyCode, event);
        }
        var i = 0, children = sprite.children, child;
        if (children && children.length) {
            for (; child = children[i]; i++) {
                this._dispatchKeyboard(child, keyCode, event, methodName);
            }
        }
    };
    return UIEvent;
}());
UIEvent.supportTouch = "ontouchend" in window;
function isRectContainPoint(rect, p) {
    return rect.x <= p.stageX && rect.x + rect.width >= p.stageX &&
        rect.y <= p.stageY && rect.y + rect.height >= p.stageY;
}
function isCircleContainPoint(circle, p) {
    var dx = p.stageX - circle.x;
    var dy = p.stageY - circle.y;
    return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
}
function isMovedSmallRange(e) {
    if (e.beginX == null && e.beginY == null) {
        return false;
    }
    var x = Math.abs(e.beginX - e.stageX);
    var y = Math.abs(e.beginY - e.stageY);
    return x <= 5 && y <= 5;
}
function hasImplements(sprite, methodName) {
    return sprite[methodName] !== Sprite.prototype[methodName] && typeof sprite[methodName] === 'function';
}

(function (ScaleMode) {
    ScaleMode[ScaleMode["SHOW_ALL"] = 0] = "SHOW_ALL";
    ScaleMode[ScaleMode["NO_BORDER"] = 1] = "NO_BORDER";
    ScaleMode[ScaleMode["FIX_WIDTH"] = 2] = "FIX_WIDTH";
    ScaleMode[ScaleMode["FIX_HEIGHT"] = 3] = "FIX_HEIGHT";
})(exports.ScaleMode || (exports.ScaleMode = {}));

(function (Orientation) {
    Orientation[Orientation["LANDSCAPE"] = 0] = "LANDSCAPE";
    Orientation[Orientation["PORTRAIT"] = 1] = "PORTRAIT";
})(exports.Orientation || (exports.Orientation = {}));
var Stage = (function () {
    /**
     * @param  canvas     Canvas element
     * @param  width      Resolution design width
     * @param  height     Resolution design height
     * @param  scaleMode  Adjust resolution design scale mode
     */
    function Stage(canvas, width, height, scaleMode, autoAdjustCanvasSize, orientation) {
        if (orientation === void 0) { orientation = exports.Orientation.PORTRAIT; }
        var _this = this;
        this._fps = 30;
        this._frameRate = 1000 / this._fps;
        this._width = 0;
        this._height = 0;
        this.adjustCanvasSize = function () {
            var canvasElement = _this._canvasElement;
            var stageWidth = _this._width;
            var stageHeight = _this._height;
            var currentScaleMode = _this._scaleMode;
            var visibleRect = _this._visibleRect;
            var orientation = _this._orientation;
            if (!canvasElement || !canvasElement.parentNode) {
                return;
            }
            var style = canvasElement.style;
            var container = {
                width: canvasElement.parentElement.offsetWidth,
                height: canvasElement.parentElement.offsetHeight
            };
            var isPortrait = container.width < container.height;
            if (orientation === exports.Orientation.LANDSCAPE && isPortrait) {
                var tmpHeight = container.height;
                container.height = container.width;
                container.width = tmpHeight;
            }
            var scaleX = container.width / stageWidth;
            var scaleY = container.height / stageHeight;
            var deltaWidth = 0;
            var deltaHeight = 0;
            var scale;
            var width;
            var height;
            switch (currentScaleMode) {
                case exports.ScaleMode.SHOW_ALL:
                    if (scaleX < scaleY) {
                        scale = scaleX;
                        width = container.width;
                        height = scale * stageHeight;
                    }
                    else {
                        scale = scaleY;
                        width = scale * stageWidth;
                        height = container.height;
                    }
                    break;
                case exports.ScaleMode.NO_BORDER:
                    scale = scaleX > scaleY ? scaleX : scaleY;
                    width = stageWidth * scale;
                    height = stageHeight * scale;
                    deltaWidth = (stageWidth - container.width / scale) * 0.5 | 0;
                    deltaHeight = (stageHeight - container.height / scale) * 0.5 | 0;
                    break;
                case exports.ScaleMode.FIX_WIDTH:
                    scale = scaleX;
                    width = container.width;
                    height = container.height * scale;
                    deltaHeight = (stageHeight - container.height / scale) * 0.5 | 0;
                    break;
                case exports.ScaleMode.FIX_HEIGHT:
                    scale = scaleY;
                    width = scale * container.width;
                    height = container.height;
                    deltaWidth = (stageWidth - container.width / scale) * 0.5 | 0;
                    break;
                default:
                    throw new Error("Unknow stage scale mode \"" + currentScaleMode + "\"");
            }
            style.width = width + 'px';
            style.height = height + 'px';
            style.position = 'absolute';
            visibleRect.left = deltaWidth;
            visibleRect.right = stageWidth - deltaWidth;
            visibleRect.top = deltaHeight;
            visibleRect.bottom = stageHeight - deltaHeight;
            if (orientation === exports.Orientation.LANDSCAPE && isPortrait) {
                style.top = ((container.width - width) * 0.5) + 'px';
                style.left = ((container.height - height) * 0.5) + 'px';
                style.transformOrigin = style['webkitTransformOrigin'] = '0 0 0';
                style.transform = style['webkitTransform'] = "translateX(" + height + "px) rotate(90deg)";
            }
            else {
                style.transform = '';
                style.top = ((container.height - height) * 0.5) + 'px';
                style.left = ((container.width - width) * 0.5) + 'px';
            }
            _this._canvasScale = scale;
            _this._isPortrait = isPortrait;
        };
        this._rootSprite = new Sprite({
            x: width * 0.5,
            y: height * 0.5,
            width: width,
            height: height
        });
        this._scaleMode = scaleMode;
        this._canvasElement = canvas;
        this._renderContext = canvas.getContext('2d');
        this._bufferCanvas = document.createElement("canvas");
        this._bufferContext = this._bufferCanvas.getContext("2d");
        this._width = canvas.width = this._bufferCanvas.width = width;
        this._height = canvas.height = this._bufferCanvas.height = height;
        this._canvasScale = 1;
        this._isPortrait = false;
        this._visibleRect = { left: 0, right: width, top: 0, bottom: height };
        this.orientation = orientation;
        this.autoAdjustCanvasSize = autoAdjustCanvasSize;
        this._uiEvent = new UIEvent(this);
    }
    Object.defineProperty(Stage.prototype, "fps", {
        get: function () {
            return this._fps;
        },
        set: function (value) {
            this._frameRate = 1000 / value;
            this._fps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "isRunning", {
        get: function () {
            return this._isRunning;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "canvas", {
        get: function () {
            return this._canvasElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "context", {
        get: function () {
            return this._renderContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "sprite", {
        get: function () {
            return this._rootSprite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "visibleRect", {
        get: function () {
            return this._visibleRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "scale", {
        get: function () {
            return this._canvasScale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "isPortrait", {
        get: function () {
            return this._isPortrait;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "scaleMode", {
        get: function () {
            return this._scaleMode;
        },
        set: function (value) {
            if (value === this._scaleMode) {
                return;
            }
            this._scaleMode = value;
            this.adjustCanvasSize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "autoAdjustCanvasSize", {
        get: function () {
            return this._autoAdjustCanvasSize;
        },
        set: function (value) {
            if (value && !this._autoAdjustCanvasSize) {
                this._autoAdjustCanvasSize = true;
                this.adjustCanvasSize();
                window.addEventListener("resize", this.adjustCanvasSize);
            }
            else if (!value && this._autoAdjustCanvasSize) {
                this._autoAdjustCanvasSize = false;
                window.removeEventListener("resize", this.adjustCanvasSize);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "orientation", {
        get: function () {
            return this._orientation;
        },
        set: function (orientation) {
            if (this._orientation != orientation) {
                this._orientation = orientation;
            }
        },
        enumerable: true,
        configurable: true
    });
    Stage.prototype.setSize = function (width, height) {
        this._width = this._canvasElement.width = this._bufferCanvas.width = width;
        this._height = this._canvasElement.height = this._bufferCanvas.height = height;
        if (this._autoAdjustCanvasSize) {
            this.adjustCanvasSize();
        }
        this._rootSprite.x = width * 0.5;
        this._rootSprite.y = height * 0.5;
        this._rootSprite.width = width;
        this._rootSprite.height = height;
    };
    Stage.prototype.start = function (useExternalTimer) {
        if (this._isRunning) {
            return;
        }
        this._useExternalTimer = !!useExternalTimer;
        if (!useExternalTimer) {
            this._lastUpdateTime = Date.now();
            this._startTimer();
        }
        this._uiEvent.register();
        this._isRunning = true;
    };
    Stage.prototype.step = function (deltaTime) {
        this._rootSprite._update(deltaTime);
    };
    Stage.prototype.stop = function (unregisterUIEvent) {
        if (!this._isRunning) {
            return;
        }
        if (unregisterUIEvent) {
            this._uiEvent.unregister();
        }
        this._isRunning = false;
        clearTimeout(this._eventLoopTimerId);
    };
    Stage.prototype.render = function () {
        if (!this._isRunning) {
            return;
        }
        var _a = this._canvasElement, width = _a.width, height = _a.height;
        this._bufferContext.clearRect(0, 0, width, height);
        this._rootSprite._visit(this._bufferContext);
        this._renderContext.clearRect(0, 0, width, height);
        this._renderContext.drawImage(this._bufferCanvas, 0, 0, width, height);
    };
    /**
     * Add sprite to the stage
     */
    Stage.prototype.addChild = function (child, position) {
        this._rootSprite.addChild(child, position);
    };
    /**
     * Remove sprite from the stage
     */
    Stage.prototype.removeChild = function (child) {
        this._rootSprite.removeChild(child);
    };
    /**
     * Remove all sprites from the stage
     * @param  recusive  Recusize remove all the children
     */
    Stage.prototype.removeAllChildren = function (recusive) {
        this._rootSprite.removeAllChildren(recusive);
    };
    Stage.prototype.release = function () {
        this.stop(true);
        this._uiEvent.release();
        this._rootSprite.release(true);
        this._rootSprite = this._uiEvent = this._canvasElement = this._renderContext = this._bufferCanvas = this._bufferContext = null;
    };
    Stage.prototype._startTimer = function () {
        var _this = this;
        this._eventLoopTimerId = setTimeout(function () {
            if (_this._useExternalTimer) {
                return;
            }
            var deltaTime = _this._getDeltaTime();
            Action.schedule(deltaTime);
            _this._rootSprite._update(deltaTime);
            _this.render();
            _this._startTimer();
        }, this._frameRate);
    };
    Stage.prototype._getDeltaTime = function () {
        var now = Date.now();
        var delta = now - this._lastUpdateTime;
        this._lastUpdateTime = now;
        return delta / 1000;
    };
    return Stage;
}());

var HTMLAudio = (function (_super) {
    __extends(HTMLAudio, _super);
    function HTMLAudio(src) {
        var _this = _super.call(this) || this;
        _this.loop = false;
        _this.muted = false;
        _this.loaded = false;
        _this.volume = 1;
        _this.playing = false;
        _this.autoplay = false;
        _this.duration = 0;
        _this.currentTime = 0;
        _this.src = src;
        _this._handleEvent = _this._handleEvent.bind(_this);
        return _this;
    }
    HTMLAudio.prototype.load = function () {
        if (this.loaded || this._isLoading) {
            return;
        }
        var audioNode = this._audioNode = new Audio();
        audioNode.addEventListener('canplaythrough', this._handleEvent, false);
        audioNode.addEventListener('ended', this._handleEvent, false);
        audioNode.addEventListener('error', this._handleEvent, false);
        audioNode.preload = "auto";
        audioNode['autobuffer'] = true;
        audioNode.setAttribute('src', this.src);
        audioNode.volume = this.volume;
        audioNode.load();
    };
    HTMLAudio.prototype.play = function () {
        if (!HTMLAudio.enabled) {
            return;
        }
        if (this.playing) {
            this.stop();
        }
        if (this.loaded) {
            this._play();
        }
        else if (!this._isLoading) {
            this.autoplay = true;
            this.load();
        }
    };
    HTMLAudio.prototype.pause = function () {
        if (this.playing) {
            this._audioNode.pause();
            this.currentTime = this._audioNode.currentTime;
            this.playing = false;
        }
    };
    HTMLAudio.prototype.resume = function () {
        if (!this.playing && HTMLAudio.enabled) {
            this.play();
        }
    };
    HTMLAudio.prototype.stop = function () {
        if (this.playing) {
            this._audioNode.pause();
            this._audioNode.currentTime = this.currentTime = 0;
            this.playing = false;
        }
    };
    HTMLAudio.prototype.setMute = function (muted) {
        if (this.muted != muted) {
            this.muted = muted;
            if (this._audioNode) {
                this._audioNode.volume = muted ? 0 : this.volume;
            }
        }
    };
    HTMLAudio.prototype.setVolume = function (volume) {
        if (this.volume != volume) {
            this.volume = volume;
            if (this._audioNode) {
                this._audioNode.volume = volume;
            }
        }
    };
    HTMLAudio.prototype.clone = function () {
        var cloned = new HTMLAudio(this.src);
        if (this.loaded) {
            cloned._audioNode = this._audioNode.cloneNode(true);
            cloned.loaded = true;
            cloned.duration = this.duration;
        }
        return cloned;
    };
    HTMLAudio.prototype._handleEvent = function (e) {
        var type = e.type;
        switch (type) {
            case 'canplaythrough':
                e.target.removeEventListener('canplaythrough', this._handleEvent, false);
                this.loaded = true;
                this.duration = this._audioNode.duration;
                this.emit('load');
                if (this.autoplay) {
                    this.play();
                }
                break;
            case 'ended':
                this.playing = false;
                this.currentTime = 0;
                this.emit('ended');
                if (this.loop) {
                    this.play();
                }
                break;
        }
    };
    HTMLAudio.prototype._play = function () {
        if (!this.playing) {
            this._audioNode.volume = this.muted ? 0 : this.volume;
            this._audioNode.play();
            this.playing = true;
        }
    };
    return HTMLAudio;
}(EventEmitter));
HTMLAudio.enabled = false;

var AudioCtx = window['AudioContext'] || window['webkitAudioContext'];
var context = AudioCtx ? new AudioCtx() : null;
var WebAudio = (function (_super) {
    __extends(WebAudio, _super);
    function WebAudio(src) {
        var _this = _super.call(this) || this;
        _this._startTime = 0;
        _this.loop = false;
        _this.muted = false;
        _this.loaded = false;
        _this.volume = 1;
        _this.playing = false;
        _this.autoplay = false;
        _this.duration = 0;
        _this.currentTime = 0;
        _this.src = src;
        _this._handleEvent = _this._handleEvent.bind(_this);
        _this._gainNode = context.createGain ? context.createGain() : context['createGainNode']();
        _this._gainNode.connect(context.destination);
        return _this;
    }
    Object.defineProperty(WebAudio, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (enabled) {
            if (enabled && this.isSupported && !this._initialized) {
                var source = context.createBufferSource();
                source.buffer = context.createBuffer(1, 1, 22050);
                source.connect(context.destination);
                source.start ? source.start(0, 0, 0) : source['noteOn'](0, 0, 0);
                this._initialized = true;
            }
            this._enabled = enabled;
        },
        enumerable: true,
        configurable: true
    });
    WebAudio.prototype.load = function () {
        if (this._isLoading || this.loaded) {
            return;
        }
        var request = new XMLHttpRequest();
        request.onprogress = request.onload = request.onerror = this._handleEvent;
        request.open('GET', this.src, true);
        request.responseType = 'arraybuffer';
        request.send();
        this._isLoading = true;
    };
    WebAudio.prototype.play = function () {
        if (!WebAudio.enabled) {
            return;
        }
        if (this.playing) {
            this.stop();
        }
        if (this.loaded) {
            this._play();
        }
        else if (!this._buffer) {
            this.autoplay = true;
            this.load();
        }
    };
    WebAudio.prototype.pause = function () {
        if (this.playing) {
            this._audioNode.stop();
            this.currentTime += context.currentTime - this._startTime;
            this.playing = false;
        }
    };
    WebAudio.prototype.resume = function () {
        if (!this.playing && WebAudio.enabled) {
            this._play();
        }
    };
    WebAudio.prototype.stop = function () {
        if (this.playing) {
            this._audioNode.stop(0);
            this._audioNode.disconnect();
            this.currentTime = 0;
            this.playing = false;
        }
    };
    WebAudio.prototype.setMute = function (muted) {
        if (this.muted != muted) {
            this.muted = muted;
            this._gainNode.gain.value = muted ? 0 : this.volume;
        }
    };
    WebAudio.prototype.setVolume = function (volume) {
        if (this.volume != volume) {
            this.volume = volume;
            this._gainNode.gain.value = volume;
        }
    };
    WebAudio.prototype.clone = function () {
        var _this = this;
        var cloned = new WebAudio(this.src);
        if (this._isLoading) {
            cloned._isLoading = true;
            var onLoad = function () {
                cloned._onDecodeCompleted(_this._buffer);
                _this.removeListener("load", onload);
            };
            this.on('load', onload);
        }
        else if (this.loaded) {
            cloned._onDecodeCompleted(this._buffer);
        }
        return cloned;
    };
    WebAudio.prototype._handleEvent = function (e) {
        var _this = this;
        var type = e.type;
        switch (type) {
            case 'load':
                var request = e.target;
                request.onload = request.onprogress = request.onerror = null;
                context.decodeAudioData(request.response, function (buffer) { return _this._onDecodeCompleted(buffer); }, function () { return _this.emit('error'); });
                request = null;
                break;
            case 'ended':
                if (this.playing) {
                    // play ended, not paused
                    this.currentTime = 0;
                    this.playing = false;
                    this.emit('ended');
                    if (this.loop) {
                        this.play();
                    }
                }
                break;
            default:
                this.emit(type, e);
                break;
        }
    };
    WebAudio.prototype._onDecodeCompleted = function (buffer) {
        this._buffer = buffer;
        this._isLoading = false;
        this.loaded = true;
        this.duration = buffer.duration;
        this.emit('load');
        if (this.autoplay) {
            this.play();
        }
    };
    WebAudio.prototype._play = function () {
        this._clearAudioNode();
        var audioNode = context.createBufferSource();
        if (!audioNode.start) {
            audioNode.start = audioNode['noteOn'];
            audioNode.stop = audioNode['noteOff'];
        }
        this._gainNode.gain.value = this.muted ? 0 : this.volume;
        audioNode.buffer = this._buffer;
        audioNode.onended = this._handleEvent;
        audioNode.connect(this._gainNode);
        audioNode.start(0, this.currentTime);
        this._audioNode = audioNode;
        this._startTime = context.currentTime;
        this.playing = true;
    };
    WebAudio.prototype._clearAudioNode = function () {
        var audioNode = this._audioNode;
        if (audioNode) {
            audioNode.onended = null;
            audioNode.disconnect(0);
            this._audioNode = null;
        }
    };
    return WebAudio;
}(EventEmitter));
WebAudio.isSupported = AudioCtx != null;
WebAudio._initialized = false;
WebAudio._enabled = false;

var SoundManager = (function () {
    function SoundManager() {
        this._ext = ".mp3";
        this._audioCache = {};
        this._supportedType = {
            mp3: false,
            mp4: false,
            wav: false,
            ogg: false
        };
        this._detectSupportedType();
    }
    Object.defineProperty(SoundManager.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            if (value == this._enabled) {
                return;
            }
            this._setEnabled(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "supportedType", {
        get: function () {
            return __assign({}, this._supportedType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "ext", {
        get: function () {
            return this._ext;
        },
        set: function (ext) {
            this._ext = ext;
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.prototype.getAudio = function (name, returnAll) {
        var list = this._audioCache[name];
        if (!list || !list.length) {
            return returnAll ? [] : null;
        }
        var i = 0;
        var all = [];
        var audio;
        for (; audio = list[i]; i++) {
            if (!audio.playing) {
                if (!returnAll) {
                    return audio;
                }
                all.push(audio);
            }
        }
        return returnAll ? all : all[0];
    };
    SoundManager.prototype.load = function (baseUri, name, onComplete, channels) {
        var _this = this;
        if (channels === void 0) { channels = 1; }
        var src = baseUri + name + this._ext;
        var audio = WebAudio.isSupported ? new WebAudio(src) : new HTMLAudio(src);
        audio.on('load', function () {
            if (onComplete) {
                onComplete();
            }
            var cloned;
            while (--channels > 0) {
                cloned = audio.clone();
                _this._audioCache[name].push(cloned);
            }
        });
        audio.on('error', function (e) {
            console.warn("canvas2d.Sound.load() Error: " + src + " could not be loaded.");
            removeArrayItem(_this._audioCache[name], audio);
        });
        if (!this._audioCache[name]) {
            this._audioCache[name] = [];
        }
        this._audioCache[name].push(audio);
        audio.load();
    };
    /**
     * Load multiple sound resources
     */
    SoundManager.prototype.loadList = function (baseUri, resources, onAllCompleted, onProgress) {
        var _this = this;
        var totalCount = resources.length;
        var endedCount = 0;
        var onCompleted = function () {
            ++endedCount;
            if (onProgress) {
                onProgress(endedCount / totalCount);
            }
            if (endedCount === totalCount && onAllCompleted) {
                onAllCompleted();
            }
        };
        resources.forEach(function (res) { return _this.load(baseUri, res.name, onCompleted, res.channels); });
    };
    /**
     * Get all audioes by name
     */
    SoundManager.prototype.getAllAudioes = function (name) {
        return this._audioCache[name] && this._audioCache[name].slice();
    };
    /**
     * Play sound by name
     */
    SoundManager.prototype.play = function (name, loop) {
        if (loop === void 0) { loop = false; }
        var audio = this._enabled && this.getAudio(name);
        if (audio) {
            audio.loop = loop;
            audio.play();
        }
        return audio;
    };
    /**
     * Pause sound by name
     */
    SoundManager.prototype.pause = function (name) {
        var list = this.getAllAudioes(name);
        if (list) {
            list.forEach(function (audio) { return audio.pause(); });
        }
    };
    /**
     * Stop sound by name
     */
    SoundManager.prototype.stop = function (name) {
        var list = this._audioCache[name];
        if (list) {
            list.forEach(function (audio) { return audio.stop(); });
        }
    };
    /**
     * Resume audio by name
     */
    SoundManager.prototype.resume = function (name) {
        var list = this._audioCache[name];
        if (list) {
            list.forEach(function (audio) { return !audio.playing && audio.currentTime > 0 && audio.resume(); });
        }
    };
    SoundManager.prototype._setEnabled = function (value) {
        var _this = this;
        if (value) {
            WebAudio.enabled = true;
            HTMLAudio.enabled = true;
            if (this._pausedAudios) {
                Object.keys(this._pausedAudios).forEach(function (id) {
                    _this._pausedAudios[id].resume();
                });
                this._pausedAudios = null;
            }
        }
        else {
            WebAudio.enabled = false;
            HTMLAudio.enabled = false;
            this._pausedAudios = {};
            Object.keys(this._audioCache).forEach(function (name) {
                _this._audioCache[name].forEach(function (audio) {
                    if (audio.playing) {
                        audio.pause();
                        _this._pausedAudios[uid(audio)] = audio;
                    }
                });
            });
        }
        this._enabled = value;
    };
    SoundManager.prototype._detectSupportedType = function () {
        var aud = new Audio();
        var reg = /maybe|probably/i;
        var mts = {
            mp3: 'audio/mpeg',
            mp4: 'audio/mp4; codecs="mp4a.40.5"',
            wav: 'audio/x-wav',
            ogg: 'audio/ogg; codecs="vorbis"'
        };
        for (var name in mts) {
            this._supportedType[name] = reg.test(aud.canPlayType(mts[name]));
        }
        aud = null;
    };
    return SoundManager;
}());
var Sound = new SoundManager();

var measureContext = document.createElement("canvas").getContext("2d");
var regEnter = /\n/;
var TextLabel = (function (_super) {
    __extends(TextLabel, _super);
    function TextLabel(props) {
        var _this = _super.call(this) || this;
        _this.fontName = 'sans-serif';
        _this.textAlign = 'center';
        _this.lineSpace = 5;
        _this.fontColor = 0x000;
        _this.fontSize = 20;
        _this.fontWeight = 'normal';
        _this.fontStyle = 'normal';
        _this._text = '';
        _super.prototype._init.call(_this, props);
        return _this;
    }
    TextLabel.prototype._init = function (props) {
    };
    Object.defineProperty(TextLabel.prototype, "texture", {
        set: function (value) {
            throw new Error("canvas2d: TextLabel cannot set texture.");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextLabel.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (content) {
            if (this._text !== content) {
                this._text = content;
                if (this.autoResize) {
                    this._resize();
                }
                else {
                    this._lines = content.split(regEnter);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    TextLabel.prototype._resize = function () {
        this._lines = this._text.split(regEnter);
        var width = 0;
        var height = 0;
        var fontSize = this.fontSize;
        var lineSpace = this.lineSpace;
        measureContext.save();
        measureContext.font = this.fontStyle + ' ' + this.fontWeight + ' ' + fontSize + 'px ' + this.fontName;
        this._lines.forEach(function (text, i) {
            width = Math.max(width, measureContext.measureText(text).width);
            height = lineSpace * i + fontSize * (i + 1);
        });
        measureContext.restore();
        this.width = width;
        this.height = height;
    };
    TextLabel.prototype.addChild = function () {
        throw new Error("canvas2d.TextLabel.addChild(): Don't call this method.");
    };
    TextLabel.prototype.draw = function (context) {
        var _this = this;
        this._drawBgColor(context);
        this._drawBorder(context);
        if (this._text.length === 0) {
            return;
        }
        context.font = this.fontStyle + ' ' + this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontName;
        context.fillStyle = convertColor(this.fontColor);
        context.textAlign = this.textAlign;
        context.textBaseline = 'middle';
        context.lineJoin = 'round';
        if (this.strokeWidth) {
            context.strokeStyle = convertColor(this.strokeColor || 0x000);
            context.lineWidth = this.strokeWidth * 2;
        }
        var y = 0;
        var h = this.fontSize + this.lineSpace;
        this._lines.forEach(function (text) {
            if (text.length > 0) {
                if (_this.strokeWidth) {
                    context.strokeText(text, 0, y, 0xffff);
                }
                context.fillText(text, 0, y, 0xffff);
            }
            y += h;
        });
    };
    return TextLabel;
}(Sprite));

var BMFontLabel = (function (_super) {
    __extends(BMFontLabel, _super);
    function BMFontLabel(attrs) {
        return _super.call(this, attrs) || this;
    }
    Object.defineProperty(BMFontLabel.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            if (text === this._text) {
                return;
            }
            this.setText(text);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BMFontLabel.prototype, "textureMap", {
        get: function () {
            return this._textureMap;
        },
        set: function (textureMap) {
            this._textureMap = textureMap;
            this.setText(this._text);
        },
        enumerable: true,
        configurable: true
    });
    BMFontLabel.prototype.setText = function (text) {
        var _this = this;
        this._text = text || '';
        if (!this.textureMap || !this._text) {
            return;
        }
        var words = this._text.split('');
        if (!words.length) {
            this._words.length = 0;
        }
        else {
            this._words = words.map(function (word) {
                if (!_this._textureMap[word]) {
                    console.error("canvas2d.BMFontLabel: Texture of the word \"" + word + "\" not found.", _this);
                }
                return _this._textureMap[word];
            });
        }
        this.removeAllChildren();
        if (this._words && this._words.length) {
            this._words.forEach(function (word, i) {
                if (!word) {
                    return;
                }
                _super.prototype.addChild.call(_this, new Sprite({
                    x: i * word.width,
                    texture: word,
                    originX: 0,
                    originY: 0
                }));
            });
            this.width = this._words.length * this._words[0].width;
            this.height = this._words[0].height;
        }
    };
    BMFontLabel.prototype.addChild = function () {
        throw new Error("canvas2d.BMFontLabel.addChild(): Don't call this method.");
    };
    return BMFontLabel;
}(Sprite));

function createSprite(type, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var sprite;
    var ref = props.ref, actions = props.actions, options = __rest(props, ["ref", "actions"]);
    if (typeof type === 'function') {
        sprite = new type(options);
    }
    else {
        switch (type) {
            case "sprite":
                sprite = new Sprite(options);
                if (children.length) {
                    children.forEach(function (child) { return child && sprite.addChild(child); });
                }
                break;
            case "text":
                sprite = createLabel(type, TextLabel, options, children);
                break;
            case "bmfont":
                sprite = createLabel(type, BMFontLabel, options, children);
                break;
            case 'stage':
                sprite = createStage(options, children);
                break;
        }
    }
    if (sprite == null) {
        console.error("canvas2d.createSprite(): Unknown sprite type", type);
    }
    else if (actions && actions.length) {
        actions.forEach(function (queue) {
            new Action(sprite).queue(queue).start();
        });
    }
    if (ref) {
        ref.call(undefined, sprite);
    }
    return sprite;
}
function createLabel(tag, ctor, props, children) {
    var sprite = new ctor(props);
    if (children.length) {
        if (!ensureString(children)) {
            throw new Error("canvas2d: <" + tag + "> only support string children.");
        }
        sprite.text = children.join('');
    }
    return sprite;
}
function createStage(props, children) {
    var canvas = props.canvas, width = props.width, height = props.height, scaleMode = props.scaleMode, autoAdjustCanvasSize = props.autoAdjustCanvasSize, useExternalTimer = props.useExternalTimer, touchEnabled = props.touchEnabled, mouseEnabled = props.mouseEnabled, keyboardEnabled = props.keyboardEnabled, orientation = props.orientation;
    var stage = new Stage(canvas, width, height, scaleMode, autoAdjustCanvasSize, orientation);
    stage.touchEnabled = touchEnabled;
    stage.mouseEnabled = mouseEnabled;
    stage.keyboardEnabled = keyboardEnabled;
    stage.start(useExternalTimer);
    if (children.length) {
        children.forEach(function (child) { return child && stage.addChild(child); });
    }
    return stage;
}
function ensureString(list) {
    return list.every(function (item) { return typeof item === 'string'; });
}

exports.Sprite = Sprite;
exports.RAD_PER_DEG = RAD_PER_DEG;
exports.createSprite = createSprite;
exports.Keys = Keys;
exports.Tween = Tween;
exports.Texture = Texture;
exports.Action = Action;
exports.Stage = Stage;
exports.EventEmitter = EventEmitter;
exports.Sound = Sound;
exports.UIEvent = UIEvent;
exports.TextLabel = TextLabel;
exports.BMFontLabel = BMFontLabel;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=canvas2d.js.map
