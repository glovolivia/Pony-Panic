import { setupButton } from "./helpers/setupButton.js";
import { Enemy } from "../gameObjects/enemy.js";

export class Debug extends Phaser.Scene {
    constructor() {
        super('Debug');
    }

    
    preload() {
            //Background
            this.load.image('background', 'assets/Backgrounds/Untitled design (2).png');
            this.load.image('zebra', 'assets/Animals/panda.png');
    
            this.load.json('waveTypes', 'Data/waveTypes.json');
            this.load.json('enemies', 'Data/enemies.json');
    }
    
    create() {
        //load background
        this.background = this.add.sprite(640, 360, 'background').setDisplaySize(1280,720);

        this.enemiesData = this.cache.json.get('enemies')
        this.waveData = this.cache.json.get('waveTypes');

        this.input.on('pointerdown', (pointer) => { this.input.setDefaultCursor('url("assets/UI Elements/cursorGauntlet_bronze-click.png") 0 0, auto');
            console.log(`X: ${pointer.x}, Y: ${pointer.y}`);
         });

        this.enemies = this.add.group();
        this.poops = this.add.group();

        var i_other = 1;
        const startX = 640 - ((4 - 1) * 180) / 2;
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(3, 0xff00ff, 1);
        this.graphics.setDepth(100);
        //this.graphics.lineBetween(0, 200, 1280, 200);
        
        for (let i = 0; i < 2; i++) {
            const x = i === 0 ? Math.ceil(4/2) : Math.floor(4/2);
            const startX = 640 - ((x - 1) * 200) / 2;

            for(let j = 0; j < x; j++) {
                if ( i == 1) {
                    const delay = 0
                    this.time.delayedCall(delay, () => {

                        this.animal = new Enemy(this, startX + (j*200), 170 + (i * 150),  'zebra', 1, 0.75, [8748670, 4276288], [1000, 7000], 'birdPath');
                        this.enemies.add(this.animal);

                        if(j == x-1 && i == 1) {
                            for (const enemy of this.enemies.getChildren()) {
                                enemy.startMovement();
                                }
                            }

                        });
                    } else {
                        const delay = 0;
                        this.time.delayedCall(delay, () => {
                            this.animal = new Enemy(this, startX + (j*200), 170 + (i * 150), 'zebra', 1, 0.75, [8748670, 4276288], [1000, 7000], 'birdPath');
                            this.enemies.add(this.animal);
                        });
                    }
                }
            }
        }

        //this.animal = new Enemy(this, startX + (j*200), 170 + (i * 150),  'zebra', 1, 0.75, [8748670, 4276288], [1000, 7000], 'staggeredPath');
        //this.enemies.add(this.animal);
}
