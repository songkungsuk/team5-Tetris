//--------------------------------------블럭미리보여주는곳 -----------------------------------------------
const nextBlockCanvas = document.getElementById("block-container"); //블럭 미리보여줄것
const nextBlockContext = nextBlockCanvas.getContext("2d"); // //캔버스 그리는거 타입
const nextBoarderWidth = 1;
const nextBlocksize = 16;
const nextwidthBlockCount = 6;
const nextheightBlockCount = 20;
nextBlockCanvas.width = 100;
//-------------------------------------------------------------------------------------------------------

// -------------------------------------블럭떨어지는곳 --------------------------------------------------
const canvas = document.getElementById("tetrisCanvas"); //캔버스 객체 자체
const context = canvas.getContext("2d"); //캔버스 그리는거 타입
const borderWidth = 1; //테트리스 블럭마다 띄우는정도
const blocksize = 15; //블럭사이즈
const widthBlockCount = 12; //가로 블럭수
const heightBlockCount = 29; // 세로 블럭수
canvas.width = widthBlockCount * (blocksize + borderWidth); //canvas 전체 가로
canvas.height = heightBlockCount * (blocksize + borderWidth); // canvas 전체 세로
let move_x = 4; //테트리스의 x좌표를 바꾸는것
let move_y = 0; //테트리스의 y좌표를 바꾸는것
let rotate = 0; //회전
let rotate_num = Math.abs(rotate) % 4; //테트리스 회전 숫자
let overlap_y = 0; // 블럭이 겹쳤을때 반환하는값 그래야지 블럭을 한번에 내림
let controll_x = 0; // 오른쪽으로 빠져나가지 않게하는 변수
let controll_x_min = 2; // 왼쪽으로 빠져나가지 않게하는 변수
let controll_y = 0; // 높이가 높은 블럭을 내렸을때 맨밑바닥인경우 조절해줌
let blockLocationArray_x = []; //블럭의 x좌표 값들 저장하는배열
let blockLocationArray_y = []; //블럭의 y좌표 값들 저장하는배열
let countTrue = 0; // 테트리스 한줄이 전부 채워졋는지 확인하는 변수
let score = 0; //점수
//테스트용------------------------------------------------이거 한눈에볼라고 일단 여기다 적어놨어요 나중에 정리할게요

//--------------여기가 테트리스 실행부 나중에 main.js로 뺄예정
let isUpKeyPressed = false;
document.addEventListener("keydown", handleKeyPress);
// 위 방향키에서 손을 뗐을때 false로 바꿔서 정상 속도로 내려가게함
document.addEventListener("keyup", function (e) {
    isUpKeyPressed = false;
});
let randomBlock = chooseBlock(blockIndex[0]); //function.js에서 블럭랜덤으로 선택
const test = setInterval(function () {
    tetrisBoardArray(); //배열초기화
    initCanvas(); //배경덮어씀
    initNextBlockCanvas(); // 블럭미리보여주는곳 검은색으로 칠함
    showNextBlock(); // 다음블럭보여줌
    getBlockScore(); //블럭이 한줄이 채워져있는지 확인하기 채워졌으면 지움

    rotate_num = Math.abs(rotate) % 4; //블록회전시키는것 0~3값만나옵니다
    controll_x = 0; // 오른쪽으로 빠져나가지 않게하는 변수
    controll_y = 0; // 높이가 높은 블럭을 내렸을때 맨밑바닥인경우 조절해줌
    blockLocationArray_x = []; //블럭의 x좌표 값들 저장하는배열
    blockLocationArray_y = []; //블럭의 y좌표 값들 저장하는배열

    // 블럭을 그릴때마다 체크해야함 블럭이 겹치는지 안겹치는지 - 블럭한개가 닿앗을때
    for (let i = 0; i < randomBlock[0].length; i++) {
        let x = randomBlock[rotate_num][i][0] + move_x; // x 좌표
        let y = randomBlock[rotate_num][i][1] + move_y; // y 좌표
        drawBlock(x, y);
        blockLocationArray_x.push(x - move_x);
        blockLocationArray_y.push(y - move_y);
        if (stackedBoard[x][y] == tetrisBoard[x][y]) {
            for (let i = 0; i < randomBlock[0].length; i++) {
                let x = randomBlock[rotate_num][i][0] + move_x; // x 좌표
                let y = randomBlock[rotate_num][i][1] + move_y; // y 좌표
                stackedBoard[x][y - 1] = true; // 회색블럭으로 그리는것
            }
            getRandAndInitMoveY();
        }
    }

    //x와 y의 최대값 뽑는 것
    for (let num = 0; num < blockLocationArray_x.length; num++) {
        if (controll_x < blockLocationArray_x[num]) { //블록의 오른쪽 최대좌표
            controll_x = blockLocationArray_x[num];
        }
        if (controll_y < blockLocationArray_y[num]) { // 블록의 아래 최대 좌표
            controll_y = blockLocationArray_y[num];
        }
    }
    if (move_x > widthBlockCount - (controll_x + 1)) {
        move_x -= controll_x;
    }

    //-----------------------------------------------------
    drawBlocks(); //이게 쌓인블록과 내가 조종할 블록을 그려주는 함수
    //-----------------------------------------------------

    // 맨밑으로 갔을때
    if (move_y == heightBlockCount - (controll_y + 1)) {
        //블럭의 높낮이에 따라서 블럭을올려주거나 낮춰줌 controll_y 값이 달라짐
        for (let i = 0; i < randomBlock[0].length; i++) {
            let x = randomBlock[rotate_num][i][0] + move_x; // x 좌표
            let y = randomBlock[rotate_num][i][1] + move_y; // y 좌표
            stackedBoard[x][y] = true;
        }
        getRandAndInitMoveY();
    }
    move_y++; //블럭내림
    tetrisBoard.length = 0; //배열값삭제
}, 100);
