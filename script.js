const playButton = document.querySelector('.play');
const documentText = document.querySelector('.text');
const documentScore = document.querySelector('.score');
const keysDiv = document.querySelector('.keys');
const documentBg = document.querySelector('body');

const addKeyControls = (event) => {
  const choice = event.target.dataset.choice;
  if (choice !== undefined) {
    playGame(choice);
  }
};

const startGame = () => {
  playButton.style.display = 'none';
  while (keysDiv.firstChild) {
    keysDiv.removeChild(keysDiv.firstChild);
  }

  const rockBtn = document.createElement('button');
  rockBtn.textContent = 'Rock';
  rockBtn.setAttribute('data-choice', 'rock');

  const paperBtn = document.createElement('button');
  paperBtn.textContent = 'Paper';
  paperBtn.setAttribute('data-choice', 'paper');

  const scisBtn = document.createElement('button');
  scisBtn.textContent = 'Scissors';
  scisBtn.setAttribute('data-choice', 'scissors');

  keysDiv.appendChild(rockBtn);
  keysDiv.appendChild(paperBtn);
  keysDiv.appendChild(scisBtn);

  keysDiv.addEventListener('click', addKeyControls);
};

const scoreKeeper = {
  pcScore: 0,
  playerScore: 0,
};

const endGame = (result) => {
  if (result === 'victory') {
    documentText.innerHTML = 'You are the winner!';
  } else if (result === 'defeat') {
    documentText.innerHTML = 'You have been defeated.';
  }
  while (keysDiv.firstChild) {
    keysDiv.removeChild(keysDiv.firstChild);
  }

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Play again!';
  resetBtn.classList.add('play');
  keysDiv.appendChild(resetBtn);
  const resetGame = () => {
    scoreKeeper.pcScore = 0;
    scoreKeeper.playerScore = 0;
    documentScore.innerHTML = (`Score: You ${scoreKeeper.playerScore} : PC ${scoreKeeper.pcScore}`);
    documentText.textContent = ('Rock, Paper, Scissors');
    resetBtn.textContent = ('Play');
    resetBtn.removeEventListener('click', resetGame);
    keysDiv.removeEventListener('click', addKeyControls);
    resetBtn.addEventListener('click', () => startGame());
  };
  resetBtn.addEventListener('click', resetGame);

  documentBg.classList.toggle(result);
  setTimeout(() => {
    documentBg.classList.toggle(result);
  }, 3000);
};

playButton.addEventListener('click', () => startGame());

const getComputerChoice = () => {
  const value = Math.floor(Math.random() * 3);
  let result = '';
  switch (value) {
    case 0:
      result = 'rock';
      break;
    case 1:
      result = 'paper';
      break;
    case 2:
      result = 'scissors';
      break;
    default:
      throw new Error("Something has gone wrong generating the computer's result.");
  }
  return result;
};

const capitalize = (string) => {
  let newString = string.toLowerCase();
  newString = newString.replace(newString[0], newString[0].toUpperCase());
  return newString;
};

function playGame(playerSelection) {
  function playRound() {
    const computerSelection = getComputerChoice();
    const announce = (x) => {
      if (x === 'draw') {
        documentText.innerHTML = (`It's a draw!<br>You both chose ${playerSelection}.`);
      } else if (x === 'lose') {
        documentText.innerHTML = (`You lose!<br>${capitalize(computerSelection)} beats ${playerSelection}.`);
        scoreKeeper.pcScore += 1;
      } else if (x === 'win') {
        documentText.innerHTML = (`You win!<br>${capitalize(playerSelection)} beats ${computerSelection}.`);
        scoreKeeper.playerScore += 1;
      } else {
        documentText.innerHTML = ('You must choose paper, rock, or scissors.');
      }
    };
    if (playerSelection === computerSelection) {
      announce('draw');
    } else if ((playerSelection === 'paper' && computerSelection === 'rock')
                || (playerSelection === 'rock' && computerSelection === 'scissors')
                || (playerSelection === 'scissors' && computerSelection === 'paper')) {
      announce('win');
    } else if ((playerSelection === 'rock' && computerSelection === 'paper')
                || (playerSelection === 'scissors' && computerSelection === 'rock')
                || (playerSelection === 'paper' && computerSelection === 'scissors')) {
      announce('lose');
    } else {
      announce();
    }
  }
  playRound();
  documentScore.innerHTML = (`Score: You ${scoreKeeper.playerScore} : PC ${scoreKeeper.pcScore}`);
  if (scoreKeeper.playerScore === 5) {
    endGame('victory');
  } else if (scoreKeeper.pcScore === 5) {
    endGame('defeat');
  }
}
