/* global input ctx WIDTH HEIGHT smurfs FPS GRAVITY images SpriteAnimation*/

function Smurf2(x, y, l, r, u, d) {
    this.upKey = u;
    this.downKey = d;
    this.leftKey = l;
    this.rightKey = r;
    
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = 3;
    this.width = 32;
    this.height = 48;
    this.scale = 2;
    
    this.direction = -1;
    this.onGround = false;
    this.isMoving = false;
    this.isDucking = false;
    this.isJumping = false;
    this.action = "idle";
    
    this.idleAnimation = null;
    this.minIdleFrames = 1;
    this.maxIdleFrames = 4;
    
    this.restartIdleAnimation();
    
    this.saIdle1 = new SpriteAnimation(images.idle1, 1, this.width, this.height, 10);
    this.saIdle2 = new SpriteAnimation(images.idle2, 3, this.width, this.height, 20);
    this.saIdle3 = new SpriteAnimation(images.idle3, 8, this.width, this.height, 10);
    this.saWalking = new SpriteAnimation(images.walking, 8, this.width, this.height, 10);
    this.saJumping = new SpriteAnimation(images.jumping, 3, this.width, this.height, 10);
    this.saLanding = new SpriteAnimation(images.landing, 2, this.width, this.height, 5);
}

Smurf2.prototype.isColliding = function (smurf) {
    return this.x < smurf.x + smurf.width * smurf.scale &&
        this.x + this.width * this.scale > smurf.x &&
        this.y < smurf.y + smurf.height * smurf.scale &&
        this.y + this.height * this.scale > smurf.y;
};
Smurf2.prototype.collisionSide = function (smurf) {
    var offsetX = Math.abs((this.x + this.width * this.scale / 2) - (smurf.x + smurf.width * smurf.scale / 2));
    var offsetY = Math.abs((this.y + this.height * this.scale / 2) - (smurf.y + smurf.height * smurf.scale / 2));
    
    if (offsetY > offsetX) {
        if (offsetY > 0)
            return {side: "top", offset: -(this.height * this.scale - offsetY)};
        else
            return {side: "bottom", offset: this.height * this.scale - offsetY};
    }
    else {
        if (offsetX > 0)
            return {side: "left", offset: -(this.height * this.scale - offsetX)};
        else
            return {side: "right", offset: this.height * this.scale - offsetX};
    }
};
Smurf2.prototype.updateLocation = function () {
    this.onGround = false;
    
    var isPressingLeft = input.isKeyDown(this.leftKey);
    var isPressingRight = input.isKeyDown(this.rightKey);
    var isPressingUp = input.isKeyDown(this.upKey);
    
    
    if (isPressingLeft || isPressingRight) {
        this.vx = this.speed;
            
        if (!this.isMoving) {
            this.isMoving = true;
        }
        
        if (isPressingLeft) {
            this.direction = -1;
        }
        if (isPressingRight) {
            this.direction = 1;
        }
    }
    else {
        this.vx = 0;
    }
    
    for (let i = 0; i < smurfs.length; i++) {
        
        if (this.isColliding(smurfs[i])) {
            
            var collisionInfo = this.collisionSide(smurfs[0]);
            if (collisionInfo.side == "bottom") {
                if (this.vy > 0) {
                    if (this.isJumping)
                        this.isJumping = false;
                    this.onGround = false;
                    this.vy = 0;
                    this.y += collisionInfo.offset;
                }
            }
            
        }

    }
    
    if (this.y + this.height * this.scale > HEIGHT * 4/5) {
        if (this.isJumping)
            this.isJumping = false;
        this.onGround = true;
        this.vy = 0;
        this.y = (HEIGHT * 4/5) - (this.height * this.scale);
    }
    
    if (isPressingUp) {
        if (!this.isJumping && this.onGround) {
            this.vy = this.speed * -3;
            this.isJumping = true;
        }
    }
        
    
    this.vy += GRAVITY;
    
    this.x += this.vx * this.direction;
    this.y += this.vy;
    
    
};
Smurf2.prototype.updateAnimation = function () {};
Smurf2.prototype.update = function () {
    this.updateLocation();
    this.updateAnimation();
};



Smurf2.prototype.restartIdleAnimation = function () {
    this.idleFramesPassed = 0;
    this.idleFramesLimit = (this.minIdleFrames +
        Math.random() * (this.maxIdleFrames - this.minIdleFrames)) * FPS;
    this.isInIdleAnimation = false;
};
Smurf2.prototype.useAnimation = function (action) {
    this.action = action;
    
    switch (this.action) {
        case "idle1":
            this.saIdle1.startFromBeginning();
            break;
        case "idle2":
            this.saIdle2.startFromBeginning();
            break;
        case "idle3":
            this.saIdle3.startFromBeginning();
            break;
        case "walking":
            this.saWalking.startFromBeginning();
            break;
        case "jumping":
            this.saJumping.startFromBeginning();
            break;
        case "landing":
            this.saLanding.startFromBeginning();
            break;
    }
};

