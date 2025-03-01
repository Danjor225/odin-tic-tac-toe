
const gameBoard = (function () {

    const row = 6;
    const column = 6;
    const amountToWin = 3;
    const gridArray = [];
    

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


    function checkWin(xPos, yPos, token){
        let winCount = 0

        // Check Row
        for(rowCount = 0; rowCount < row; rowCount ++){
            if(gridArray[xPos][rowCount] == token){
                winCount++
            } else {
                winCount = 0
            }
            if(winCount == amountToWin){
                return true
            }
        }

        //Check Column
        winCount = 0
        for(columnCount = 0; columnCount < column; columnCount ++){
            if(gridArray[columnCount][yPos] == token){
                winCount++
            } else {
                winCount = 0
            }
            if(winCount == amountToWin){
                return true
            }
        }
         
        //Check Positive Diagonal

        winCount =0;
        let lowerNum = Math.floor(xPos, yPos)
        let xPosChecker = xPos - lowerNum
        let yPosChecker = yPos - lowerNum

        while(xPosChecker < row && yPosChecker < column){

            if(gridArray[xPosChecker][yPosChecker] == token){
                winCount ++
            } else {
                winCount = 0;
            }

            if(winCount == amountToWin){
                return true
            } else {
                xPosChecker++
                yPosChecker++
            }
        }


        // Negative Diagonal
        winCount = 0
        xPosChecker = xPos
        yPosChecker = yPos
               
        while(xPosChecker > 0 && yPosChecker < row){
            xPosChecker --
            yPosChecker++
        }

        while(xPosChecker<column && yPosChecker > 0){
            if(gridArray[xPosChecker][yPosChecker] == token){
                winCount ++
            } else {
                winCount = 0;
            }

            if(winCount == amountToWin){
                return true
            } else {
                xPosChecker++
                yPosChecker--
            }
        }

        return false

    }

    



    return {gridArray, createGrid, updateGrid, checkWin}
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










const gameController = (function() {
   

    function playTurn(player, xPos, yPos){

        gameBoard.updateGrid(xPos, yPos, player.token)
        if(gameBoard.checkWin(xPos, yPos, player.token)){
            console.log(`${player.token} wins!`)
        }
        
        return
    
    }



    return {playTurn}

})()

gameBoard.createGrid()
const player1 = Players('player1', true)
const player2 = Players('player2', false)


console.log(gameBoard.gridArray)

gameController.playTurn(player1, 1, 0)
gameController.playTurn(player1, 0, 0)
gameController.playTurn(player1, 1, 1)
gameController.playTurn(player1, 3, 3)
gameController.playTurn(player1, 4, 4)
gameController.playTurn(player1, 5, 0)

gameController.playTurn(player1, 0, 2)
gameController.playTurn(player1, 1, 5)
gameController.playTurn(player1, 2, 4)







