var cvs = document.createElement("canvas");
var ctx = cvs.getContext("2d");
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;


var playing = false;
var interval;
var hover = false;
var particles = [];

function Particle() {
  this.x = Math.floor(Math.random() * cvs.width);
  this.y = cvs.height - 1;
  this.velX = 0;
  this.velY = (Math.random() * 5) - 5;
  this.size = 15;
  this.maxlife = Math.floor(Math.random() * cvs.height/3) + 5;
  this.life = this.maxlife;
  this.opacity = 1;
  this.color = "#1CAB0F";
  this.update = function () {
    this.x += this.velX;
    this.y += this.velY;
    this.opacity -= 2/this.maxlife;
    this.life -= 2/this.maxlife;
    if (this.opacity < 0)
      this.opacity = 0;
    if (hover)
      if (this.size < 25) this.size++;
  };
  this.draw = function () {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  };
}
function gameLoop() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  for (var p in particles) {
    if (particles[p].y < 0 || particles[p].life < 0) {
      particles[p] = new Particle();
      continue;
    }
    particles[p].update();
    particles[p].draw();
    particles[p].velY -= 0.01;
  }
  if (particles.length < cvs.width * 4) {
    for (var i = 0; i < (cvs.width * 4)/200; i++) {
      particles.push(new Particle());
    }
  }
}


cvs.style.position = "absolute";
cvs.style.background = "#000";
window.onresize = () => {
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
};
cvs.className = "body";
document.body.appendChild(cvs);
document.body.onload = () => {
  document.getElementsByClassName("ctr")[0].onmouseover = () => {
    hover = true;
  };
  document.getElementsByClassName("ctr")[0].onmouseout = () => {
    hover = false;
  };
  document.getElementsByClassName("ctr")[0].onclick = () => {
    if (playing) {
      clearInterval(interval);
      playing = false;
    }
    else {
      interval = setInterval(gameLoop, 20);
      playing = true;
    }
    console.log(playing);
  };
};