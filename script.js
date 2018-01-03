var view = document.getElementById("view");
var cover = document.getElementsByClassName("cover")[0];
var menu = document.getElementsByClassName("menu")[0];
var menuButton = document.getElementById("menuButton");

var menuOpen = true;


function setView(src, coverColor) {
    cover.style.background = coverColor;
    cover.style.opacity = 0;
    view.src = src;
    view.onload = toggleMenu;
}

function toggleMenu() {
    
    if (menuOpen) {
        menu.style.left = "-150px";
        cover.style.opacity = "0";
        cover.style.right = "-" + innerWidth + "px";
        menuButton.innerHTML = ">>";
    }
    else {
        menu.style.left = "0";
        cover.style.opacity = "0.5";
        cover.style.right = "-148px";
        menuButton.innerHTML = "<<";
    }
    
    menuOpen = !menuOpen;
    
}