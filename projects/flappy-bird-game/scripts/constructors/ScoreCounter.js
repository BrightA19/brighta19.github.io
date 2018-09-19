/* global canvas ctx WIDTH HEIGHT imagemanager audiomanager inputmanager datamanager*/

function ScoreCounter(highScore) {

    this.score = 0;
    this.animationDone = false;
    
    var offsetScoreAnimation = 0;
    var offsetScore = {
        x: 0,
        y: 0,
    };
    
    this.addPoint = function () {
        this.score++;
        audiomanager.play("point");
    };
    
    this.animateToCenter = function () {
        if (offsetScoreAnimation < 100)
            offsetScoreAnimation += 8;
        else
            this.animationDone = true;
    };
    
    this.render = function () {
        var img = imagemanager.get;
        
        // Offset of score position
        offsetScore.x = WIDTH / 2;
        offsetScore.y = Math.sin(offsetScoreAnimation / 100 * Math.PI / 2) * (HEIGHT / 2 - 35) + 35;
        
        
        // The the number of a place value from the actual score
        var ones = this.score % 10;
        var tens = Math.floor(this.score / 10) % 10;
        var hundreds = Math.floor(this.score / 100) % 10;
        
        var scoreWidthModifier = Math.sin(offsetScoreAnimation / 100 * Math.PI / 2) * 2;
        var scoreHeightModifier = Math.sin(offsetScoreAnimation / 100 * Math.PI / 2) * 2;
        
        
        // Calculate the width and height of each place value
        var onesW = img(ones).width + (scoreWidthModifier * img(ones).width);
        var onesH = img(ones).height + (scoreHeightModifier * img(ones).height);
        
        var tensW = img(tens).width + (scoreWidthModifier * img(tens).width);
        var tensH = img(tens).height + (scoreHeightModifier * img(tens).height);
        
        var hundredsW = img(hundreds).width + (scoreWidthModifier * img(hundreds).width);
        var hundredsH = img(hundreds).height + (scoreHeightModifier * img(hundreds).height);
        
        
        // The width and height of the score
        var scoreHeight = onesH;
        var scoreWidth = onesW;
        scoreWidth += (tens > 0 || hundreds > 0) ? tensW : 0;
        scoreWidth += (hundreds > 0) ? hundredsW : 0;
        
        
        // Score position
        var scoreX = offsetScore.x - scoreWidth / 2;
        var scoreY = offsetScore.y - scoreHeight / 2;
        
        
        // Draw the high score
        if (highScore > 0) {
            ctx.fillStyle = "rgba(255, 255, 255, " + (offsetScoreAnimation / 100) + ")";
            ctx.textAlign = "center";
            ctx.font = "20px Verdana, sans-serif";
            ctx.fillText("High score: " + highScore + ((this.score > highScore) ? " ► " + this.score : ""), WIDTH / 2, 80);
        }
        
        // Draw the score
        if (this.score >= 100) {
            ctx.drawImage(img(hundreds), scoreX, scoreY, hundredsW, hundredsH);
            ctx.drawImage(img(tens), scoreX + hundredsW, scoreY, tensW, tensH);
            ctx.drawImage(img(ones), scoreX + hundredsW + tensW, scoreY, onesW, onesH);
        }
        else if (this.score >= 10) {
            ctx.drawImage(img(tens), scoreX, scoreY, tensW, tensH);
            ctx.drawImage(img(ones), scoreX + tensW, scoreY, onesW, onesH);
        }
        else {
            ctx.drawImage(img(ones), scoreX, scoreY, onesW, onesH);
        }
    };

}