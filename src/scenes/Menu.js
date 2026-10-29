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

        this.load.image('preview', 'assets/UI Elements/panelInset_brown.png');

        this.load.audio('music', 'assets/Audio/music.mp3');
    }

    create() {
        //load demo
        this.add.image(640,360, 'background').setDisplaySize(1280,720);
        this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.1);
        this.scene.launch('Start', { isDemo: true});
        this.scene.bringToTop('Start');

        //music code
        if(!this.sound.get('music')) {
            this.music = this.sound.add('music', { loop: true, volume: 0.2 });
            this.music.play();
        }

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
        this.buttonStart = setupButton(this, false, 'START', 930, 330, 2, 'button_long', 'button_long_pressed', 'Start', 'click');
        this.ui.add(this.buttonStart);
        //button for Credit scene
        this.buttonCC = setupButton(this, false, 'CONTROLS', 930, 450, 2, 'button_long', 'button_long_pressed', 'Controls', 'click');
        this.ui.add(this.buttonCC);
        //button for controls
        this.buttonC = setupButton(this, false, 'CREDITS', 930, 560, 2, 'button_long', 'button_long_pressed', 'Credits', 'click');
        this.ui.add(this.buttonC);
        this.textures.get('preview').setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.ui.add(this.add.rectangle(445, 445, 500, 325, 0x96734e).setAlpha(0.5));
        this.background = this.add.rectangle(440, 440, 500, 325, 0x96734e);
        this.ui.add(this.background);

        this.tweens.add({
            targets: this.ui,
            repeat: -1,
            yoyo: true,
            y: -7,
            ease: 'Sine.easeInOut',
            duration: 1200,

            onUpdate: () => {
            const demo = this.scene.get('Start');

            if (this.scene.isActive('Start') && demo.isDemo) {
            demo.cameras.main.y = 287.5 + this.ui.y;
            }
            }
        });
    }

}