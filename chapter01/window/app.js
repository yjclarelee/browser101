function showSizeValues(){
    // initalize
    setSizeValues();
    window.addEventListener('resize', () => {
        setSizeValues();
    })
}


// ellie의 방식: 한 개의 div에 html 넣는 것
function setSizeValues(){
    const screen = document.querySelector('.screen');
    const outer = document.querySelector('.outer');
    const inner = document.querySelector('.inner');
    const client = document.querySelector('.client');
    screen.innerHTML = `window.screen: ${window.screen.availWidth}, ${window.screen.availHeight}`;
    outer.innerHTML = `window.outer: ${window.outerWidth}, ${window.outerHeight}`;
    inner.innerHTML = `window.inner: ${window.innerWidth}, ${window.innerHeight}`;
    client.innerHTML = `documentElement.clientWidth: ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}`;
}

showSizeValues();