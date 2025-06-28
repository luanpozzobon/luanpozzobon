class XpBar extends HTMLElement {
    HTML_PATH = '/components/xp-bar/xp-bar.component.html';
    CSS_PATH = '/components/xp-bar/xp-bar.component.css';

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

        this.findXpLevel();
        this.findXpProgress();
    }

    findXpLevel() {
        const today = new Date();
        const birthday = new Date(2004, 10, 11);

        const age = today - birthday;
        const ageInDays = Math.floor(age / (1000 * 60 * 60 * 24));
        const level = Math.floor(ageInDays / 365);

        this.shadowRoot.querySelector('.xp-text').textContent = level;
    }

    findXpProgress() {
        const today = new Date();
        const birthday = this.findNextBirthday();
        const daysInYear = this.findLeapYear() ? 366 : 365;

        const progress = (100 / daysInYear) * (daysInYear - Math.ceil((birthday - today) / (1000 * 60 * 60 * 24)));

        this.shadowRoot.querySelector('.xp-bar-fill').style.width = `${progress}%`;
    }

    findNextBirthday() {
        const today = new Date();
        const birthday = new Date(today.getFullYear(), 10, 11);
        if (birthday < today) {
            birthday.setFullYear(birthday.getFullYear() + 1);
        }
        return birthday;
    }

    findLeapYear() {
        const year = new Date().getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
}

customElements.define('xp-bar-component', XpBar);
