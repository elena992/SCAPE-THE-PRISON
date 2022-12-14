class Guard {
  constructor(ctx, x, y, width, bg) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 55;
    this.height = 55;
    this.bg = bg;
    this.speed = -this.bg.speed + 3;
    this.img = new Image();
    this.img.src = "./images/guards.png";

    this.isReady = false;
    this.img.onload = () => {
      this.isReady = true;
      this.height = (this.width * this.img.height) / this.img.width;
    };
  }

  draw() {
    if (this.isReady) {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  move() {
    if (this.isReady) {
      this.speed = -this.bg.speed + 3;
      this.x -= this.speed;
    }
  }
}
