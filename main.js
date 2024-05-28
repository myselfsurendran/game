const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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
let ball;
let ground;
let cursors;
let score = 0;
let scoreText;

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('bat', 'assets/bat.png');
}

function create() {
    this.add.image(400, 300, 'sky');

    ground = this.physics.add.staticGroup();
    ground.create(400, 568, 'ground').setScale(2).refreshBody();

    player = this.physics.add.sprite(100, 450, 'bat').setScale(0.5);
    player.setCollideWorldBounds(true);

    ball = this.physics.add.image(400, 50, 'ball').setScale(0.5);
    ball.setBounce(1);
    ball.setCollideWorldBounds(true);
    ball.setVelocity(Phaser.Math.Between(-200, 200), 20);

    this.physics.add.collider(ball, ground);
    this.physics.add.collider(player, ball, hitBall, null, this);

    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
}

function update() {
    player.setVelocityX(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function hitBall(player, ball) {
    ball.setVelocityY(Phaser.Math.Between(-400, -300));
    ball.setVelocityX(Phaser.Math.Between(-200, 200));

    score += 1;
    scoreText.setText('Score: ' + score);
}
