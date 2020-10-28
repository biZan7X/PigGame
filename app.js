alert(`GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If the player rolls two 6 in a row, all his GLOBAL score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach Final score on GLOBAL score wins the game`);

var scores, roundScore, activePlayer, previousDice;
var isPlaying; //acts as a state variable.

init();

//eventHandler/Listeners

//roll button
document.querySelector(".btn-roll").addEventListener("click", function () {
   if (isPlaying) {
      //1. Random number
      var dice = Math.floor(Math.random() * 6) + 1;

      //2. Display the results
      var diceDOM = document.querySelector(".dice"); //selecting the image element
      diceDOM.style.display = "block";
      diceDOM.src = "dice-" + dice + ".png";

      //3. Update the round score IF the rolled number was NOT a 1 and no two 6s in a row.
      if (dice !== 1 && !isTwoSix(previousDice, dice)) {
         //Add Score
         roundScore += dice;
         document.querySelector(
            "#current-" + activePlayer
         ).textContent = roundScore;
         previousDice = dice;
      } else if (isTwoSix(previousDice, dice)) {
         //if two 6s in a row.

         //loosing all the current scores.
         scores[activePlayer] = 0;
         document.getElementById("score-" + activePlayer).textContent =
            scores[activePlayer]; //updating the UI.
         nextPlayer();
      } else nextPlayer();
   }
});

//checking if two sixs in a row.
function isTwoSix(prev, cur) {
   if (prev === cur && prev === 6) return true;
   else return false;
}

//hold button
document.querySelector(".btn-hold").addEventListener("click", function () {
   if (isPlaying) {
      //add the current score to the global
      scores[activePlayer] += roundScore;

      //update the UI.
      document.getElementById("score-" + activePlayer).textContent =
         scores[activePlayer];

      var finalScore = document.querySelector(".final-score").value;
      if (!finalScore) {
         finalScore = 20;
         alert(
            "The defualt value of Winning SCORE is set to 20. Please fill in the FINAL SCORE to change :)"
         );
      }

      //check if player won the game.
      if (scores[activePlayer] >= finalScore) {
         document.getElementById("name-" + activePlayer).textContent =
            "Winner !";
         document
            .querySelector(".player-" + activePlayer + "-panel")
            .classList.add("winner");
         document
            .querySelector(".player-" + activePlayer + "-panel")
            .classList.toggle("active");
         document.querySelector(".dice").style.display = "none";
         isPlaying = false;
      } else nextPlayer();
   }
});

//new game
document.querySelector(".btn-new").addEventListener("click", init); //instead of an anonymous function , we are passing a call-back function

//implementing the DRY principle , thats is we are sharing a function for the same functionalites.

//resetting the players
function nextPlayer() {
   //next Player
   activePlayer = activePlayer === 0 ? 1 : 0;
   roundScore = 0;
   previousDice = 0;

   //clearing the current temporary scores.
   document.querySelector("#current-0").textContent = 0;
   document.querySelector("#current-1").textContent = 0;

   //inverting the active player signal.
   document.querySelector(".player-0-panel").classList.toggle("active"); //toggle acts like a not.
   document.querySelector(".player-1-panel").classList.toggle("active");

   /*another way to do it.
document.querySelector('player-0-panel').classList.remove('active');//removes the active class
document.querySelector('player-0-panel').classList.add('active');//add the active class
*/

   //hiding the dice again.
   document.querySelector(".dice").style.display = "none";
}

//initializing
function init() {
   scores = [0, 0];
   roundScore = 0;
   activePlayer = 0;
   previousDice = 0;

   //resetting the final score
   //document.querySelector(".final-score").value = undefined;

   //altering the css
   document.querySelector(".dice").style.display = "None";

   //alternate method to access the DOM , resetting the scores
   document.getElementById("score-0").textContent = "0";
   document.getElementById("score-1").textContent = "0";
   document.getElementById("current-0").textContent = "0";
   document.getElementById("current-1").textContent = "0";

   //resetting the names of the players
   document.getElementById("name-0").textContent = "Player 1";
   document.getElementById("name-1").textContent = "Player 2";

   //removing the winner class
   document.querySelector(".player-0-panel").classList.remove("winner");
   document.querySelector(".player-1-panel").classList.remove("winner");

   //removing the active class
   document.querySelector(".player-0-panel").classList.remove("active");
   document.querySelector(".player-1-panel").classList.remove("active");

   //resetting the active class
   document.querySelector(".player-0-panel").classList.add("active");

   //resetting the playing status
   isPlaying = true;
}
