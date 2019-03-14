var input = {
    up: false,
    down: false,
    test: false
};

window.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 32:
        case 38:
            input.up = true;
            break;
        case 40:
            input.down = true;
            break;
        case 192:
            input.test = true;
    }
});
window.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
        case 32:
        case 38:
            input.up = false;
            break;
        case 40:
            input.down = false;
            break;
        case 192:
            input.test = false;
    }
});