/* global spritesheet Sprite SpriteAnimation */
var Dino = function () {
    this.x = 17;
    this.y = 103;
    this.vy = 0;
    this.width = 20;
    this.height = 47;
    this.jumpForce = 10.5;
    this.gravity = 35;
    
    this.sprites = {
        initial: new Sprite(spritesheet, 40, 4, 44, 45),
        running: new SpriteAnimation(spritesheet, 765, 2, 44, 47, 2, 12),
        ducking: new SpriteAnimation(spritesheet, 941, 19, 59, 31, 2, 10),
        jumping: new Sprite(spritesheet, 677, 2, 44, 47),
        dead: new Sprite(spritesheet, 897, 2, 44, 47)
    };
    
    this.isRunning = false;
    this.isJumping = false;
    this.isDucking = false;
    this.isDead = false;
    this.isDescending = false;
    this.isMovingToPosition = false;
    this.doneMovingToPosition = false;
    
    
    this.update = function (dt) {
        if (this.isDead) return;
        
        if (this.isRunning) {
            this.sprites.running.update(dt);
        }
        if (this.isJumping) {
            this.vy += (this.gravity * dt);
        }
        if (this.isDucking) {
            this.sprites.ducking.update(dt);
        }
        if (this.isDescending) {
            this.vy += (this.gravity * dt) * 5;
            this.isDescending = false;
        }
        if (this.isMovingToPosition) {
            if (this.x < 42) {
                this.x += (62.5 * dt);
            }
            else {
                this.isMovingToPosition = false;
                this.doneMovingToPosition = true;
            }
        }
        
        
        this.y += this.vy;
    };
    this.render = function (ctx) {
        ctx.save();
        ctx.translate(this.x - 12, this.y);
        if (this.isDead)
            this.sprites.dead.render(ctx);
        else if (this.isRunning)
            this.sprites.running.render(ctx);
        else if (this.isJumping)
            this.sprites.jumping.render(ctx);
        else if (this.isDucking)
            this.sprites.ducking.render(ctx);
        else
            this.sprites.initial.render(ctx);

        ctx.restore();
    };
    
    this.run = function () {
        this.isRunning = true;
        this.isJumping = false;
        if (this.isDucking) {
            this.y -= 16;
            this.height = 47;
            this.isDucking = false;
        }
        
        this.sprites.running.startFromBeginning();
    };
    this.jump = function () {
        this.isJumping = true;
        this.isRunning = false;
        if (this.isDucking) {
            this.y -= 16;
            this.height = 47;
            this.isDucking = false;
        }
        this.vy = -this.jumpForce;
    };
    this.duck = function () {
        this.isDucking = true;
        this.isRunning = false;
        this.isJumping = false;
        this.height = 31;
        this.y += 16;
        
        this.sprites.ducking.startFromBeginning();
    };
    this.descend = function () {
        this.isDescending = true;
    };
    this.die = function () {
        this.isDead = true;
        this.isRunning = false;
        this.isJumping = false;
        if (this.isDucking) {
            this.y -= 16;
            this.height = 47;
            this.isDucking = false;
        }
    }
    this.moveToPosition = function () {
        this.isMovingToPosition = true;
    };
    this.collidesWith = function (o, fix) {
        var vx = (this.x + (this.width / 2)) - (o.x + (o.width / 2));
        var vy = (this.y + (this.height / 2)) - (o.y + (o.height / 2));
        var halfWidths = (this.width / 2) + (o.width / 2);
        var halfHeights = (this.height / 2) + (o.height / 2);
        
        if (Math.abs(vx) < halfWidths && Math.abs(vy) < halfHeights) {
            if (fix) {
                var oX = halfWidths - Math.abs(vx),
                    oY = halfHeights - Math.abs(vy);
    
                if (oX >= oY) {
                    if (vy > 0)      // Top
                        this.y += oY;
                    else             // Bottom
                        this.y -= oY;
                }
                else {
                    if (vx > 0)      // Left
                        this.x += oX;
                    else             // Right
                        this.x -= oX;
                }
            }
            return true;
        }
        return false;
    };
    
};
