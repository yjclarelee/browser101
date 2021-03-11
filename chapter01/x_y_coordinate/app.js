function render(){
    getCoordinatesOnClick();
    onButtonClick();
}

function getCoordinatesOnClick(){
    const rect = document.querySelector('.rects');
    rect.addEventListener('click', (event) => {
        console.log(event.target.getBoundingClientRect());
        console.log(`client: ${event.clientX}, ${event.clientY}`);
        console.log(`page: ${event.pageX}, ${event.pageY}`);
    })
}

function onButtonClick(){
    const buttons = document.querySelector('.buttons');
    const special = document.querySelector('.special')
    buttons.addEventListener('click', (event) => {
        console.log(event.target);
        const className = event.target.className;
        if(className == 'by'){
            window.scrollBy(0, 100);
        }
        else if(className == 'to'){
            window.scrollTo(0, 100);
        }
        else{
            special.scrollIntoView();
        }
    })
}

render();