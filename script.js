// sounds
const turn = new Audio("sounds/turn.wav");
const eat = new Audio("sounds/eat.wav");
const gameOver = new Audio("sounds/gameover.wav");
let snakeAr = [{ x: 13, y: 15 }];
let food = { x: 9, y: 9 };
let speed = 15;
let lastTIme = 0;
let direction = { x: 0, y: 0 };
let score = 0;

// functions
function main(time) {
  window.requestAnimationFrame(main);
  // console.log(time)
  if ((time - lastTIme) / 1000 < 1 / speed) {
    return;
  }
  lastTIme = time;
  runGame();
}

function limits(snake) {
  // bump into snake's body
  for (let i = 1; i < snakeAr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // border of the grid collision
  if (
    snakeAr[0].x >= 17 ||
    snakeAr[0].x <= 0 ||
    snakeAr[0].y >= 17 ||
    snakeAr[0].y <= 0
  ) {
    return true;
  }
}

function runGame() {
  // console.log(food)

  // limiting the location of the snake
  if (limits(snakeAr)) {
    gameOver.play();
    direction = { x: 0, y: 0 };
    alert("GAME OVER, Press any key to play again");
    snakeAr = [{ x: 13, y: 15 }];
    score = 0;
    scoreContainer.innerHTML = "Score: " + score;
  }

  // After eating the food, bring more food
  if (snakeAr[0].y === food.y && snakeAr[0].x === food.x) {
    score += 1;

    // high score
    if (score > highScoreValue) {
      highScoreValue = score;
      localStorage.setItem("topScore", JSON.stringify(highScoreValue));
      highScore.innerHTML = "High Score: " + highScoreValue;
    }

    scoreContainer.innerHTML = "Score: " + score;
    eat.play();
    // console.log("contact made")
    snakeAr.unshift({
      x: snakeAr[0].x + direction.x,
      y: snakeAr[0].y + direction.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.floor(Math.random() * 16) + 1,
      y: Math.floor(Math.random() * 16) + 1,
    };
  }

  // adding  to the snake
  for (let i = snakeAr.length - 2; i >= 0; i--) {
    snakeAr[i + 1] = { ...snakeAr[i] };
  }

  snakeAr[0].x += direction.x;
  snakeAr[0].y += direction.y;

  // render the snake and the food
  board.innerHTML = "";
  snakeAr.forEach((f, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = f.x;
    snakeElement.style.gridRowStart = f.y;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // show the food on the grid
  elementFood = document.createElement("div");
  elementFood.style.gridColumnStart = food.x;
  elementFood.style.gridRowStart = food.y;
  elementFood.classList.add("food");
  board.appendChild(elementFood);
}

// high score using local storage
let topScore = localStorage.getItem("topScore");
if (topScore === null) {
  highScoreValue = 0;
  localStorage.setItem("highScoreValue", JSON.stringify(highScoreValue));
} else {
  highScoreValue = JSON.parse(topScore);
  highScore.innerHTML = "High Score: " + topScore;
}

// check if there are any keys pressed down
window.addEventListener("keydown", (k) => {
  direction = { x: 0, y: 1 }; //initiate the game
  switch (k.key) {
    case "ArrowUp":
      // console.log("ArrowUp");
      direction.x = 0;
      direction.y = -1;
      turn.play();
      break;

    case "ArrowDown":
      // console.log("ArrowDown");
      direction.x = 0;
      direction.y = 1;
      turn.play();
      break;

    case "ArrowLeft":
      // console.log("ArrowLeft");
      direction.x = -1;
      direction.y = 0;
      turn.play();
      break;

    case "ArrowRight":
      // console.log("ArrowRight");
      direction.x = 1;
      direction.y = 0;
      turn.play();
      break;

    default:
      break;
  }
});

// // setup game loop
// // using this animation method frame minimizes fps loss
window.requestAnimationFrame(main);
