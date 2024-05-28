const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
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

let board;
let redPiece;
let bluePiece;
let diceRollText;
let currentTurn = 'red';
let diceValue = 0;

const redStartPosition = { x: 50, y: 700 };
const blueStartPosition = { x: 700, y: 50 };

function preload() {
    this.load.image('board', 'assets/board.png');
    this.load.image('piece-red', 'assets/piece-red.png');
    this.load.image('piece-blue', 'assets/piece-blue.png');
}

function create() {
    board = this.add.image(400, 400, 'board');

    redPiece = this.physics.add.sprite(redStartPosition.x, redStartPosition.y, 'piece-red').setInteractive();
    bluePiece = this.physics.add.sprite(blueStartPosition.x, blueStartPosition.y, 'piece-blue').setInteractive();

    diceRollText = this.add.text(650, 750, 'Roll Dice', { fontSize: '32px', fill: '#000' }).setInteractive();
    diceRollText.on('pointerdown', rollDice, this);

    this.input.on('gameobjectdown', movePiece, this);
}

function update() {
}

function rollDice() {
    diceValue = Phaser.Math.Between(1, 6);
    diceRollText.setText(`Dice: ${diceValue}`);
}

function movePiece(pointer, piece) {
    if ((currentTurn === 'red' && piece.texture.key === 'piece-red') ||
        (currentTurn === 'blue' && piece.texture.key === 'piece-blue')) {

        let newX = piece.x + (diceValue * 50);
        let newY = piece.y;

        if (newX > 750) {
            newX = 750;
            newY = piece.y - ((newX - piece.x) - diceValue * 50);
        }

        piece.setPosition(newX, newY);

        if (currentTurn === 'red') {
            currentTurn = 'blue';
        } else {
            currentTurn = 'red';
        }
    }
}
