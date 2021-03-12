const LIST_KEY = 'shopping_list_array';
const RANDOM_NUMBER = 'random_number_seed';

// localStorage.clear();

function render(){
    initialRender();
    onAddEvent();
    removeItem();
}

function initialRender(){
    const listArr = getLocalStorage(LIST_KEY);
    listArr.forEach((elem) => setHTML(elem));
}

// add events enter and add button click
function onAddEvent(){
    const input = document.querySelector('input[type="text"]');
    const addButton = document.querySelector('.add');
    input.addEventListener('keypress', (event) => {
        if(event.key == "Enter"){
            setItem(input.value);
        }
    })
    addButton.addEventListener('click', (event) => {
        setItem(input.value);
    })
}

// set list item
function setItem(text){
    const input = document.querySelector('input[type="text"]');
    setLocalStorage(LIST_KEY, text, 'add');
    setHTML(text);
    input.value = ''
}

function setHTML(elem){
    // HTML is set only if there is info
    if(elem){
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const tag = getRandomNumber(RANDOM_NUMBER);
        li.id = `li-${tag}`
        const liHTML = `
        ${elem}
        <button class="delete" type="button">
            <img src="./assets/img/trash.png" id="image-${tag}" alt="">
        </button>
        `;
        li.innerHTML = liHTML;
        ul.appendChild(li);
    } 
}

function removeItem(){
    const ul = document.querySelector('ul');
    ul.addEventListener('click', (event) => {
        console.log(event);
        if(event.target.nodeName.toLowerCase() == 'img'){
            const id = `#li-${event.path[0].id.split('-')[1]}`
            const li = document.querySelector(id);
            ul.removeChild(li);
        }
    })
}

function getLocalStorage(key){
    const item = localStorage.getItem(key);
    return item ? item : [];
}

function setLocalStorage(key, data, type){
    const listArr = getLocalStorage(key);
    if(type == 'add') listArr.push(data);
    else listArr.splice(listArr.indexOf(data), 0);
    localStorage.setItem(LIST_KEY, listArr);
}

function setRandomNumber(key, num){
    localStorage.setItem(key, num);
}

function getRandomNumber(key){
    let num = localStorage.getItem(key);
    setRandomNumber(key, ++num);
    return num;
}

render();

