import Field from './field.js';
import * as sound from './sound.js';

export default class Game{
    constructor(GAME_TIME, NUM_CARROTS, X_AVAILABLE_LENGTH, Y_AVAILABLE_LENGTH){
        this.playBtn = document.querySelector('.play');
        this.toggle = document.querySelector('.toggle');
        this.timer = document.querySelector('.time');
        this.remainder = document.querySelector('.remainder');
        
        this.isPaused = true;
        this.intervalVar = undefined;
        this.gameStarted = false;
        
        this.GAME_TIME = GAME_TIME;
        this.NUM_CARROTS = NUM_CARROTS;
        this.X_AVAILABLE_LENGTH = X_AVAILABLE_LENGTH;
        this.Y_AVAILABLE_LENGTH = Y_AVAILABLE_LENGTH;
        
        this.fieldArea = new Field(this.NUM_CARROTS, this.X_AVAILABLE_LENGTH, this.Y_AVAILABLE_LENGTH);
        this.fieldArea.carrotEventListener(this.onCarrotClick);
        this.fieldArea.bugEventListener(this.onBugClick);
        
        this.toggle.addEventListener('click', () => {
            this.isPaused = !this.isPaused;
            if(!this.isPaused && !this.gameStarted) this.playGame();
            if(this.isPaused) this.stopGame();
            this.gameStarted = true;
            this.toggleButton();
            
        })
    }

    stopEventListener(onGameStop){
        this.onGameStop = onGameStop;
    }

    playGame(){
        this.setAssets();
        this.fieldArea.clearItems();
        this.fieldArea.setItems();
        this.setTimer();
        sound.playBackground();
    }

    // 왜 this.toggle.addEventListener('click', onClick);는 안 됌?
    setEventListener(onClick){
        this.onClick = onClick;
    }

    toggleButton(){
        if(this.isPaused) this.toggle.className = this.toggle.className.split('square').join('play');
        else this.toggle.className = this.toggle.className.split('play').join('square');
    }

    setAssets(){
        this.remainder.innerHTML = this.NUM_CARROTS;
        this.playBtn.style.visibility = 'visible'
        this.toggle.style.visibility = 'visible'
        this.timer.style.visibility = 'visible'
        this.remainder.style.visibility = 'visible'
    }

    padZero(num){
        if(num.toString().length > 1) return num;
        else return '0' + num;
    }

    setTimer(){
        let time = this.GAME_TIME;
        this.timer.innerHTML = `00:${this.padZero(this.GAME_TIME)}`
        this.intervalVar = setInterval(() => {
            this.timer.innerHTML = `00:${this.padZero(time-1)}`;
            if(!this.isPaused) time--;
            if(time <= 0) {
                this.toggle.style.visibility = 'hidden';
                this.playBtn.style.visibility = 'hidden';
                clearInterval(this.intervalVar); 
                this.onGameStop && this.onGameStop('lose');
                sound.stopBackground();
            }
        }, 1000);
    }

    // arrow functions for event binding
    onCarrotClick = (event) =>{
        const id = event.target.dataset.id;
        const li = document.querySelector(`#${id}`);
        this.fieldArea.carrotList.removeChild(li);
        sound.playCarrot();
        this.remainder.innerHTML = +this.remainder.innerHTML - 1;
        if(!+this.remainder.innerHTML) this.onWinGame();
    }

    onBugClick = (event) => {
        const id = event.target.dataset.id;
        const li = document.querySelector(`#${id}`);
        this.fieldArea.bugList.removeChild(li);
        sound.playBug();
        clearInterval(this.intervalVar); 
        this.toggle.style.visibility = 'hidden';
        this.playBtn.style.visibility = 'hidden';
        this.onGameStop && this.onGameStop('lose');
    }

    onWinGame(){
        this.toggle.style.visibility = 'hidden';
        this.playBtn.style.visibility = 'hidden';
        sound.stopBackground();
        sound.playWin();
        clearInterval(this.intervalVar);
        this.onGameStop && this.onGameStop('win');
        // this.isPaused = true;
    }

    stopGame(){
        this.isPaused = true;

    }
}