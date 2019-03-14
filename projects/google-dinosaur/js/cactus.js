/* global spritesheet Sprite SpriteAnimation */
var cactus_types = ["small1", "small2", "small3", "small4",
    "large1", "large2", "large3", "large4"];
var cactus_groups = {
    small: [["small1"], ["small1", "small2"], ["small1", "small3", "small4"]],
    large: [["large1"], ["large2", "large3"], ["large2", "large4", "large3"]],
}
var cactus_info = {
    small1: {x: 245, y: 2, w: 17, h: 35},
    small2: {x: 262, y: 2, w: 17, h: 35},
    small3: {x: 296, y: 2, w: 17, h: 35},
    small4: {x: 313, y: 2, w: 17, h: 35},
    large1: {x: 332, y: 2, w: 25, h: 50},
    large2: {x: 357, y: 2, w: 25, h: 50},
    large3: {x: 382, y: 2, w: 25, h: 50},
    large4: {x: 432, y: 2, w: 25, h: 50}
};

var Cactus = function (type, x) {
    this.x = 600 + x;
    
    this.type = type;
    this.sprite = new Sprite(spritesheet, cactus_info[type].x,
        cactus_info[type].y, cactus_info[type].w, cactus_info[type].h);
    this.y = 150 - this.sprite.height;
    this.width = this.sprite.width;
    this.height = this.sprite.height;
    
    this.speed = 0;
    
    
    this.update = function (dt) {
        this.x -= (this.speed * dt);
    };
    this.render = function (ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        this.sprite.render(ctx);
        ctx.restore();
    };
};
