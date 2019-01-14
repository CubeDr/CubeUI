class CUIWidget extends Phaser.GameObjects.GameObject {
    constructor(scene, config = {}) {
        super(scene, CUIWidget._getValue(config.type, "CUIWidget"));
        this._scene = scene;

        this._init(config);
    }

    setPosition(x, y) {
        this._x = x;
        this._y = y;

        this._updateBoundaryOffset();
        this._doDebuggingStuff();
        this._setBackground();
    }

    setBackground(backgroundKey) {
        if(this._background) {
            this._background.destroy();
            this._background = null;
        }

        if(backgroundKey == null) return;

        this._background = this._scene.add.image(0, 0, backgroundKey).setOrigin(0);
        this._setBackground();
    }

    _setBackground() {
        if(!this._background) return;
        this._background.setPosition(this._marginRect.x, this._marginRect.y);
        this._background.setScale(this._marginRect.w / this._background.width,
            this._marginRect.h / this._background.height);
    }

    _init(config) {
        this._x = CUIWidget._getValue(config.x, 0);
        this._y = CUIWidget._getValue(config.y, 0);
        this._width = CUIWidget._getValue(config.width, 100);
        this._height = CUIWidget._getValue(config.height, 100);
        this._margin = CUIWidget._getValue(config.margin,
            CUIWidget.DEFAULT_MARGIN_CONFIG,
            true);
        this._padding = CUIWidget._getValue(config.padding,
            CUIWidget.DEFAULT_PADDING_CONFIG,
            true);
        this._debug = CUIWidget._getValue(config.debug);
        this._debugConfig = CUIWidget._getValue(config.debugConfig, {
            debug: false,
            showBoundary: {
                margin: false,
                padding: false
            },
            _boundary: {
                margin: null,
                padding: null
            }
        }, true);
        this._updateBoundaryOffset();

        this._doDebuggingStuff();
    }

    _updateBoundaryOffset() {
        this._marginRect = {
            x: this._x + this._margin.left,
            y: this._y + this._margin.top,
            w: this._width - this._margin.right - this._margin.left,
            h: this._height - this._margin.bottom - this._margin.top
        };
        this._paddingRect = {
            x: this._marginRect.x + this._padding.left,
            y: this._marginRect.y + this._padding.top,
            w: this._marginRect.w - this._padding.right - this._padding.left,
            h: this._marginRect.h - this._padding.bottom - this._padding.top
        };
    }

    _doDebuggingStuff() {
        this._redrawBoundaryGraphics();
    }

    _redrawBoundaryGraphics() {
        if (this._debugConfig._boundary.widget) {
            this._debugConfig._boundary.widget.destroy();
            this._debugConfig._boundary.widget = null;
        }
        if (this._debugConfig._boundary.margin) {
            this._debugConfig._boundary.margin.destroy();
            this._debugConfig._boundary.margin = null;
        }
        if (this._debugConfig._boundary.padding) {
            this._debugConfig._boundary.padding.destroy();
            this._debugConfig._boundary.padding = null;
        }

        if (!this._debug) return;

        this._debugConfig._boundary.widget = CUIWidget._drawGraphicsLine(
            this._scene,
            {x: this._x, y: this._y, w: this._width, h: this._height},
            1, 0x99ff99, 1);

        this._debugConfig._boundary.margin = CUIWidget._drawGraphicsLine(
            this._scene,
            this._marginRect,
            1, 0x99ff99, 1);

        this._debugConfig._boundary.padding = CUIWidget._drawGraphicsLine(
            this._scene,
            this._paddingRect,
            1, 0x99ff99, 1);
    }

    static _drawGraphicsLine(scene, r, t, c, a) {
        let g = scene.add.graphics();
        g.lineStyle(t, c, a);
        g.beginPath();
        g.moveTo(r.x, r.y);
        g.lineTo(r.x, r.y + r.h);
        g.lineTo(r.x + r.w, r.y + r.h);
        g.lineTo(r.x + r.w, r.y);
        g.closePath();
        g.strokePath();
        return g;
    }

    static _getValue(value, defaultValue, initObjectData=false) {
        if(value) {
            if(initObjectData) {
                for(let key in defaultValue) {
                    if(!defaultValue.hasOwnProperty(key)) continue;
                    if(value[key] == null)
                        value[key] = CUIWidget._getValue(value[key], defaultValue[key], initObjectData);
                }
            }
            return value;
        }
        return defaultValue;
    }
}

CUIWidget.DEFAULT_MARGIN_CONFIG = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
};

CUIWidget.DEFAULT_PADDING_CONFIG = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
};