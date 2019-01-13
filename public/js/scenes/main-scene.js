class MainScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
    }

    create() {
        let w = new CUIWidget(this, {
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            margin: {left: 10},
            padding: {top: 5},
            debug: true
        });

        this.input.on('pointermove', (p) => {
            w.setPosition(p.x, p.y);
        });
    }
}