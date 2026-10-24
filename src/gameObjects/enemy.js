
export class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, health, scale, particleTint, path=null) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setAllowGravity(false);
        this.setScale(scale);

        this.health = health;
        this.path = path;
        this.particleTint = particleTint;

        if(path == null) {
            this.idleTween = scene.tweens.add({
            targets: this,
            scaleY: scale + 0.05,
            y: this.y - 20,
            duration: 400,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
            scene.tweens.add({
                targets: this,
                x: this.x - 50,
                duration: 800,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
        }
    }

    takeHit() {
        this.idleTween.stop();
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
        
        this.destroy();
    }
}