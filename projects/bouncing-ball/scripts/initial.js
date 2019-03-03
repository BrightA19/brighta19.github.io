var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");

var mouse = {
    x: -1,
    y: -1,
    pressed: false,
    prev: false
};

var changeGravity = true;
var forceOfGravity = 0.3;
var angleOfGravity = 90;
var friction = 0.03;
var size = 20;
var collide = true;

// Mouse event handlers 
function mouseMoveHandler(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}
function mousePressHandler(e) {
    mouse.pressed = (e.type == "mousedown") ? true : false;
}

// Calculate gravity's x and y components
function getGravityX() {
    return Math.cos(angleOfGravity / 180 * Math.PI) * forceOfGravity;
}
function getGravityY() {
    return Math.sin(angleOfGravity / 180 * Math.PI) * forceOfGravity;
}


// Make the canvas fullscreen
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

// Set mouse events to its handlers (above)
cvs.addEventListener("mousemove", mouseMoveHandler);
cvs.addEventListener("mousedown", mousePressHandler);
cvs.addEventListener("mouseup", mousePressHandler);

// Reverse gravity every 10 seconds
setInterval(() => (changeGravity) ? angleOfGravity += 90 : 0, 10000);
