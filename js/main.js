
//--------------여기가 테트리스 실행부 main.js
let isUpKeyPressed = false;
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyUp);
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
    check_stacked(); ////제일 높이 쌓여있는 블럭의 높이를 저장하는 함수
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
        move_x -= controll_x - 1;
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
