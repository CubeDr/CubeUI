class MainScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
    }

    create() {
        let w = new CUIWidget(this, {
            margin: {left: 10},
            padding: {top: 5}
        });
    }
}