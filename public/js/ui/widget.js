class CUIWidget extends Phaser.GameObjects.GameObject {
    constructor(scene, config = {}) {
        super(scene, CUIWidget._getValue(config.type, "CUIWidgent"));
        this._scene = scene;

        this._init(config);
    }

    _init(config) {
        this._margin = CUIWidget._getValue(config.margin, {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, true);
        this._padding = CUIWidget._getValue(config.padding, {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, true);

        console.log(this._margin);
        console.log(this._padding);
    }

    static _getValue(value, defaultValue, initObjectData=false) {
        if(value) {
            if(initObjectData) {
                for(let key in defaultValue) {
                    if(!defaultValue.hasOwnProperty(key)) continue;
                    if(value[key] == null) {
                        value[key] = defaultValue[key];
                    }
                }
            }
            return value;
        }
        return defaultValue;
    }
}