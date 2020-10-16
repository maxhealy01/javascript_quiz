var timerEl = document.getElementById('countdown');
var startBtn = document.getElementById('start');
var mainEl = document.querySelector('#main');
var promptEl = document.queryCommandEnabled('prompt');
var i = 0;
var score = 0;
var questions = [
    {
        question: "Am I a question?",
        answers: ["Am I correct","Or me?","Must be!","Never ever"],
        correct: 3
    },
    {
        question: "Nah bro",
        answers: ["Cool","Fine","Chili","Gracias"],
        correct: 2
    },
    {
        question: "Are you?",
        answers: ["Okay", "Time","livin","dreas"],
        correct: 1
    }
]

function countdown() {
    var timeLeft = 75;
  
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
    populate();
  };
var nextquestion = function(questions) {

    i++;
    populate(questions);
}
var populate = function(event) {
    // Remove old text from question area
    document.getElementById("start").remove();
    document.getElementById("quiz-title").textContent="";
    document.getElementById("quiz-descript").textContent="";
    //create a DIV to hold question and answers
    var questionContainerEl = document.createElement("div");
    questionContainerEl.className = "question";
    mainEl.appendChild(questionContainerEl);

    var questionEl = document.createElement("h2");
    questionEl.textContent = questions[i].question;
    questionContainerEl.appendChild(questionEl);
    for (j=0; j < questions[i].answers.length; j++) {
        var answerEl = document.createElement("button");
        answerEl.className = "answerBtn" + j;
        answerEl.textContent = questions[i].answers[j];
        questionContainerEl.appendChild(answerEl);
    };
    var answerBtn = document.getElementsByClassName("answerBtn");
}

startBtn.onclick = countdown;
//startBtn.onclick = populate();
//startBtn.addEventListener("click", populate());
/*mainEl.addEventListener("click", function(event) {
    if (event.target){
    i++;
    populate();
    }
})*/
