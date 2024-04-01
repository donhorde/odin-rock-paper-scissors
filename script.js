const playButton = document.querySelector('.play');
const documentText = document.querySelector('.text');
const documentScore = document.querySelector('.score');
const keysDiv = document.querySelector('.keys');

playButton.addEventListener('click', () => startGame());

const startGame = () => {
  playButton.style.display = 'none';
  keysDiv.removeChild(playButton);

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
};

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

const scoreKeeper = {
  pcScore: 0,
  playerScore: 0,
};

function playGame() {
  function playRound() {
    let playerSelection = prompt('Rock, Paper, Scissors?');
    if (playerSelection !== null) { playerSelection = playerSelection.toLowerCase(); }
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
}