Smurf2.prototype.useWalkingAnimation = function () {
    this.vx = this.speed;
    this.action = "walking";
    this.saWalking.startFromBeginning();
};
Smurf2.prototype.stopWalking = function () {
    this.vx = 0;
    
        this.action = "idle";
    this.isWalking = false;
    if (!this.isJumping)
        this.isIdle = true;
};
Smurf2.prototype.startJumping = function () {
    this.vy = -this.speed * 3;
    this.isJumping = true;
    this.saJumping.startFromBeginning();
    if (this.isIdle) {
        this.restartIdleAnimation();
        this.isIdle = false;
    }
};
Smurf2.prototype.stopJumping = function () {
    this.isIdle = true;
    this.isJumping = false;
    this.startLanding();
};
Smurf2.prototype.startLanding = function () {
    this.isLanding = true;
    this.saLanding.startFromBeginning();
};
// Smurf2.prototype.isColliding = function (smurf) {
//     if (this.x < smurf.x + smurf.width * smurf.scale &&
//         this.x + this.width * this.scale > smurf.x &&
//         this.y < smurf.y + smurf.height * smurf.scale &&
//         this.y + this.height * this.scale > smurf.y
//     ) {
//         var offsetX = (this.x + this.width * this.scale / 2) - (smurf.x + smurf.width * smurf.scale / 2);
//         var offsetY = (this.y + this.height * this.scale / 2) - (smurf.y + smurf.height * smurf.scale / 2);
        
//         if (Math.abs(offsetY) > Math.abs(offsetX)) {
//             if (offsetY < 0 && this.vy > 0) {
//                 if (this.isJumping)
//                     this.stopJumping();
//                 this.onGround = true;
//                 this.vy = 0;
//                 this.y -= this.height * this.scale + offsetY;
//             }
//         }
//     }
// };

Smurf2.prototype.updatePosition = function () {
    var isPressingLeft = input.isKeyDown(this.leftKey);
    var isPressingRight = input.isKeyDown(this.rightKey);
    var isPressingUp = input.isKeyDown(this.upKey);
    
    
    if (isPressingLeft || isPressingRight) {
        this.vx = this.speed;
            
        if (!this.isMoving) {
            this.isMoving = true;
        }
        
        if (isPressingLeft) {
            this.direction = -1;
        }
        if (isPressingRight) {
            this.direction = 1;
        }
    }
    else {
        if (this.isMoving) {
            this.isMoving = false;
        }
    }
    
    if (isPressingUp) {
        if (!this.isJumping) {
            this.isJumping = true;
            this.vx  = this.speed * 3;
        }
    }
        
    
    this.vy += GRAVITY;
    
    this.x += this.vx * this.direction;
    this.y += this.vy;
    
    
    this.onGround = false;
    
    for (let i = 0; i < smurfs.length; i++)
        this.isColliding(smurfs[i]);
    
    if (this.y + this.height * this.scale > HEIGHT * 4/5) {
        if (this.isJumping)
            this.stopJumping();
        this.onGround = true;
        this.vy = 0;
        this.y = (HEIGHT * 4/5) - (this.height * this.scale);
    }
};
// Smurf2.prototype.update = function () {
    
//     var keysPressed = {
//         up: input.isKeyDown(this.upKey),
//         down: input.isKeyDown(this.downKey),
//         left: input.isKeyDown(this.leftKey),
//         right: input.isKeyDown(this.rightKey),
//     };
    
//     if (keysPressed.left || keysPressed.right) {
//         this.vx = this.speed;
        
//         if (!this.isMoving) {
//             this.isMoving;
//         }
        
//         if (keysPressed.left) {
//             this.direction = -1;
//         }
//         else if (keysPressed.right) {
//             this.direction = 1;
//         }
        
//         if (keysPressed.up) {
//             this.action = "jumping";
//         }
//         else if (keysPressed.down) {
//             this.action = "crawling";
//         }
//         else {
//             this.action = "walking";
//         }
//     }
//     else {
//         if (this.isMoving)
//             this.isMoving = false;
        
//         if (keysPressed.up) {
//             this.action = "jumping";
//         }
//         else if (keysPressed.down) {
//             this.action = "ducking";
//         }
//         else {
//             this.action = "idle";
//         }
//     }
    
    
    
    
    
//     if (this.onGround && this.isMoving) {
//         if (this.action != "walking")
//             this.action = "walking";
//     }
//     else {
    
//     }
    
//     if (this.isWalking) {
//         this.saWalking.nextFrame();
//         if (this.saWalking.isDone())
//             this.saWalking.startFromBeginning();
//     }
    
//     if (!this.onGround) {
//         if (!this.saJumping.isAtEnd())
//             this.saJumping.nextFrame();
//     }
    
//     if (this.isLanding) {
//         this.saLanding.nextFrame();
//         if (this.saLanding.isDone()) {
//             this.isLanding = false;
//             this.saWalking.startFromBeginning();
//         }
//     }
    
//     if (this.isIdle) {
//         if (this.isInIdleAnimation) {
//             this.idleAnimation.nextFrame();
//             if (this.idleAnimation.isDone())
//                 this.restartIdleAnimation();
//         }
//         else {
//             if (++this.idleFramesPassed >= this.idleFramesLimit) {
//                 switch (Math.floor(Math.random() * 3)) {
//                     case 0:
//                         this.idleAnimation = this.saIdle1;
//                         break;
//                     case 1:
//                         this.idleAnimation = this.saIdle2;
//                         break;
//                     case 2:
//                         this.idleAnimation = this.saIdle3;
//                         break;
//                 }
//                 this.idleAnimation.startFromBeginning();
//                 this.isInIdleAnimation = true;
//             }
//         }
//     }
// };
Smurf2.prototype.render = function () {
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
            ctx.drawImage(images.idle, x, y, w, h);
    }
    
    ctx.restore();
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width * this.scale, this.height * this.scale);
    ctx.closePath();
    ctx.stroke();
};