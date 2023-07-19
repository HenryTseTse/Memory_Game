document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll(".color-card");
  let card1 = null;
  let card2 = null;
  let cardsFound = 0;
  let stopClick =  false;
  let currentScore = 0;
  let lowScore = localStorage.getItem("low-score");

  if (lowScore) {
    document.getElementById("low-score").innerText = "High Score: " + lowScore;
  }

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "yellow",
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "yellow",
  ];

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want to research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card

  function createDivsForColors(colorArray) {
    for (let i = 0; i < colorArray.length; i++) {

      // give it a class attribute for the value we are looping over
      cards[i].classList.add(colorArray[i])

      // call a function handleCardClick when a div is clicked on
      cards[i].addEventListener("click", handleCardClick);

    }
  }

  // TODO: Implement this function!
  function handleCardClick(event) {
    if (stopClick) return;
    // you can use event.target to see which element was clicked
    console.log("you just clicked", event.target);
    currentCard = event.target;
    currentCard.style.backgroundColor = currentCard.classList[1];

    if (!card1 || !card2) {
      setScore(currentScore + 1);
      card1 = card1 || currentCard;
      card2 = currentCard === card1 ? null : currentCard; 
      //checks if card1 is clicked twice
    }
    
    if (card1 && card2) {
      stopClick = true;
      let color1 = card1.className;
      let color2 = card2.className;

      if (color1 === color2) {
        cardsFound += 2;
        console.log("found one pair")
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
        stopClick = false;
      } else {
        setTimeout(function() {
          card1.style.backgroundColor = "";
          card2.style.backgroundColor = "";
          card1 = null;
          card2 = null;
          stopClick = false;
        }, 1000);
      }
    }

    if (cardsFound === COLORS.length) {
      let end = document.getElementById("end");
      setHighScore(currentScore);
      document.getElementById("end-score").innerText = "Score: " + currentScore;
      document.getElementById("end").classList.add("game-over");
  }
  }

  function setHighScore(newScore) {
    let lowScore = +localStorage.getItem("low-score") || Infinity;
    if (newScore < lowScore) {
      localStorage.setItem("low-score", newScore);
      document.getElementById("low-score").innerText = "High Score: " + lowScore;
    }
  }

  function setScore(newScore) {
    currentScore = newScore;
    document.getElementById("cur-score").innerText = "Score: " + currentScore;
  }
  // when the DOM loads
  createDivsForColors(shuffledColors);
});