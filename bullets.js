class Bullet {
  constructor(ctx, x, y, size) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;

    this.img = new Image();
    this.img.src = "./images/bullets.png";
    this.isReady = false;
    this.img.onload = () => {
      this.isReady = true;
    };

    this.speed = 6;
  }

  draw() {
    if (this.isReady) {
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.size,
        (this.size * this.img.height) / this.img.width
      );
    }
  }
  move(bgSpeed = 0) {
    const speed = bgSpeed + this.speed;
    this.x += speed;
  }

  isColliding(obj) {
    return (
      this.x < obj.x + obj.width &&
      this.x + this.size > obj.x &&
      this.y < obj.y + obj.width &&
      this.y + this.size > obj.y
    );
  }
}
