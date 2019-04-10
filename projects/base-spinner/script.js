var cvs = document.querySelector("canvas")
var ctx = cvs.getContext("2d");

var ups = 30;

var previousDate = Date.now();
    
var Images = {
    BASE_LOGO:      "img/base_logo.png",
    UPPER_LEFT:     "img/bg_4.jpg",
    UPPER_RIGHT:    "img/bg_2.jpg",
    BOTTOM_LEFT:    "img/bg_7.jpg",
    BOTTOM_RIGHT:   "img/bg_9.jpg",
    MIDDLE:         "img/bg_3.jpg",
};

var imagesLoaded = {};
var imagesToLoad = [
    Images.BASE_LOGO,
    Images.MIDDLE,
    Images.UPPER_LEFT,
    Images.UPPER_RIGHT,
    Images.BOTTOM_LEFT,
    Images.BOTTOM_RIGHT
];

var speed = 20;
var scale = 1;

var rotation = 0;

function update(delta) {
    rotation += speed * delta;
    
    if (rotation > 360)
        rotation -= 360;
    else if (rotation < 0)
        rotation += 360;
}

function draw() {
    var baseLogoImage = imagesLoaded[Images.BASE_LOGO],
        baseLogoWidth = baseLogoImage.width * scale,
        baseLogoHeight = baseLogoImage.height * scale,
        offsetX = (cvs.width / 2) - (baseLogoWidth / 2),
        offsetY = (cvs.height / 2) - (baseLogoHeight / 2);
    
    
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    
    clipMiddle(function () {
        ctx.drawImage(imagesLoaded[Images.MIDDLE], 0, 0, cvs.width, cvs.height);
    });
    clipSides(45, function () {
        ctx.drawImage(imagesLoaded[Images.UPPER_RIGHT], 0, 0, cvs.width, cvs.height);
    });
    clipSides(135, function () {
        ctx.drawImage(imagesLoaded[Images.UPPER_LEFT], 0, 0, cvs.width, cvs.height);
    });
    clipSides(225, function () {
        ctx.drawImage(imagesLoaded[Images.BOTTOM_LEFT], 0, 0, cvs.width, cvs.height);
    });
    clipSides(315, function () {
        ctx.drawImage(imagesLoaded[Images.BOTTOM_RIGHT], 0, 0, cvs.width, cvs.height);
    });
        
    
    ctx.save();
    ctx.translate(baseLogoWidth / 2 + offsetX, baseLogoHeight / 2 + offsetY);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.drawImage(baseLogoImage, -baseLogoWidth / 2, -baseLogoHeight / 2, baseLogoWidth, baseLogoHeight);
    ctx.restore();
}

function clipSides(deg, callback) {
    var rot = rotation - deg,
    
        ox = cvs.width / 2,
        oy = cvs.height / 2;
    
    
    ctx.save();
    ctx.beginPath();
    
    ctx.moveTo(ox + Math.cos(getRadian(rot + -45)) * 220,
        oy + Math.sin(getRadian(rot + -45)) * 220);
        
    ctx.lineTo(ox + Math.cos(getRadian(rot + -33)) * 280,
        oy + Math.sin(getRadian(rot + -33)) * 280);
        
    ctx.lineTo(ox + Math.cos(getRadian(rot + -12)) * 385,
        oy + Math.sin(getRadian(rot + -12)) * 385);
        
    ctx.lineTo(ox + Math.cos(getRadian(rot + 12)) * 385,
        oy + Math.sin(getRadian(rot + 12)) * 385);
        
    ctx.lineTo(ox + Math.cos(getRadian(rot + 33)) * 280,
        oy + Math.sin(getRadian(rot + 33)) * 280);
        
    ctx.lineTo(ox + Math.cos(getRadian(rot + 45)) * 220,
        oy + Math.sin(getRadian(rot + 45)) * 220);
    
    ctx.closePath();
    ctx.clip();
    
    callback();
    
    ctx.restore();
}

function clipMiddle(callback) {
    var rot = rotation,
    
        ox = cvs.width / 2,
        oy = cvs.height / 2;
    
    
    ctx.save();
    ctx.beginPath();
    
    ctx.moveTo(ox + Math.cos(getRadian(rot + 0)) * 220,
        oy + Math.sin(getRadian(rot + 0)) * 220);
    
    ctx.lineTo(ox + Math.cos(getRadian(rot + 90)) * 220,
        oy + Math.sin(getRadian(rot + 90)) * 220);
    
    ctx.lineTo(ox + Math.cos(getRadian(rot + 180)) * 220,
        oy + Math.sin(getRadian(rot + 180)) * 220);
    
    ctx.lineTo(ox + Math.cos(getRadian(rot + 270)) * 220,
        oy + Math.sin(getRadian(rot + 270)) * 220);
    
    ctx.closePath();
    ctx.clip();
    
    callback();
    
    ctx.restore();
}

function getRadian(deg) {
    return deg * Math.PI / 180;
}

function resizeCanvasToScreen() {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
}

function loadImages(images, callback) {
    var numOfImages = images.length,
        numOfImagesLoaded = 0,
        loaded = {};
        
    for (var i = 0; i < numOfImages; i++) {
        var image = new Image();
        image.src = images[i];
        image.name = images[i];
        image.onload = function () {
            loaded[this.name] = this;
            numOfImagesLoaded++;
            if (numOfImagesLoaded == numOfImages) {
                callback(loaded);
            }
        };
    }
}

loadImages(imagesToLoad, function (images) {
    imagesLoaded = images;
    
    window.setInterval(function () {
        var currentDate = Date.now(),
            delta = (currentDate - previousDate) / 1000;
        
        update(delta);
        draw();
        
        previousDate = currentDate;
    }, 1000 / ups);
});

window.onresize = resizeCanvasToScreen;

resizeCanvasToScreen();
