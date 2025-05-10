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
    } catch {
        document.getElementById('app').innerHTML = '<h2>Página não encontrada</h2>';
    }

    if (page === 'home') animateWelcome()
}

function animateWelcome() {
    const element = document.getElementById("welcome");
    const welcomeText = element.textContent;
    let i = 0;

    element.textContent = "";

    const MAX_TIMEOUT = 500;
    function digitar() {
        if (i < welcomeText.length) {
            element.textContent += welcomeText.charAt(i);
            i++;
            let timeout = Math.floor(Math.random() * MAX_TIMEOUT)
            setTimeout(() => digitar(), timeout)
        }
    }

    digitar()
}

window.addEventListener('hashchange', () => loadPage(location.hash));
window.addEventListener('load', () => {
    loadPage(location.hash);
});

if (window.location.hash === '') {
    window.location.hash = '#home';
}
