<<<<<<< HEAD
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
=======
const canvas = document.getElementById("tetrisCanvas");  //캔버스 객체 자체
const context = canvas.getContext("2d");//캔버스 그리는거 타입
const borderWidth = 1; //테트리스 블럭마다 띄우는정도
const blocksize = 15; //블럭사이즈
const widthBlockCount = 12; //가로 블럭수
const heightBlockCount = 29; // 세로 블럭수
canvas.width = widthBlockCount * (blocksize + borderWidth); //canvas 전체 가로
canvas.height = heightBlockCount * (blocksize + borderWidth);// canvas 전체 세로
let move_x = 4; //테트리스의 x좌표를 바꾸는것
let move_y = 0; //테트리스의 y좌표를 바꾸는것
let rotate = 0  //회전
let rotate_num = Math.abs(rotate) % 4; //테트리스 회전 숫자

// let score = 0; 얘는 나중에씀.


//블럭 테스트용------------------------------------------------이거 한눈에볼라고 일단 여기다 적어놨어요 나중에 정리할게요
function initCanvas() { // 배경 그리기
    context.fillStyle = "black";//캔버스 블럭 색깔 종류
    for (let x = 0; x < widthBlockCount; x++) { //가로세로 블럭수만큼 캔버스에 블럭그려넣기
        for (let y = 0; y < heightBlockCount; y++) {
            context.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );
>>>>>>> a356c5993710828de34460a7825bccf6a8ed1488
        }
    }
}

<<<<<<< HEAD
// 현재 블록을 그리는 함수입니다.
function drawBlock() {
    const { shape, x, y, color } = currentBlock;
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                drawCell(x + col, y + row, color); // 블록의 모양과 색상으로 셀을 그림
=======
function drawBlock(x, y) { //원하는 블럭에 색칠하기
    tetrisBoard[x][y] = true;
}
function drawBlocks() { //배열이 ture인지 false인지 확인하여 블록의 유무정함
    for (let x = 0; x < widthBlockCount; x++) {
        for (let y = 0; y < heightBlockCount; y++) {
            if (tetrisBoard[x][y]) {
                context.fillStyle = "yellow";
            } else {
                context.fillStyle = "black";
>>>>>>> a356c5993710828de34460a7825bccf6a8ed1488
            }
            context.fillRect(
                4 + borderWidth * x + blocksize * x,
                4 + borderWidth * y + blocksize * y,
                blocksize,
                blocksize
            );
        }
    }
}

<<<<<<< HEAD
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
=======
//--------------여기가 테트리스 실행부 나중에 main.js로 뺄예정
document.addEventListener("keydown", handleKeyPress);
let randomBlock = chooseBlock(blockIndex); //function.js에서 블럭랜덤으로 선택
const test = setInterval(function(){
    tetrisBoardArray(); //배열초기화
    initCanvas(); //배경덮어씀
    rotate_num = Math.abs(rotate) % 4 //블록회전시키는것
    for (let i = 0; i < randomBlock[0].length; i++) {
        let x = randomBlock[rotate_num][i][0] + move_x; // x 좌표
        let y = randomBlock[rotate_num][i][1] + move_y; // y 좌표
        drawBlock(x,y);
    }
    drawBlocks();
    tetrisBoard.length = 0; //배열초기화
    move_y++;
    if(move_y == heightBlockCount-1){
        move_y = 0;
        randomBlock = chooseBlock(nextBlockGenerator.getNextBlock());
    }
},50);
>>>>>>> a356c5993710828de34460a7825bccf6a8ed1488
