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

        this.dispatchEvent(new CustomEvent('hotbar-loaded', {
            bubbles: true,
            composed: true
        }));

        this.changeSlot(window.location.pathname);
    }

    changeSlot(path) {
        const hotbar = this.shadowRoot.getElementById('hotbar');

        let idx;
        if (path.includes('/aboutme')) {
            idx = 1;
        } else if (path.includes('/projects')) {
            idx = 2;
        } else {
            idx = 0;
        }

        setTimeout(() => {
            hotbar.querySelectorAll('slot-component').forEach(slot => {
                slot.shadowRoot?.getElementById('slot')?.classList.remove('selected');
            })
            hotbar.querySelectorAll('slot-component')[idx]?.shadowRoot?.getElementById('slot')?.classList.add('selected');
        }, 200)
    }
}

customElements.define('hotbar-component', Hotbar);