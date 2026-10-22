import { GameOver } from './scenes/GameOver.js';
import { Start } from './scenes/Start.js';

const config = {
    type: Phaser.AUTO,
    title: 'Pony Panic',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [
        Start, GameOver
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
    default: 'arcade',
    arcade: {
        debug: true
    }
},
}

new Phaser.Game(config);
            