enum Choice {
    Fire = 'fire',
    Water = 'water',
    Earth = 'earth',
}

interface GameState {
    playerLives: number;
    computerLives: number;
    playerSelection?: Choice;
    computerSelection?: Choice;
};

let game: GameState = {
    playerLives: 5,
    computerLives: 5,
};

interface gameResult {
    result: string;
};

const displayPlayerChoice = document.getElementById('player-choice') as HTMLElement;
const displayComputerChoice = document.getElementById('computer-choice') as HTMLElement;
const displayPlayerLives = document.getElementById('player-lives') as HTMLElement;
const displayComputerLives = document.getElementById('computer-lives') as HTMLElement;
const displayComputerResult = document.getElementById('computer-result') as HTMLElement;
const displayPlayerResult = document.getElementById('player-result') as HTMLElement;
const buttonsHolder = document.getElementById('button-holder') as HTMLElement;
const displayEndMessage = document.getElementById('end-message') as HTMLElement;
const playAgainButton = document.getElementById('play-again-button') as HTMLElement;

// Display player and computer lives as 5
displayPlayerLives.textContent += game.playerLives.toString();
displayComputerLives.textContent += game.computerLives.toString();

// Get random selection from computer
function computerPlay(): Choice {
    const randomSelection = Math.floor(Math.random() * 3);
    return Object.values(Choice)[randomSelection] as Choice;
}

// Find out the winner and display to screen
function playRound(playerSelection: Choice): void {
    let computerSelection: Choice = computerPlay(); 
    displayPlayerChoice.textContent = playerSelection?.toString().toUpperCase() ?? '';
    displayComputerChoice.textContent = computerSelection?.toString().toUpperCase() ?? '';
    updateColors(playerSelection, computerSelection);
    // check for end of the game
    if (game.playerLives <= 0 || game.computerLives <= 0) {
        return endTheGame();
    }
    // logic
    if((playerSelection === Choice.Fire && computerSelection === Choice.Earth)||(playerSelection === Choice.Water && computerSelection === Choice.Fire)||(playerSelection === Choice.Earth && computerSelection === Choice.Water)){
        // display updated content
        game.computerLives -= 1;
        displayComputerLives.innerHTML = game.computerLives.toString();
        displayPlayerResult.textContent = `${getOutcomeMessage(playerSelection, 'win')}`;
        displayComputerResult.textContent = `${getOutcomeMessage(computerSelection, 'lose')}`;
    } else if ((computerSelection === Choice.Fire && playerSelection === Choice.Earth)||(computerSelection === Choice.Water && playerSelection === Choice.Fire)||(computerSelection === Choice.Earth && playerSelection === Choice.Water)){
        game.playerLives -= 1;
        displayPlayerLives.innerHTML = game.playerLives.toString();
        displayComputerResult.textContent = `${getOutcomeMessage(computerSelection, 'win')}`;
        displayPlayerResult.textContent = `${getOutcomeMessage(playerSelection, 'lose')}`;
    } else if(playerSelection === computerSelection){
        displayPlayerResult.textContent = 'Tie';
        displayComputerResult.textContent = 'Tie';
    } else {
        displayPlayerResult.textContent = 'Error!';
        displayComputerResult.textContent = 'Error!';
    }

    // check for the end of the game
    if (game.playerLives <= 0 || game.computerLives <= 0) {
        return endTheGame();
    }
}

function updateColors(playerChoice: Choice, computerChoice: Choice) {
    const playerColor = getColorForChoice(playerChoice);
    const computerColor = getColorForChoice(computerChoice);

    displayPlayerChoice.style.color = playerColor;
    displayComputerChoice.style.color = computerColor;
}

function getColorForChoice(choice: Choice): string {
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

function getOutcomeMessage(element: Choice, user: 'win' | 'lose') {
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

function endTheGame(): void {
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
    const target = e.target as HTMLElement;
    if (target.classList.contains('button')) {
        playRound(target.id as Choice);
    }
});


