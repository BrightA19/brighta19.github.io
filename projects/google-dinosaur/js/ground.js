/* global spritesheet Sprite SpriteAnimation */
var Ground = function () {
    this.x = 0;
    this.y = 150;
    this.width = 1202;
    this.height = 30;
    
    this.cropWidth = 0;
    this.sprite = new Sprite(spritesheet, 2, 54, 1202, 14);
    
    this.speed = 0;
    this.isExtending = false;
    this.doneExtending = false;
    
    var hiddenX = 0;
    
    this.update = function (dt) {
        if (this.isExtending) {
            if (this.cropWidth < 600) {
                this.cropWidth += (1500 * dt);
            }
            else {
                this.isExtending = false;
                this.doneExtending = true;
            }
        }
        
        
        hiddenX -= (this.speed * dt);
        if (hiddenX <= -this.width) {
            hiddenX += this.width * Math.floor(-hiddenX / this.width);
        }
    };
    this.render = function (ctx) {
        var w = (this.cropWidth >= 600) ? this.width : this.cropWidth;
        
        ctx.save();
        ctx.translate(this.x + hiddenX, this.y - this.sprite.height);
        this.sprite.render(ctx, w);
        ctx.restore();
        
        ctx.save();
        ctx.translate(this.x + hiddenX + this.width, this.y - this.sprite.height);
        this.sprite.render(ctx, 600, this.sprite.height);
        ctx.restore();
    };
    
    this.extend = function () {
        this.isExtending = true;
    };
};
