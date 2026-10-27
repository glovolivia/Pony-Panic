export function setupButton(scene, buttonImageTXT, buttonText, x, y, scale, normalTXT, pressedTXT, onClick) {
        const button = scene.add.image(x,y, normalTXT).setScale(scale);
        const buttonY = button.y;
        let overlay;

        if (buttonImageTXT) {
            overlay = scene.add.image(button.x, button.y - 3, buttonImageTXT);
            scene.textures.get(buttonImageTXT).setFilter(Phaser.Textures.FilterMode.NEAREST);
        } else if (buttonText) {
            overlay = scene.add.text(button.x, button.y - 2, buttonText, { fontSize: '64px', fill: '#FFF', align: "center", stroke: "#070706d9", strokeThickness: 3 }).setOrigin(0.5);
        }

        const overlayY = overlay.y;

        button.setInteractive({cursor: 'url("assets/UI Elements/cursorGauntlet_bronze.png") 0 0, auto'});

        button.on('pointerout', () => {
            button.setTexture(normalTXT);
            overlay.y = overlayY;
        });

        button.on('pointerover', () => {
            button.setTexture(pressedTXT);
            overlay.y = overlayY + 3;
        });

        button.on('pointerdown', () => {
            button.setTexture(pressedTXT);
        });

        button.on('pointerup', () => {
            button.setTexture(normalTXT);
            if(scene.scene.key == "Menu") {
                scene.scene.stop('Start');
            }
            if(onClick == "Start") {
                scene.scene.stop('Start');
                scene.scene.start('Start', {isDemo: false});
            }
            scene.scene.start(onClick);
        });

        return [button, overlay];
}