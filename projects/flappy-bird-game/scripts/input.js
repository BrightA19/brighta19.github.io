function InputManager() {
    var mouse = {
        x: 0,
        y: 0,
        left: false,
        middle: false,
        right: false
    };
    var keys = [];
    this.initialize = function (elem = window) {
        elem.addEventListener("mousemove", function (e) {
            mouse.x = e.clientX - (elem.offsetLeft || 0);
            mouse.y = e.clientY - (elem.offsetTop || 0);
        });
        elem.addEventListener("mousedown", function (e) {
            switch (e.button) {
                case 0: mouse.left = true; break;
                case 1: mouse.middle = true; break;
                case 2: mouse.right = true; break;
            }
        });
        elem.addEventListener("mouseup", function (e) {
            switch (e.button) {
                case 0: mouse.left = false; break;
                case 1: mouse.middle = false; break;
                case 2: mouse.right = false; break;
            }
        });
        elem.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
        elem.addEventListener("keydown", function (e) {
            if (keys.indexOf(e.keyCode) < 0)
                keys.push(e.keyCode);
        });
        elem.addEventListener("keyup", function (e) {
            keys.splice(keys.indexOf(e.keyCode), 1);
        });
    };
    this.isMouseBtnDown = function (side) {
        switch (side) {
            case "left": return mouse.left;
            case "middle": return mouse.middle;
            case "right": return mouse.right;
            default: return mouse.left || mouse.right || mouse.middle;
        }
    };
    this.getMousePosition = function () {
        return {x: mouse.x, y: mouse.y};
    };
    this.isKeyDown = function (keycode) {
        if (!keycode)
            return keys.length > 0;
        else
            return keys.indexOf(keycode) >= 0;
    };
}
