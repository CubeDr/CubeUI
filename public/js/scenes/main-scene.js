class MainScene extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('bandit', '../../assets/bandit.png');
    }

    create() {
        let w = new CUIWidget(this, {
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            margin: {left: 30},
            padding: {left: 5, right: 5, bottom: 5, top: 20},
            debug: true
        });

        this.input.on('pointermove', (p) => {
            w.setPosition(p.x, p.y);
        });

        w.setBackground('bandit');
    }
}