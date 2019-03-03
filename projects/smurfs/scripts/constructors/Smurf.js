/* global input ctx WIDTH HEIGHT smurfs FPS GRAVITY images SpriteAnimation*/

function Smurf(x, y, spd, left, up, right, down) {
    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = spd;
    this.width = 32;
    this.height = 48;
    this.scale = 1;
    
    this.direction = -1;
    this.onGround = false;
    this.isMoving = false;
    this.isWalking = false;
    this.isJumping = true;
    this.isLanding = false;
    this.isDucking = false;
    this.isCrawling = false;
    this.isIdle = false;
    
    this.idleAnimation = null;
    this.minIdleFrames = 1;
    this.maxIdleFrames = 4;
    this.restartIdleAnimation();
    
    this.saIdle = new SpriteAnimation(images.idle, 1, this.width, this.height, 0);
    this.saIdle1 = new SpriteAnimation(images.idle1, 1, this.width, this.height, 10);
    this.saIdle2 = new SpriteAnimation(images.idle2, 3, this.width, this.height, 20);
    this.saIdle3 = new SpriteAnimation(images.idle3, 8, this.width, this.height, 10);
    this.saWalking = new SpriteAnimation(images.walking, 8, this.width, this.height, 10);
    this.saJumping = new SpriteAnimation(images.jumping, 3, this.width, this.height, 10);
    this.saLanding = new SpriteAnimation(images.landing, 2, this.width, this.height, 5);
    this.saDucking = new SpriteAnimation(images.ducking, 1, this.width, this.height, 0);
    this.saCrawling = new SpriteAnimation(images.crawling, 6, 47, this.height, 10);
}

Smurf.prototype.restartIdleAnimation = function () {
    this.idleFramesPassed = 0;
    this.idleFramesLimit = (this.minIdleFrames +
        Math.random() * (this.maxIdleFrames - this.minIdleFrames)) * FPS;
    this.isInIdleAnimation = false;
};
Smurf.prototype.startWalking = function () {
    this.isWalking = true;
    this.saWalking.startFromBeginning();
    if (this.isIdle) {
        this.restartIdleAnimation();
        this.isIdle = false;
    }
};
Smurf.prototype.stopWalking = function () {
    this.isWalking = false;
    if (!this.isJumping)
        this.isIdle = true;
};
Smurf.prototype.startJumping = function () {
    this.vy = -this.speed * 3;
    this.isJumping = true;
    this.saJumping.startFromBeginning();
    if (this.isIdle) {
        this.restartIdleAnimation();
        this.isIdle = false;
    }
};
Smurf.prototype.stopJumping = function () {
    this.isIdle = true;
    this.isJumping = false;
    this.startLanding();
};
Smurf.prototype.startDucking = function () {
    this.isDucking = true;
    if (this.isIdle) {
        this.restartIdleAnimation();
        this.isIdle = false;
    }
};
Smurf.prototype.stopDucking = function () {
    this.isIdle = true;
    this.isDucking = false;
};
Smurf.prototype.startCrawling = function () {
    this.isCrawling = true;
    if (this.isIdle) {
        this.restartIdleAnimation();
        this.isIdle = false;
    }
};
Smurf.prototype.stopCrawling = function () {
    this.isIdle = true;
    this.isCrawling = false;
};
Smurf.prototype.startLanding = function () {
    this.isLanding = true;
    this.saLanding.startFromBeginning();
};

Smurf.prototype.isColliding = function (smurf) {
    if (this.x < smurf.x + smurf.width * smurf.scale &&
        this.x + this.width * this.scale > smurf.x &&
        this.y < smurf.y + smurf.height * smurf.scale &&
        this.y + this.height * this.scale > smurf.y
    ) {
        var offsetX = (this.x + this.width * this.scale / 2) - (smurf.x + smurf.width * smurf.scale / 2);
        var offsetY = (this.y + this.height * this.scale / 2) - (smurf.y + smurf.height * smurf.scale / 2);
        
        if (Math.abs(offsetY) > Math.abs(offsetX)) {
            if (offsetY < 0 && this.vy > 0) {
                if (this.isJumping)
                    this.stopJumping();
                this.onGround = true;
                this.vy = 0;
                // this.x += smurf.vx * smurf.direction;
                this.y -= this.height * this.scale + offsetY;
            }
        }
    }
};

