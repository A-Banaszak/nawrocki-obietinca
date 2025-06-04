document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  // const nawrockiImage = document.getElementById("nawrockiImage"); // Image animation removed

  const targetDate = new Date("2025-11-14T00:00:00").getTime();

  if (isNaN(targetDate)) {
    console.error("Nieprawidłowa data docelowa!");
    if (countdownElement) {
      countdownElement.innerHTML =
        "<p style='color:red;'>Błąd: Nieprawidłowa data docelowa!</p>";
    }
    return;
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
      if (countdownElement) {
        countdownElement.innerHTML =
          "<p style='font-size: 1.5em; color: var(--primary-red); font-weight: bold;'>CZAS MINĄŁ!</p>";
        // Adjust heading for countdown section
        const countdownHeading = document.querySelector(".countdown-section h3");
        if (countdownHeading) {
            countdownHeading.textContent = "TERMIN SPEŁNIENIA OBIETNICY UPŁYNĄŁ:";
        }
      }
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");

    // Removed per-second animation for a cleaner look
  }

  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); // Initial call to display countdown immediately

  // Typewriter effect removed for a more static/professional presentation
  // Image pulse animation removed
  // Container glow animation removed
});