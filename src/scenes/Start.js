export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        //Background
        this.load.image('background', 'assets/Backgrounds/Untitled design (2).png');

        //Player
        this.load.image('pony', 'assets/Animals/horse.png');

        //UI
        //health
        this.load.image('health', 'assets/UI Elements/heart_full.png');
        //score
        this.load.image('score', 'assets/UI Elements/buttonLong_brown.png');

        
        //Bullets - cookies
        this.load.image('bullet', 'assets/UI Elements/meteorBrown_big4.png');
        
        
    }

    create() {
        this.add.image(640,360, 'background').setDisplaySize(1280,720);
        this.pony = this.physics.add.sprite(640,580, 'pony');
        
        //pony
        this.pony.setCollideWorldBounds(true);
        this.pony.body.setAllowGravity(false);
        this.isBouncing = false;

        this.cursor = this.input.keyboard.createCursorKeys();

        //UI - cursor 

        this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze.png") 0 0, auto');

        this.input.on('pointerdown', (pointer) => { this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze-click.png") 0 0, auto');
            console.log(`X: ${pointer.x}, Y: ${pointer.y}`);
         });
        this.input.on('pointerup', () => { this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze.png") 0 0, auto'); });

        //UI - health
        this.health = 3;
        this.hearts = [];

        for (var i = 0; i < 3; i++) {
            const heart = this.add.image(40 + (i * 50),40, 'health').setScale(3,3);
            this.hearts.push(heart);
        }

        //UI - score
        this.add.image(1170, 48,'score');
        this.score = 0;
        this.scoreText = this.add.text(1158, 28, String(this.score).padStart(5, '0'), {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff',
            stroke: '#5a4630',
            strokeThickness: 4
        }).setOrigin(0.4, 0);
        


    }

    update() {

        const speed = 500;
        
        //movement 
        if (!this.isBouncing) {
            if (this.cursor.left.isDown) {
                //(console.log("left pressed"));
                this.pony.setVelocityX(-speed);
            } else if (this.cursor.right.isDown) {
                //(console.log("right pressed"));
                this.pony.setVelocityX(speed);
            } else {
                this.pony.setVelocityX(0);
            }

            //shooting
            if (Phaser.Input.Keyboard.JustDown(this.cursor.space)) {
                //console.log("shoot shoot");
                this.bullet = this.physics.add.sprite(this.pony.x,this.pony.y - 80, 'bullet').setScale(0.3);
                this.tweens.add({
                    targets: this.pony,
                    scaleX: 1.12,
                    scaleY: 0.70,
                    duration: 85,
                    ease: 'Sine.easeOut',
                    yoyo: true
                });

                
            }
        }

        if (this.pony.body.blocked.left && !this.isBouncing) {
            this.isBouncing = true;
            this.pony.setVelocityX(0);
            this.pony.setVelocityX(300)
            this.tweens.add({
            targets: this.pony,
            scaleX: 0.8,
            scaleY: 1.10,
            duration: 200,
            ease: 'Back.easeOut',
            onComplete: () => {
                this.tweens.add({
                    targets: this.pony,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 100,
                    ease: 'Sine.easeOut',
                    onComplete: () => {
                        this.isBouncing = false;
                    }
                    })
                }
            });

        } else if (this.pony.body.blocked.right && !this.isBouncing) {
            this.isBouncing = true;
            this.pony.setVelocityX(0);
            this.pony.setVelocityX(-300)
            this.tweens.add({
            targets: this.pony,
            scaleX: 0.8,
            scaleY: 1.10,
            duration: 200,
            ease: 'Back.easeOut',
            onComplete: () => {
                this.tweens.add({
                    targets: this.pony,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 100,
                    ease: 'Sine.easeOut',
                    onComplete: () => {
                        this.isBouncing = false;
                    }
                    })
                }
            });
        }
    }
    
}
