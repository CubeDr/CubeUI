import { PhaserFloating } from './scenes/phaserFloating.js'

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [PhaserFloating]
};

let game = new Phaser.Game(config);