const GAME_TIME = 10;
const TOP_LENGTH = 220;
const X_AVAILABLE_LENGTH = 700;
const Y_AVAILABLE_LENGTH = 130;
const NUM_CARROTS = 5;

let IS_PAUSED = false;
let interval; 
let gameStarted;

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
    playButton.addEventListener('click', (event) => {
        if(gameStarted){
            if(IS_PAUSED) IS_PAUSED = false;
            else IS_PAUSED = true;  
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
    removeList(carrotList);
    removeList(bugList);
}

function removeList(elem){
    while(elem.firstChild) elem.remove(elem.lastChild);
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
            if(id.split('-')[0] == 'carrot'){
                const remainder = document.querySelector('.remainder');
                remainder.innerHTML = +remainder.innerHTML - 1;
                if(!+remainder.innerHTML) popUp('win');
            }
            else{
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
    initializeGame(gameStarted);
    setTimer();
}