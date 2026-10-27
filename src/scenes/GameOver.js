import { setupButton } from "./helpers/setupButton.js";

export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload() {
        this.load.image('background', 'assets/bg.png');
        
    }

    create() {
        this.background = this.add.sprite(640, 360, 'background').setDisplaySize(1280,720);
        this.ui = this.add.container(0, 0);

        this.ui.add(this.add.text(640, 240, 'GAME OVER', { fontSize: '128px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));
        this.ui.add(this.add.text(640, 340, 'TRY AGAIN?', { fontSize: '78px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));

        //UI - cursor 
        this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze.png") 0 0, auto');

        this.input.on('pointerdown', (pointer) => { this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze-click.png") 0 0, auto');
            console.log(`X: ${pointer.x}, Y: ${pointer.y}`);
         });
        this.input.on('pointerup', () => { this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze.png") 0 0, auto'); });

        //buttons
        this.backButton = setupButton(this, 'back', false, 50, 45, 1, 'button', 'button_pressed', 'Menu');
        this.yesButton = setupButton(this, false, "YES", 440, 490, 1.8, "button_long", 'button_long_pressed', 'Start');
        this.noButton = setupButton(this, false, "NO", 840, 490, 1.8, "button_long", 'button_long_pressed', 'Menu');

        this.ui.add(this.backButton);
        this.ui.add(this.yesButton);
        this.ui.add(this.noButton);

        this.tweens.add({
            targets: this.ui,
            repeat: -1,
            yoyo: true,
            y: -7,
            ease: 'Sine.easeInOut',
            duration: 1200,
        });
    }

}