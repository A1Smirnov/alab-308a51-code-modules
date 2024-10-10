import { Sprite, Enemy } from './sprites.js';
import { Physics } from './physics.js';

export class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.background = new Sprite('./assets/background.jpg', 0, 0, canvas.width, canvas.height);
        this.character = new Sprite('./assets/character.png', 50, 300, 50, 50);
        this.character.jumpSound = new Audio('./assets/jump.mp3'); // Jump sound
        this.gameOverSound = new Audio('./assets/game-over.mp3'); // Game over sound
        this.platforms = [{ x: 0, y: 350, width: 800, height: 20 }];
        this.enemies = [new Enemy('./assets/enemy.png', 100, 300, 50, 50, 2)];
        this.physics = new Physics(0.5); // Gravity
        this.character.velocityY = 0;
        this.character.onGround = false;

        this.backgroundMusic = new Audio('./assets/music.mp3'); // Background music
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.1; // Background music volume

        window.addEventListener('keydown', (event) => { // Jump (arrowUp)
            if (event.code === 'ArrowUp') {
                this.physics.jump(this.character);
            } else if (event.code === 'ArrowLeft') {
                this.physics.move(this.character, -1); // Move left
            } else if (event.code === 'ArrowRight') {
                this.physics.move(this.character, 1); // Move Right
            }
        });

        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        this.backgroundMusic.play(); // Play Music
        this.loop();
    }

    loop() {
        if (this.isRunning) {
            this.update();
            this.render();
            requestAnimationFrame(() => this.loop());
        }
    }

    update() {
        this.physics.applyGravity(this.character);
        this.physics.checkCollision(this.character, this.platforms);

        // Update enemies
        for (const enemy of this.enemies) {
            enemy.update();
        }

        // Collides with Enemies validation
        if (this.physics.checkEnemyCollision(this.character, this.enemies)) {
            this.isRunning = false; // Game stop after collision to enemy
            this.gameOverSound.play(); // Game over sound
            alert('Game Over!');
        }

        // Validation out of bound
        if (this.character.y > 400) {
            this.isRunning = false; // Game stop after fall in leap
            this.gameOverSound.play(); // Game over sound
            alert('Game Over!');
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.background.draw(this.ctx); // Background drawing
        this.character.draw(this.ctx);
        this.platforms.forEach(platform => {
            this.ctx.fillStyle = '#8B4513'; // Platform color
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        });
        this.enemies.forEach(enemy => enemy.draw(this.ctx)); // Enemy drawing
    }
}
