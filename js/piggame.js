/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gameScore, gamePlaying;
var diceDOM = document.querySelector('.dice');
var dice2DOM = document.querySelector('.dice2');

initializeGame();


document.querySelector('.btn-roll').addEventListener('click', () => {
    if(gamePlaying) {
        // 1- Generate Random Number
        var dice = getRandomNumber();
        var dice2 = getRandomNumber();

        // 2- Display the result
        diceDOM.style.display = 'block';
        diceDOM.src = './images/dice-' + dice + '.png';
        dice2DOM.style.display = 'block';
        dice2DOM.src = './images/dice-' + dice2 + '.png';

        // 3- Update round score if dice is not 1
        if(dice !== 1 && dice2 !== 1)    {
            roundScore += (dice + dice2);
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else  {
            changePlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    if(gamePlaying) {
        // Add Current Score to Global Score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if(scores[activePlayer] >= gameScore) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            
        } else  {
            // Next Player
            changePlayer();
            diceDOM.style.display = 'none';
            dice2DOM.style.display = 'none';
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', initializeGame);
document.querySelector('.rules-confirm').addEventListener('click', () => document.querySelector('.rules').style.display = 'none');
document.querySelector('#btn-rules').addEventListener('click', () => document.querySelector('.rules').style.display = 'block');
document.querySelector('.btn-settings').addEventListener('click', () => document.querySelector('.game-settings').style.display = 'block');
document.querySelector('#btn-done').addEventListener('click', () => {
    document.querySelector('.game-settings').style.display = 'none';
    if(document.getElementById('player-0-name').value !='')    {
        document.getElementById('name-0').textContent = document.getElementById('player-0-name').value;
    } else{
        document.getElementById('name-0').textContent = 'Player 1';
    }
    if(document.getElementById('player-1-name').value !='')    {
        document.getElementById('name-1').textContent = document.getElementById('player-1-name').value;
    } else{
        document.getElementById('name-1').textContent = 'Player 1';
    }
    if(document.getElementById('game-score').value == '')   {
        gameScore = 100;
    }else{
        gameScore = document.getElementById('game-score').value;
    }
    document.querySelector('.game-score').textContent = 'Game Score: ' + gameScore;
});

function changePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function initializeGame()   {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameScore = 100;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.game-score').textContent = 'Game Score: ' + gameScore;
    
    diceDOM.style.display = 'none';
    dice2DOM.style.display = 'none';
}

function getRandomNumber()  {
    return Math.floor(Math.random() * 6) + 1;
}