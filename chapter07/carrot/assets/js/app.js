import PopUp from './popup.js';
import Field from './field.js';

const GAME_TIME = 10;
const X_AVAILABLE_LENGTH = 700;
const Y_AVAILABLE_LENGTH = 130;
const NUM_CARROTS = 5;

let isPaused = false;
let intervalVar; 

const bgSound = new Audio('/chapter07/carrot/assets/sound/bg.mp3');
const alertSound = new Audio('/chapter07/carrot/assets/sound/alert.wav');
const gameWinSound = new Audio('/chapter07/carrot/assets/sound/game_win.mp3');
const carrotSound = new Audio('/chapter07/carrot/assets/sound/carrot_pull.mp3');
const bugSound = new Audio('/chapter07/carrot/assets/sound/bug_pull.mp3');

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
    playSound(bgSound);
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
            stopSound(bgSound);
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
    playSound(carrotSound);
    remainder.innerHTML = +remainder.innerHTML - 1;
    if(!+remainder.innerHTML) onWinGame();
})

fieldArea.bugEventListener((event) =>{
    const id = event.target.dataset.id;
    const li = document.querySelector(`#${id}`);
    fieldArea.bugList.removeChild(li);
    playSound(bugSound);
    isPaused = true;
    redoPopUp.popUp('lose');
})

redoPopUp.setEventListener(() => {
    playSound(alertSound);
    redoPopUp.hide();
    clearInterval(intervalVar);
    isPaused = false;
    remainder.innerHTML = NUM_CARROTS;
    playGame();
})

function onWinGame(){
    toggle.style.visibility = 'hidden';
    playBtn.style.visibility = 'hidden';
    playSound(gameWinSound);
    redoPopUp.popUp('win');
    isPaused = true;
    stopSound(bgSound); 
}

function stopGame(){
    isPaused = true
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}