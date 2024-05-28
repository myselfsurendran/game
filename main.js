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

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    this.add.image(400, 300, 'sky');
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    const player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    const cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on('keydown_LEFT', () => {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    });

    this.input.keyboard.on('keydown_RIGHT', () => {
        player.setVelocityX(160);
        player.anims.play('right', true);
    });

    this.input.keyboard.on('keyup_LEFT', () => {
        if (cursors.right.isUp) {
            player.setVelocityX(0);
            player.anims.play('turn');
        }
    });

    this.input.keyboard.on('keyup_RIGHT', () => {
        if (cursors.left.isUp) {
            player.setVelocityX(0);
            player.anims.play('turn');
        }
    });
}

function update() {
    // Game logic updates
}