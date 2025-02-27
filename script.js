
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

function Players(name, playerToken){
    // const name = name
    let score = 0
    const token = playerToken ? 'X' : 'O'
    
    function increaseScore(){
        score ++ ;
        return

    }

    function displayScore(){
        return score

    }

    return {name, token, increaseScore, displayScore}


}


const gameController = (function() {
    let grid = gameBoard.createGrid()
    console.log(grid)

    const player1 = Players('player1', true)
    const player2 = Players('player2', false)

    console.log(player1.name)
    console.log(player1.token)
    console.log(player2.name)
    console.log(player2.token)
    console.log(player1.displayScore())
    player1.increaseScore()
    console.log(player1.displayScore())

})()









