const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let coins;
let cursors;
let score = 0;
let scoreText;

function preload() {
    // No assets to preload
}

function create() {
    player = this.add.rectangle(400, 300, 50, 50, 0x00ff00);
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);

    coins = this.physics.add.group({
        key: 'coin',
        repeat: 10,
        setXY: { x: 12, y: 12, stepX: 70 }
    });

    coins.children.iterate(function (child) {
        child.setTint(0xffd700);
        child.body.setSize(20, 20);
    });

    this.physics.add.overlap(player, coins, collectCoin, null, this);

    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
}

function update() {
    player.body.setVelocity(0);

    if (cursors.left.isDown) {
        player.body.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(160);
    }

    if (cursors.up.isDown) {
        player.body.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        player.body.setVelocityY(160);
    }
}

function collectCoin(player, coin) {
    coin.destroy();

    score += 10;
    scoreText.setText('Score: ' + score);
}
