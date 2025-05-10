hotbar_slots = {
    'home': 0,
    'aboutme': 1,
    'projects': 2,
}

class Hotbar extends HTMLElement {
    HTML_PATH = '/components/hotbar/hotbar-component.html';
    CSS_PATH = '/components/hotbar/hotbar-component.css';

    constructor() {
        super();
        this.attachShadow({
            mode: 'open',
        })
    }

    async connectedCallback() {
        const html = await fetch(this.HTML_PATH)
            .then(response => response.text());

        const css = await fetch(this.CSS_PATH)
            .then(response => response.text());

        this.shadowRoot.innerHTML = `
            <style>${css}</style>
            ${html}
        `;

        window.addEventListener('hashchange', () => this.changeSlot(window.location.hash));
        this.changeSlot(window.location.hash);
    }

    changeSlot(hash) {
        const hotbar = this.shadowRoot.getElementById('hotbar');

        const pathname = hash.replace('#', '');
        const idx = hotbar_slots[pathname];

        setTimeout(() => {
            hotbar.querySelectorAll('slot-component').forEach(slot => {
                slot.shadowRoot?.getElementById('slot')?.classList.remove('selected');
            })
            hotbar.querySelectorAll('slot-component')[idx]?.shadowRoot?.getElementById('slot')?.classList.add('selected');
        }, 200)
    }
}

customElements.define('hotbar-component', Hotbar);