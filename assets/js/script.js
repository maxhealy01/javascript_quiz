var timerEl = document.getElementById('countdown');
var startBtn = document.getElementById('start');
var mainEl = document.querySelector('#main');
var promptEl = document.queryCommandEnabled('prompt');
var i = 0;
var score = 0;
var timeLeft = 75;
var lastResponse = 0;
var highScore1 = [0,0];
var highScore2 = [0,0];
var highScore3 = [0,0];

var questions = [
    {
        question: "Which of the following is not a valid way to declare a function in JavaScript?",
        answers: ["var myFunction = function (){}","function myFunction(){}","function = var myFunction(){}"],
        correct: 2
    },
    {
        question: "Which of the following is not a data type in JavaScript?",
        answers: ["string","item","number","object"],
        correct: 1
    },
    {
        question: "Are you?",
        answers: ["Okay", "Time","livin","dreas"],
        correct: 1
    }
]

var clearMain = function() {
    while (mainEl.firstChild) {
        mainEl.removeChild(mainEl.firstChild);
}}

function countdown() {
    timerEl.textContent = "Time: " + timeLeft;
  
    //begin timer from 75
    var timeInterval = setInterval(function() {
      if (timeLeft === 0) {
        timerEl.textContent = "";
        clearInterval(timeInterval);
      }
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft --;
    }, 1000);

    //populate question area
    createQuestion();
  };

var createQuestion = function() {
    // empty the main section of all child elements
    clearMain();
    
    var questionContainerEl = document.createElement("div");
    questionContainerEl.className = "question";
    mainEl.appendChild(questionContainerEl);

    var questionEl = document.createElement("h2");
    questionEl.textContent = questions[i].question;
    questionContainerEl.appendChild(questionEl);
    for (j=0; j < questions[i].answers.length; j++) {
        var answerEl = document.createElement("button");
        answerEl.setAttribute("value", j);
        answerEl.className = "btn";
        answerEl.onclick = nextQuestion;
        answerEl.textContent = questions[i].answers[j];
        questionContainerEl.appendChild(answerEl);
    };

    // Provide feedback regarding the last response
    if (lastResponse === true) {
        var feedback = document.createElement("h4");
        feedback.textContent = "Correct!";
        questionContainerEl.appendChild(feedback);
    } else if (lastResponse === false) {
        var feedback = document.createElement("h4");
        feedback.textContent = "Wrong";
        questionContainerEl.appendChild(feedback);
    }
}

var nextQuestion = function(event) {
    // Score the previous response
    response = event.target.value;
    if (response - questions[i].correct === 0) {
        score += 1;
        lastResponse = true;
    } else {
        timeLeft -= 10;
        lastResponse = false;
    }
    // If the last question has been answered, start the submit score function
    if (i === questions.length - 1) {
        submitScore();
        return;
    }
    // Iterate to the next question in the array
    i++;
    createQuestion();
}

var submitScore = function() {
    clearMain();
    timerEl.remove();
    
    // Create the text to notify user the game is over
    var doneEl = document.createElement("h2");
    doneEl.textContent = "You're done!"
    mainEl.appendChild(doneEl);

    var finalScoreEl = document.createElement("h3");
    finalScoreEl.textContent = "Your final score is " + score + ".";
    doneEl.appendChild(finalScoreEl);

    // Create prompt and button
    var initialsEl = document.createElement("div");
    initialsEl.innerHTML = "<h3>Enter initials: <input type='text' name='input' class='text-input' placeholder='Enter initials here'/></h3>";
    finalScoreEl.appendChild(initialsEl);

    var submitBtn = document.createElement("button");
    submitBtn.className = "btn";
    submitBtn.id = "submit";
    submitBtn.textContent = "Submit High Score"
    initialsEl.appendChild(submitBtn);

    // Launch the function to submit high score
    submitBtn.onclick = function(event){
        // Save input as a variable
        var initialsStore = document.querySelector("input[name='input']").value;

        clearMain();
        // See if the score beats the lowest high score
        if (score <= highScore3[1]) {
            var notHigh = document.createElement("h3");
            notHigh.textContent = "You did not beat the high score. Try again!"
            mainEl.appendChild(notHigh);

            var tryAgain = document.createElement("button");
            tryAgain.textContent = "Try again!";
            tryAgain.className = "btn";
            notHigh.appendChild(tryAgain);
            i = 0;
            score = 0;
            tryAgain.onclick = createQuestion;
        }
        // If it does, reset the values of all the high scores
        else {
            var newScore = [initialsStore,score];
            //if (localStorage.getItem()
            if (score > highScore1[1]) {
                highScore3 = localStorage.getItem("highScore2");
                highScore2 = localStorage.getItem("highScore1");
                highScore1 = newScore;
                localStorage.setItem("highScore3",JSON.stringify(highScore3));
                localStorage.setItem("highScore2", JSON.stringify(highScore2));
                localStorage.setItem("highScore1", JSON.stringify(newScore));
            }
            else if (score > highScore2[1]) {
                highScore3 = localStorage.getItem("highScore2");
                highScore2 = newScore;
                localStorage.setItem("highScore2", JSON.stringify(highScore2));
                localStorage.setItem("highScore3",JSON.stringify(highScore3))
            }
            else if (score > highScore3[1]) {
                highScore3 = newScore;
                localStorage.setItem("highScore3", JSON.stringify(highScore3));
            }
            showScores();
        }
    }
}

var showScores = function() {
    clearMain();
    var scoreContainer = document.createElement("div");
    mainEl.appendChild(scoreContainer);

    var scoreEl = document.createElement("h3");
    var highScore1 = JSON.parse(localStorage.getItem("highScore1"));
    scoreEl.textContent = highScore1[0] + " " + highScore1[1];
    scoreContainer.appendChild(scoreEl);
    
    var scoreEl2 = document.createElement("h3");
        var highScore2 = JSON.parse(localStorage.getItem("highScore2"));
        scoreEl2.textContent = highScore2[0] + " " + highScore2[1];
        scoreContainer.appendChild(scoreEl2);

        var scoreEl3 = document.createElement("h3");
        var highScore3 = JSON.parse(localStorage.getItem("highScore3"));
        scoreEl3.textContent = highScore3[0] + " " + highScore3[1];
        scoreContainer.appendChild(scoreEl3);

   /* if (localStorage.getItem("highScore1")) {
        var scoreEl = document.createElement("h3");
        var highScore1 = JSON.parse(localStorage.getItem("highScore1"));
        scoreEl.textContent = highScore1[0] + " " + highScore1[1];
        scoreContainer.appendChild(scoreEl);
        console.log(highScore1, highScore2, highScore3)
    }
    if (localStorage.getItem("highScore2")) {
        var scoreEl2 = document.createElement("h3");
        var highScore2 = JSON.parse(localStorage.getItem("highScore2"));
        scoreEl2.textContent = highScore2[0] + " " + highScore2[1];
        scoreContainer.appendChild(scoreEl2);
    }
    if (localStorage.getItem("highScore3")) {
        var scoreEl3 = document.createElement("h3");
        var highScore3 = JSON.parse(localStorage.getItem("highScore3"));
        scoreEl3.textContent = highScore3[0] + " " + highScore3[1];
        scoreContainer.appendChild(scoreEl3);
}*/}

startBtn.onclick = countdown;

