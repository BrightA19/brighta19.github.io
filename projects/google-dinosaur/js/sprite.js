var Sprite = function (img, x, y, width, height) {
    this.isAnimation = false;
    this.img = img;
    this.width = width;
    this.height = height;
    
    
    this.render = function (ctx, cropWidth, cropHeight) {
        var w = (cropWidth == undefined) ? this.width : cropWidth;
        var h = (cropHeight == undefined) ? this.height : cropHeight;
        
        ctx.drawImage(this.img, x, y, w, h, 0, 0, w, h);
    };
};
