function ImageManager() {
    var images = {};
    this.loadImage = function (src, name) {
        images[name] = new Image();
        images[name].src = src;
    };
    this.get = function (name) {
        return images[name];
    };
}
