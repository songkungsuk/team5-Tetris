const canvas = document.getElementById("tetrisCanvas");
const context = canvas.getContext("2d");

const cellSize = 40;
const rows = 48;
const cols = 18;

canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

let score = 0;

// Tetris 블록의 형태와 색상을 나타내는 배열
const tetrisBlocks = [ //이거 알고가져온거맞죠 ?
    { color: "#FFD700", shape: [[1, 1, 1, 1]] }, // I 블록
    { color: "#FF4500", shape: [[1, 1, 1], [0, 0, 1]] }, // L 블록
    // 다른 블록 형태도 추가할 수 있음
];

// 현재 Tetris 블록의 상태와 위치를 나타내는 변수
let currentBlock = {
    x: 0,
    y: 0,
    shape: tetrisBlocks[0].shape,
    color: tetrisBlocks[0].color
};

function drawCell(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    context.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

function drawBoard() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            drawCell(x, y, "#f0f0f0");
        }
    }
}

function drawBlock() {
    const { shape, x, y, color } = currentBlock;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                drawCell(x + col, y + row, color);
            }
        }
    }
}

function moveBlockLeft() {
    currentBlock.x--;
}

function moveBlockRight() {
    currentBlock.x++;
}

function moveBlockDown() {
    currentBlock.y++;
}

function rotateBlock() { //readme.md 파일 안본게..느껴지는..
    const originalShape = currentBlock.shape;
    const rotatedShape = [];
    for (let col = 0; col < originalShape[0].length; col++) {
        const newRow = [];
        for (let row = originalShape.length - 1; row >= 0; row--) {
            newRow.push(originalShape[row][col]);
        }
        rotatedShape.push(newRow);
    }
    currentBlock.shape = rotatedShape;
}

function handleKeyPress(event) {  
    switch (event.keyCode) {
        case 37: // Left arrow
            moveBlockLeft();
            break;
        case 39: // Right arrow
            moveBlockRight();
            break;
        case 40: // Down arrow
            moveBlockDown();
            break;
        case 38: // Up arrow
            rotateBlock();
            break;
        case 90: // 'z' key
            rotateBlock();
            break;
        case 67: // 'c' key
            rotateBlock();
            break;
        case 16: // Shift key
            // 블록 저장 기능 추가
            break;
        case 32: // Space bar
            // 바로 떨어지게 하기 기능 추가
            break;
    }
}

document.addEventListener("keydown", handleKeyPress);

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawBlock();
    // 게임 루프 추가
    requestAnimationFrame(gameLoop);
}

gameLoop();



























// //블럭 테스트용------------------------------------------------
// function drawBlock(x, y) { //원하는 블럭에 색칠하기
//     context.fillStyle = "black";
//     context.fillRect(
//         4 + 4.05 * x + 15.8 * x,
//         4 + 4.05 * y + 15.8 * y,
//         15.8,
//         15.8
//     );
// }
// const selectedBlock = blocks.blcokTypeFive[0];

// for(let i=0; i<4; i++){
//     const x = selectedBlock[i][0]; // x 좌표
//     console.log(x);
//     const y = selectedBlock[i][1]; // y 좌표
//     console.log(y);
//     drawBlock(x,y);
// }