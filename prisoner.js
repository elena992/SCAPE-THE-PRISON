class Prisoner {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 55;
    this.height = 55;
    this.speed = 0;
    this.gravity = 0;
    this.img = new Image();
    this.img.src = "./images/prisoner.png";
    this.isReady = false;
    this.img.onload = () => {
      this.isReady = true;
    };
    this.isMoving = false;

    this.tick = 0;
  }

  draw() {
    if (this.isReady) {
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
  move() {
    this.speed += this.gravity;
    this.y += this.speed;
  }
  onKeyDown(event) {
    if (event.keyCode === 37 || event.keyCode === 39) {
      this.isMoving = true;
    }
  }
  onKeyUp(event) {
    if (event.keyCode === 37 || event.keyCode === 39) {
      this.isMoving = false;
    }
  }
  isColliding(obj) {
    return (
      this.x < obj.x + obj.width &&
      this.x + this.width > obj.x &&
      this.y < obj.y + obj.width &&
      this.y + this.height > obj.y
    );
  }
}
