
import { Poop } from "./poop.js";
import { Enemy } from "./enemy.js";

export class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureBoss, textureHelpers, health, scale, particleTint, poopRate, path=null) {
        super(scene, x, y, textureBoss);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setAllowGravity(false);
        this.setScale(scale);

        this.textureHelpers = textureHelpers;
        this.health = health;
        this.path = path;
        this.particleTint = particleTint;
        this.poopRate = poopRate;
        this.helpersSpawned = false;
        this.setAlpha(0);

        this.appearTween = scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 900,
            ease: 'Back.easeOut',
        });

        this.healthHalf = health / 2;
        this.pooping();

    }

     spawnHelpers() {
        for (let i = 0; i < 4; i++) {
            const angle = i * Math.PI / 2;
            const x = this.x + Math.cos(angle) * 150;
            const y = this.y + Math.sin(angle) * 150;

            this.Helper = new Enemy(this.scene, x, y, this.textureHelpers, 5, 0.5, [0x4B3C36, 0x392B23, 0xE8D9C9], [500, 3000], 'birdPath');
            this.scene.enemies.add(this.Helper);
            this.Helper.startMovement();
        }
    }

    pooping() {
        
        this.poopTimer = this.scene.time.delayedCall((Phaser.Math.Between(this.poopRate[0], this.poopRate[1])), () => {
            if(this.scene.gameEnd) return;

            if(this.healthHalf < this.health) {
                for(let i = 0; i < 3; i++) {
                    const poop = new Poop(this.scene, this.x+i*50, this.y + 50)
                    this.scene.poops.add(poop);
                }
            } else {
                for(let i = 0; i < 5; i++) {
                    const poop = new Poop(this.scene, this.x+i*50, this.y + 50)
                    this.scene.poops.add(poop);
                }
            }
            this.pooping();
        });
    }

    takeHit() {
        if (this.health - 1 <= this.healthHalf && !this.helpersSpawned) {
            this.helpersSpawned = true;
            this.spawnHelpers();
        } else if (this.health - 1 <= this.healthHalf / 2 && !this.helpersSpawned) {
            this.helpersSpawned = true;
            this.spawnHelpers();
        }



        if(this.idleTween) {
            this.idleTween.stop();
        }
        if(this.idleTweenNull) {
            this.idleTweenNull.stop();
        }
        this.scene.tweens.add({
            targets: this,
            scaleX: this.scale + 0.02,
            scaleY: this.scale + 0.02,
            ease: 'Back.easeOut',
            duration: 250,
            yoyo: false,
            onComplete: () => {
                if (!this.scene || !this.active) return;
                this.scene.tweens.add({
                targets: this,
                scaleY: this.scale + 0.00001,
                duration: 400,
                ease: 'Sine.easeInOut',
                yoyo: true,
            });
            }
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
        this.scene.tweens.killTweensOff(this);
        this.destroy();
    }

    startMovement() {
        const scale = this.scale;

        if(this.path == null) {
            this.idleTweenNull = this.scene.tweens.add({
            targets: this,
            scaleY: scale + 0.05,
            duration: 400,
            ease: 'Sine.easeInOut',
            yoyo: true,
        });
            this.scene.tweens.add({
                targets: this,
                x: this.x - 50,
                duration: 800,
                ease: 'Sine.easeInOut',
                yoyo: true,
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
