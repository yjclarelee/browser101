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
        this.textSpan.innerHTML = text;
        this.popup.style.display = 'block';
    }

    hide(){
        this.popup.style.display = 'none';
    }

}

