const routes = {
    '#home': 'home',
    '#contact': 'contact',
    '#about': 'about',
};

async function loadPage(route) {
    const page = routes[route] || 'home';

    try {
        const html = await fetch(`/pages/${page}/${page}.html`)
            .then(response => response.text());

        document.getElementById('app').innerHTML = html
    } catch {
        document.getElementById('app').innerHTML = '<h2>Página não encontrada</h2>';
    }
}

window.addEventListener('hashchange', () => loadPage(location.hash));
window.addEventListener('load', () => {
    loadPage(location.hash);
});

if (window.location.hash === '') {
    window.location.hash = '#home';
}
