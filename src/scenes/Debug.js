import { setupButton } from "./helpers/setupButton.js";

export class Debug extends Phaser.Scene {
    constructor() {
        super('Debug');
    }

    
    preload() {
            //Background
            this.load.image('background', 'assets/Backgrounds/Untitled design (2).png');
            this.load.image('zebra', 'assets/Animals/panda.png');
    
    }
    
    create() {
        //load background
        this.background = this.add.sprite(640, 360, 'background').setDisplaySize(1280,720);
  
        var q = 11/2

        for (let i = 0; i < 2; i++) {
            const x = i === 0 ? Math.ceil(q) : Math.floor(q);

            for(let j = 0; j < x; j++) {
                if ( i == 1) {
                    this.add.image(250 + (j*200), 170 + (i * 150), 'zebra');
                } else {
                    this.add.image(150 + (j*200), 170 + (i * 150), 'zebra');
                }
            }
        }
    }
    
}
