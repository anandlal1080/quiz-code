//declaring variables needed throughout the script
const startBtn = document.querySelector("#start");
const startPrompt = document.querySelector("#start-prompt");
const questionContainer = document.querySelector("#question-container");
const questionText = document.querySelector("#question-text");
const answerDiv = document.querySelector("#answers");
let showResult = document.createElement("p");
const formContainer = document.querySelector("#form");
const submitBtn = document.querySelector("#submit");
let finalResult = document.querySelector("#final-result");
let timer = document.querySelector(".timer");
let time = document.querySelector("#time");

//Initializing the score, time-loss penalty and starting time variables.
let score = 0;
let losstime = 10;
let timeTotal = 75;
time.textContent = `${timeTotal} seconds left`;

//Array of questions and their corresponding answers.
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

//Initializing the question index to the first element in the array.
let questionIndex = 0;


//Creating the variables to listen for clicks with the Start Button and the Answer button.
answerDiv.addEventListener("click", handleAnswerClick);
startBtn.addEventListener("click", handleStartClick);


//Declaring a function to be called when the user clicks the start buton.
function handleStartClick(e) {
    
    //Hides the Main screen and shows the Question container.
    startPrompt.style.display = "none";
    questionContainer.style.display = "block";

    let currentQuestion = questions[questionIndex];
    questionText.textContent = currentQuestion.text;

    //Calling 2 functions here. renderQuestion to call the next question in the list and startTimer to begin the countdown
    renderQuestion();
    startTimer();
   
};


//This is going to set the arttribute for the showResult variable that creates the p tag from line 7.
showResult.setAttribute("id", "showResult");


//This function determines what happens when the user clicks on any of the ansser button for each question.
function handleAnswerClick(e) {
    e.preventDefault();

    // This check to make sure the user is clicking on a valid answer.
    if (!e.target.matches("button")) return;      
    
    // Declaring a uswerAnswer valriable which is equal to the answer button that the user selected.
    const userAnswer = e.target.textContent;

    // This sets the question to the specific question in the question array.
    const question = questions[questionIndex];

    //This sets teh correct answer to the correct answer from the questions array.
    const correctAnswer = question.answers[question.correctIndex];


    //Here we implement the logic to determine if the user answers are correct and let the user konw if they were correct or wrong.
    
    if (userAnswer === correctAnswer) {
        //score++;
        showResult.textContent = "Correct!";
        questionContainer.appendChild(showResult);
        
    } else{
        
        timeTotal = timeTotal - losstime;
        showResult.textContent = "Wrong!";
        questionContainer.appendChild(showResult);
    }

    //Here we are then incremeting the question Array to the next question.
    questionIndex++;
   
    //This if-else statement checks to see if we are at the end of the question array. If we are, then we call the gameOver function. Else, we render the next question.
    if (questionIndex == questions.length) {  
        gameOver();

    }
    else {
        
        renderQuestion();
    }    
}

//This function will display each question in the array.
function renderQuestion() {

    const currentQuestion = questions[questionIndex];

    questionText.textContent = currentQuestion.text;

    answerDiv.innerHTML = "";
    
// This for loop will iterate through the questions array to display all the questions.
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        const answer = currentQuestion.answers[i];

        const btn = document.createElement("button");

        btn.setAttribute("class", "btn btn-primary");

        btn.textContent = answer;

        answerDiv.appendChild(btn);
        
    }
    
}
// This is the function that get's called when the last question is answered. This function is responsible for hiding the question container, displaying the form to enter initials and displaying the final score.
function gameOver() {

    questionContainer.style.display = "none";
    formContainer.style.display = "block";
    timer.style.display = "none";
    finalResult.textContent = `${score}`;
    submitBtn.addEventListener("click", submitInitials);
    
    
    
}
// This function is responsible for starting the game timer, enforing the time penalty for wrong answers and getting the final score.
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

// This function is to store the user initials on the local storage and the retrieve from local storage.
function submitInitials(e) {
  e.preventDefault();
  let initials = document.querySelector("#fname");
  let initToSend = initials.value;
  let finalData = {
    init: initToSend,
    userscore: finalResult.textContent,
  }
  let highScores = JSON.parse(window.localStorage.getItem("leaderBoard")) || [];
  
  highScores.push(finalData);
  
  localStorage.setItem("leaderBoard", JSON.stringify(highScores));
  

}

