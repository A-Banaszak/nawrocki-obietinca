document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const nawrockiImage = document.getElementById("nawrockiImage");


  const targetDate = new Date("2025-11-14T00:00:00").getTime();
  if (isNaN(targetDate)) {
    console.error("Nieprawidłowa data docelowa!");
    if (countdownElement)
      countdownElement.innerHTML =
        "<p style='color:red;'>Błąd: Nieprawidłowa data docelowa!</p>";
    return;
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
      if (countdownElement) {
        countdownElement.innerHTML =
          "<p class='neon-text' style='font-size: 1.5em;'>CZAS MINĄŁ!</p>";

        document.querySelector(".countdown-section h3").textContent =
          "TERMIN SPEŁNIENIA OBIETNICY UPŁYNĄŁ:";
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


    if (secondsEl) {
      secondsEl.style.transform = "scale(1.1)";
      secondsEl.style.color = "var(--electric-blue)";
      setTimeout(() => {
        secondsEl.style.transform = "scale(1)";
        secondsEl.style.color = "var(--neon-green)";
      }, 150);
    }
  }

  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
  const quoteElement = document.querySelector(".promise-text .quote");
  if (quoteElement) {
    const originalText = quoteElement.textContent;
    quoteElement.textContent = "";
    let i = 0;
    function typeWriter() {
      if (i < originalText.length) {
        quoteElement.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    setTimeout(typeWriter, 1000);
  }

  if (nawrockiImage) {
    nawrockiImage.style.animation = "imagePulse 5s infinite alternate";
  }

  const container = document.querySelector(".container");
  if (container) {
    container.style.animation = "containerGlowIn 1.5s ease-out";
  }
});
