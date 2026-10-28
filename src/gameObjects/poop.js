export class Poop extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'poop');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.31)

        this.body.setVelocityY(370);
        this.body.setAllowGravity(true);
        this.body.setCollideWorldBounds(true);

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        //poop splash
        const splashes = ['splash1', 'splash2', 'splash3', 'splash4', 'splash5'];

        if (this.body.blocked.down) {
            const randomSplash = Phaser.Utils.Array.GetRandom(splashes);
            this.splash = this.scene.add.image(this.x + Phaser.Math.Between(-10,10), this.y + Phaser.Math.Between(-10,10),  randomSplash).setTint(0x8B5A2B).setAlpha(0.6).setScale(Phaser.Math.Between(0.5, 1.1));
            this.scene.tweens.add({
                targets: this.splash,
                alpha: 0,
                duration: 2000,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    this.splash.destroy();
                }
            });

            this.destroy();
            //console.log("poop puff");
        }
    }
}