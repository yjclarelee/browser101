import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const GAME_TIME = 10;
const X_AVAILABLE_LENGTH = 700;
const Y_AVAILABLE_LENGTH = 130;
const NUM_CARROTS = 5;

let isPaused = false;
let intervalVar; 

const fieldArea = new Field(NUM_CARROTS, X_AVAILABLE_LENGTH, Y_AVAILABLE_LENGTH);
const redoPopUp = new PopUp();

/**
 * playGame()
 * initialize and set game
 */

const playBtn = document.querySelector('.play');
const toggle = document.querySelector('.toggle');
const timer = document.querySelector('.time');
const remainder = document.querySelector('.remainder');


function playGame(){
    setAssets();
    fieldArea.clearItems();
    fieldArea.setItems();
    setTimer();
    sound.playBackground();
}

function setAssets(){
    playBtn.style.visibility = 'visible'
    toggle.style.visibility = 'visible'
    timer.style.visibility = 'visible'
    remainder.style.visibility = 'visible'
}

toggle.addEventListener('click', (event) => {
    if(isPaused) stopGame();
    else playGame();
    toggleButton();
})

function toggleButton(){
    if(isPaused) toggle.className = toggle.className.split('square').join('play');
    else toggle.className = toggle.className.split('play').join('square');
}

function setTimer(){
    let time = GAME_TIME;
    timer.innerHTML = `00:${padZero(GAME_TIME)}`
    intervalVar = setInterval(() => {
        timer.innerHTML = `00:${padZero(time-1)}`;
        if(!isPaused) time--;
        if(time <= 0) {
            toggle.style.visibility = 'hidden';
            playBtn.style.visibility = 'hidden';
            clearInterval(intervalVar); 
            redoPopUp.popUp('lose');
            sound.stopBackground();
        }
    }, 1000);
}

function padZero(num){
    if(num.toString().length > 1) return num;
    else return '0' + num;
}

fieldArea.carrotEventListener((event) => {
    const id = event.target.dataset.id;
    const li = document.querySelector(`#${id}`);
    fieldArea.carrotList.removeChild(li);
    sound.playCarrot();
    remainder.innerHTML = +remainder.innerHTML - 1;
    if(!+remainder.innerHTML) onWinGame();
})

fieldArea.bugEventListener((event) =>{
    const id = event.target.dataset.id;
    const li = document.querySelector(`#${id}`);
    fieldArea.bugList.removeChild(li);
    sound.playBug();
    toggle.style.visibility = 'hidden';
    playBtn.style.visibility = 'hidden';
    isPaused = true;
    redoPopUp.popUp('lose');
})

redoPopUp.setEventListener(() => {
    sound.playAlert();
    redoPopUp.hide();
    clearInterval(intervalVar);
    isPaused = false;
    remainder.innerHTML = NUM_CARROTS;
    playGame();
})

function onWinGame(){
    toggle.style.visibility = 'hidden';
    playBtn.style.visibility = 'hidden';
    sound.stopBackground();
    sound.playWin();
    redoPopUp.popUp('win');
    isPaused = true;
}

function stopGame(){
    isPaused = true;
}