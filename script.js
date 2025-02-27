
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

    function checkWin(xPos, yPos, token){

        
        

        for(permutationsToCheck = 0; permutationsToCheck < 4; permutationsToCheck ++){

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
                    
                 } else if(areCellsBlank(gridArray[xPos-1][yPos], gridArray[xPos-2][yPos], token)){
                     
                     return true
                    
                 } else if(areCellsBlank(gridArray[xPos+1][yPos], gridArray[xPos+2][yPos], token)){
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

            return false
        }

        function areCellsBlank(cell2, cell3, token){

            if(cell2 == token && cell3 == token){
                return true
            } else {
                return false
            }
        
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

// gameController.playTurn(player1,1,1)
// gameController.playTurn(player2, 0,1)
// gameController.playTurn(player1, 2,0)
console.log(gameBoard.gridArray)

gameController.playTurn(player1, 0, 0)
gameController.playTurn(player1, 0, 1)
gameController.playTurn(player1, 0, 2)







