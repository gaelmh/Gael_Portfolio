// --- Configuration ---
const REDIRECT_URL = "https://gael-portfolio.vercel.app/";
let countdownTime = 3;

const countdownElement = document.getElementById("countdown");

/**
 * Updates the countdown display and handles the redirection.
 */
function updateCountdown() {
    countdownElement.textContent = countdownTime;

    if (countdownTime <= 0) {
        clearInterval(timerInterval);
        window.location.href = REDIRECT_URL;
    } else {
        countdownTime--;
    }
}

updateCountdown();

const timerInterval = setInterval(updateCountdown, 1000);
