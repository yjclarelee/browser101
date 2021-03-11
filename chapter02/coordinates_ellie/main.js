const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const img = document.querySelector('img');
const span = document.querySelector('span');

window.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    // This kind of 'top' refering code is not used because it causes a lot of layouts to be made(bad efficiency)
    // horizontal.style.top = `${y}px`;

    // instead, transform is used
    horizontal.style.transform = `translateY(${y}px)`;
    vertical.style.transform = `translateX(${x}px)`;

    let imgLen = img.clientWidth;
    img.style.transform = `translate(${x-imgLen/2}px, ${y-imgLen/2}px)`;
    span.innerHTML = `${x}px, ${y}px`;
    span.style.transform = `translate(${x+20}px, ${y+20}px)`;
    
})



