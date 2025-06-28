class XpBar extends HTMLElement {
    HTML_PATH = '/components/project/project.component.html';
    CSS_PATH = '/components/project/project.component.css';

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
    }
}

customElements.define('project-component', XpBar);