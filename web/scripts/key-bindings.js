mapping = {
    '1': () => window.location.hash = '#home',
    '2': () => window.location.hash = '#contact',
}

window.addEventListener('keypress', (event) => {
    mapping[event.key]();
})