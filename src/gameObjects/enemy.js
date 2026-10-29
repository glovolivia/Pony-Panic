import { Start } from "../scenes/Start.js";
import { Poop } from "./poop.js";

export class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, health, scale, particleTint, poopRate, path=null) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setAllowGravity(false);
        this.setScale(scale);

        this.health = health;
        this.path = path;
        this.particleTint = particleTint;
        this.poopRate = poopRate;
        this.setAlpha(0);

        this.appearTween = scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 900,
            ease: 'Back.easeOut',
        });

            this.pooping();
    }

    pooping() {
        
        this.poopTimer = this.scene.time.delayedCall((Phaser.Math.Between(this.poopRate[0], this.poopRate[1])), () => {
            if(this.scene.gameEnd) return;

            const poop = new Poop(this.scene, this.x, this.y + 50)
            this.scene.poops.add(poop);

            this.scene.tweens.add({
                targets: this,
                scaleX: this.scale - 0.05,
                scaleY: this.scale - 0.05,
                ease: 'Sine.easeOut',
                duration: 150,
                yoyo: true
            });

            this.pooping();
        });
    }

    takeHit() {
        if(this.idleTween) {
            this.idleTween.stop();
        }
        if(this.idleTweenNull) {
            this.idleTweenNull.stop();
        }
        this.scene.tweens.add({
            targets: this,
            scaleX: this.scale + 0.2,
            scaleY: this.scale + 0.2,
            ease: 'Back.easeOut',
            duration: 250,
            yoyo: false,
        });
        this.scene.tweens.add({
            targets: this,
            scaleY: this.scale + 0.00001,
            y: this.y - 5,
            duration: 400,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
    }

    explode() {

        for(var i = 0; i < 15; i++) {
            const crumb = this.scene.add.image(this.x,this.y,'crumb');
            crumb.setScale(0.25);
            crumb.setTint(Phaser.Utils.Array.GetRandom(this.particleTint));

            this.scene.tweens.add({
                targets: crumb,
                x: crumb.x + Phaser.Math.Between(-80,80),
                y: crumb.y - Phaser.Math.Between(-80,80),
                duration: 400,
                alpha: 0,
                onComplete: () => crumb.destroy()
            });
        }
        
        this.poopTimer.remove();
        this.destroy();
    }

    startMovement() {
        const scale = this.scale;

        if(this.path == null) {
            this.idleTweenNull = this.scene.tweens.add({
            targets: this,
            scaleY: scale + 0.05,
            y: this.y - 20,
            duration: 400,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
            this.scene.tweens.add({
                targets: this,
                x: this.x - 50,
                duration: 800,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
        } else if (this.path == "VPath") {
            const path = new Phaser.Curves.Path(this.x, this.y);
            const horizontalLine = 200;


            if (this.y > horizontalLine) {
                path.lineTo(this.x, this.y - 2*(this.y - horizontalLine));
            } else {
                path.lineTo(this.x, this.y - 2*(this.y - horizontalLine));
            }

            const progress = { t: 0 };

            this.scene.tweens.add({
                targets: progress,
                t: 1,
                duration: 2500,
                yoyo: true,
                ease: 'Sine.easeInOut',
                repeat: -1,
                hold: 2000,
                repeatDelay: 2000,
                onUpdate: () => {
                    const point = path.getPoint(progress.t);
                    this.setPosition(point.x, point.y);
                }
            });
            this.scene.tweens.add({
                targets: this,
                scaleY: scale + 0.05,
                duration: 400,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });

        } else if (this.path == "staggeredPath") {
            const path = new Phaser.Curves.Path(this.x, this.y);

            path.cubicBezierTo(this.x, this.y+150, this.x-60, this.y - 70, this.x-200, this.y + 40);
            path.cubicBezierTo(this.x, this.y, this.x+200, this.y + 40, this.x+60, this.y - 70);

            const progress = { t: 0 };

            this.scene.tweens.add({
                targets: progress,
                t: 1,
                duration: 5500,
                yoyo: true,
                ease: 'Sine.easeInOut',
                repeat: -1,
                hold: 2000,
                repeatDelay: 2000,
                onUpdate: () => {
                    const point = path.getPoint(progress.t);
                    this.setPosition(point.x, point.y);
                }
            });
            this.scene.tweens.add({
                targets: this,
                scaleY: scale + 0.05,
                duration: 400,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });


        } else if (this.path == "gridPath") {
            const path = new Phaser.Curves.Path(this.x, this.y);

            path.lineTo(this.x + 300, this.y);
            path.lineTo(this.x - 300, this.y);
            path.lineTo(this.x, this.y);

            const progress = { t: 0 };

            this.scene.tweens.add({
                targets: progress,
                t: 1,
                duration: 17500,
                yoyo: true,
                ease: 'Sine.easeInOut',
                repeat: -1,
                hold: 3500,
                repeatDelay: 3500,
                onUpdate: () => {
                    const point = path.getPoint(progress.t);
                    this.setPosition(point.x, point.y);
                }
            });
            this.scene.tweens.add({
                targets: this,
                scaleY: scale + 0.05,
                duration: 400,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });


        } else if (this.path == "birdPath") {
            const path = new Phaser.Curves.Path(this.x, this.y);

            const progress = { t: 0 };

            var count = 0;
            while (count < 3) {
                path.quadraticBezierTo(this.x + 350, this.y - 20, this.x + 200, this.y - 170);
                path.cubicBezierTo(this.x, this.y, this.x + 300, this.y + 180, this.x + 100, this.y + 160);
                
                path.quadraticBezierTo(this.x - 350, this.y - 20, this.x - 200, this.y - 170);
                path.cubicBezierTo(this.x, this.y, this.x - 300, this.y + 180, this.x - 100, this.y + 160);

                count++;
            }
            this.scene.tweens.add({
                targets: progress,
                t: 1,
                duration: 21000,
                yoyo: true,
                ease: 'Sine.easeInOut',
                repeat: -1,
                onUpdate: () => {
                    const point = path.getPoint(progress.t);
                    this.setPosition(point.x, point.y);
                }
            });
            this.scene.tweens.add({
                targets: this,
                scaleY: scale + 0.05,
                duration: 400,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });

            //debug
            if(this.scene.graphics) {
                path.draw(this.scene.graphics);
            }
        }
        else {
            this.idleTween = this.scene.tweens.add({
            targets: this,
            scaleY: scale + 0.05,
            duration: 400,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        }
    }


}