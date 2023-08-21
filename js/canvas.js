const canvas = document.querySelector('#front'); //캔버스 객체 자체
const context = canvas.getContext('2d');//캔버스 그리는거 타입
const width = canvas.getAttribute('width'); //#front의 width 값
const height = canvas.getAttribute('height'); //#front의 height 값
context.fillStyle = "gray";
context.fillRect(0, 0, width, height);




























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