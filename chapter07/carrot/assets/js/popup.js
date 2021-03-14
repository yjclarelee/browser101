export default class PopUp{
    constructor(){
        this.popup = document.querySelector('.pop-up');
        this.textSpan = document.querySelector('.message');
        this.redo = document.querySelector('.redo');
        this.redo.addEventListener('click', () => {
            this.onClick && this.onClick();
        });
    }

    setEventListener(onClick){
        this.onClick = onClick;
    }

    popUp(text){
        text == 'win' ? this.textSpan.innerHTML = 'YOU WIN' : this.textSpan.innerHTML = 'YOU LOSE'
        this.popup.style.display = 'block';
    }

    hide(){
        this.popup.style.display = 'none';
    }

}

