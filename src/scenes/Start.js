import { Bullet } from "../gameObjects/bullet.js";
import { Enemy } from "../gameObjects/enemy.js";
import { Poop } from "../gameObjects/poop.js";

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    init(data) {
        this.isDemo = data.isDemo === true;
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

        //Enemy related 
        this.load.json('enemies', 'Data/enemies.json');
        this.load.json('waveTypes', 'Data/waveTypes.json');
        //Zebra
        this.load.image('zebra', 'assets/Animals/zebra.png');
        //Chicken and chick
        this.load.image('chicken', 'assets/Animals/chicken.png');
        this.load.image('chick', 'assets/Animals/chick.png');
        //pig
        this.load.image('pig', 'assets/Animals/pig.png');
        //cow
        this.load.image('cow', 'assets/Animals/cow.png');
        //goat
        this.load.image('goat', 'assets/Animals/goat.png');
        //duck
        this.load.image('duck', 'assets/Animals/duck.png');
        //buffalo
        this.load.image('buffalo', 'assets/Animals/buffalo.png');
        //monkey
        this.load.image('monkey', 'assets/Animals/monkey.png');
        //moose
        this.load.image("moose", 'assets/Animals/moose.png');
        //giraffe
        this.load.image('giraffe', 'assets/Animals/giraffe.png');
        //hippo
        this.load.image('hippo', 'assets/Animals/hippo.png');
        //panda
        this.load.image('panda', 'assets/Animals/panda.png');
        //penguin
        this.load.image('penguin', 'assets/Animals/penguin.png');
        //rabbit
        this.load.image('rabbit', 'assets/Animals/rabbit.png');
        //rhino
        this.load.image('rhino', 'assets/Animals/rhino.png');
        //sloth
        this.load.image('sloth', 'assets/Animals/sloth.png');
        //walrus
        this.load.image('walrus', 'assets/Animals/walrus.png');
        //parrot
        this.load.image('parrot', 'assets/Animals/parrot.png');
        //explosion
        this.load.image('crumb', 'assets/UI Elements/buttonRound_grey.png');

        //Boss fight 
        this.load.image('Luigi', 'assets/Animals/Luigi_original_transparent.png');
        this.load.image('Helpers', 'assets/Animals/Luigi.png');


        //Poop related
        this.load.image('poop', 'assets/UI Elements/meteorBrown_big1.png');
        //splashes
        this.load.image('splash1', 'assets/PoopSplashes/splat00.png');
        this.load.image('splash2', 'assets/PoopSplashes/splat01.png');
        this.load.image('splash3', 'assets/PoopSplashes/splat29.png');
        this.load.image('splash4', 'assets/PoopSplashes/splat18.png');
        this.load.image('splash5', 'assets/PoopSplashes/splat20.png');
        
        
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

        this.gameEnd = false;
        this.takingDamage = false;

        //demo settings

        if(this.isDemo) {
            this.input.enabled = false;
            this.cameras.main.setViewport(200, 287.5, 480, 305);
            this.cameras.main.setZoom(305 / 720);
            this.cameras.main.centerOn(640, 360);

            this.demoDirection = 1;

            this.time.addEvent({
                delay: 1000,
                loop: true,
                callback: () => {
                    const bullet = new Bullet(this, this.pony.x, this.pony.y-40);
                    this.bullets.add(bullet);
                }
            });

        } else {
            this.input.enabled = true;
            this.cameras.main.setViewport(0, 0, 1280, 720);
            this.cameras.main.setZoom(1);
            this.cameras.main.centerOn(640, 360);
        }

        //Waves
        //import from json
        this.enemiesData = this.cache.json.get('enemies')
        this.waveData = this.cache.json.get('waveTypes');
        this.waveCount = 0;

        this.spawnWave();
    }

    spawnBoss() {
        this.spawnWave(); //for debug
    }

    spawnWave() {

        this.wavePending = true;

        if(this.waveCount == 0) {
            for (let i = 0; i < 6; i++) {
                for(let j = 0; j < 2; j++) {
                    const delay = (j * 6 + i) * 150;
                    this.time.delayedCall(delay, () => {
                        this.zebra = new Enemy(this, 150 + (i*200), 170 + (j * 150), this.enemiesData.zebra.texture, this.enemiesData.zebra.health, this.enemiesData.zebra.scale,this.enemiesData.zebra.particleTint, this.enemiesData.zebra.poopRate, this.enemiesData.zebra.path);
                        this.enemies.add(this.zebra);

                        if(i == 5 && j == 1) {
                            for (const enemy of this.enemies.getChildren()) {
                                enemy.startMovement();
                                this.wavePending = false;
                            }
                        }
                    });

                }
            }
            this.waveCount = 1;
        } else {
            const animalNames = Object.keys(this.enemiesData);
            const randomAnimal = Phaser.Utils.Array.GetRandom(animalNames);
            const waveNames = Object.keys(this.waveData);
            let currentFormation;
            let currentEntityCount;
            let waveName = 'chickWave';

            for(const name of waveNames) {
                const wave = this.waveData[name];
                waveName = name;

                if(wave.animals.includes(randomAnimal)) {
                    currentFormation = wave.formation;
                    currentEntityCount = wave.entityCount;
                    console.log(currentFormation, wave.entityCount);
                    break;
                }
            }

            if(currentFormation == 'grid') {
                const startX = 640 - ((currentEntityCount / 2 - 1) * 200) / 2;
                for (let i = 0; i < currentEntityCount/2; i++) {
                    for(let j = 0; j < 2; j++) {
                        const delay = (j * currentEntityCount/2 + i) * 150;
                        this.time.delayedCall(delay, () => {
                            const currentAnimal = this.enemiesData[randomAnimal];
                            this.animal = new Enemy(this, startX + (i*220), 170 + (j * 150), currentAnimal.texture, currentAnimal.health, currentAnimal.scale, currentAnimal.particleTint, currentAnimal.poopRate, currentAnimal.path);
                            this.enemies.add(this.animal);

                            if(i == currentEntityCount/2-1 && j == 1) {
                                for (const enemy of this.enemies.getChildren()) {
                                    enemy.startMovement();
                                    this.wavePending = false;
                                }
                            }
                        });
                    }
                }
            } else if (currentFormation == 'V') {
                var i_other = 1;
                const startX = 640 - ((currentEntityCount - 1) * 180) / 2;

                for (let i = 0; i < currentEntityCount; i++) {
                    const delay = (currentEntityCount/2 + i) * 150;
                    if(i < Math.floor(currentEntityCount / 2 + 1)) { 
                        this.time.delayedCall(delay, () => {
                            const currentAnimal = this.enemiesData[randomAnimal];
                            this.animal = new Enemy(this, startX + (i*180), 150 + (i * 50), currentAnimal.texture, currentAnimal.health, currentAnimal.scale, currentAnimal.particleTint, currentAnimal.poopRate, currentAnimal.path);
                            this.enemies.add(this.animal);
                        });
                    } else if (i >= Math.floor(currentEntityCount / 2)) {
                        this.time.delayedCall(delay, () => {
                            const currentAnimal = this.enemiesData[randomAnimal];
                            this.animal = new Enemy(this, startX + (i*180), 300 - (i_other * 50), currentAnimal.texture, currentAnimal.health, currentAnimal.scale, currentAnimal.particleTint, currentAnimal.poopRate, currentAnimal.path);
                            this.enemies.add(this.animal);
                            i_other++;

                        if(i == currentEntityCount - 1) {
                            for (const enemy of this.enemies.getChildren()) {
                                enemy.startMovement();
                                this.wavePending = false;
                            }
                        }
                        });
                    }
                }
            } else if (currentFormation == 'staggered') {

                for (let i = 0; i < 2; i++) {
                const x = i === 0 ? Math.ceil(currentEntityCount/2) : Math.floor(currentEntityCount/2);
                const startX = 640 - ((x - 1) * 200) / 2;
                let currentAnimal;

                    for(let j = 0; j < x; j++) {
                        if ( i == 1) {
                            const delay = (i*currentEntityCount/2+j) * 150;
                            this.time.delayedCall(delay, () => {
                                if (waveName == "chickWave") {
                                    const chickenChick = Phaser.Utils.Array.GetRandom(["chicken", "chick"]);
                                    currentAnimal = this.enemiesData[chickenChick];
                                } else {
                                    currentAnimal = this.enemiesData[randomAnimal];
                                }
                                this.animal = new Enemy(this, startX + (j*200), 170 + (i * 150), currentAnimal.texture, currentAnimal.health, currentAnimal.scale, currentAnimal.particleTint, currentAnimal.poopRate, currentAnimal.path);
                                this.enemies.add(this.animal);

                                if(j == x-1 && i == 1) {
                                    for (const enemy of this.enemies.getChildren()) {
                                        enemy.startMovement();
                                        this.wavePending = false;
                                    }
                                }

                            });
                        } else {
                            
                            const delay = (i* currentEntityCount + j) * 150;
                            this.time.delayedCall(delay, () => {
                                if (waveName == "chickWave") {
                                    const chickenChick = Phaser.Utils.Array.GetRandom(["chicken", "chick"]);
                                    currentAnimal = this.enemiesData[chickenChick];
                                } else {
                                    currentAnimal = this.enemiesData[randomAnimal];
                                }
                                this.animal = new Enemy(this, startX + (j*200), 170 + (i * 150), currentAnimal.texture, currentAnimal.health, currentAnimal.scale, currentAnimal.particleTint, currentAnimal.poopRate, currentAnimal.path);
                                this.enemies.add(this.animal);

                            });
                        }
                    }
                }
            }
            this.waveCount++;
        }
    }

    hitCallBack(bullet, enemy) {
        enemy.takeHit();
        bullet.destroy();
        enemy.health -= 1;
        //console.log(enemy.health);
        if(enemy.health <= 0) {
            enemy.explode();
            //console.log("why");
            this.score += 40;
        }
        this.score += 10;
        this.scoreText.setText(String(this.score).padStart(5, '0'));
    }

    takeDamage(poop) {
        if(this.isDemo) {
            poop.destroy();
        } else {
            //console.log("detected");
            this.takingDamage = true;
            poop.destroy();
            this.ponyHealth -= 1;

            for(var i = 0; i < this.hearts.length; i++) {
                const points = this.ponyHealth - i * 2

                if(points >= 2) {
                    this.hearts[i].setTexture('heart');
                } else if (points == 1) {
                    this.hearts[i].setTexture('half');
                    this.add.tween({
                        targets: this.hearts[i],
                        scaleX: 3.6,
                        scaleY: 3.6, 
                        duration: 50,
                        ease: 'Sine.easeOut',
                        yoyo: true
                    });
                } else {
                    this.hearts[i].setTexture('empty');
                    this.add.tween({
                        targets: this.hearts[i],
                        scaleX: 3.6,
                        scaleY: 3.6, 
                        duration: 50,
                        ease: 'Sine.easeOut',
                        yoyo: true
                    });
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
            this.time.delayedCall(300, () => {this.pony.clearTint(), this.takingDamage = false;});
    }
    }

    update() {
        const speed = 500;

        if (this.gameEnd) return;

        //movement 
        if(this.isDemo) {
            if(this.pony.x <= 190) {
                this.demoDirection = 1;
            } else if (this.pony.x >= 1120) {
                this.demoDirection = -1;
            }
            this.pony.setVelocityX(speed * this.demoDirection);

        } else {

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
                if (Phaser.Input.Keyboard.JustDown(this.cursor.space) && !this.takingDamage) {
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
        }

        if(this.enemies.getLength() == 0 && !this.wavePending) {
            this.wavePending = true;
            this.time.delayedCall(2000, () => {
                if(this.waveCount != 0 && this.waveCount % 5 == 0) {
                    this.spawnBoss()
                } else {
                    this.spawnWave();
                }
            });
        }

        if (this.ponyHealth <= 0 && !this.gameEnd) {
            const highScore = Number(localStorage.getItem('highScore')) || 0;

            this.gameEnd = true;
            this.physics.pause();
            this.pony.setVelocity(0);

            if (this.score > highScore) {
                console.log(highScore);
                localStorage.setItem('highScore', this.score);
                this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.4);

                this.ui = this.add.container(640,400);

                this.highS = this.add.text(0, -65, 'NEW HIGH SCORE!',  { fontSize: '100px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4);
                this.ui.add(this.highS);
                this.ui.add(this.add.text(0,65, this.score,  { fontSize: '100px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5).setShadow(3, 3, '#667580', 4));
                this.tweens.chain({
                    targets: this.ui,
                    tweens: [
                        {
                            y: 360,
                            duration: 300,
                            ease: 'Sine.easeOut',
                            yoyo: false
                        },
                        {
                            scale: 1.2,
                            duration: 400,
                            ease: 'Back.easeOut',
                            yoyo: true,
                            repeat: 10,
                        }
                    ]
                });

                this.time.delayedCall(6000, () => {this.scene.start('GameOver')});
            } else {
                this.time.delayedCall(1000, () => {this.scene.start('GameOver')});
            }
        }
    }
    
}
