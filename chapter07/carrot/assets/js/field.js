export default class Field{
    constructor(NUM_CARROTS, X_AVAILABLE_LENGTH, Y_AVAILABLE_LENGTH){
        this.carrotList = document.querySelector('.carrots');
        this.bugList = document.querySelector('.bugs');
        this.NUM_CARROTS = NUM_CARROTS;
        this.X_AVAILABLE_LENGTH = X_AVAILABLE_LENGTH;
        this.Y_AVAILABLE_LENGTH = Y_AVAILABLE_LENGTH;
        this.carrotList.addEventListener('click', (event) => {
            this.onCarrotClick && this.onCarrotClick(event);
        })
        this.bugList.addEventListener('click', (event) => {
            this.onBugClick && this.onBugClick(event);
        })
        
    }

    carrotEventListener(onCarrotClick){
        this.onCarrotClick = onCarrotClick;
    }

    bugEventListener(onBugClick){
        this.onBugClick = onBugClick;
    }

    clearItems(){
        this.carrotList.innerHTML = '';
        this.bugList.innerHTML = '';
    }

    makeHTML(x, y, id, type){
        const li = document.createElement('li');
        li.setAttribute('id', `${type}-${id}`);
        li.innerHTML = `<img src="./assets/img/${type}.png" data-id="${type}-${id}">`;
        li.style.transform = `translate(${x}px, ${y}px)`
        return li;   
    }

    setItems(){
        this.setItem(this.carrotList, 'carrot');
        this.setItem(this.bugList, 'bug');
    }

    setItem(list, kind){
        for(let i = 0; i < this.NUM_CARROTS; i++){
            let x = Math.random() * this.X_AVAILABLE_LENGTH;
            let y = Math.random() * this.Y_AVAILABLE_LENGTH;
            const li = this.makeHTML(x, y, i, kind);
            list.appendChild(li);
        }
    }
}