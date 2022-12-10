class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.prisoner = new Prisoner(this.ctx, 570, 490);
    this.bg = new Background(this.ctx);
    this.guards = [];
    this.bullets = [];
    this.score = 0;
    this.tick = 0;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.draw();
      this.move();
      

      this.tick++;
      if (this.tick % 200 === 0) {
        this.addGuards();
      }
    }, 1000 / 60);
  }

  draw() {
    this.bg.draw();
    this.bullets.forEach((bullet) => bullet.draw());
    this.prisoner.draw();
    this.guards.forEach((guard) => {
      guard.draw();
    });
  }

  move() {
    this.bg.move();
    this.bullets.forEach((bullet) => bullet.move());
    this.guards.forEach((guard) => {
      guard.move();
      this.prisoner.move();
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.guards = this.guards.filter((guard) => guard.y < this.canvas.height);
  }

  addGuards() {
    this.guards.push(new Guard(this.ctx, this.canvas.width, 490, 100, this.bg));
    console.log(this.guards);
  }

  onKeyDown(event) {
    this.prisoner.onKeyDown(event);
    this.bg.onKeyEvent(event);

    if (event.keyCode === 32) {
      event.preventDefault();
      this.bullets.push(
        new Bullet(this.ctx, this.prisoner.x, this.prisoner.y + 25, 30)
      );
    }
  }

  onKeyUp(event) {
    this.prisoner.onKeyUp(event);
    this.bg.onKeyEvent(event);
  }

  
}
