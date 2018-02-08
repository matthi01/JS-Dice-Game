/*
GAME RULES:

- 2 players, playing in rounds
- In each turn, a player rolls a die as many times as they want. Each time, the score gets added to the ROUND score
- BUT, if the player rolls a 1, the entire ROUND score gets reset. After that, it's the next player's turn
- The player can choose to 'Hold', which means that their ROUND score gets added to their GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
ADDITIONAL IDEAS

1. A player loses his ENTIRE score when he rolls two 6's in a row. After that, it's the next player's turn.
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of    100. (Hint: you can read that value with the .value property in JavaScript. 
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. 
*/

// declarations
var scores, roundScores, activePlayer, gamePlaying;

// initial set up
init();

// events - Roll button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // set up randon number as die roll
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
    
        // display result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        
        
        if (dice1 !== 1 && dice2 !== 1) {
            // score is added
            roundScores += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            // next player
            nextPlayer();
        }
        
    }
});


// events - Hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScores; 

        // update dom
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        // check what the required winning score is
        var winningScore;
        var input = document.querySelector('.final-score').value;
        
        // default the winning score if no input
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // check if won
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

// events - New Game button
document.querySelector('.btn-new').addEventListener('click', init);


// functions
function nextPlayer() {
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init() {
    scores = [0, 0];
    roundScores = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
}


