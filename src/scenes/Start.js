import { Bullet } from "../gameObjects/bullet.js";
import { Enemy } from "../gameObjects/enemy.js";
import { Poop } from "../gameObjects/poop.js";

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
        this.load.image('heart', 'assets/UI Elements/heart_full.png');
        this.load.image('empty', 'assets/UI Elements/heart_empty.png');
        this.load.image('half', 'assets/UI Elements/heart_half.png');
        //score
        this.load.image('score', 'assets/UI Elements/buttonLong_brown.png');

        
        //Bullets - cookies
        this.load.image('bullet', 'assets/UI Elements/meteorBrown_big4.png');

        //Enemies
        //Zebra
        this.load.image('zebra', 'assets/Animals/zebra.png');
        //explosion
        this.load.image('crumb', 'assets/UI Elements/buttonRound_grey.png');
        //poop
        this.load.image('poop', 'assets/UI Elements/meteorBrown_big1.png');
        
        
    }

    create() {
        //Background
        this.add.image(640,360, 'background').setDisplaySize(1280,720);

        //pony
        this.pony = this.physics.add.sprite(640,580, 'pony').setScale(0.7);
        this.pony.setCollideWorldBounds(true);
        this.pony.body.setAllowGravity(false);
        this.isBouncing = false;
        this.isShooting = false;
        //idle pony
        this.idleTween = this.tweens.add({
            targets: this.pony,
            scaleY: 0.72,
            duration: 400,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1
        });
        
        //Collision
        this.bullets = this.add.group();
        this.enemies = this.add.group();
        this.poops = this.add.group();

        this.physics.add.overlap(this.bullets, this.enemies, this.hitCallBack, null, this);
        this.physics.add.overlap(this.poops, this.pony, this.takeDamage, null, this);

        //UI - cursor 
        this.cursor = this.input.keyboard.createCursorKeys();
        this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze.png") 0 0, auto');

        this.input.on('pointerdown', (pointer) => { this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze-click.png") 0 0, auto');
            console.log(`X: ${pointer.x}, Y: ${pointer.y}`);
         });
        this.input.on('pointerup', () => { this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze.png") 0 0, auto'); });

        //UI - health
        this.ponyHealth = 6;
        this.hearts = [];

        this.textures.get('heart').setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.textures.get('empty').setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.textures.get('half').setFilter(Phaser.Textures.FilterMode.NEAREST);

        for (var i = 0; i < 3; i++) {
            const heart = this.add.image(40 + (i * 50),40, 'heart').setScale(3,3);
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
        
        //Waves
        this.spawnWave();

    }

    spawnWave() {

        this.wavePending = true;

        for (let i = 0; i < 6; i++) {
            for(let j = 0; j < 2; j++) {
                const delay = (j * 6 + i) * 150;
                this.time.delayedCall(delay, () => {
                    this.zebra = new Enemy(this, 150 + (i*200), 170 + (j * 150), 'zebra', 3, 0.75,[0x857e7e, 0x414040], null);
                    this.enemies.add(this.zebra);

                    if(i == 5 && j == 1) {
                        for (const enemy of this.enemies.getChildren()) {
                            enemy.startMovement();
                        }
                    }
                    this.wavePending = false;
                });

            }
        }


    }

    hitCallBack(bullet, enemy) {
        enemy.takeHit();
        bullet.destroy();
        enemy.health -= 1;
        console.log(enemy.health);
        if(enemy.health <= 0) {
            enemy.explode();
            //console.log("why");
            this.score += 40;
        }
        this.score += 10;
        this.scoreText.setText(String(this.score).padStart(5, '0'));
    }

    takeDamage(poop) {
        console.log("detected");
        poop.destroy();
        this.ponyHealth -= 1;
        const textures = ['empty', 'half', 'heart'];

        for(var i = 0; i < this.hearts.length; i++) {
            const points = this.ponyHealth - i * 2

            if(points >= 2) {
                this.hearts[i].setTexture('heart');
            } else if (points == 1) {
                this.hearts[i].setTexture('half');
            } else {
                this.hearts[i].setTexture('empty');
            }
        }
        this.pony.setTint(0xffbbbb);
        this.idleTween.pause();
        this.tweens.add({
                targets: this.pony,
                scaleX: 0.72,
                scaleY: 0.78,
                duration: 100,
                ease: 'Sine.easeOut',
                yoyo: true,
                onComplete: () => {
                    this.idleTween.resume();
                }
            });
        this.time.delayedCall(300, () => {this.pony.clearTint()});
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
                //spawn bullet using new 
                this.bullet = new Bullet(this, this.pony.x, this.pony.y-40);
                this.bullets.add(this.bullet);
                if(!this.isShooting) {
                    this.isShooting = true;
                    this.tweens.add({
                        targets: this.pony,
                        scaleX: 0.92,
                        scaleY: 0.50,
                        duration: 80,
                        ease: 'Sine.easeOut',
                        yoyo: true,
                        onComplete: () => {
                            this.isShooting = false;
                        }
                    });
                }

                
            }
        }

        if (this.pony.body.blocked.left && !this.isBouncing) {
            this.isBouncing = true;
            this.pony.setVelocityX(0);
            this.pony.setVelocityX(250)
            this.tweens.add({
            targets: this.pony,
            scaleX: 0.5,
            scaleY: 0.80,
            duration: 150,
            ease: 'Back.easeOut',
            onComplete: () => {
                this.tweens.add({
                    targets: this.pony,
                    scaleX: 0.7,
                    scaleY: 0.7,
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
            this.pony.setVelocityX(-250)
            this.tweens.add({
            targets: this.pony,
            scaleX: 0.5,
            scaleY: 0.80,
            duration: 150,
            ease: 'Back.easeOut',
            onComplete: () => {
                this.tweens.add({
                    targets: this.pony,
                    scaleX: 0.7,
                    scaleY: 0.7,
                    duration: 100,
                    ease: 'Sine.easeOut',
                    onComplete: () => {
                        this.isBouncing = false;
                    }
                    })
                }
            });
        }

        if(this.enemies.getLength() == 0 && !this.wavePending) {
            this.wavePending = true;
            this.time.delayedCall(2000, () => {
                this.spawnWave();
            });
        }

        if (this.ponyHealth <= 0) {
            this.scene.start('GameOver');
        }
    }
    
}
