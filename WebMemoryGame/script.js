const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Items array
const items1 = [
  { name: "Ate", image: "images/Ate.png" },
  { name: "Ate", image: "images/Eight.png" },
  { name: "Bare", image: "images/Bare.png" },
  { name: "Bare", image: "images/Bear.png" },
  { name: "Brake", image: "images/Brake.png" },
  { name: "Brake", image: "images/Break.png" },
  { name: "Flavor", image: "images/Flavor.png" },
  { name: "Flavor", image: "images/Flower.png" },
  { name: "Hole", image: "images/Hole.png" },
  { name: "Hole", image: "images/Whole.png" },
  { name: "Mail", image: "images/Mail.png" },
  { name: "Mail", image: "images/Male.png" },
  { name: "Meat", image: "images/Meat.png" },
  { name: "Meat", image: "images/Meet.png" },
  { name: "Pair", image: "images/Pair.png" },
  { name: "Pair", image: "images/Pear.png" },
];
let items2 = [
  { name: "Plain", image: "images/Plain.png" },
  { name: "Plain", image: "images/Plane.png" },
  { name: "Sea", image: "images/Sea.png" },
  { name: "Sea", image: "images/See.png" },
  { name: "Blew", image: "images/Blew.jpg" },
  { name: "Blew", image: "images/Blue.jpg" },
  { name: "Knew", image: "images/Knew.png" },
  { name: "Knew", image: "images/New.jpg" },
  { name: "weak", image: "images/Weak.jpg" },
  { name: "weak", image: "images/Week.jpg" },
  { name: "Know", image: "images/Know.jpg" },
  { name: "Know", image: "images/No.jpg" },
  { name: "Toe", image: "images/Toe.jpg" },
  { name: "Toe", image: "images/Tow.jpg" },
  { name: "Wood", image: "images/Wood.png" },
  { name: "Wood", image: "images/Would.png" },
];
let items3 = [
  { name: "Cell", image: "images/Cell.avif" },
  { name: "Cell", image: "images/Sell.jpg" },
  { name: "Hour", image: "images/Hour.jpg" },
  { name: "Hour", image: "images/Ours.jpg" },
  { name: "Knight", image: "images/Knight.jpg" },
  { name: "Knight", image: "images/Night.jpg" },
  { name: "One", image: "images/One.jpg" },
  { name: "One", image: "images/Won.jpg" },
  { name: "Peace", image: "images/Peace.jpg" },
  { name: "Peace", image: "images/Piece.jpg" },
  { name: "Right", image: "images/Right.jpeg" },
  { name: "Right", image: "images/Write.webp" },
  { name: "Son", image: "images/Son.jpeg" },
  { name: "Son", image: "images/Sun.webp" },
  { name: "Steal", image: "images/Steal.jpg" },
  { name: "Steal", image: "images/Steel.webp" },
];

//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items1 array
const generateRandom = (size = 4) => {
  let randomValue = Math.floor(Math.random() * 3); // Genera un número entre 0 y 2
  switch (randomValue) {
    case 0:
      return [...items1];
      break;
    case 1:
      return [...items2];
      break;
    case 2:
      return [...items3];
      break;
    default:
      console.log("Error: Valor fuera de rango");
  }
  return [...items2];
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  // Mezclar los valores sin duplicarlos
  cardValues.sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }

  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");

          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};