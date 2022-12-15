const game = new Game("canvas-test");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const introGame = document.getElementById("intro");

startBtn.addEventListener("click", () => {
  introGame.classList.add("hidden");
  startBtn.classList.add("hidden");
  game.start();
});

restartBtn.addEventListener("click", () => {
  document.location.reload();
});

document.addEventListener("keydown", function (event) {
  game.onKeyDown(event);
});

document.addEventListener("keyup", function (event) {
  game.onKeyUp(event);
});
