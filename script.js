
const gameBoard = (function () {

    const row = 6;
    const column = 6;
    const amountToWin = 3;
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

    function checkWinBAD(xPos, yPos, token){

        
        

        for(let permutationsToCheck = 0; permutationsToCheck < 4; permutationsToCheck ++){

            //Check Vertical
            if(permutationsToCheck == 0){
                if(areCellsBlank(gridArray[xPos][yPos+1], gridArray[xPos][yPos-1], token)){
                   return true
                   
                } else if(areCellsBlank(gridArray[xPos][yPos-1], gridArray[xPos][yPos-2], token)){
                    
                    return true
                   
                } else if(areCellsBlank(gridArray[xPos][yPos+1], gridArray[xPos][yPos+2], token)){
                    return true
                    
                }
                
            } // Check Horizontal 
            else if(permutationsToCheck == 1){
                if(areCellsBlank(gridArray[xPos+1][yPos], gridArray[xPos-1][yPos], token)){
                    return true
                    
                 } else if(areCellsBlank(gridArray[xPos-1][yPos], gridArray[xPos+2][yPos], token)){
                     
                     return true
                    
                 } else if(areCellsBlank(gridArray[xPos+1][yPos], gridArray[xPos-2][yPos], token)){
                     return true
                     
                 }

            } //Check Diagonal 1
            else if (permutationsToCheck == 2){
                if(areCellsBlank(gridArray[xPos+1][yPos-1], gridArray[xPos-1][yPos+1], token)){
                    return true
                    
                 } else if(areCellsBlank(gridArray[xPos+1][yPos-1], gridArray[xPos+2][yPos-2], token)){
                     
                     return true
                    
                 } else if(areCellsBlank(gridArray[xPos-1][yPos+1], gridArray[xPos-2][yPos+2], token)){
                     return true
                     
                 }

            } //Check Diagonal 2
            else if (permutationsToCheck == 3){
                if(areCellsBlank(gridArray[xPos-1][yPos-1], gridArray[xPos+1][yPos+1], token)){
                    return true
                    
                 } else if(areCellsBlank(gridArray[xPos-1][yPos-1], gridArray[xPos-2][yPos-2], token)){
                     
                     return true
                    
                 } else if(areCellsBlank(gridArray[xPos+1][yPos+1], gridArray[xPos+2][yPos+2], token)){
                     return true
                     
                 }
            } 

        }
        return false
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

        winCount = 0
        let reachedStartOfIndex
        let xPosCounter = xPos
        let yPosCounter = yPos
        do{
            
            if(xPosCounter == 0 || yPosCounter == 0){
                reachedStartOfIndex = true
            } else {
                xPosCounter --
                yPosCounter--
            }


        } while (!reachedStartOfIndex)

        do{
            if(gridArray[xPosCounter][yPosCounter] == token){
                winCount++
            } else {
                winCount = 0
            }
            if(winCount == amountToWin){
               return true
            } else {
                xPosCounter ++
                yPosCounter ++
            }

        } while (xPosCounter < row && yPosCounter < column)

        // Negative Diagonal
        winCount = 0
        xPosCounter = xPos
        yPosCounter = yPos
        do{
            
            if(xPosCounter == 0 || yPosCounter == column-1){
                reachedStartOfIndex = true
            } else {
                xPosCounter --
                yPosCounter++
            }


        } while (!reachedStartOfIndex)

        do{
            if(gridArray[xPosCounter][yPosCounter] == token){
                winCount++
            } else {
                winCount = 0
            }
            if(winCount == amountToWin){
               return true
            } else {
                xPosCounter ++
                yPosCounter --
            }

        } while(xPosCounter < row && yPosCounter >= 0)


        return false
        


    }


    function areCellsBlank(cell2, cell3, token){

        if(cell2 == token && cell3 == token){
            return true
        } else {
            return false
        }
        
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
   

    function playTurn(player, yPos, xPos){

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







