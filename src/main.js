import { GameOver } from './scenes/GameOver.js';
import { Start } from './scenes/Start.js';
import { Menu } from './scenes/Menu.js';
import { Credits } from './scenes/Credits.js';
import { Controls } from './scenes/Controls.js';
import { Debug } from './scenes/Debug.js';

const config = {
    type: Phaser.AUTO,
    title: 'Pony Panic',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        Menu, Start, GameOver, Credits, Controls
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
    default: 'arcade',
    arcade: {
        //debug: true
    }
},
}

new Phaser.Game(config);
            