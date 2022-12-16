const game = new Game("canvas-test");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const introGame = document.getElementById("intro");
const gameOverScreen = document.getElementById("game-over");

startBtn.addEventListener("click", () => {
  introGame.classList.add("hidden");
  startBtn.classList.add("hidden");
  game.start();
});

restartBtn.addEventListener("click", () => {
  gameOverScreen.classList.add("hidden");
  game.start();
});

document.addEventListener("keydown", function (event) {
  game.onKeyDown(event);
});

document.addEventListener("keyup", function (event) {
  game.onKeyUp(event);
});
