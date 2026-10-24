export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload() {
        this.load.image('background', 'assets/bg.png');

        //Buttons 50/45
        this.load.image('back_button', 'assets/UI Elements/buttonSquare_brown.png');
        this.load.image('back_button_pressed', 'assets/UI Elements/buttonSquare_brown_pressed.png');
        this.load.image('back', 'assets/UI Elements/arrowSilver_left.png');
        
    }

    create() {
        this.background = this.add.sprite(640, 360, 'background').setDisplaySize(1280,720);
        this.add.text(100, 200, 'GAME OVER...', { fontSize: '128px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 });
        this.add.text(400, 340, 'Want a rematch?', { fontSize: '78px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 });

        this.button = this.add.image(50,45, 'back_button');
        this.buttonY = this.button.y - 2;

        this.buttonArrow = this.add.image(this.button.x, this.buttonY, 'back');
        this.button.setInteractive({cursor: 'url("assets/UI Elements/cursorGauntlet_bronze.png") 0 0, auto'});

        this.button.on('pointerout', () => {
            this.button.setTexture('back_button');
            this.buttonArrow.y = this.buttonY;
        });

        this.button.on('pointerover', () => {
            this.button.setTexture('back_button_pressed');
            this.buttonArrow.y += 3;
        });

        this.button.on('pointerdown', () => {
            this.button.setTexture('back_button_pressed');
        });

        this.button.on('pointerup', () => {
            this.button.setTexture('back_button');
            this.scene.start('Start');
        });
    }

}