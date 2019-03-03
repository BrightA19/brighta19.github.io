function InputManager() {
    var keys = [];
    this.initialize = function (elem = window) {
        elem.addEventListener("keydown", function (e) {
            if (keys.indexOf(e.keyCode) < 0)
                keys.push(e.keyCode);
        });
        elem.addEventListener("keyup", function (e) {
            keys.splice(keys.indexOf(e.keyCode), 1);
        });
    };
    this.isKeyDown = function (keycode) {
        if (keycode)
            return keys.indexOf(keycode) >= 0;
        else
            return keys.length > 0;
            
    };
}
