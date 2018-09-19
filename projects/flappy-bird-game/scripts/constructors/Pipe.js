/* global canvas ctx WIDTH HEIGHT imagemanager audiomanager */

function Pipe(separation, random, relY) {
    this.w = 52;
    this.x = 768 + this.w;
    this.earnedPoint = false;
    this.separation = separation;
    this.separationCenter = (random) ? ((Math.random() * (separation / 2) - (separation / 4)) + relY) : 200;
    //this.separationCenter = (random) ? ((50 + separation / 2) + Math.random() * (300 - separation)) : 200;
    this.remove = false;
    
    if (this.separationCenter < 80)
        this.separationCenter = 80;
    else if (this.separationCenter > 320)
        this.separationCenter = 320;
}

Pipe.prototype.isCollidingWith = function (obj) {
    return ((obj.y < this.separationCenter - this.separation / 2 ||
        obj.y + obj.h > this.separationCenter + this.separation / 2) &&
        obj.x < this.x + this.w &&
        obj.x + obj.w > this.x);
};

Pipe.prototype.update = function (speed) {
    this.x -= speed;
    
    if (this.x + this.w <= 0)
        this.remove = true;
};

Pipe.prototype.render = function () {
    ctx.save();
    ctx.drawImage(imagemanager.get("pipe-green"),
        this.x,
        this.separationCenter + this.separation / 2);
    ctx.translate(WIDTH, HEIGHT);
    ctx.rotate(Math.PI);
    ctx.drawImage(imagemanager.get("pipe-green"),
        WIDTH - (this.x + this.w),
        HEIGHT - (this.separationCenter - this.separation / 2));
    ctx.restore();
};
