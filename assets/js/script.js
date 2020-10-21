var timerEl = document.getElementById('countdown');
var startBtn = document.getElementById('start');
var mainEl = document.querySelector('#main');
var promptEl = document.queryCommandEnabled('prompt');
var viewBtn = document.getElementById("view");
var i = 0;
var score = 0;
var timeLeft = 75;
var lastResponse = 0;

// Set three empty high score objects
if (!localStorage.getItem("highScore1")) {
    var highScore1 = {
    in :'AA',
    scr: 0
    }
    localStorage.setItem("highScore1", JSON.stringify(highScore1))
}

if (!localStorage.getItem("highScore2")) {
    var highScore2 = {
    in :'AA',
    scr: 0
    }
    localStorage.setItem("highScore2", JSON.stringify(highScore2))
    }

if (!localStorage.getItem("highScore3")) {
    var highScore3 = {
    in :'AA',
    scr: 0
    }
    localStorage.setItem("highScore3", JSON.stringify(highScore3))
    }

var highScore1 = JSON.parse(localStorage.getItem("highScore1"));
var highScore2 = JSON.parse(localStorage.getItem("highScore2"));
var highScore3 = JSON.parse(localStorage.getItem("highScore3"));

console.log(highScore1,highScore2,highScore3);

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
        question: "What is the correct syntax for referring to an external script called 'abc.js'?",
        answers: ["<script href='abc.js'>", "<script name='abc.js'","<script src='abc.js'","None of the above"],
        correct: 2
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["<js>","<scripting>","<script>","<javascript>"],
        correct: 2
    },
    {
        question: "The _____ method of an Array object adds and/or removes elements from an array.",
        answers: ["Reverse","Shift","Slice","Splice"],
        correct: 3
    },
    {
        question: "Which of the following is the correct syntax to display “GeeksforGeeks” in an alert box using JavaScript?",
        answers: ['alertbox("GeeksforGeeks")','msg("GeeksforGeeks")','msgbox("GeeksforGeeks")','alert("GeeksforGeeks")'],
        correct: 3
    },
    {
        question: "Which of the following is not a reserved word in JavaScript?",
        answers: ["program","interface","throws","short"],
        correct: 0
    },
    {
        question: "How do you find the minimum of x and y using JavaScript?",
        answers: ["min(x,y)","Math.min(x,y)","Math.min(xy)","min(xy)"],
        correct: 1
    },
    {
        question: 'What is the result of the following statement: typeof "x"',
        answers: ["string","number","object","undefined"],
        correct: 0
    },
    {
        question: "Which of these is not a logical operator?",
        answers: ["!","||","&","&&"],
        correct: 2
    },
    {
        question: "The function call Math.ceil(3.5) returns:",
        answers: ["undefined","0","3","4"],
        correct: 3
    },
    {
        question: "What number is the first index of an array?",
        answers: ["1","0"],
        correct: 1
    },
    {
        question: "What is the value of the following expression: 7 % 3",
        answers: ["2","1","4","10"],
        correct: 1
    },
    {
        question: "How do you round the number 4.2 to the nearest whole number?",
        answers: ["Math.round(4.2)","rnd(4.2)","round(4.2)","Math.rnd(4.2)"],
        correct: 0
    },
    {
        question: "Which character represents the assignment operator?",
        answers: ["!","?","#","="],
        correct: 3
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

    if (timeLeft <= 0) {
        submitScore();
        return
    }
    
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
    timeLeft = 0;
    clearMain();
    
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
        if (score <= highScore3.scr) {
            var notHigh = document.createElement("h3");
            notHigh.textContent = "You did not beat the high score. Try again!"
            mainEl.appendChild(notHigh);

            var tryBtn = document.createElement("button");
            tryBtn.textContent = "Try again!";
            tryBtn.className = "btn";
            notHigh.appendChild(tryBtn);
            i = 0;
            score = 0;
            timeLeft = 75;
            tryBtn.onclick = countdown;

        }
        // If it does, reset the values of all the high scores
        else {
            var newScore = {
                in: initialsStore,
                scr: score
            }

            if (score >= highScore1.scr) {
                highScore3.scr = highScore2.scr;
                highScore3.in = highScore2.in;
                highScore2.scr = highScore1.scr;
                highScore2.in = highScore1.in
                highScore1.scr = newScore.scr;
                highScore1.in = newScore.in;
                localStorage.setItem("highScore3", JSON.stringify(highScore3));
                localStorage.setItem("highScore2", JSON.stringify(highScore2));
                localStorage.setItem("highScore1", JSON.stringify(newScore));
            }
            else if (score >= highScore2.scr) {
                highScore3.scr = highScore2.scr;
                highScore3.in = highScore2.in
                highScore2.scr = newScore.scr;
                highScore2.scr = newScore.scr;
                localStorage.setItem("highScore2", JSON.stringify(highScore2));
                localStorage.setItem("highScore3",JSON.stringify(highScore3));
            }
            else if (score > highScore3.scr) {
                highScore3.scr = newScore.scr;
                highScore3.in = newScore.in;
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
    scoreEl.textContent = highScore1.in + " " + highScore1.scr;
    scoreContainer.appendChild(scoreEl);
    
    var scoreEl2 = document.createElement("h3");
    var highScore2 = JSON.parse(localStorage.getItem("highScore2"));
    scoreEl2.textContent = highScore2.in + " " + highScore2.scr;
    scoreContainer.appendChild(scoreEl2);

    var scoreEl3 = document.createElement("h3");
    var highScore3 = JSON.parse(localStorage.getItem("highScore3"));
    scoreEl3.textContent = highScore3.in + " " + highScore3.scr;
    scoreContainer.appendChild(scoreEl3);

    var tryBtn = document.createElement("button");
    tryBtn.textContent = "Try again!";
    tryBtn.className = "btn";
    scoreContainer.appendChild(tryBtn);
    i = 0;
    score = 0;
    timeLeft = 75;
    tryBtn.onclick = countdown;

}

startBtn.onclick = countdown;
viewBtn.onclick = showScores;

