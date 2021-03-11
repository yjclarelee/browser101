const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const img = document.querySelector('img');
const span = document.querySelector('span');

window.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    horizontal.setAttribute('style', `top:${y}px;`);  
    vertical.setAttribute('style', `left:${x}px;`);

    img.setAttribute('style', `left:${x}px; top:${y}px;`);

    span.innerHTML = `${x}px, ${y}px`;
    span.setAttribute('style', `left:${x}px; top:${y}px;`);
})



