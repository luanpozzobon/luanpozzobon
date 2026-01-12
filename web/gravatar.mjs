import { Hovercards } from 'https://esm.sh/@gravatar-com/hovercards';

document.addEventListener('DOMContentLoaded', () => {
    const hovercards = new Hovercards({ 
        delayToShow: 300,
     });

    (() => {
        const hotbarComponent = document.querySelector('hotbar-component');
        const internalContainer = hotbarComponent?.shadowRoot?.getElementById('hotbar');

        if (internalContainer) {
            hovercards.attach(internalContainer);
        } else {
            hotbarComponent?.addEventListener('hotbar-loaded', () => {
                const loadedContainer = hotbarComponent.shadowRoot.getElementById('hotbar');
                if (loadedContainer) hovercards.attach(loadedContainer);
            }, { once: true });
        }
    })();
});