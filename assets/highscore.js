let highScores = JSON.parse(window.localStorage.getItem("leaderBoard")) || [];
const clearScores = document.getElementById("clearscores");
var leaderBoard = document.getElementById("leaderboard");

clearScores.addEventListener("click", eraseBoard);
addPersonToList();

function eraseBoard(e) {
    e.preventDefault();
    localStorage.clear();
    leaderBoard.textContent = "";
    
}

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
  