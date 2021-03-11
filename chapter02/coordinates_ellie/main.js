const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const img = document.querySelector('img');
const span = document.querySelector('span');

window.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    horizontal.style.top = `${y}px`;
    vertical.style.left = `${x}px`;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    span.innerHTML = `${x}px, ${y}px`;
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
})



