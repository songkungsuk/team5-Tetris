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
let overlap_y = 0; // 블럭이 겹쳤을때 반환하는값 그래야지 블럭을 한번에 내림
let controll_y = 0; // 높이가 높은 블럭을 내렸을때 맨밑바닥인경우 조절해줌
let blocklocationArray = [];
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

function drawBlocks() { //배열이 ture인지 false인지 확인하여 블록의 유무정함
    for (let x = 0; x < widthBlockCount; x++) {
        for (let y = 0; y < heightBlockCount; y++) {
            if (tetrisBoard[x][y]) { //내가 움직이는것
                context.fillStyle = "yellow";
            } else if (stackedBoard[x][y]) { //쌓인블록
                context.fillStyle = "#c3c3c3";
            } else {
                context.fillStyle = "black";
            }
            context.fillRect(
                borderWidth * x + blocksize * x,
                borderWidth * y + blocksize * y,
                blocksize,
                blocksize
            );
        }
    }
}


//--------------여기가 테트리스 실행부 나중에 main.js로 뺄예정
document.addEventListener("keydown", handleKeyPress);
let randomBlock = chooseBlock(blockIndex); //function.js에서 블럭랜덤으로 선택
const test = setInterval(function () {
    tetrisBoardArray(); //배열초기화
    initCanvas(); //배경덮어씀
    rotate_num = Math.abs(rotate) % 4 //블록회전시키는것 0~3값만나옵니다
    blocklocationArray = [];
    // 블럭을 그릴때마다 체크해야함 블럭이 겹치는지 안겹치는지 - 블럭한개가 닿앗을때
    for (let i = 0; i < randomBlock[0].length; i++) {
        let x = randomBlock[rotate_num][i][0] + move_x; // x 좌표
        let y = randomBlock[rotate_num][i][1] + move_y; // y 좌표
        drawBlock(x, y);
        blocklocationArray.push(y-move_y);
        console.log(blocklocationArray);
        if (stackedBoard[x][y] == tetrisBoard[x][y]) {
            for (let i = 0; i < randomBlock[0].length; i++) {
                let x = randomBlock[rotate_num][i][0] + move_x; // x 좌표
                let y = randomBlock[rotate_num][i][1] + move_y; // y 좌표
                stackedBoard[x][y-1] = true;
            }    
            randomBlock = chooseBlock(nextBlockGenerator.getNextBlock());
            move_y = 0;
        }
        
    }

    
    //-----------------------------------------------------
    drawBlocks(); //이게 쌓인블록과 내가 조종할 블록을 그려주는 함수
    //-----------------------------------------------------

    // 맨밑으로 갔을때
    if (move_y == heightBlockCount - (controll_y+1)) { //블럭의 높낮이에 따라서 블럭을올려주거나 낮춰줌 controll_y 값이 달라짐
        for (let i = 0; i < randomBlock[0].length; i++) {
            let x = randomBlock[rotate_num][i][0] + move_x; // x 좌표
            let y = randomBlock[rotate_num][i][1] + move_y; // y 좌표
            stackedBoard[x][y] = true;
        }
        move_y = 0;
        randomBlock = chooseBlock(nextBlockGenerator.getNextBlock());
    }
    move_y++; //블럭내림
    tetrisBoard.length = 0; //배열초기화
    
}, 100);

