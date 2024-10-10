export class Sprite {
    constructor(imageSrc, x, y, width, height) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Enemy extends Sprite {
    constructor(imageSrc, x, y, width, height, speed) {
        super(imageSrc, x, y, width, height);
        this.speed = speed;
        this.direction = 1; // Movement direction
    }

    update() {
        this.x += this.speed * this.direction;
        if (this.x < 0 || this.x + this.width > 800) {
            this.direction *= -1; // Change of moving direction
        }
    }
}
