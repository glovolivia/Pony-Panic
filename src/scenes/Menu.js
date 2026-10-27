import { setupButton } from "./helpers/setupButton.js";

export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        //Background
        this.load.image('background', 'assets/Backgrounds/Untitled design (2).png');

        //UI elements
        this.load.image('button', 'assets/UI Elements/buttonSquare_brown.png');
        this.load.image('button_pressed', 'assets/UI Elements/buttonSquare_brown_pressed.png');
        this.load.image('back', 'assets/UI Elements/arrowSilver_left.png');

        this.load.image('button_long', 'assets/UI Elements/buttonLong_brown.png');
        this.load.image("button_long_pressed", 'assets/UI Elements/buttonLong_brown_pressed.png');
    }

    create() {
        //load background
        this.background = this.add.sprite(640, 360, 'background').setDisplaySize(1280,720);
        this.ui = this.add.container(0,0);

        //UI - cursor 
        this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze.png") 0 0, auto');

        this.input.on('pointerdown', (pointer) => { this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze-click.png") 0 0, auto');
            console.log(`X: ${pointer.x}, Y: ${pointer.y}`);
         });
        this.input.on('pointerup', () => { this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze.png") 0 0, auto'); });

        //title
        this.ui.add(this.add.text(650, 180, 'PONY PANIC', { fontSize: '156px', fill: '#FFF', stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));
        
        //buttons
        this.buttonStart = setupButton(this, false, 'START', 640, 330, 2.2, 'button_long', 'button_long_pressed', 'Start');
        this.ui.add(this.buttonStart);
        //button for Credit scene
        this.buttonCC = setupButton(this, false, 'CONTROLS', 640, 450, 1.9, 'button_long', 'button_long_pressed', 'Controls');
        this.ui.add(this.buttonCC);
        //button for controls
        this.buttonC = setupButton(this, false, 'CREDITS', 640, 560, 1.9, 'button_long', 'button_long_pressed', 'Credits');
        this.ui.add(this.buttonC);

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