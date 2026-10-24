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

        if (this.body.blocked.down) {
            this.destroy();
            console.log("poop puff");
        }
    }
}