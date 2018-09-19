/* global DataManager ImageManager AudioManager InputManager */

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var WIDTH = canvas.width; // 768 px
var HEIGHT = canvas.height; // 512 px

var AUDIO_PREFIX = "assets/audio/";
var IMAGES_PREFIX = "assets/images/";

var datamanager = new DataManager();
var imagemanager = new ImageManager();
var audiomanager = new AudioManager(0.5);
var inputmanager = new InputManager();

// Keep pixellation of image when resizing an image
ctx.imageSmoothingEnabled = false;

audiomanager.loadAudio(AUDIO_PREFIX + "hit.wav", "hit");
audiomanager.loadAudio(AUDIO_PREFIX + "wing.wav", "wing");
audiomanager.loadAudio(AUDIO_PREFIX + "point.wav", "point");
audiomanager.loadAudio(AUDIO_PREFIX + "swoosh.wav", "swoosh");
audiomanager.loadAudio(AUDIO_PREFIX + "oof.mp3", "oof");

imagemanager.loadImage(IMAGES_PREFIX + "0.png", "0");
imagemanager.loadImage(IMAGES_PREFIX + "1.png", "1");
imagemanager.loadImage(IMAGES_PREFIX + "2.png", "2");
imagemanager.loadImage(IMAGES_PREFIX + "3.png", "3");
imagemanager.loadImage(IMAGES_PREFIX + "4.png", "4");
imagemanager.loadImage(IMAGES_PREFIX + "5.png", "5");
imagemanager.loadImage(IMAGES_PREFIX + "6.png", "6");
imagemanager.loadImage(IMAGES_PREFIX + "7.png", "7");
imagemanager.loadImage(IMAGES_PREFIX + "8.png", "8");
imagemanager.loadImage(IMAGES_PREFIX + "9.png", "9");
imagemanager.loadImage(IMAGES_PREFIX + "background-day.png", "background-day");
imagemanager.loadImage(IMAGES_PREFIX + "background-night.png", "background-night");
imagemanager.loadImage(IMAGES_PREFIX + "base.png", "base");
imagemanager.loadImage(IMAGES_PREFIX + "message.png", "message");
imagemanager.loadImage(IMAGES_PREFIX + "yellowbird-downflap.png", "yellowbird-downflap");
imagemanager.loadImage(IMAGES_PREFIX + "yellowbird-midflap.png", "yellowbird-midflap");
imagemanager.loadImage(IMAGES_PREFIX + "yellowbird-upflap.png", "yellowbird-upflap");
imagemanager.loadImage(IMAGES_PREFIX + "redbird-downflap.png", "redbird-downflap");
imagemanager.loadImage(IMAGES_PREFIX + "redbird-midflap.png", "redbird-midflap");
imagemanager.loadImage(IMAGES_PREFIX + "redbird-upflap.png", "redbird-upflap");
imagemanager.loadImage(IMAGES_PREFIX + "pipe-green.png", "pipe-green");

inputmanager.initialize(canvas);

canvas.focus();
