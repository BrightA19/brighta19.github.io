/* global input ctx WIDTH HEIGHT FPS smurfs numOfImages numOfImagesLoaded imagesCompleted Smurf */

ctx.imageSmoothingEnabled = false;


for (let a = 0; a < 20; a++) {
    for (let b = 0; b < 20; b++) {
        smurfs.push(new Smurf(WIDTH * a / 21 + 32, HEIGHT * b / 21, 2 + Math.random() * 2, 65, 87, 68, 83));
    }
}


function update() {
    for (let i = 0; i < smurfs.length; i++) {
        smurfs[i].update();
        
        if (smurfs[i].x < -smurfs[i].width * smurfs[i].scale)
            smurfs[i].x = WIDTH;
        if (smurfs[i].x > WIDTH)
            smurfs[i].x = -smurfs[i].width * smurfs[i].scale;
    }
}
function render() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    
    for (let i = 0; i < smurfs.length; i++)
        smurfs[i].render();
}

setInterval(function () {
    if (imagesCompleted) {
        update();
        render();
    }
    else {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        
        ctx.fillStyle = "#8F8";
        ctx.fillRect(0, 0, (numOfImagesLoaded / numOfImages) * WIDTH, 5);
        ctx.fillText("Loading ...", 10, 20);
    }
}, 1000 / FPS); // 60 fps
