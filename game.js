class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.prisoner = new Prisoner(this.ctx, 570, 490);
    this.bg = new Background(this.ctx);
    this.guards = [];
    this.bullets = [];
    this.score = 0;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.draw();
      this.move();
    }, 1000 / 60);
  }

  draw() {
    this.bg.draw();
    this.bullets.forEach(bullet => bullet.draw());
    this.prisoner.draw();
  }

move() {
  this.bg.move();
  this.bullets.forEach(bullet => bullet.move());
  this.prisoner.move()
}
clear() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
onKeyDown(event) {
  this.prisoner.onKeyDown(event);
  this.bg.onKeyEvent(event);

  if (event.keyCode === 32) {
    event.preventDefault();
    this.bullets.push(new Bullet(this.ctx, this.prisoner.x, this.prisoner.y + 25, 30));
}
}

onKeyUp(event) {
  this.prisoner.onKeyUp(event);
  this.bg.onKeyEvent(event);
}
}