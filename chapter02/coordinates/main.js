const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const img = document.querySelector('img');
const span = document.querySelector('span');

window.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    // change width to 100% in CSS instead of width:${document.documentElement.clientWidth}px; in JS
    horizontal.setAttribute('style', `margin-top:${y}px;`);  
    // same as the above in height
    vertical.setAttribute('style', `margin-left:${x}px;`);
    
    img.setAttribute('style', `margin-left:${x-img.clientWidth/2}px; margin-top:${y-img.clientHeight/2}px;`);
    span.innerHTML = `${x}px, ${y}px`;
})



