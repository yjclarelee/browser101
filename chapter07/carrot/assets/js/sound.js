const bgSound = new Audio('/chapter07/carrot/assets/sound/bg.mp3');
const alertSound = new Audio('/chapter07/carrot/assets/sound/alert.wav');
const gameWinSound = new Audio('/chapter07/carrot/assets/sound/game_win.mp3');
const carrotSound = new Audio('/chapter07/carrot/assets/sound/carrot_pull.mp3');
const bugSound = new Audio('/chapter07/carrot/assets/sound/bug_pull.mp3');

export function playCarrot(){
    playSound(carrotSound);
}
export function playBug(){
    playSound(bugSound);
}
export function playBackground(){
    playSound(bgSound);
}
export function stopBackground(){
    stopSound(bgSound);
}
export function playAlert(){
    playSound(alertSound);
}
export function playWin(){
    playSound(gameWinSound);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}
