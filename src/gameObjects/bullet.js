export class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.3);

        this.body.setVelocityY(-300);
        this.body.setCollideWorldBounds(false);

        if (this.y < 0) {
            this.destroy();
            console.log("destroyed bullet");
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y < 0) {
            this.destroy();
            console.log("destroyed bullet");
        }
    }
}