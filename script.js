
const gameBoard = (function () {

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
})();

function Players(name, token){
    const playersName = name
    const playersScore = 0
    const playersToken = token
    
    return {playersName, playersScore, playersToken}


}


function GameController(){


}


//run game



let grid = gameBoard.createGrid()

console.log(grid)
