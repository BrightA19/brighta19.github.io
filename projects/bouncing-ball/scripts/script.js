/* global cvs ctx angleOfGravity collide Arrow Ball mouse */

var isCreatingBall = false;
var prevMouseLocation = [-1, -1];

var arrow = new Arrow();
var balls = [];

// Update objects' position, create objects, etc
function update() {
    if (!mouse.prev && mouse.pressed) {
        if (!isCreatingBall) {
            prevMouseLocation[0] = mouse.x;
            prevMouseLocation[1] = mouse.y;
            isCreatingBall = true;
        }
    }
    
    if (mouse.prev && !mouse.pressed) {
        if (isCreatingBall) {
            let vx = (prevMouseLocation[0] - mouse.x) / 15;
            let vy = (prevMouseLocation[1] - mouse.y) / 15;
            balls.push(new Ball(prevMouseLocation[0], prevMouseLocation[1], vx, vy));
            isCreatingBall = false;
        }
    }
    
    // Update all balls
    for (let i = 0; i < balls.length; i++)
        balls[i].update();
    
    // Handle collisions between balls
    for (let i = 0; i < balls.length - 1; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let a = balls[i].x - balls[j].x;
            let b = balls[i].y - balls[j].y;
            let distanceSquared = (a**2 + b**2);
            if (distanceSquared < (balls[i].radius + balls[j].radius)**2 && collide) {
                
                // https://scratch.mit.edu/projects/116144988/#editor
                let xdist = balls[i].x - balls[j].x;
                let ydist = balls[i].y - balls[j].y;
                let xVelocity = balls[j].vx - balls[i].vx;
                let yVelocity = balls[j].vy - balls[i].vy;
                let dotProduct = xdist * xVelocity + ydist * yVelocity;
                if (dotProduct > 0) {
                    let collisionScale = dotProduct / distanceSquared;
                    let xCollision = xdist * collisionScale;
                    let yCollision = ydist * collisionScale;
                    let combinedMass = balls[i].radius + balls[j].radius;
                    let collisionWeightA = 2 * (balls[j].radius / combinedMass);
                    let collisionWeightB = 2 * (balls[i].radius / combinedMass);
                    let vx1 = balls[i].vx + (collisionWeightA * xCollision);
                    let vy1 = balls[i].vy + (collisionWeightA * yCollision);
                    let vx2 = balls[j].vx - (collisionWeightB * xCollision);
                    let vy2 = balls[j].vy - (collisionWeightB * yCollision);
                    
                    balls[i].vx = vx1;
                    balls[i].vy = vy1;
                    balls[j].vx = vx2;
                    balls[j].vy = vy2;
                }
                
            }
        }
    }
    
    mouse.prev = mouse.pressed;
}

// Render objects on the canvas
function render() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    
    let g = ctx.createRadialGradient(cvs.width / 2, 0, 10, cvs.width / 2, 0, cvs.height);
    g.addColorStop(0, "white");
    g.addColorStop(1, "rgb(200, 200, 200)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    
    arrow.render();
    
    for (let i = 0; i < balls.length; i++)
        balls[i].render();
        
    for (let i = 0; i < balls.length; i++)
        balls[i].outline();
        
    if (isCreatingBall) {
        let grd = ctx.createLinearGradient(prevMouseLocation[0], prevMouseLocation[1], mouse.x, mouse.y);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "black");
        
        ctx.beginPath();
        ctx.moveTo(prevMouseLocation[0], prevMouseLocation[1]);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = grd;
        ctx.stroke();
    }
}

// Set the update-render loop (60 fps)
setInterval(function () {
    update();
    render();
}, 1000 / 60);