Smurf.prototype.updatePosition = function (smurf) {
    this.onGround = false;
    
    var isPressingLeft = input.isKeyDown(this.left);
    var isPressingRight = input.isKeyDown(this.right);
    var isPressingUp = input.isKeyDown(this.up);
    var isPressingDown = input.isKeyDown(this.down);
    
    var isMoving = isPressingLeft || isPressingRight;
    
    
    if (isMoving) {
        if (!this.isWalking)
            this.startWalking();
    }
    else {
        if (this.isWalking)
            this.stopWalking();
    }
        
    if (!this.isJumping) {
        if (isPressingDown) {
            if (isMoving) {
                if (this.isDucking)
                    this.stopDucking();
                    
                if (!this.isCrawling)
                    this.startCrawling();
            }
            else {
                if (this.isCrawling)
                    this.stopCrawling();
                    
                if (!this.isDucking)
                    this.startDucking();
            }
        }
        else {
            if (this.isDucking)
                this.stopDucking();
                
            if (this.isCrawling)
                this.stopCrawling();
        }
        
        if (isPressingUp) {
            if (this.isDucking)
                this.stopDucking();
                
            this.startJumping();
        }
    }
    
    
    if (isPressingLeft)
        this.direction = -1;
    else if (isPressingRight)
        this.direction = 1;
    
    
    this.vx = (isMoving) ? ((isPressingDown && !this.isJumping) ? this.speed / 2 : this.speed) : 0;
    
    
    this.vy += GRAVITY;
    
    this.x += this.vx * this.direction;
    this.y += this.vy;
    
    
    for (let i = 0; i < smurfs.length; i++)
        this.isColliding(smurfs[i]);
    
    if (this.y + this.height * this.scale > HEIGHT) {
        if (this.isJumping)
            this.stopJumping();
        this.onGround = true;
        this.vy = 0;
        this.y = HEIGHT - (this.height * this.scale);
    }
    
    if (!this.onGround && !this.isJumping)
        this.isJumping = true;
    
};
Smurf.prototype.update = function (smurf) {
    
    this.updatePosition(smurf);
    
    if (this.isWalking) {
        this.saWalking.nextFrame();
        if (this.saWalking.isDone())
            this.saWalking.startFromBeginning();
    }
    
    if (this.isCrawling) {
        this.saCrawling.nextFrame();
        if (this.saCrawling.isDone())
            this.saCrawling.startFromBeginning();
    }
    
    if (!this.onGround) {
        if (!this.saJumping.isAtEnd())
            this.saJumping.nextFrame();
    }
    
    if (this.isLanding) {
        this.saLanding.nextFrame();
        if (this.saLanding.isDone()) {
            this.isLanding = false;
            this.saWalking.startFromBeginning();
        }
    }
    
    if (this.isIdle) {
        if (this.isInIdleAnimation) {
            this.idleAnimation.nextFrame();
            if (this.idleAnimation.isDone())
                this.restartIdleAnimation();
        }
        else {
            if (++this.idleFramesPassed >= this.idleFramesLimit) {
                switch (Math.floor(Math.random() * 3)) {
                    case 0:
                        this.idleAnimation = this.saIdle1;
                        break;
                    case 1:
                        this.idleAnimation = this.saIdle2;
                        break;
                    case 2:
                        this.idleAnimation = this.saIdle3;
                        break;
                }
                this.idleAnimation.startFromBeginning();
                this.isInIdleAnimation = true;
            }
        }
    }
};
Smurf.prototype.render = function () {
    var x = -(this.width * this.scale) / 2;
    var y = -(this.height * this.scale);
    var w = this.width * this.scale;
    var h = this.height * this.scale;
    
    
    ctx.save();
    ctx.translate(this.x + (this.width * this.scale) / 2, this.y + (this.height * this.scale));
    ctx.scale((this.direction < 0) ? -1 : 1, 1);
    
    if (this.isJumping) {
        this.saJumping.drawFrame(x, y, w, h);
    }
    else if (this.isCrawling) {
        this.saCrawling.drawFrame(x, y, 47*this.scale, h);
    }
    else if (this.isDucking) {
        this.saDucking.drawFrame(x, y, w, h);
    }
    else if (this.isLanding) {
        this.saLanding.drawFrame(x, y, w, h);
    }
    else if (this.isWalking) {
        this.saWalking.drawFrame(x, y, w, h);
    }
    else if (this.isIdle) {
        if (this.isInIdleAnimation)
            this.idleAnimation.drawFrame(x, y, w, h);
        else
            this.saIdle.drawFrame(x, y, w, h);
    }
    
    ctx.restore();
    // ctx.beginPath();
    // ctx.rect(this.x, this.y, this.width * this.scale, this.height * this.scale);
    // ctx.closePath();
    // ctx.stroke();
};