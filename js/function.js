function tetrisBoardArray() {
    const tetrisBoard = [];
    // 세로 48칸, 가로 18칸 테트리스 배열
    for (let height = 0; height < 48; height++) {
        tetrisBoard[height] = [];
        for (let width = 0; width < 18; width++) {
            tetrisBoard[height][width] = false; // 아직 아무것도 쌓인게 없어서 false
        }
    }
    console.log(tetrisBoard); // 맞는지 확인하려고 쓴 코드(나중에 지울 예정)
    return tetrisBoard;
}

tetrisBoardArray();
