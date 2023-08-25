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
        }
    }
}

function drawBlock(x, y) { //원하는 블럭에 색칠하기
    tetrisBoard[x][y] = true;
}
function drawBlocks() { //배열이 ture인지 false인지 확인하여 그레이와 블랙유무정함
    for (let x = 0; x < widthBlockCount; x++) {
        for (let y = 0; y < heightBlockCount; y++) {
            if (tetrisBoard[x][y]) {
                context.fillStyle = "yellow";
            } else {
                context.fillStyle = "black";
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

//--------------여기가 테트리스 실행부 나중에 main.js로 뺄예정
document.addEventListener("keydown", handleKeyPress);
let randomBlock = chooseBlock(blockIndex); //function.js에서 블럭랜덤으로 선택
const test = setInterval(function(){
    tetrisBoardArray(); //배열초기화
    initCanvas(); //배경덮어씀
    rotate_num = Math.abs(rotate) % 4
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