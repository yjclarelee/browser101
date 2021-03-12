function render(){
    startGame();
}

function startGame(){
    const playButton = document.querySelector('.play');
    playButton.addEventListener('click', (event) => {
        setTimer(playButton);
        // setItems();
    })
}

function setTimer(){
    const timeSpan = document.querySelector('.time');
    let time = 3;
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

render();