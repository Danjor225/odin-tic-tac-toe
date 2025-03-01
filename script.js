
const gameBoard = (function () {

    let row;
    let column;
    const gridSize = row * column
    const amountToWin = 3;
    const gridArray = [];
    
    function setRowAndColumnSize(rowNum, columnNum){

        row = rowNum;
        column = columnNum

    }

    function getRowNum(){
        return row
    }

    function getColumnNum(){

        return column
    }

    function getGridSize(){

        return gridSize
    }
    function createGrid() {
       
        for (let x = 0; x < row; x ++){
            gridArray[x] = []
            for(let y = 0; y <column; y++){
                gridArray[x].push("");
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
        if(checkRow(xPos, winCount, token)){
            return 'row'
        }

        
        winCount = 0
        if(checkColumn(yPos, winCount, token)){
            return 'column'
        }
        
        
        winCount =0;
        //Get position of top left most square on diagonal
        let lowerNum = Math.floor(xPos, yPos)
        let xPosChecker = xPos - lowerNum
        let yPosChecker = yPos - lowerNum
        if(checkPositiveDiagonal(xPosChecker, yPosChecker, winCount, token)){
            return 'down right diagonal'
        }


        winCount = 0
        xPosChecker = xPos
        yPosChecker = yPos
         //Get position of top right most diagonal
         while(xPosChecker > 0 && yPosChecker < row){
            xPosChecker --
            yPosChecker++
        }
         if(checkNegativeDiagonal(xPosChecker,yPosChecker,winCount, token)){
            return 'down left diagonal'
         }      
        
        return ''

    }

    function checkRow(xPos,winCount, token){

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
        return false
    }

    function checkColumn(yPos, winCount, token){

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
        return false
    }

    function checkPositiveDiagonal(xPosChecker, yPosChecker, winCount, token){

        //Check along full diagonal until win is found
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
        return false
    }

    function checkNegativeDiagonal(xPosChecker, yPosChecker, winCount, token){
       

        //Check along full diagonal until win is found
        while(xPosChecker < column && yPosChecker > 0){
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
    return {gridArray,createGrid, updateGrid, checkWin, getRowNum, getColumnNum, setRowAndColumnSize, getGridSize}
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
   
    let gameOver = false
    let playCount = 0

    function playTurn(player, xPos, yPos){

        if(gameOver){
            return
        }
        
        playCount ++
        gameBoard.updateGrid(xPos, yPos, player.token)
        let winType = gameBoard.checkWin(xPos, yPos, player.token)

        if(winType != ""){
            console.log(`${player.token} wins with a ${winType}!`)
            gameOver = true
            playCount = 0;
            
        } else if (checkTie()) {
            console.log(`Game is a Tie`)
            gameOver = true
            playCount = 0;

        } 
    }

    function checkTie(){

        if(playCount == (gameBoard.getGridSize())){
            return true
        }

        return false

    }

    return {playTurn}

})()

const gameDisplay = (function (){

    function displayBoard(){
        for(rowDivs = 0; rowDivs < gameBoard.getRowNum(); rowDivs++){
           let rowContainer =  document.createElement('div');
           for(columnSpans = 0; columnSpans < gameBoard.getColumnNum(); columnSpans++){
            let cell = document.createElement('span')
            cell.setAttribute('class', 'cell')
            cell.textContent = gameBoard.gridArray[rowDivs][columnSpans]
            rowContainer.appendChild(cell)
           }
           rowContainer.setAttribute('class', 'row-container')
           document.body.appendChild(rowContainer)
        }
        


    }

    return {displayBoard}

})()



//Testing Game
gameBoard.setRowAndColumnSize(5,5)
gameBoard.createGrid()
const player1 = Players('player1', true)
const player2 = Players('player2', false)
console.log(gameBoard.gridArray)
gameController.playTurn(player1, 4, 0)
gameController.playTurn(player1, 0, 2)
// gameController.playTurn(player1, 1, 1)
// gameController.playTurn(player1, 1, 0)
// gameController.playTurn(player1, 3, 3)
// gameController.playTurn(player1, 4, 4)
// gameController.playTurn(player1, 5, 0)

// gameController.playTurn(player1, 0, 2)
// gameController.playTurn(player1, 1, 5)
// gameController.playTurn(player1, 2, 4)

gameDisplay.displayBoard()





