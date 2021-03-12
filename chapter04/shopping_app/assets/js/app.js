const LIST_KEY = 'shopping_list_array';

function render(){
    onAddEvent();
}

function onAddEvent(){
    const input = document.querySelector('input[type="text"]');
    const addButton = document.querySelector('.add');
    input.addEventListener('keypress', (event) => {
        if(event.key == "Enter"){
            setLocalStorage(LIST_KEY, input.value, 'add');
            setHTML(input.value);
            input.value = ''
        }
    })
    addButton.addEventListener('click', (event) => {
        setLocalStorage(LIST_KEY, input.value, 'add');
        setHTML(input.value);
        input.value = ''
    })
}

function setHTML(elem){
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const liHTML = `
    ${elem}
    <button class="delete" type="button">
        <img src="./assets/img/trash.png" alt="">
    </button>
    `;
    li.innerHTML = liHTML;
    ul.appendChild(li);
}

function getLocalStorage(key){
    const item = localStorage.getItem(key);
    return item ? item : [];
}

function setLocalStorage(key, data, type){
    const listArr = getLocalStorage(key);
    if(type == 'add') listArr.push(data);
    else listArr.splice(listArr.indexOf(data), 0)
}

render();

