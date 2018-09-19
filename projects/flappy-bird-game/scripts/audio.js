function AudioManager(volume) {
    var loaded = 0;
    var audio = {};
    this.loadAudio = function (src, name) {
        audio[name] = new Audio(src);
        audio[name].volume = volume;
    };
    this.play = function (name, seek = 0) {
        audio[name].currentTime = seek;
        audio[name].play();
    };
    this.stop = function (name) {
        audio[name].pause();
        audio[name].currentTime = 0;
    };
    this.restart = function(name) {
        if (!audio[name].ended)
            this.stop(name);
        this.play(name)
    }
}
