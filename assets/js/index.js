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

    // If enter key is pressed then answer submitted
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");

})
/**
 * The main game 'loop' called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
// Clears the answer box every time function is loaded
    document.getElementById("answer-box").value = "";
    // Puts cursor in the answer box
    document.getElementById("answer-box").focus();

    // Creates 2 random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    }

    else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    }

    else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    }

    else if (gameType === "division") {
        displayDivideQuestion(num1, num2);
    }

    else {
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
        let answerMessage="Well done you got it right!"
        document.getElementById("answer-message").innerHTML = answerMessage;
        incrementScore();

        tickOrCross='<i class="fa-solid fa-check" style="color: #11ff00;">';
        document.getElementById("tick-or-cross").innerHTML = tickOrCross;
    } else {
        let answerMessage=(`Awww... you answered ${userAnswer}.  The correct answer is ${calculatedAnswer[0]}`)
        document.getElementById("answer-message").innerHTML = answerMessage;
        incrementWrongAnswer();
        tickOrCross='<i class="fa-solid fa-x" style="color: #ff0000;">';
        document.getElementById("tick-or-cross").innerHTML = tickOrCross;
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
    }

    else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    }

    else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    }

    else if (operator === "/") {
        return [operand1 / operand2, "divide"];
    }

    else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}.  Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
        // This works the same as an if statement just shorter to write
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand1 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivideQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = (operand1 * operand2);
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "/";
}