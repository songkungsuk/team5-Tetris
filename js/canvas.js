//--------------------------------------블럭미리보여주는곳 -----------------------------------------------
const nextBlockCanvas = document.getElementById("block-container"); //블럭 미리보여줄것
const nextBlockContext = nextBlockCanvas.getContext("2d"); // //캔버스 그리는거 타입
const nextBoarderWidth = 2;
const nextBlocksize = 25;
const nextwidthBlockCount = 5;
const nextheightBlockCount = 15;
nextBlockCanvas.width = 150;
nextBlockCanvas.height = 150;

const nextBlockCanvas2 = document.getElementById("block-container2"); //블럭 미리보여줄것 다다음
const nextBlockContext2 = nextBlockCanvas2.getContext("2d"); // //캔버스 그리는거 타입
const nextBoarderWidth2 = 2;
const nextBlocksize2 = 25;
const nextwidthBlockCount2 = 5;
const nextheightBlockCount2 = 15;
nextBlockCanvas2.width = 150;
nextBlockCanvas2.height = 150;
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------


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
let overlap_y = 1; // 블럭이 겹쳤을때 안겹치는곳까지 올려줌
let controll_x = 0; // 오른쪽으로 빠져나가지 않게하는 변수
let controll_x_min = 2; // 왼쪽으로 빠져나가지 않게하는 변수
let controll_y = 0; // 높이가 높은 블럭을 내렸을때 맨밑바닥인경우 조절해줌
let blockLocationArray_x = []; //블럭의 x좌표 값들 저장하는배열
let blockLocationArray_y = []; //블럭의 y좌표 값들 저장하는배열
let countTrue = 0; // 테트리스 한줄이 전부 채워졋는지 확인하는 변수
let score = 0; //점수
let stacked_number = 0; // 계산용 변수
let block_w = [0, 0, 0, 0]; // 현재 블럭좌표 w
let block_h = [0, 0, 0, 0]; // 현재 블럭좌표 h
let can_move = true;
let speedCount = 0;
let upkeyCount = 0;
//테스트용------------------------------------------------이거 한눈에볼라고 일단 여기다 적어놨어요 나중에 정리할게요
const saveBlockCanvas = document.getElementById("saveblock-container"); //블럭 미리보여줄것 다다음
const saveBlockContext = saveBlockCanvas.getContext("2d"); // //캔버스 그리는거 타입
const saveBoarderWidth = 2;
const saveBlocksize = 25;
const savewidthBlockCount = 5;
const saveheightBlockCount = 15;
saveBlockCanvas.width = 150;
saveBlockCanvas.height = 250;

//다음 블럭 보여주는것
function initSaveBlockCanvas() {
    // 배경 그리기
    saveBlockContext.fillStyle = "black"; //캔버스 블럭 색깔 종류
    for (let h = 0; h < saveheightBlockCount; h++) {
        //가로세로 블럭수만큼 캔버스에 블럭그려넣기
        for (let w = 0; w < savewidthBlockCount; w++) {
            saveBlockContext.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}
//다음에 보여줄 블력 그리기
function drawSaveBlock() {
    chooseSaveBlockColor(blockIndex[1]);

    for (let h = 0; h < saveheightBlockCount; h++) {
        for (let w = 0; w < savewidthBlockCount; w++) {
            if (saveBlockBoard[h][w]) {
                saveBlockContext.fillRect(saveBoarderWidth * h + saveBlocksize * h+ 35, saveBoarderWidth * w + saveBlocksize * w + 80, saveBlocksize, saveBlocksize);
            }
        }
    }
}
//다음 블력그리기
function drawSaveBlockOne(x, y) {
    if (blockIndex[1] == 4) {
        saveBlockBoard[x][y] = true; //ㅁ 모양일때 가운데로 안가가지고 이렇게했습니다
    } else {
        saveBlockBoard[x][y] = true; // 그외는 다이렇게 무지성 하드코딩;;
    }
}
//다음 블럭보여주기
function showSaveBlock() {
    for (let i = 0; i < chooseBlock(blockIndex[1]).length; i++) {
        let x = chooseBlock(blockIndex[1])[0][i][0]; // x 좌표
        let y = chooseBlock(blockIndex[1])[0][i][1]; // y 좌표
        drawSaveBlockOne(x, y);
    }
    drawSaveBlock();
    saveBlockBoard.length = 0;
    saveBlockBoardArray();
}

function chooseSaveBlockColor(num) {
    switch (num) {
        case 0:
            saveBlockContext.fillStyle = '#black';
            break;
        case 1:
            saveBlockContext.fillStyle = '#a2ddf3';
            break;
        case 2:
            saveBlockContext.fillStyle = '#f3a2ca';
            break;
        case 3:
            saveBlockContext.fillStyle = '#a2f3db';
            break;
        case 4:
            saveBlockContext.fillStyle = '#56a6ff';
            break;
        case 5:
            saveBlockContext.fillStyle = '#f3c8a2';
            break;
        case 6:
            saveBlockContext.fillStyle = '#eaa2f3';
            break;
        case 7:
            saveBlockContext.fillStyle = '#a2a6f3';
            break;
    }
}