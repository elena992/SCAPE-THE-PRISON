class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.bg = new Background(this.ctx);
    this.gameOverDiv = document.getElementById("game-over");
  }

  start() {
    this.prisoner = new Prisoner(this.ctx, 270, 440);
    this.guards = [];
    this.bullets = [];
    this.score = 0;
    this.tick = 0;
    this.intervalId = setInterval(() => {
      this.draw();
      this.move();
      this.checkCollisions();

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
    this.drawScore();
    this.guards.forEach((guard) => {
      guard.draw();
    });
  }

  move() {
    this.bg.move();
    this.bullets.forEach((bullet) => bullet.move(this.bg.speed));
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
    this.guards.push(new Guard(this.ctx, this.canvas.width, 440, 100, this.bg));
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

  gameOver() {
    clearInterval(this.intervalId);
    this.gameOverDiv.classList.remove("hidden");
    this.intervalId = null;
    /*this.ctx.fillStyle = "rgba(200, 200, 200, 0.7)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "red";
    this.ctx.font = "50px Goblin One";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Game Over",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );*/
  }

  checkCollisions() {
    const guardsColliding = this.guards.find((guards) =>
      this.prisoner.isColliding(guards)
    );
    if (guardsColliding) {
      this.gameOver();
    }
    const bulletColliding = this.bullets.find((bullet) => {
      const guardColliding = this.guards.find((guard) => {
        return bullet.isColliding(guard);
      });
      if (guardColliding) {
        this.guards.splice(this.guards.indexOf(guardColliding), 1);
        return true;
      }
    });
    if (bulletColliding) {
      console.log("una bala toca al poli");
      this.bullets.splice(this.bullets.indexOf(bulletColliding), 1);
      this.score++;
    }
  }

  drawScore() {
    this.ctx.fillStyle = "yellow";
    this.ctx.font = "40px Arial";
    this.ctx.fillText("Score: " + this.score, 10, 30);
  }
}
