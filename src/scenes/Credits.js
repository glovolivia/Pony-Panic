import { setupButton } from "./helpers/setupButton.js";

export class Credits extends Phaser.Scene {
    constructor() {
        super('Credits');
    }

    
    preload() {
            //Background
            this.load.image('background', 'assets/Backgrounds/Untitled design (2).png');
    
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
            
        this.backButton = setupButton(this, 'back', false, 50, 45, 1, 'button', 'button_pressed', 'Menu');

        this.ui.add(this.add.text(640, 120, "Credits", { fontSize: '128px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));
        this.ui.add(this.add.text(640, 240, "Game Design & Programming", { fontSize: '42px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));
        this.ui.add(this.add.text(640, 300, "Oliwia Glowczynska", { fontSize: '58px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));
        this.ui.add(this.add.text(640, 390, "Art & UI assets", { fontSize: '42px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));
        this.ui.add(this.add.text(640, 440, "Kenny - kenney.nl", { fontSize: '58px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));
        this.ui.add(this.add.text(640, 530, "Audio", { fontSize: '42px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));
        this.ui.add(this.add.text(640, 580, "opengameart.org", { fontSize: '58px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));

        this.tweens.add({
            targets: this.ui,
            repeat: -1,
            yoyo: true,
            y: -5,
            ease: 'Sine.easeInOut',
            duration: 1200,
        });
    }
    
}
