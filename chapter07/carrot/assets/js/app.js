const GAME_TIME = 3;
const TOP_LENGTH = 220;
const X_AVAILABLE_LENGTH = 700;
const Y_AVAILABLE_LENGTH = 130;

(function render(){
    startGame();
})();

function startGame(){
    const playButton = document.querySelector('.play');
    playButton.addEventListener('click', (event) => {
        toggleStartIcon();
        setTimer(playButton);
        setItems();
    })
}

function toggleStartIcon(){
    const icon = document.querySelector('.toggle');
    if(icon.className.includes('play')) {
        icon.className = icon.className.split('play').join('square');
    }
    else{
        icon.className = icon.className.split('square').join('play');
    }
}

function setTimer(){
    const timeSpan = document.querySelector('.time');
    let time = GAME_TIME;
    const interval = setInterval(() => {
        timeSpan.innerHTML = `00:${padZero(time-1)}`;
        time--;
        if(time == 0) {
            console.log('finished');
            clearInterval(interval); 
            // endGame()
        }
    }, 1000);
}

function padZero(num){
    if(num.toString().length > 1) return;
    else return '0' + num;
}

function setItems(){
    setItem('carrot');
    setItem('bug');
}

function setItem(item){
    const list = document.querySelector(`.${item}s`);
    for(let i = 0; i < 10; i++){
        let x = Math.random() * X_AVAILABLE_LENGTH;
        let y = Math.random() * Y_AVAILABLE_LENGTH;
        const li = makeHTML(x, y, i, item);
        list.appendChild(li);
    }
}

function makeHTML(x, y, id, type){
    const li = document.createElement('li');
    li.setAttribute('data-id', `${type}-${id}`);
    li.innerHTML = `<img src="./assets/img/${type}.png" alt="${type}">`;
    li.style.transform = `translate(${x}px, ${y}px)`
    return li;   
}
