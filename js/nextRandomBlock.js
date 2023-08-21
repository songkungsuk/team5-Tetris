////////////////////////////////             //////////////////////////
////////////////////////////////  1번째 방식 블로그 참조 //////////////////////////
////////////////////////////////             //////////////////////////

class NextBlock {
    //
    constructor(size) {
        this.typesQ = [];
        //this.typesQ 는 셔플한 블럭을 배열로 저장
        
        // bag 배열에 block 수만큼 인덱스 넣는 과정
        this.bag = [];
        for (var i = 0; i<blockType.length; i++) {
            this.bag.push(i);
        }
        this.nextBlockSize = size;
        //this.nextBlockSize = size; 해당 크기로 초기화
        this.pushRandom();
        // pushRandom 함수를 사용하여 this.typesQ = []; 부분을 무작위 블록으로 채우기
    }

    pushRandom() {
        // 설정된 nextBlock type이 nextBlockSize 보다 작거나 같다면
        // 다시 this.nextBlockSize 만큼 값을 추가하는 과정.
        if(this.typesQ.length <= this.nextBlockSize) {
            this.bag = shuffle(this.bag);
             // 다시 섞는 과정
            for (var i = 0; i<this.bag.length; i++) {
                this.typesQ.push(this.bag[i]);
            }
        }
    }
    
}

////////////////////////////////             //////////////////////////
////////////////////////////////  2번째 방식 블로그 방식 변환  //////////////////////////
////////////////////////////////             //////////////////////////
class NextBlock {
    constructor(size) {
        this.comingBlocks = [];
        this.bag = [...Array(blockType.length).keys()]; 
        //0부터 blockType.length - 1까지의 정수 배열을 만들기.    
        //앞쪽의 ...는 key()에 의해 반환되는 것을 배열로 변환시키는 용도
        //예를들어 블록타입이 길이가 7인 경우에는 .bag은[0,1,2,3,4,5,6]으로 초기화 된다.    
        this.nextBlockSize = size;
        // 생성자에게 전달된 size를 저장
        this.fillQueue();
        //NextBlock이 처음 만들어질 때, fillQueue메서드를 즉시 호출하여 comingBlocks에 블록을 채운다.
    }

    fillQueue() {
        
        while (this.comingBlocks.length < this.nextBlockSize) {
            //BlocksQueue에 BlockSize가 포함될 떄 까지 반복
            if (this.bag.length === 0) {
                //bag(블록집합)이 비어있는지 확인 
                this.bag = shuffle([...Array(blockType.length).keys()]); 
                //bag이 비어있으면 해당 줄이 실행되면서 섞이고 채워진다. 
            }
            this.comingBlocks.push(this.bag.pop());
            //bag의 마지막 블록을 가져와 comingBlock에 푸시한다
        }
    }

    getNextBlock() {
        //대기중인 블록을 검색하는 메서드
        const nextBlock = this.comingBlock.shift();
        //comingBlock의 첫번째에 nextBlock를 할당 
        this.fillQueue();
        //fillQueue를 호출하여 블록이 제거된 후, 대기열에 nextBlockSize 가 있는지 확인
        return nextBlock;
        //대기열에서 제거된 다음 블록을 반환
    }
}

////////////////////////////////             //////////////////////////
////////////////////////////////  3번째 방식(Math) 수정 전  //////////////////////////
////////////////////////////////             //////////////////////////


function getRandomBlockIndex() {
    return Math.floor(Math.random() * 7); // 0부터 6까지의 숫자를 랜덤으로 반환
}
class NextBlock {
    constructor() {
        this.currentBlockIndex = this.getRandomBlockIndex();
    }

    getRandomBlockIndex() {
        return Math.floor(Math.random() * 7); // 0부터 6까지의 숫자를 랜덤으로 반환
    }

    getNextBlock() {
        this.currentBlockIndex = this.getRandomBlockIndex();
        return this.currentBlockIndex;
    }
}
const nextBlockGenerator = new NextBlock();
const blockIndex = nextBlockGenerator.getNextBlock();


////////////////////////////////             //////////////////////////
////////////////////////////////  3번째 수정 후 //////////////////////////
////////////////////////////////             //////////////////////////



// 블록 유형을 배열로 변경
function getRandomBlockIndex() {
    const blockKeys = Object.keys(blocks); 
    // blocks 객체의 모든 키(블록 유형 이름)를 배열로 가져오는 과정.
    return blockKeys[Math.floor(Math.random() * blockKeys.length)];
}

class NextBlock {
    // 객체가 생성될 때 이 함수는 자동으로 호출된다.
    constructor() {
        // 생성자 함수가 호출될 때, "getRandomBlockType" 함수를 호출하고, 그 결과를 "currentBlockType" 에 할당한다.
        this.currentBlockType = this.getRandomBlockType();
    }

    // 랜덤한 블록 타입을 가져오는 함수다.
    getRandomBlockType() {
        // "blocks" 객체의 모든 키를 배열로 가져온다. 예: ['blockTypeOne', 'blcokTypeTwo', ...]
        const blockKeys = Object.keys(blocks);
        
        // blockKeys 배열에서 랜덤한 키를 선택하고, 이를 사용하여 "blocks" 객체에서 해당 블록 유형을 반환한다.
        return blocks[blockKeys[Math.floor(Math.random() * blockKeys.length)]];
    }

    // 다음 블록 유형을 가져오는 함수
    getNextBlock() {
        // 다음 블록 유형을 가져와 "currentBlockType" 속성에 할당한다.
        this.currentBlockType = this.getRandomBlockType();
        
        // 현재 블록 유형을 반환한다.
        return this.currentBlockType;
    }
}

// "NextBlock" 클래스의 새로운 인스턴스를 생성하고, 이를 "nextBlockGenerator2" 변수에 할당한다.
const nextBlockGenerator2 = new NextBlock();

// "nextBlockGenerator2" 객체의 "getNextBlock" 함수를 호출하고 그 결과를 "nextBlockType" 변수에 할당한다.
const nextBlockType = nextBlockGenerator2.getNextBlock();


