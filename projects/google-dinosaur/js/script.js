/* global Image input Ground Dino cactus_groups Cactus */

var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var previousDate = Date.now();

var spritesheet = new Image();

var gameRunning = false;
var gameScore = 0;
var gameSpeed = 350;

var dino = new Dino();
var ground = new Ground();
var cacti = [];
var restartSprite = new Sprite(spritesheet, 2, 2, 36, 32);
var addCactusCooldown = 1;
var pressedUp = false;


function update(dt) {
    if (!gameRunning) {
        if (ground.speed != 0)
            ground.speed = 0;
    
        ground.update(dt);
        
    
        if (input.up) {
            if (!dino.isJumping) {
                dino.jump();
            }
        }
        else if (input.down) {
            if (dino.isJumping) {
                dino.descend();
            }
            else if (dino.isRunning) {
                if (!dino.isDucking) {
                    dino.duck();
                }
            }
            
        }
        else {
            if (dino.isRunning || dino.isJumping || dino.isDucking) {
                if (!dino.isJumping) {
                    if (!dino.isRunning) {
                        dino.run();
                    }
                }
            }
        }
        
        dino.update(dt);
        
        if (dino.collidesWith(ground, true)) {
            if (!ground.isExtending) {
                ground.extend();
            }
            if (!dino.isMovingToPosition) {
                dino.moveToPosition();
            }
            
            if (!dino.isRunning && !dino.isDucking) {
                dino.run();
            }
        }
        
        if (ground.doneExtending && dino.doneMovingToPosition) {
            gameRunning = true;
        }
    }
    else if (!dino.isDead) {
        if (ground.speed != gameSpeed)
            ground.speed = gameSpeed;
            
        ground.update(dt);
        
        
        if (gameScore > 20) {
            if (addCactusCooldown > 0) {
                addCactusCooldown -= dt;
            }
            else {
                addCactus();
                addCactusCooldown = 0.6 + Math.random() * 0.9; // 0.6 - 1.5
            }
            
            for (var i = 0; i < cacti.length; i++) {
                cacti[i].update(dt);
            }
        }
        
    
        if (input.down) {
            if (dino.isJumping) {
                dino.descend();
            }
            else if (!dino.isDucking) {
                dino.duck();
            }
        }
        else if (input.up) {
            if (!dino.isJumping) {
                dino.jump();
            }
        }
        else {
            if (!dino.isJumping) {
                if (!dino.isRunning) {
                    dino.run();
                }
            }
        }
        
        dino.update(dt);
        
        gameScore += 8 * dt;
        gameSpeed += 3 * dt;
        
        if (dino.collidesWith(ground, true)) {
            if (!dino.isDucking) {
                if (!dino.isRunning) {
                    dino.run();
                }
            }
        }
        for (var c = 0; c < cacti.length; c++) {
            if (dino.collidesWith(cacti[c], false)) {
                gameOver();
                break;
            }
        }
    }
    else {
        if (!pressedUp && input.up) {
            dino = new Dino();
            gameScore = 0;
            gameSpeed = 350;
            cacti = [];
        }
    }
    
    pressedUp = input.up;
}
function render() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    
    ground.render(ctx);
    
    for (var i = 0; i < cacti.length; i++) {
        cacti[i].render(ctx);
    }
    
    dino.render(ctx);
    
    if (gameRunning) {
        ctx.textAlign = "right";
        ctx.font = "20px monospace, sans-serif";
        ctx.fillText("SCORE: " + Math.floor(gameScore), 600, 20);
        if (dino.isDead) {
            ctx.save();
            ctx.translate(cvs.width / 2 - 18, cvs.height / 2 - 16);
            restartSprite.render(ctx);
            ctx.restore();
        }
    }
}
function startLoop() {
    var currentDate = Date.now();
    var timeInterval = currentDate - previousDate;
    
    update(timeInterval / 1000);
    render();
    
    previousDate = currentDate;
    
    requestAnimationFrame(startLoop);
}

function addCactus() {
    var size = (Math.random() < 0.5) ? "small" : "large";
    var pos = Math.floor(Math.random() * 3);
    
    for (var i = 0; i < cactus_groups[size][pos].length; i++) {
        var width = 0;
        if (i > 0)
            width = cacti[cacti.length - i].width;
        
        var cactus = new Cactus(cactus_groups[size][pos][i], i * width);
        cactus.speed = gameSpeed;
        cacti.push(cactus);
    }
}
function gameOver() {
    dino.die();
}

spritesheet.src = "spritesheet.png";
spritesheet.onload = startLoop;
