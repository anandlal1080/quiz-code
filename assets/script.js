const startBtn = document.querySelector("#start");
const startPrompt = document.querySelector("#start-prompt");
const questionContainer = document.querySelector("#question-container");
const questionText = document.querySelector("#question-text");
const answerDiv = document.querySelector("#answers");
const showResult = document.createElement("p");
const formContainer = document.querySelector("#form");
let finalResult = document.querySelector("#final-result");

let timer = document.querySelector(".timer");
let time = document.querySelector("#time");
let score = 0;
let losstime = 10;
let timeTotal = 75;
time.textContent = `${timeTotal} seconds left`;


const questions = [
    {
        text: "	What is the name of the German airline?",
        answers: ["Lufthansa", "German Wings", "Easy Jet", "Sauerkraut"],
        correctIndex: 0,
    },
    {
        text: "	In which European city can you find the home of Anne Frank?",
        answers: ["Paris", "Vienna", "Amsterdam", "Berlin"],
        correctIndex: 2,
    },
    {
        text: "	How many stars has the American flag got?",
        answers: ["50", "48", "52", "46"],
        correctIndex: 0,
    },
    {
        text: "	Who invented Ferrari?",
        answers: ["Henry Ford", "Enzo Ferrari", "Alfieri Maserati", "Nicola Romeo"],
        correctIndex: 1,
    },
    {
        text: "	What is both a French wine region and a luxury American automobile?",
        answers: ["Lincoln", "Napa", "Chevy", "Cadillac"],
        correctIndex: 3,
    }
];
let questionIndex = 0;



answerDiv.addEventListener("click", handleAnswerClick);
startBtn.addEventListener("click", handleStartClick);

function handleStartClick(e) {
    
    startPrompt.style.display = "none";
    questionContainer.style.display = "block";

    let currentQuestion = questions[questionIndex];
    questionText.textContent = currentQuestion.text;

    renderQuestion();
    startTimer();
   
};




function handleAnswerClick(e) {
    e.preventDefault();

    if (!e.target.matches("button")) return;      
    

    const userAnswer = e.target.textContent;

    const question = questions[questionIndex];

    const correctAnswer = question.answers[question.correctIndex];


    
    showResult.setAttribute("id", "showResult");
    
    if (userAnswer === correctAnswer) {
        //score++;
        showResult.textContent = "Correct!";
        questionContainer.appendChild(showResult);
        
    } else{
        
        timeTotal = timeTotal - losstime;
        showResult.textContent = "Wrong!";
        questionContainer.appendChild(showResult);
    }

    questionIndex++;
   
    if (questionIndex == questions.length) {  
        gameOver();

    }
    else {
        showResult.innerHTML = "";
        renderQuestion();
    }
        
         
    
    
}

function renderQuestion() {

    const currentQuestion = questions[questionIndex];

    questionText.textContent = currentQuestion.text;

    answerDiv.innerHTML = "";
    

    for (let i = 0; i < currentQuestion.answers.length; i++) {
        const answer = currentQuestion.answers[i];

        const btn = document.createElement("button");

        btn.setAttribute("class", "btn btn-primary");

        btn.textContent = answer;

        answerDiv.appendChild(btn);
        
    }
    
}

function gameOver() {

    questionContainer.style.display = "none";
    formContainer.style.display = "block";
    timer.style.display = "none";
    finalResult.textContent = `${score}`;


    
}

function startTimer() {
    setInterval(function() {
        if(timeTotal > 0) {
            timer.textContent = `${timeTotal} seconds left`;
            timeTotal--;
            score = timeTotal;
        } else {
            timer.textContent = " Your time is over!"
        }
    }, 1000);
}