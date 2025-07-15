const routes = {
    '#home': 'home',
    '#aboutme': 'aboutme',
    '#projects': 'projects',
};

async function loadPage(route) {
    const page = routes[route] || 'home';

    try {
        const response = await fetch(`/pages/${page}/${page}.html`);
        if (!response.ok)
            throw new Error('Página não encontrada');

        const html = await response.text()
        document.getElementById('app').innerHTML = html
        window.scrollTo(0, 0)
    } catch {
        document.getElementById('app').innerHTML = '<h2>Página não encontrada</h2>';
    }

    if (page === 'home') animateWelcome()
}

window.addEventListener('hashchange', () => loadPage(location.hash));
window.addEventListener('load', () => {
    loadPage(location.hash);
});

if (window.location.hash === '') {
    window.location.hash = '#home';
}