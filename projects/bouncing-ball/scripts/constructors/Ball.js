/* global cvs ctx getGravityComponents getGravityX getGravityY size friction */


// Bouncing Ball object constructor
function Ball(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = size;
    this.mass = this.radius / 10;
    this.hue = Math.floor(Math.random() * 360);
}

// Updates the ball's update (considering gravity and walls)
Ball.prototype.update = function () {
    // Calculate the ball's velocity
    this.vx += getGravityX() / this.mass;
    this.vy += getGravityY() / this.mass;
    
    // Update the ball's x position
    this.x += this.vx;
    this.y += this.vy;
    
    // Modifies the ball's velocity (based on friction) and changes direction (based on the wall)
    if (this.y - this.radius < 0 || this.y + this.radius > cvs.height) {
        this.vx += -(this.vx * friction);
        this.y -= this.vy;
        this.vy *= friction - 1;
    }
    if (this.x - this.radius < 0 || this.x + this.radius > cvs.width) {
        this.vy += -(this.vy * friction);
        this.x -= this.vx;
        this.vx *= friction - 1;
    }
};

// Renders the ball with light on it
Ball.prototype.render = function () {
    var center = {
        x: cvs.width / 2,
        y: cvs.height / 2
    };
    
    var angleFromLight = Math.atan2(0 - this.y, center.x - this.x);
    
    // Create gradient applying light
    var gradient = ctx.createRadialGradient(this.x, this.y, this.radius,
      this.x + (this.radius / 2) * Math.cos(angleFromLight), this.y + (this.radius / 2) * Math.sin(angleFromLight), 0.5);
    
    gradient.addColorStop(0, "hsl(" + this.hue + ", 100%, 50%)");
    //gradient.addColorStop(0.5, "hsl(" + this.hue + ", 100%, 50%)");
    gradient.addColorStop(1, "hsl(" + this.hue + ", 100%, 100%)");
    
    // Draw the ball
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
};

// Renders the outline of the ball
Ball.prototype.outline = function () {
    // Draw the ball
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.stroke();
};
