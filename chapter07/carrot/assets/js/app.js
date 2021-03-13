const GAME_TIME = 10;
const TOP_LENGTH = 220;
const X_AVAILABLE_LENGTH = 700;
const Y_AVAILABLE_LENGTH = 130;
const NUM_CARROTS = 10;

let IS_PAUSED = false;
(function render(){
    playGame();
    onItemClick();
})();


function playGame(){
    const playButton = document.querySelector('.play');
    let gameStarted = false;
    playButton.addEventListener('click', (event) => {
        if(gameStarted){
            if(IS_PAUSED) IS_PAUSED = false;
            else IS_PAUSED = true;  
        }
        else{
            initializeGame();
            if(!gameStarted) setTimer(playButton);
            gameStarted = true;
        }
        toggleStartIcon();  
    })
}

function initializeGame(){
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
        // pause game
    }
}

function setTimer(playButton){
    const timeSpan = document.querySelector('.time');
    let time = GAME_TIME;
    const interval = setInterval(() => {
        timeSpan.innerHTML = `00:${padZero(time-1)}`;
        if(!IS_PAUSED) time--;
        if(time == 0) {
            clearInterval(interval); 
        }
    }, 1000);
}

function padZero(num){
    if(num.toString().length > 1) return;
    else return '0' + num;
}

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
            }
        })
    })
    
}