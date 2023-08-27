let tetrisBoard = []; //내가 조종할 테트리스
let stackedBoard = [];  // 쌓인 테트리스 공간

function tetrisBoardArray() {
    // 세로 29칸, 가로 12칸 테트리스 배열
    for (let height = 0; height < 29; height++) {
        tetrisBoard[height] = [];
        for (let width = 0; width < 12; width++) {
            tetrisBoard[height][width] = false; // 아직 아무것도 쌓인게 없어서 false
        }
    }
}

function stackedBoardArray() {
    // 세로 29칸, 가로 12칸 테트리스 배열
    for (let height = 0; height < 29; height++) {
        stackedBoard[height] = [];
        for (let width = 0; width < 12; width++) {
            stackedBoard[height][width] = false; // 아직 아무것도 쌓인게 없어서 false
        }
    }
}

// 배열생성
tetrisBoardArray(); 
stackedBoardArray();

console.log(tetrisBoard);
console.log(stackedBoard);

// 방식(Math) 
function getRandomBlockIndex() {
    return Math.floor(Math.random() * 7); // 0부터 6까지의 숫자를 랜덤으로 반환
}
class NextBlock {
    constructor() {
        this.currentBlockIndex = this.getRandomBlockIndex();
    }

    getRandomBlockIndex() {
        return Math.floor(Math.random() * 7) + 1; // 1부터 7까지의 숫자를 랜덤으로 반환
    }

    getNextBlock() {
        this.currentBlockIndex = this.getRandomBlockIndex();
        return this.currentBlockIndex;
    }
}
const nextBlockGenerator = new NextBlock();
let blockIndex = nextBlockGenerator.getNextBlock();
console.log(blockIndex);

//1~7 숫자를 랜덤으로 생성된것에 따라 블럭을 골라서 리턴
function chooseBlock(num) {
    switch (num) {
        case 1:
            return blocks.blockTypeOne;
        case 2:
            return blocks.blockTypeTwo;
        case 3:
            return blocks.blockTypeThree;
        case 4:
            return blocks.blockTypeFour;
        case 5:
            return blocks.blcokTypeFive;
        case 6:
            return blocks.blockTypeSix;
        case 7:
            return blocks.blockTypeSeven;
    }
}

//키이벤트
function handleKeyPress(event) {
    switch (event.keyCode) {
        case 37: // Left arrow
            move_x--; //왼쪽으로갈땐 --
            break;
        case 39: // Right arrow
            move_x++; //오른쪽으로갈땐 ++
            break;
        case 40: // Down arrow
            move_y++; //내려갈때는 y가 늘어가야되므로 y++
            break;
        case 38: // Up arrow
            move_y--; //느리게 내릴때는 위쪽방향키
            break;
        case 90: // 'z' key
            rotate--;
            break;
        case 67: // 'c' key
            rotate++;
            break;
        case 16: // Shift key
            // 블록 저장 기능 추가
            break;
        case 32: // Space bar
            // 바로 떨어지게 하기 기능 추가
            move_y = 26;
            break;
    }
}



