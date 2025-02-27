
const gameBoard = (function () {

    const row = 3;
    const column = 3;
    const gridArray = []

    function createGrid() {
       
        for (let x = 0; x < row; x ++){
            gridArray[x] = []
            for(let y = 0; y <column; y++){
                gridArray[x].push(" ");
            }
        }
        return gridArray
    }

    function updateGrid(index1, index2, token){
        gridArray[index1][index2] = token
        return gridArray

    }

    return {createGrid, updateGrid}
})();

function Players(name, playerToken){
    
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





function checkWin(){



}


const gameController = (function() {
   

    function playTurn(player, xPos, yPos){

        gameBoard.updateGrid(xPos, yPos, player.token)
        return
    
    }



    return {playTurn}

})()

const grid = gameBoard.createGrid()
const player1 = Players('player1', true)
const player2 = Players('player2', false)

gameController.playTurn(player1,1,1)
gameController.playTurn(player2, 0,1)
gameController.playTurn(player1, 2,0)
console.log(grid)







