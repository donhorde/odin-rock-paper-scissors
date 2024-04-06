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

function startGame() {
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
}

const scoreKeeper = {
  pc: 0,
  player: 0,
};

function endGame(result) {
  if (result === 'victory') {
    documentText.innerHTML = 'You are the winner!';
  } else if (result === 'defeat') {
    documentText.innerHTML = 'You have been defeated.';
  }

  while (keysDiv.firstChild) {
    keysDiv.removeChild(keysDiv.firstChild);
  }

  const toggleBackground = (value) => documentBg.classList.toggle(value);

  toggleBackground(result);
  const toggleBackgroundDelay = setTimeout(() => toggleBackground(result), 3000);

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Play again!';
  resetBtn.classList.add('play');
  keysDiv.appendChild(resetBtn);

  const resetGame = () => {
    scoreKeeper.pc = 0;
    scoreKeeper.player = 0;
    documentScore.innerHTML = (`Score: You ${scoreKeeper.player} : PC ${scoreKeeper.pc}`);
    documentText.textContent = ('Rock, Paper, Scissors');
    resetBtn.textContent = ('Play');

    if (documentBg.classList.contains(result)) {
      clearTimeout(toggleBackgroundDelay);
      toggleBackground(result);
    }

    resetBtn.removeEventListener('click', resetGame);
    keysDiv.removeEventListener('click', addKeyControls);
    resetBtn.addEventListener('click', () => startGame());
  };
  resetBtn.addEventListener('click', resetGame);
}

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

function playGame(playerChoice) {
  function playRound() {
    const computerChoice = getComputerChoice();
    const announce = (result) => {
      switch (result) {
        case 'draw':
          documentText.innerHTML = (`It's a draw!<br>You both chose ${playerChoice}.`);
          break;
        case 'lose':
          documentText.innerHTML = (`You lose!<br>${capitalize(computerChoice)} beats ${playerChoice}.`);
          scoreKeeper.pc += 1;
          break;
        case 'win':
          documentText.innerHTML = (`You win!<br>${capitalize(playerChoice)} beats ${computerChoice}.`);
          scoreKeeper.player += 1;
          break;
        default:
          documentText.innerHTML = ('You must choose paper, rock, or scissors.');
      }
    };
    if (playerChoice === computerChoice) {
      announce('draw');
    } else if ((playerChoice === 'paper' && computerChoice === 'rock')
                || (playerChoice === 'rock' && computerChoice === 'scissors')
                || (playerChoice === 'scissors' && computerChoice === 'paper')) {
      announce('win');
    } else if ((playerChoice === 'rock' && computerChoice === 'paper')
                || (playerChoice === 'scissors' && computerChoice === 'rock')
                || (playerChoice === 'paper' && computerChoice === 'scissors')) {
      announce('lose');
    } else {
      announce();
    }
  }
  playRound();
  documentScore.innerHTML = (`Score: You ${scoreKeeper.player} : PC ${scoreKeeper.pc}`);
  if (scoreKeeper.player === 5) {
    endGame('victory');
  } else if (scoreKeeper.pc === 5) {
    endGame('defeat');
  }
}
