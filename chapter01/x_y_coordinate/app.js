function getCoordinatesOnClick(){
    const rect = document.querySelector('.rects');
    rect.addEventListener('click', (event) => {
        console.log(event.target.getBoundingClientRect());
        console.log(`client: ${event.clientX}, ${event.clientY}`);
        console.log(`page: ${event.pageX}, ${event.pageY}`);
    })
}

getCoordinatesOnClick();