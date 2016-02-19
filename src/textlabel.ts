﻿/// <reference path="sprite.ts" />

namespace canvas2d {

    export interface ITextLabel extends ISprite {
        text?: string;
        fontName?: string;
        textAlign?: string;
        fontColor?: string;
        fontSize?: number;
        lineSpace?: number;
        fontStyle?: string;
        fontWeight?: string;
        stroke?: {
            color: string;
            width: number;
        };
    }

    var measureContext = document.createElement("canvas").getContext("2d");
    var regEnter = /\n/;

    export class TextLabel extends Sprite {

        fontName: string = 'Arial';
        textAlign: string = 'center';
        fontColor: string = '#000';
        fontSize: number = 20;
        fontWeight: string = 'normal';
        fontStyle: string = 'normal';
        lineSpace: number = 5;
        stroke: {
            color: string;
            width: number;
        };

        private _lines: string[];
        private _text: string = '';

        constructor(attrs?: ITextLabel) {
            super();
            super._init(attrs);
        }

        protected _init(attrs?: ISprite) {

        }

        set text(content: string) {
            if (this._text !== content) {
                this._text = content;

                if (this.autoResize) {
                    this._resize();
                }
                else {
                    this._lines = content.split(regEnter);
                }
            }
        }

        get text(): string {
            return this._text;
        }

        private _resize(): void {
            this._lines = this._text.split(regEnter);

            var width = 0;
            var height = 0;
            var fontSize = this.fontSize;
            var lineSpace = this.lineSpace;

            measureContext.save();
            measureContext.font = this.fontStyle + ' ' + this.fontWeight + ' ' + fontSize + 'px ' + this.fontName;

            this._lines.forEach((text, i) => {
                width = Math.max(width, measureContext.measureText(text).width);
                height = lineSpace * i + fontSize * (i + 1);
            });

            measureContext.restore();

            this.width = width;
            this.height = height;
        }

        addChild(): void {
            throw new Error("TextLabel cannot not have children");
        }

        removeChild(): void {
            throw new Error("TextLabel has no child");
        }

        protected draw(context: CanvasRenderingContext2D): void {
            this._drawBgColor(context);
            this._drawBorder(context);

            if (this._text.length === 0) {
                return;
            }

            context.font = this.fontStyle + ' ' + this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontName;
            context.fillStyle = this.fontColor;
            context.textAlign = this.textAlign;
            context.textBaseline = 'middle';

            if (this.stroke) {
                context.strokeStyle = this.stroke.color;
                context.lineWidth = this.stroke.width;
            }

            var y = 0;
            var h = this.fontSize + this.lineSpace;

            this._lines.forEach((text) => {
                if (text.length > 0) {
                    context.fillText(text, 0, y);
                    if (this.stroke) {
                        context.strokeText(text, 0, y);
                    }
                }
                y += h;
            });
        }
    }
}
