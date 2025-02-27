
function Gameboard () {

    const row = 3;
    const column = 3;

    function createGrid() {
        const gridArray = []
        for (let x = 0; x < row; x ++){
            gridArray[x] = []
            for(let y = 0; y <column; y++){
                gridArray[x].push(y);
            }
        }
        return gridArray
    }

    return {createGrid}
}

const gameBoard = Gameboard()

let grid = gameBoard.createGrid()

console.log(grid)
