export class Physics {
    constructor(gravity) {
        this.gravity = gravity;
    }

    applyGravity(object) {
        object.y += object.velocityY;
        object.velocityY += this.gravity;

        // Max fade velocity
        if (object.velocityY > 10) {
            object.velocityY = 10;
        }
    }

    jump(object) {
        if (object.onGround) {
            object.velocityY = -15; // Jump height
            object.onGround = false;
            object.jumpSound.play(); // Sound effect
        }
    }

    move(object, direction) {
        object.x += direction * 5; // Movement speed
        if (object.x < 0) {
            object.x = 0; // Left Border
        }
        if (object.x + object.width > 800) {
            object.x = 800 - object.width; // Right border
        }
    }

    checkCollision(object, platforms) {
        object.onGround = false;
        for (const platform of platforms) {
            if (object.x < platform.x + platform.width &&
                object.x + object.width > platform.x &&
                object.y + object.height <= platform.y + platform.height &&
                object.y + object.height + object.velocityY >= platform.y) {
                object.y = platform.y - object.height; // Put on platform
                object.velocityY = 0;
                object.onGround = true;
            }
        }
    }

    checkEnemyCollision(character, enemies) {
        for (const enemy of enemies) {
            if (character.x < enemy.x + enemy.width &&
                character.x + character.width > enemy.x &&
                character.y < enemy.y + enemy.height &&
                character.y + character.height > enemy.y) {
                return true; // Collisions to borders and enemies
            }
        }
        return false; // No collisions
    }
}
