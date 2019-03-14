var SpriteAnimation = function (img, x, y, width, height, numOfSprites, fps) {
    this.isAnimation = true;
    this.img = img;
    this.width = width;
    this.height = height;
    this.numOfSprites = numOfSprites;
    this.fps = fps;
    
    this.timePassed = 0;
    this.frame = 0;
    
    
    this.update = function (dt) {
        this.timePassed += dt;
        
        if (this.timePassed > (1 / this.fps)) {
            this.frame++;
            if (this.frame >= numOfSprites) {
                this.frame = 0;
            }
            this.timePassed = 0;
        }
    };
    
    this.render = function (ctx, cropWidth, cropHeight) {
        var w = (cropWidth == undefined) ? this.width : cropWidth;
        var h = (cropHeight == undefined) ? this.height : cropHeight;
        
        ctx.drawImage(this.img, x + (this.frame * this.width), y, w, h, 0, 0, w, h);
    };
    
    this.startFromBeginning = function () {
        this.timePassed = 0;
        this.frame = 0;
    };
};
