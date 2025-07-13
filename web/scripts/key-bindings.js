mapping = {
    '1': () => {
        const link = getHotbarLink(1);
        if (!link) return;

        window.open(link.href, '_self');
    },
    '2': () => {
        const link = getHotbarLink(2);
        if (!link) return;

        window.open(link.href, '_self');
    },
    '3': () => {
        const link = getHotbarLink(3);
        if (!link) return;

        window.open(link.href, '_self');
    },
    '4': () => {
        const link = getHotbarLink(4);
        if (!link) return;

        window.open(link.href, '_self');
    },
    '5': () => {
        const link = getHotbarLink(5);
        if (!link) return;

        window.open(link.href, '_self');
    },
    '6': () => {
        const link = getHotbarLink(6);
        if (!link) return;

        window.open(link.href, '_self');
    },

    '7': () => {
        const link = getHotbarLink(7);
        if (!link) return;

        window.open(link.href, '_self');
    },
    '8': () => {
        const link = getHotbarLink(8);
        if (!link) return;

        window.open(link.href, '_blank');
    },
    '9': () => {
        const link = getHotbarLink(9);
        if (!link) return

        window.open(link.href, '_blank');
    },
    'W': () => scroll('W'),
    'A': () => scroll('A'),
    'S': () => scroll('S'),
    'D': () => scroll('D'),
    'L': () => toggleModal(),

    'ARROWLEFT': () => previousProject(),
    'ARROWRIGHT': () => nextProject(),
}

window.addEventListener('keydown', (event) => {
    const keyMap = mapping[event.key.toUpperCase()];
    if (!keyMap) return;

    keyMap(keyMap.name);
})

function getHotbarLink(slotNumber) {
    const LINK_PREFIX = 'hotbar-link';
    const hotbar = document.querySelector('hotbar-component');

    if (!hotbar) return null;

    return hotbar.shadowRoot.getElementById(`${LINK_PREFIX}-${slotNumber}`);
}

function scroll(key) {
    const scrollAmpunt = 100;
    const scrollDirection = {
        'W': { top: -scrollAmpunt, left: 0, behavior: 'smooth' },
        'A': { top: 0, left: -scrollAmpunt, behavior: 'smooth' },
        'S': { top: scrollAmpunt, left: 0, behavior: 'smooth' },
        'D': { top: 0, left: scrollAmpunt, behavior: 'smooth' },
    };

    const scrollOptions = scrollDirection[key.toUpperCase()];

    if (document.body.classList.contains('modal-open')) {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollBy(scrollOptions);
        }
    } else {
        window.scrollBy(scrollOptions);
    }
}