
const gameBoard = (function () {

    let row;
    let column;
    
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

        return row * column
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
        let lowerNum = Math.min(xPos, yPos)
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

        for(rowCount = 0; rowCount < column; rowCount ++){
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

        for(columnCount = 0; columnCount < row; columnCount ++){
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
        while(xPosChecker < row && yPosChecker > 0){
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

    function checkIfSelectedPosEmpty(xPos, yPos){

        if(gridArray[xPos][yPos] == ""){
        
            return true
        
        } 

        return false
    }


    return {gridArray,amountToWin, createGrid, updateGrid, checkWin, getRowNum, getColumnNum, setRowAndColumnSize, getGridSize, checkIfSelectedPosEmpty}
})();

function Players(name, playerToken){
    
    let score = 0
    const token = playerToken
    
    
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
    let currentPlayerIndex = 0
    let playerList = []
    let currentPlayer

    function playTurn(xPos, yPos){

        
        if(gameOver){
            return
        }


        currentPlayer = getCurrentPlayer()
        playCount ++
        updateDisplayArrayAndGrid(xPos, yPos, currentPlayer.token)
        checkForEndOfGame(xPos, yPos, currentPlayer)
        updateCurrentPlayerIndex()
        currentPlayer = getCurrentPlayer()
        gameDisplay.updatePlayerTurnDisplay(currentPlayer.name, currentPlayer.token)
    }

    function updateDisplayArrayAndGrid(xPos, yPos, token){
        
        gameBoard.updateGrid(xPos, yPos, token)
        gameDisplay.clearDisplayBoard()
        gameDisplay.displayBoard()
    }

    function checkForEndOfGame(xPos, yPos, currentPlayer){

        let winType = gameBoard.checkWin(xPos, yPos, currentPlayer.token)
        if(winType != ""){
            console.log(`${currentPlayer.name} wins with a ${currentPlayer.token} on a ${winType}!`)
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

    function addToActivePlayerList(player){

        playerList.push(player)
    }

    function getPlayerList(){

        return playerList
    }

    function getCurrentPlayer(){

        return playerList[currentPlayerIndex]
    }

    function updateCurrentPlayerIndex(){

        if(currentPlayerIndex == playerList.length -1){
            currentPlayerIndex =0;
        } else {
            currentPlayerIndex ++
        }

    }

    return {playTurn, addToActivePlayerList, getPlayerList}

})()

const gameDisplay = (function (){
    
    const gridContainer = document.querySelector('#grid-container')

    function displayBoard(){
        for(rowDivs = 0; rowDivs < gameBoard.getRowNum(); rowDivs++){
           let rowContainer =  document.createElement('div');
           for(columnDivs = 0; columnDivs < gameBoard.getColumnNum(); columnDivs++){
                let cell = document.createElement('div')
                cell.setAttribute('class', 'cell')
                
                cell.setAttribute('data-x-index-number', rowDivs)
                cell.setAttribute('data-y-index-number', columnDivs)
                cell.textContent = gameBoard.gridArray[rowDivs][columnDivs]
                rowContainer.appendChild(cell)
           }
           rowContainer.setAttribute('class', 'row-container')
           gridContainer.appendChild(rowContainer)
        }
        
    }

    function clearDisplayBoard(){

        gridContainer.innerHTML = ""


    }

    gridContainer.addEventListener('click', (event) => {
        let xArrayPos = event.target.dataset.xIndexNumber
        let yArrayPos = event.target.dataset.yIndexNumber
        
        if(!gameBoard.checkIfSelectedPosEmpty(xArrayPos,yArrayPos)){
           alert('Select a blank square')
           return
        }
        
        gameController.playTurn(xArrayPos, yArrayPos)

    })

    const playerTurnDisplay = document.querySelector('#player-turn-display')
    function updatePlayerTurnDisplay(playerName, playerToken){

        playerTurnDisplay.textContent = `It is ${playerName}'s go using ${playerToken}`

    }

    return {displayBoard, clearDisplayBoard, updatePlayerTurnDisplay}

})()


const setUp = function(){

    const startBtn = document.querySelector('#startBtn')
    const startDialog = document.querySelector('#set-up-form')
    startBtn.addEventListener('click', () => {

        startDialog.showModal();
        

    })
    
    const addPlayerBtn = document.querySelector('#add-player-btn')
    const playerFieldset = document.querySelector('#player-fieldset')
    const removePlayerBtn = document.querySelector('#remove-player-btn')
    let playerCount = 2

    addPlayerBtn.addEventListener('click', (event) => {
        event.preventDefault()
        createNewPlayerInput()
        removePlayerBtn.disabled = false;

    })

    const confirmBtn = document.querySelector('#confirm-btn')
    let rowNumInput = document.querySelector('#row-no')
    let colNumInput = document.querySelector('#col-no')
    const noToWinInput = document.querySelector('#to-win-no')
    
    confirmBtn.addEventListener('click', (event) => {
        event.preventDefault()
        
        getPlayerInfo()
        gameBoard.setRowAndColumnSize(rowNumInput.value, colNumInput.value)
        gameController.amountToWin = noToWinInput.value
        gameBoard.createGrid()
        gameDisplay.displayBoard()
        let firstPlayer = gameController.getPlayerList()[0]
        gameDisplay.updatePlayerTurnDisplay(firstPlayer.name, firstPlayer.token )
        

        startDialog.close()
        startBtn.style.display = 'none'
       

    })

    noToWinInput.addEventListener('keyup', () => {
      let toWinValue = parseInt(noToWinInput.value)
      let rowNumToCompare = parseInt(rowNumInput.value)
      let colNumToCompare = parseInt(colNumInput.value)
        if(toWinValue > rowNumToCompare || toWinValue > colNumToCompare){
            noToWinInput.value = null
        }
    })
    

    removePlayerBtn.addEventListener('click', (event) => {
        event.preventDefault()
        playerFieldset.lastChild.remove()
        playerCount --
        if(playerCount == 2){
            removePlayerBtn.disabled = true
        }

    })


    function createNewPlayerInput(){
        playerCount ++

        const playerContainer = document.createElement('div')
        playerContainer.setAttribute('class', 'playerContainer')
        playerFieldset.appendChild(playerContainer)

       let playerInput =  document.createElement('input')
       playerInput.placeholder = `Player ${playerCount} Name`
       playerInput.setAttribute('class', 'player')
       playerContainer.appendChild(playerInput)

       let playerToken = document.createElement('input')
       playerToken.placeholder = `Player ${playerCount} Token.`
       playerToken.maxLength = 1
       playerToken.setAttribute('class', 'token')
       playerContainer.appendChild(playerToken)

    }

    function getPlayerInfo(){
        let players = document.querySelectorAll('.player')
        let tokens = document.querySelectorAll('.token')
        let tokenIndexCounter = 0;
        players.forEach((player) => {
            let playerObj = Players(player.value, tokens[tokenIndexCounter].value)
            tokenIndexCounter ++
            gameController.addToActivePlayerList(playerObj)
            console.log(gameController.getPlayerList())
        })

    }

    

    function checkAmountToWin(){
        
        
    }

    return {checkAmountToWin}
}()


//Testing Game
// gameBoard.setRowAndColumnSize(2,3)
// gameBoard.createGrid()
// const player1 = Players('player1', 'X')
// gameController.addToActivePlayerList(player1)
// const player2 = Players('player2', 'O')
// gameController.addToActivePlayerList(player2)
// console.log(gameController.getPlayerList())
// console.log(gameBoard.gridArray)

// gameDisplay.displayBoard()





