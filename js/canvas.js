const canvas = document.querySelector('#front'); //캔버스 객체 자체
const context = canvas.getContext('2d');//캔버스 그리는거 타입
const width = canvas.getAttribute('width'); //#front의 width 값
const height = canvas.getAttribute('height'); //#front의 height 값
context.fillStyle = "gray";
context.fillRect(0, 0, width, height);