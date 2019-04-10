/* global canvas ctx WIDTH HEIGHT datamanager imagemanager audiomanager inputmanager FlappyBird Pipe ScoreCounter */

function TitleScreen() {
    this.changeScreenTo = "";
    this.toScreen = function (screenName) {
        this.changeScreenTo = screenName;
    };
    
    var img = imagemanager.get,
        audp = audiomanager.play;
    
    var progress = 0;
    var continueToGame = false;
    var fadeToBlackAnimation = 0;
    var title = {
        w: 452,
        h: 96,
        sizeModifier: 1,
        offsetY: 20
    };
    var groundX = 0;
    var speed = 5;
    var pressed = false;
    var pressedBefore = false;
    
    this.update = function () {
        pressed = inputmanager.isMouseBtnDown("left") || inputmanager.isKeyDown();
        
        if (pressedBefore && !pressed) {
            continueToGame = true;
            audp("swoosh");
        }
        
        groundX -= speed;
        
        if (continueToGame) {
            if (fadeToBlackAnimation >= 100)
                this.toScreen("gamescreen");
        }
        
        pressedBefore = pressed;
    };
    
    this.render = function () {
        title.sizeModifier = (pressed) ? 0.9 : 1;
        
        if (progress >= 100)
            progress = 0;
        else
            progress += speed / 4;
            
        if (continueToGame)
            fadeToBlackAnimation += 8;
        
        title.x = (WIDTH / 2) - (title.w * title.sizeModifier / 2); // 368 + 16 + 68
        title.y = ((HEIGHT - 112) / 2) - (title.h * title.sizeModifier / 2);
        title.offsetY = Math.sin(progress / 100 * Math.PI * 2) * 20 * title.sizeModifier;
        
        
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        
        // Draw the background
        ctx.drawImage(img("background-day"), 0, 0);
        ctx.drawImage(img("background-day"), 288, 0);
        ctx.drawImage(img("background-day"), 576, 0);
        
        // Draw the ground
        ctx.drawImage(img("base"), groundX % 24, 400);
        ctx.drawImage(img("base"), groundX % 24 + 288, 400);
        ctx.drawImage(img("base"), groundX % 24 + 576, 400);
        
        // Draw Title
        ctx.drawImage(img("message"), 0, 0, 184, 48,
            title.x, title.y + title.offsetY,
            368 * title.sizeModifier, 96 * title.sizeModifier);
            
        // Draw flappy bird
        ctx.drawImage(img("yellowbird-upflap"),
            title.x + (384 * title.sizeModifier), title.y + title.offsetY + (14 * title.sizeModifier),
            68 * title.sizeModifier, 48 * title.sizeModifier);
        
        
        ctx.fillStyle = "rgba(0, 0, 0, " + (fadeToBlackAnimation / 100) + ")";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        
        ctx.fillStyle = "#ded895";
        ctx.textAlign = "right";
        ctx.font = "14px sans-serif";
        ctx.fillText("By Bright Amoateng", WIDTH - 2, HEIGHT - 7);
    };
}


