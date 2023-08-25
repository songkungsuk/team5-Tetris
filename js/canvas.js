const canvas = document.getElementById("tetrisCanvas");
const context = canvas.getContext("2d");

const cellSize = 20;
const rows = 48;
const cols = 18;

canvas.width = cols * cellSize;
canvas.height = rows * cellSize;

let score = 0;



function moveBlockLeft() {
    currentBlock.x--;
}

function moveBlockRight() {
    currentBlock.x++;
}

function moveBlockDown() {
    currentBlock.y++;
}

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

//블럭 테스트용------------------------------------------------
function drawBlock(x, y) { //원하는 블럭에 색칠하기
    context.fillStyle = "yellow";
    context.fillRect(
        4 + 4.05 * x + 15.8 * x,
        4 + 4.05 * y + 15.8 * y,
        15.8,
        15.8
    );
}
const selectedBlock = blocks.blcokTypeFive[0];

for(let i=0; i<4; i++){
    const x = selectedBlock[i][0]; // x 좌표
    console.log(x);
    const y = selectedBlock[i][1]; // y 좌표
    console.log(y);
    drawBlock(x,y);
}