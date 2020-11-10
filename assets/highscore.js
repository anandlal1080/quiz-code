// Initializing variables needed for this script.
let highScores = JSON.parse(window.localStorage.getItem("leaderBoard")) || [];
const clearScores = document.getElementById("clearscores");
var leaderBoard = document.getElementById("leaderboard");

// This assigns the eraseBoard function to the click of the erase button
clearScores.addEventListener("click", eraseBoard);
addPersonToList();

// this function clears the local storage when the user hits the Clear Scores button
function eraseBoard(e) {
    e.preventDefault();
    localStorage.clear();
    leaderBoard.textContent = "";
    
}
// This function adds new scores and initials to the leaderboard as well as sorts it from the highest to lowest.
function addPersonToList(e) {
    
    highScores.sort(function (a,b) {
        return b.userscore - a.userscore;
    });
    
    for (let i = 0; i < highScores.length; i++) {
        
        var li = document.createElement("li");
        li.setAttribute("class", "scoreRow");
        li.textContent = `${highScores[i].init}:${highScores[i].userscore}`;
        leaderBoard.appendChild(li);
    }

  }
  