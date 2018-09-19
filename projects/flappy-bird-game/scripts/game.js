/* global canvas imagemanager audiomanager inputmanager TitleScreen GameScreen */
var currentScreen = new TitleScreen();

function main() {
    
    switch(currentScreen.changeScreenTo) {
        
        case "titlescreen":
            currentScreen = new TitleScreen();
            break;
            
        case "gamescreen":
            currentScreen = new GameScreen();
            break;
            
    }
    
    currentScreen.update();
    currentScreen.render();
        
    window.requestAnimationFrame(main);
    
}

main();
