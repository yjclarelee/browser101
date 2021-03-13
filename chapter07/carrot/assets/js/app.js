const GAME_TIME = 10;
const TOP_LENGTH = 220;
const X_AVAILABLE_LENGTH = 700;
const Y_AVAILABLE_LENGTH = 130;
const NUM_CARROTS = 5;

let IS_PAUSED = false;
let interval; 
let gameStarted;

const bgSound = new Audio('/chapter07/carrot/assets/sound/bg.mp3');
const alertSound = new Audio('/chapter07/carrot/assets/sound/alert.wav');
const gameWinSound = new Audio('/chapter07/carrot/assets/sound/game_win.mp3');
const carrotSound = new Audio('/chapter07/carrot/assets/sound/carrot_pull.mp3');
const bugSound = new Audio('/chapter07/carrot/assets/sound/bug_pull.mp3');

(function render(){
    playGame();
    onItemClick();
    onRedoClick();
})();

/**
 * playGame()
 * initialize and set game
 */
function playGame(){
    const playButton = document.querySelector('.play');
    let gameStarted = false;
    // playSound(bgSound);
    playButton.addEventListener('click', (event) => {
        if(gameStarted){
            // if(IS_PAUSED) IS_PAUSED = false;
            // else IS_PAUSED = true;  
            IS_PAUSED = !IS_PAUSED;
            const popup = document.querySelector('.pop-up');
            popup.style.display = 'none';
            playSound(alertSound)
        }
        else{
            initializeGame(gameStarted);
            if(!gameStarted) setTimer(playButton);
            gameStarted = true;
        }
        toggleStartIcon();  
    })
}

function initializeGame(gameStarted){
    setItem('carrot');
    setItem('bug');
}

function setItem(item){
    const list = document.querySelector(`.${item}s`);
    for(let i = 0; i < NUM_CARROTS; i++){
        let x = Math.random() * X_AVAILABLE_LENGTH;
        let y = Math.random() * Y_AVAILABLE_LENGTH;
        const li = makeHTML(x, y, i, item);
        list.appendChild(li);
    }
}

function removeItems(){
    const carrotList = document.querySelector('.carrots');
    const bugList = document.querySelector('.bugs');
    // do this instead of remove()
    carrotList.innerHTML = '';
    bugList.innerHTML = '';
}

function makeHTML(x, y, id, type){
    const li = document.createElement('li');
    li.setAttribute('id', `${type}-${id}`);
    li.innerHTML = `<img src="./assets/img/${type}.png" data-id="${type}-${id}">`;
    li.style.transform = `translate(${x}px, ${y}px)`
    return li;   
}

function toggleStartIcon(){
    const icon = document.querySelector('.toggle');
    if(icon.className.includes('play')) {
        icon.className = icon.className.split('play').join('square');
    }
    else{
        icon.className = icon.className.split('square').join('play');
        const popup = document.querySelector('.pop-up');
        // instead of using 'block', use a class and remove the class
        popup.style.display = 'block';
    }
}

function setTimer(){
    const timeSpan = document.querySelector('.time');
    let time = GAME_TIME;
    timeSpan.innerHTML = `00:${padZero(GAME_TIME)}`
    interval = setInterval(() => {
        timeSpan.innerHTML = `00:${padZero(time-1)}`;
        if(!IS_PAUSED) time--;
        if(time == 0) {
            clearInterval(interval); 
            popUp('lose');
        }
    }, 1000);
}

function padZero(num){
    if(num.toString().length > 1) return num;
    else return '0' + num;
}

/**
 * onItemClick()
 * set changes on item click
 */

function onItemClick(){
    const ul = document.querySelectorAll('ul');
    ul.forEach((elem) => {
        elem.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            const li = document.querySelector(`#${id}`);
            elem.removeChild(li);
            // if event.target matches '.carrot'
            if(id.split('-')[0] == 'carrot'){
                playSound(carrotSound);
                const remainder = document.querySelector('.remainder');
                remainder.innerHTML = +remainder.innerHTML - 1;
                if(!+remainder.innerHTML) {
                    playSound(gameWinSound);
                    popUp('win');    
                }
            }
            else{
                playSound(bugSound);
                popUp('lose');
            }
        })
    })
    
}

/**
 * popUp(text)
 * when the game is over
 */
function popUp(text){
    const popup = document.querySelector('.pop-up');
    const textSpan = document.querySelector('.message');
    text == 'win' ? textSpan.innerHTML = 'YOU WIN' : textSpan.innerHTML = 'YOU LOSE'
    popup.style.display = 'block';
    IS_PAUSED = true;
    stopSound(bgSound);
}

function onRedoClick(){
    const redo = document.querySelector('.redo');
    redo.addEventListener('click', (event) => {
        console.log('click');
        const popup = document.querySelector('.pop-up');
        popup.style.display = 'none';
        clearInterval(interval);
        startGame();
    })
}

function startGame(){
    IS_PAUSED = false;
    removeItems();
    initializeGame(gameStarted);
    setTimer();
    playSound(bgSound);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}