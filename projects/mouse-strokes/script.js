var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var clear = () => ctx.clearRect(0, 0, cvs.width, cvs.height);
var loop = window.requestAnimationFrame;


var mouse = {x: -1, y: -1};
var path = [];
var color = 0;

var LENGTH = 50;
var SIZE = 20;

function main() {
    update();
    render();
  
    loop(main);
}

function update() {
    path.push({x: mouse.x, y: mouse.y});
    if (path.length > LENGTH)
        path.splice(0, path.length - LENGTH);
  
    color += 0.5;
}

function render() {
    clear();

    for (let i = 0; i < path.length - 1; i++) {
        let a = i / path.length;
        ctx.beginPath();
        ctx.moveTo(path[i+1].x, path[i+1].y);
        ctx.lineTo(path[i].x, path[i].y);
        ctx.lineWidth = 1 + (a * (SIZE - 1));
        ctx.lineCap = "round";
        ctx.strokeStyle = "hsla(" + Math.floor(color) + ", 100%, 50%, " + a + ")";
        
        ctx.stroke();
    }
    
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, SIZE / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "hsl(" + Math.floor(color) + ", 100%, 50%)";
    ctx.fill();
}
  
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
  
window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
  
main();
  