/* global ctx */

function SpriteAnimation(img, numOfFrames, frameWidth, frameHeight, numOfTicks) {
    this.img = img;
    this.numOfFrames = numOfFrames;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.numOfTicks = numOfTicks;
    this.frameIndex = 0;
    this.ticks = -1;
}
SpriteAnimation.prototype.isAtEnd = function () {
    return this.frameIndex >= this.numOfFrames - 1;
};
SpriteAnimation.prototype.isDone = function () {
    return this.frameIndex >= this.numOfFrames;
};
SpriteAnimation.prototype.startFromBeginning = function () {
    this.frameIndex = 0;
};
SpriteAnimation.prototype.nextFrame = function () {
    
    if (++this.ticks >= this.numOfTicks) {
        this.ticks = 0;
        this.frameIndex++;
    }
};
SpriteAnimation.prototype.drawFrame = function (x, y, w, h) {
    ctx.drawImage(this.img, this.frameIndex * this.frameWidth, 0,
        this.frameWidth, this.frameHeight, x, y, w, h);
};