function GameScreen() {
    this.changeScreenTo = "";
    this.toScreen = function (screenName) {
        this.changeScreenTo = screenName;
    };
    
    var img = imagemanager.get,
        audp = audiomanager.play;
    
    
    // Variables that change the way the game is
    var ai = false;
    var gameSpeed = 8;
    var gravity = 0.3;
    var flapPower = 4;
    var pipeSeparation = 70;
    var pipeGap = 200;
    var randomPipes = true;
    
    // About the player
    var highScore = datamanager.get("highScore") || 0;
    var playerStarted = false;
    var playerLost = false;
    
    // Flappy bird pipes, and score
    var flappybird = new FlappyBird(flapPower, gravity);
    var scorecounter = new ScoreCounter(highScore);
    var pipes = [];
    
    // Other variables
    var fadeFromBlackAnimation = 0;
    var fadeToBlackAnimation = 0;
    var restart = false;
    var flashOpacity = 0;
    var darkScreenOpacity = 0;
    var pressedBefore = false;
    var groundX = 0;
    var day = "false";
    var dayOpacity = 1;
    var nightOpacity = 0;
    var dayTransitionAnimation = 0;
    var toggleDay = false;
    
    
    
    // Game update
    this.update = function () {
        
        if (fadeToBlackAnimation >= 100)
            this.toScreen("gamescreen");
        
        
        var pressed = inputmanager.isMouseBtnDown() || inputmanager.isKeyDown();
        
        // Check if player clicked the left button
        if (pressed && !pressedBefore && fadeFromBlackAnimation >= 100) {
            
            // Start if the game hasn't started yet
            if (!playerStarted) {
                startGame();
            }
                
            // "Flap" flappy bird, or restart game
            if (playerLost) {
                restartGame();
            }
            else {
                flappybird.flap();
            }
                
        }
        
        //-----------------------(------------------------ AI START
        if (ai && !playerLost) {
            if (playerStarted) {
                
                let incomingPipe = null;
                for (let i = 0; i < pipes.length; i++) {
                    if (pipes[i].x + pipes[i].w > flappybird.x) {
                        incomingPipe = pipes[i];
                        break;
                    }
                }
                    
                if (flappybird.y + flappybird.h + 5 > incomingPipe.separationCenter + pipeSeparation / 2) {
                    flappybird.flap();
                }
                
            }
            else {
                startGame();
            }
        }
        //----------------------------------------------- AI END
        
        // Move the ground
        groundX -= gameSpeed;
        
        
        // Update old pipes' position and possibly remove them
        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update(gameSpeed);
            if (pipes[i].remove) {
                pipes.splice(i, 1);
            }
        }
        
        
        // Create new pipes
        if (playerStarted && pipes[pipes.length - 1].x < canvas.width - pipeGap) {
            pipes.push(new Pipe(pipeSeparation, randomPipes, pipes[pipes.length - 1].separationCenter));
        }
        
        // Update the position of flappy bird
        if (playerStarted) {
            flappybird.update();
        }
        
        
        // If flappy bird hits the ground, game over
        if (flappybird.onGround && !playerLost) {
            gameOver();
        }
            
        if (flappybird.onGround)
            scorecounter.animateToCenter();
        
        for (let i = 0; i < pipes.length; i++) {
            if (pipes[i].isCollidingWith(flappybird)) {
                if (!playerLost)
                    gameOver();
            }
            else {
                if (pipes[i].x + pipes[i].w / 2<= canvas.width / 2 && !pipes[i].earnedPoint) {
                    scorecounter.addPoint();
                    pipes[i].earnedPoint = true;
                }
            }
                
        }
        
        pressedBefore = pressed;
        
    };
    
    
    
    // Game render
    this.render = function () {
        // Fade from black animation
        if (fadeFromBlackAnimation < 100)
            fadeFromBlackAnimation += 8;
            
        if (restart && fadeToBlackAnimation < 100)
            fadeToBlackAnimation += 8;
        
        // White flash screen opacity
        if (playerLost && flashOpacity > 0)
            flashOpacity -= 0.05;
        
        // Dark screen opacity
        if (flappybird.onGround && darkScreenOpacity < 0.4)
            darkScreenOpacity += 0.04;
        
        if (scorecounter.score != 0 && scorecounter.score % 20 == 0 && !toggleDay) {
            toggleDay = true;
            day = !day;
            dayTransitionAnimation = 0;
        }
            
        if (toggleDay) {
            
            if (++dayTransitionAnimation >= 100) {
                toggleDay = false;
            }
            
            if (day) {
                dayOpacity = dayTransitionAnimation / 100;
                nightOpacity = 1 - dayTransitionAnimation / 100;
            }
            else {
                dayOpacity = 1 - dayTransitionAnimation / 100;
                nightOpacity = dayTransitionAnimation / 100;
            }
            
        }
        
        
        // Clear the screen
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        
        // Draw the background
        ctx.save();
        ctx.globalAlpha = dayOpacity;
        ctx.drawImage(img("background-day"), 0, 0);
        ctx.drawImage(img("background-day"), 288, 0);
        ctx.drawImage(img("background-day"), 576, 0);
        ctx.globalAlpha = nightOpacity;
        ctx.drawImage(img("background-night"), 0, 0);
        ctx.drawImage(img("background-night"), 288, 0);
        ctx.drawImage(img("background-night"), 576, 0);
        ctx.restore();
        
        // Draw the pipes
        for (let i = 0; i < pipes.length; i++)
            pipes[i].render();
        
        // Draw the ground
        ctx.drawImage(img("base"), groundX % 24, 400);
        ctx.drawImage(img("base"), groundX % 24 + 288, 400);
        ctx.drawImage(img("base"), groundX % 24 + 576, 400);
        
        // Draw flappy bird
        flappybird.render();
        
        // Draws the white flash screen
        ctx.fillStyle = "rgba(255, 255, 255, " + flashOpacity + ")";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        
        // Draws the dark screen
        ctx.fillStyle = "rgba(0, 0, 0, " + darkScreenOpacity + ")";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        
        // Draw the score
        scorecounter.render();
        
        // Fade from black animation
        ctx.fillStyle = "rgba(0, 0, 0, " + (1 - fadeFromBlackAnimation / 100) + ")";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        
        // Fade to black animation
        ctx.fillStyle = "rgba(0, 0, 0, " + (fadeToBlackAnimation / 100) + ")";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        
        ctx.fillStyle = "#ded895";
        ctx.textAlign = "right";
        ctx.font = "14px sans-serif";
        ctx.fillText("By Bright Amoateng", WIDTH - 2, HEIGHT - 7);
    };
    
    
    
    function restartGame() {
        if (scorecounter.animationDone && !restart) {
            restart = true;
            audp("swoosh");
        }
    }
    
    function startGame() {
        playerStarted = true;
        flappybird.rotate = true;
        pipes.push(new Pipe(pipeSeparation, randomPipes, 200));
    }
    
    function gameOver() {
        if (scorecounter.score > highScore)
            datamanager.set("highScore", scorecounter.score);
        flashOpacity = 1;
        playerLost = true;
        gameSpeed = 0;
        audp("hit");
    }
    
}
