"use strict";
var Choice;
(function (Choice) {
    Choice["Fire"] = "fire";
    Choice["Water"] = "water";
    Choice["Earth"] = "earth";
})(Choice || (Choice = {}));
;
let game = {
    playerLives: 5,
    computerLives: 5,
};
;
const displayPlayerChoice = document.getElementById('player-choice');
const displayComputerChoice = document.getElementById('computer-choice');
const displayPlayerLives = document.getElementById('player-lives');
const displayComputerLives = document.getElementById('computer-lives');
const displayComputerResult = document.getElementById('computer-result');
const displayPlayerResult = document.getElementById('player-result');
const buttonsHolder = document.getElementById('button-holder');
const displayEndMessage = document.getElementById('end-message');
const playAgainButton = document.getElementById('play-again-button');
// Display player and computer lives as 5
displayPlayerLives.textContent += game.playerLives.toString();
displayComputerLives.textContent += game.computerLives.toString();
// Get random selection from computer
function computerPlay() {
    const randomSelection = Math.floor(Math.random() * 3);
    return Object.values(Choice)[randomSelection];
}
// Find out the winner and display to screen
function playRound(playerSelection) {
    var _a, _b;
    let computerSelection = computerPlay();
    displayPlayerChoice.textContent = (_a = playerSelection === null || playerSelection === void 0 ? void 0 : playerSelection.toString().toUpperCase()) !== null && _a !== void 0 ? _a : '';
    displayComputerChoice.textContent = (_b = computerSelection === null || computerSelection === void 0 ? void 0 : computerSelection.toString().toUpperCase()) !== null && _b !== void 0 ? _b : '';
    updateColors(playerSelection, computerSelection);
    // check for end of the game
    if (game.playerLives <= 0 || game.computerLives <= 0) {
        return endTheGame();
    }
    // logic
    if ((playerSelection === Choice.Fire && computerSelection === Choice.Earth) || (playerSelection === Choice.Water && computerSelection === Choice.Fire) || (playerSelection === Choice.Earth && computerSelection === Choice.Water)) {
        // display updated content
        game.computerLives -= 1;
        displayComputerLives.innerHTML = game.computerLives.toString();
        displayPlayerResult.textContent = `${getOutcomeMessage(playerSelection, 'win')}`;
        displayComputerResult.textContent = `${getOutcomeMessage(computerSelection, 'lose')}`;
    }
    else if ((computerSelection === Choice.Fire && playerSelection === Choice.Earth) || (computerSelection === Choice.Water && playerSelection === Choice.Fire) || (computerSelection === Choice.Earth && playerSelection === Choice.Water)) {
        game.playerLives -= 1;
        displayPlayerLives.innerHTML = game.playerLives.toString();
        displayComputerResult.textContent = `${getOutcomeMessage(computerSelection, 'win')}`;
        displayPlayerResult.textContent = `${getOutcomeMessage(playerSelection, 'lose')}`;
    }
    else if (playerSelection === computerSelection) {
        displayPlayerResult.textContent = 'Tie';
        displayComputerResult.textContent = 'Tie';
    }
    else {
        displayPlayerResult.textContent = 'Error!';
        displayComputerResult.textContent = 'Error!';
    }
    // check for the end of the game
    if (game.playerLives <= 0 || game.computerLives <= 0) {
        return endTheGame();
    }
}
function updateColors(playerChoice, computerChoice) {
    const playerColor = getColorForChoice(playerChoice);
    const computerColor = getColorForChoice(computerChoice);
    displayPlayerChoice.style.color = playerColor;
    displayComputerChoice.style.color = computerColor;
}
function getColorForChoice(choice) {
    switch (choice) {
        case Choice.Fire:
            return '#c2220a';
        case Choice.Water:
            return '#0a72c2';
        case Choice.Earth:
            return '#269d0a';
        default:
            return '';
    }
}
function getOutcomeMessage(element, user) {
    if (element) {
        switch (element) {
            case Choice.Fire:
                console.log('Fire selected');
                return user === 'win' ? 'Your flames dance victoriously!' : 'You got extinguished!';
            case Choice.Water:
                console.log('Water selected');
                return user === 'win' ? 'Your waves triumphantly flow!' : 'You got aborbed!';
            case Choice.Earth:
                console.log('Earth selected');
                return user === 'win' ? 'Thanks for the water!' : 'You got burned!';
            default:
                return '';
        }
    }
}
function endTheGame() {
    // put endgame message
    displayEndMessage.textContent =
        game.playerLives > game.computerLives ? `Congratulations! You win with ${game.playerLives} lives!` : `You lost! Opponent had ${game.computerLives} lives!`;
    playAgainButton.classList.remove('hidden');
    // reset game
    playAgainButton.addEventListener('click', () => {
        window.location.reload();
    });
}
// start game
buttonsHolder.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('button')) {
        playRound(target.id);
    }
});
