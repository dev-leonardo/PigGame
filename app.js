/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, current, flag;
var btNewGame = document.querySelector('.btn-new');
var btRoll = document.querySelector('.btn-roll');
var btHold = document.querySelector('.btn-hold');

NewGame();

function NewGame() {
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    scores = [0, 0];
    current = 0;
    activePlayer = 0;
    flag = 0;
    gameEnded = false;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner')
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('.dice').style.display = 'block';
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

function NextTurn() {
    current = 0;
    document.querySelector('#current-' + activePlayer).textContent = current;
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
    flag = 0;
}

function RollDice() {
    if (flag == 0){
        dice = Math.floor(Math.random() * 5) + 2;    
    }else{
        dice = Math.floor(Math.random() * 6) + 1;
    }
    
    if(dice !== 1){
        current = current + dice;
        flag = 1;
    }else{
        current = 0;
        NextTurn();
    }
    document.querySelector('#current-' + activePlayer).textContent = current;
    document.querySelector('.dice').src = 'dice-' + dice + '.png';
}

function Hold() {
    scores[activePlayer] += current;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if(scores[activePlayer] >= 100) {
        console.log(`Player ${activePlayer + 1} is the winner.`);
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        gameEnded = true;
    }else{
        NextTurn();
    }
}

btNewGame.onclick = function(){ NewGame() };

btRoll.onclick = function(){ 
    if(gameEnded == false){RollDice()} 
};
btHold.onclick = function(){ 
    if(gameEnded == false){Hold()} 
};