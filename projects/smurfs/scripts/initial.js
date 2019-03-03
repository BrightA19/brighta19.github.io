/* global Image InputManager */

var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var WIDTH = cvs.width = window.innerWidth;
var HEIGHT = cvs.height = window.innerHeight;

var input = new InputManager();
input.initialize();

var numOfImages = 9;
var numOfImagesLoaded = 0;
var imagesCompleted = false;
var images = {
    idle: "sprites/idle.png",
    idle1: "sprites/idle1.png",
    idle2: "sprites/idle2.png",
    idle3: "sprites/idle3.png",
    walking: "sprites/walking.png",
    jumping: "sprites/jumping.png",
    landing: "sprites/landing.png",
    ducking: "sprites/ducking.png",
    crawling: "sprites/crawling.png",
    
    idletest: "sprites2/idle/image.png",
    idle1test: "sprites2/idle1/image.png",
    idle2test: "sprites2/idle2/image.png",
    idle3test: "sprites2/idle3/image.png",
};

for (let i in images) {
    let img = new Image();
    img.src = images[i];
    img.onload = function () {
        if (++numOfImagesLoaded == numOfImages)
            imagesCompleted = true;
    };
    images[i] = img;
}

var FPS  = 60;
var GRAVITY = 0.3;
var smurfs = [];
