var ctr = document.getElementById("ctr");
var cvs = document.getElementById("cvs");
var tle = document.getElementById("tle");

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

var ctx = cvs.getContext("2d");

var interval;
var playing = false;
var particles = [];

function Particle () {
  
  this.x = Math.floor(Math.random() * cvs.width);
  this.y = cvs.height - 1;
  this.velX = 0;
  this.velY = -(Math.random() * 5);
  this.size = 15;
  this.maxlife = Math.floor(Math.random() * cvs.height/3) + 5;
  this.life = this.maxlife;
  this.opacity = 1;
  this.color = "#1CAB0F";
  
  this.update = function () {
    
    this.x += this.velX;
    this.y += this.velY;
    this.velY -= 0.01;
    this.life -= 2/this.maxlife;
    this.opacity -= 2/this.maxlife;
    if (this.opacity < 0)
      this.opacity = 0;
    
  };
  
  this.draw = function () {
    
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    
  };
  
}

function gameLoop () {
  
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  
  for (var p in particles) {
    
    if (particles[p].y < 0 || particles[p].life < 0) {
      particles[p] = new Particle();
      continue;
    }
    
    particles[p].update();
    particles[p].draw();
    
  }
  
  if (particles.length < cvs.width * 4) {
    for (var i = 0; i < (cvs.width * 4)/200; i++) {
      particles.push(new Particle());
    }
  }
  
}


window.addEventListener("resize", function () {
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
});
ctr.addEventListener("mouseover", function () {
  ctr.className = "hover-ctr";
  cvs.className = "hover-cvs";
  tle.className = "hover-tle";
});
ctr.addEventListener("mouseout", function () {
  ctr.className = "";
  cvs.className = "";
  tle.className = "";
});
ctr.addEventListener("click", function () {
  if (playing)
    clearInterval(interval);
  else
    interval = setInterval(gameLoop, 20);
    
  playing = !playing;
});
