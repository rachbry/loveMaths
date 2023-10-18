// Wait for the DOM to finish loading before running the Game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
         button.addEventListener("click", function() {
            // 'this' refers to button just clicked
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
         })
    }

    runGame("addition");

})
/**
 * The main game 'loop' called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    // Creates 2 random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}.  Aborting!`;
    }
}
/**
 * Checks the answer against the first element in 
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
    // use .value rather than innerHTML as it is an input
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Well done you got it right!");
    } else {
        alert(`Awww... you answered ${userAnswer}.  The correct answer is ${calculatedAnswer[0]}`);
    }
}

/**
 * Gets the operands(numbers) and the operator(plus, minus etc)
 * directly from the dom and returns the correct answer.
 */
function calculateCorrectAnswer() {
    // parseInt ensures that number is returned as integer not a string
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}.  Aborting!`;
    }

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}

function displaySubtractQuestion() {
    
}

function displayMultiplyQuestion() {
    
} 

function displayDivideQuestion() {
    
}