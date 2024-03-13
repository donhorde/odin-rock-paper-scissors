const playButton = document.querySelector(".play");
const documentText = document.querySelector(".text");

playButton.addEventListener("click", () => playRound());

const getComputerChoice = () => {
    const value = Math.floor(Math.random() * 3);
    let result = "";
    switch (value) {
        case 0:
            result = "rock";
            break;
        case 1:
            result = "paper";
            break;
        case 2:
            result = "scissors";
            break;
        default:
            throw new Error("Something has gone wrong generating the computer's result.");
    }
    return result;
}

function playRound(playerSelection, computerSelection){
    let result = "";
    let userInput = prompt("Rock, Paper, Scissors?");
    playerSelection = userInput.toLowerCase();
    computerSelection = getComputerChoice();
    const announce = x => {
        if (x === "draw") {
            documentText.innerHTML = (`It's a draw! You both chose ${playerSelection}`);
        } else if (x === "lose") {
            documentText.innerHTML = (`You lose! You chose ${playerSelection}, PC chose ${computerSelection}`);
        } else if (x === "win") {
            documentText.innerHTML = (`You win! You chose ${playerSelection}, PC chose ${computerSelection}`);
        } else {
            documentText.innerHTML = ("You must choose paper, rock, or scissors.");
        }
    }
    if (playerSelection === computerSelection) {announce("draw");}
    else if  (playerSelection === "paper" && computerSelection === "rock" ||
              playerSelection === "rock" && computerSelection === "scissors" ||
              playerSelection === "scissors" && computerSelection === "paper") {announce("win");}
    else if  (playerSelection === "rock" && computerSelection === "paper" ||
              playerSelection === "scissors" && computerSelection === "rock" ||
              playerSelection === "paper" && computerSelection === "scissors") {announce("lose");}
    else {announce()};
}