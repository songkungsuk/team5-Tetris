// Canvas 요소와 2D 그리기 컨텍스트를 설정
const canvas = document.getElementById("tetrisCanvas");
const context = canvas.getContext("2d");

// 각 셀의 크기와 행, 열의 개수를 정의합니다.
const cellSize = 40; // 각 블록이 차지하는 픽셀 크기
const rows = 20; // 게임 보드의 행 수
const cols = 10; // 게임 보드의 열 수

// 현재 점수를 나타내는 변수입니다.
let score = 0;

// Tetris 블록의 모양과 색상을 정의하는 배열
const tetrisBlocks = [
    { color: "#FFD700", shape: [[1, 1, 1, 1]] }, // I 블록
    { color: "#FF4500", shape: [[1, 1, 1], [0, 0, 1]] }, // L 블록
    // 다른 블록 형태도 추가 가능
];

// 현재 Tetris 블록의 상태와 위치를 저장하는 객체
let currentBlock = {
    x: 0, // 현재 블록의 x 좌표
    y: 0, // 현재 블록의 y 좌표
    shape: tetrisBlocks[0].shape, // 현재 블록의 모양
    color: tetrisBlocks[0].color // 현재 블록의 색상
};

// 주어진 위치(x, y)와 색상으로 셀을 그리는 함수
function drawCell(x, y, color) {
    context.fillStyle = color; // 사용할 색상 설정
    context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize); // 색칠된 사각형 그리기
    context.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize); // 사각형 테두리 그리기
}

// 게임 보드를 그리는 함수입니다.
function drawBoard() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            drawCell(x, y, "#f0f0f0"); // 회색 배경의 셀을 그림
        }
    }
}

// 현재 블록을 그리는 함수입니다.
function drawBlock() {
    const { shape, x, y, color } = currentBlock;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                drawCell(x + col, y + row, color); // 블록의 모양과 색상으로 셀을 그림
            }
        }
    }
}

// 블록을 왼쪽으로 이동시키는 함수
function moveBlockLeft() {
    currentBlock.x--;
}

// 블록을 오른쪽으로 이동시키는 함수
function moveBlockRight() {
    currentBlock.x++;
}

// 블록을 아래로 이동시키는 함수
function moveBlockDown() {
    currentBlock.y++;
}

// 블록을 회전시키는 함수
function rotateBlock() {
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

// 키 입력을 처리하는 함수입니다.
function handleKeyPress(event) {
    switch (event.keyCode) {
        case 37: // 왼쪽 화살표
            moveBlockLeft();
            break;
        case 39: // 오른쪽 화살표
            moveBlockRight();
            break;
        case 40: // 아래 화살표
            moveBlockDown();
            break;
        case 38: // 위 화살표
        case 90: // 'z' 키
        case 67: // 'c' 키
            rotateBlock();
            break;
        case 16: // Shift 키
            // 블록 저장 기능 추가 가능
            break;
        case 32: // 스페이스 바
            // 블록을 한 번에 아래로 내리는 기능 추가 가능
            break;
    }
}

// 키 입력 이벤트를 감지하여 처리하는 리스너를 등록
document.addEventListener("keydown", handleKeyPress);

// 게임 루프 함수입니다.
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 지웁
    drawBoard(); // 게임 보드를 그립니다.
    drawBlock(); // 현재 블록을 그립니다.
    requestAnimationFrame(gameLoop); // 다음 프레임을 요청하여 게임 루프를 유지
}

// 게임 루프를 시작합니다.
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