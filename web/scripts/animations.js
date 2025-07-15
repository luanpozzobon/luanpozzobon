// -----------------------------------------------------------------------------------
// Header Animations
// -----------------------------------------------------------------------------------
const toggle = document.getElementById('interruptor-luz');
function toggleHeaderAnimation() {
    if (toggle.checked)
        document.getElementById('neon-sign').classList.remove('effect-off');
    else
        document.getElementById('neon-sign').classList.add('effect-off');
}
toggle.checked = true

// -----------------------------------------------------------------------------------
// Typing Animations
// -----------------------------------------------------------------------------------
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