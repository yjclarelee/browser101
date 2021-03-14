import PopUp from './popup.js'

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

const redoPopUp = new PopUp();
redoPopUp.setEventListener((event) => {
    playSound(alertSound);
    redoPopUp.hide();
    clearInterval(intervalVar);
    isPaused = false;
    playGame();
})

// (function render(){
//     playGame();
//     onItemClick();
//     onRedoClick();
// })();

/**
 * playGame()
 * initialize and set game
 */

const playBtn = document.querySelector('.play');
const toggle = document.querySelector('.toggle');
const timer = document.querySelector('.time');
const remainder = document.querySelector('.remainder');

const carrotList = document.querySelector('.carrots');
const bugList = document.querySelector('.bugs');

toggle.addEventListener('click', (event) => {
    if(isPaused) stopGame();
    else playGame();
    toggleButton();
})

function toggleButton(){
    if(isPaused) toggle.className = toggle.className.split('square').join('play');
    else toggle.className = toggle.className.split('play').join('square');
}

function playGame(){
    setAssets();
    clearItems();
    setItems();
    setTimer();
    playSound(bgSound);
    onItemClick();
}

function setAssets(){
    playBtn.style.visibility = 'visible'
    toggle.style.visibility = 'visible'
    timer.style.visibility = 'visible'
    remainder.style.visibility = 'visible'
}

function clearItems(){
    carrotList.innerHTML = '';
    bugList.innerHTML = '';
}

function setItems(){
    setItem(carrotList, 'carrot');
    setItem(bugList, 'bug');
}

function setItem(list, kind){
    for(let i = 0; i < NUM_CARROTS; i++){
        let x = Math.random() * X_AVAILABLE_LENGTH;
        let y = Math.random() * Y_AVAILABLE_LENGTH;
        const li = makeHTML(x, y, i, kind);
        list.appendChild(li);
    }
}

function makeHTML(x, y, id, type){
    const li = document.createElement('li');
    li.setAttribute('id', `${type}-${id}`);
    li.innerHTML = `<img src="./assets/img/${type}.png" data-id="${type}-${id}">`;
    li.style.transform = `translate(${x}px, ${y}px)`
    return li;   
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

function onItemClick(){
    carrotList.addEventListener('click', (event) => {
        const id = event.target.dataset.id;
        const li = document.querySelector(`#${id}`);
        carrotList.removeChild(li);
        playSound(carrotSound);
        remainder.innerHTML = +remainder.innerHTML - 1;
        if(!+remainder.innerHTML) {
            console.log('win');
            onWinGame();
        }
    })
    bugList.addEventListener('click', (event) => {
        const id = event.target.dataset.id;
        const li = document.querySelector(`#${id}`);
        bugList.removeChild(li);
        playSound(bugSound);
        isPaused = true;
        redoPopUp.popUp('lose');
    })
}

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