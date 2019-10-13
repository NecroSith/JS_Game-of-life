const FIELD_WIDTH = 200,
    FIELD_HEIGHT = 200,
    CELL_SIZE = 10,
    BACKGROUND_COLOR = 'gray',
    CELL_COLOR = 'black',
    GENERATION_TIME = 100;

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

const lifegame = new LifeGame(FIELD_WIDTH, FIELD_HEIGHT);

console.log(lifegame);


const start = () => {
    canvas.width = FIELD_WIDTH * CELL_SIZE;
    canvas.height = FIELD_HEIGHT * CELL_SIZE;

    lifegame.reviveRandomCells(FIELD_HEIGHT * FIELD_WIDTH / 2);

    requestAnimationFrame(tick);
}

const tick = (timestamp) => {
    clearCanvas();

    if (timestamp > lifegame.generationNumber * GENERATION_TIME) {
        lifegame.changeGeneration();
    }

    lifegame.forFreeEach((x, y) => {
        drawField(x, y, CELL_COLOR);
    });

    requestAnimationFrame(tick);
}

const clearCanvas = () => {
    context.fillStyle = BACKGROUND_COLOR;
    context.beginPath()
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill();
}

const drawField = (x, y, color) => {
    context.fillStyle = color;
    context.beginPath()
    context.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    context.fill();
}

start();