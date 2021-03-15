import Game from './game.js';
import PopUp from './popup.js';

const GAME_TIME = 10;
const X_AVAILABLE_LENGTH = 700;
const Y_AVAILABLE_LENGTH = 130;
const NUM_CARROTS = 5;

const game = new Game(GAME_TIME, NUM_CARROTS, X_AVAILABLE_LENGTH, Y_AVAILABLE_LENGTH);
const redoPopUp = new PopUp();

game.stopEventListener((reason) => {
    let message;
    switch(reason){
        case 'lose':
            message = "You Lose 😢"
            break;
        case 'win':
            message = "You Win😄"
            break;
        default:
            console.log('other case');
            break;
    }
    redoPopUp.popUp(message);
})

redoPopUp.setEventListener(() => {
    redoPopUp.hide();
    game.playGame();
})