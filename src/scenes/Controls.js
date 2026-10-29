import { setupButton } from "./helpers/setupButton.js";

export class Controls extends Phaser.Scene {
    constructor() {
        super('Controls');
    }

    
    preload() {
            //Background
            this.load.image('background', 'assets/Backgrounds/Untitled design (2).png');
            
            //Input keys
            this.load.image('right', 'assets/KeyInputs/keyboard_arrow_right_outline.png');
            this.load.image('left', 'assets/KeyInputs/keyboard_arrow_left_outline.png');
            this.load.image('space', 'assets/KeyInputs/keyboard_space_icon_outline.png');
    
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
            
        this.backButton = setupButton(this, 'back', false, 50, 45, 1, 'button', 'button_pressed', 'Menu', 'click');

        //graphics
        this.ui.add(this.add.image(214,264, 'left').setTint(0x667580).setAlpha(0.5).setScale(1));
        this.ui.add(this.add.image(210, 260, 'left').setScale(1));
        this.ui.add(this.add.image(334, 264, 'right').setTint(0x667580).setAlpha(0.5).setScale(1));
        this.ui.add(this.add.image(330, 260, 'right').setScale(1));
        this.ui.add(this.add.image(276, 394, 'space').setTint(0x667580).setAlpha(0.5).setScale(1));
        this.ui.add(this.add.image(272, 390, 'space').setScale(1));

        //text
        this.ui.add(this.add.text(640, 130, "Controls", { fontSize: '128px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));
        this.ui.add(this.add.text(410, 232, "Move left/right", { fontSize: '58px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setShadow(3, 3, '#667580', 4));
        this.ui.add(this.add.text(410, 362, "Shoot cookies", { fontSize: '58px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setShadow(3, 3, '#667580', 4));
        this.ui.add(this.add.text(640, 520, "Feed the animals and dodge their poop!", { fontSize: '49px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));

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
