const Gameboard = (() =>{
    let gameboard = ['','','','','','','','','']

    const displayIt = () => {
        let boardHTML =''
        gameboard.forEach((square,index)=> {
            boardHTML += `<div class = 'square' id='${index}'>${square}
            </div>`
        })
        document.querySelector('#gameboard').innerHTML = boardHTML;

        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', Game.handleClick)
        })
        
    }
    const update = (index, mark) => {
        gameboard[index] = mark;
        displayIt();
    };

    const getGameboard = () => gameboard;

    return{
        displayIt,
        update,
        getGameboard
    }

})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;
    
    const start = () => {
        for (let i=0 ; i<Gameboard.getGameboard().length ; i++){
            if (Gameboard.getGameboard()[i] !==''){
                return;
            }
        }
        players = [
            createPlayer(document.querySelector('#player1').value, 'X'),
            createPlayer(document.querySelector('#player2').value, 'O'),
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.displayIt();
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', handleClick);
        });
        
    }    

    const handleClick = (event) =>{
        if(gameOver){
            return;
        }
        let index = parseInt(event.target.id);           
        if(Gameboard.getGameboard()[index] !=="")        
        return;      

        Gameboard.update(index, players[currentPlayerIndex].mark);

        if (checkWinner(Gameboard.getGameboard(), players[currentPlayerIndex].mark)){
            gameOver = true;
            showMessage.displayMessage(`${players[currentPlayerIndex].name} wins`);
        }
        else if(checkTie(Gameboard.getGameboard())){
            gameOver = true;
            showMessage.displayMessage(`It's a tie`);
            
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

    }

    const restart = () => {
        for (let i=0 ; i<9 ; i++){
            Gameboard.update(i, "");
        }
        Gameboard.displayIt();
        gameOver = false;
        document.querySelector('#message').textContent = '';


    }

    return{
        start,
        restart,
        handleClick
    }
})();

const startButton = document.querySelector('#startButton');
startButton.addEventListener('click', () => {
   Game.start();
})

const restartButton = document.querySelector('#restartButton');
restartButton.addEventListener('click', () =>{
    Game.restart();    
})

function checkWinner(board){
    let winningPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for (let i=0 ; i < winningPatterns.length; i++){
        const [a,b,c] = winningPatterns[i];
        if (board[a] && board[a] === board[b] && board[a] === board [c]){
            return true;
        }
    }
    return false;
}

function checkTie(board){
    return board.every(cell => cell !=="")
}

const showMessage = (() => {
    const displayMessage = (message) => {
        document.querySelector('#message').innerHTML = message;
    }
    return{
        displayMessage
    }
})();

