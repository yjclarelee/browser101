const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const img = document.querySelector('img');
const span = document.querySelector('span');

window.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    // top and left cause layout
    // horizontal.style.top = `${y}px`;
    // vertical.style.left = `${x}px`;
    // img.style.left = `${x}px`;
    // img.style.top = `${y}px`;
    // span.innerHTML = `${x}px, ${y}px`;
    // span.style.left = `${x}px`;
    // span.style.top = `${y}px`;
    horizontal.style.transform = `translateY(${y}px)`;
    vertical.style.transform = `translateX(${x}px)`;

    let imgLen = img.clientWidth;
    img.style.transform = `translate(${x-imgLen/2}px, ${y-imgLen/2}px)`;
    span.innerHTML = `${x}px, ${y}px`;
    span.style.transform = `translate(${x+20}px, ${y+20}px)`;
    
})



