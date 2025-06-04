document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

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
 function setActiveNavLink() {
    const navLinks = document.querySelectorAll(".main-nav a");
    const currentPage = window.location.pathname.split("/").pop(); // Pobiera nazwę pliku np. "index.html"

    navLinks.forEach(link => {
      const linkPage = link.getAttribute("href").split("/").pop();
      // Usuń klasę active ze wszystkich linków najpierw
      link.classList.remove("active");

      if (currentPage === "" && linkPage === "index.html") { // Dla strony głównej bez nazwy pliku w URL
        link.classList.add("active");
      } else if (linkPage === currentPage) {
        link.classList.add("active");
      }
      
      // Specjalna obsługa dla linku #news, jeśli jest na stronie głównej
      if (currentPage === "index.html" && window.location.hash === "#news" && link.getAttribute("href") === "index.html#news") {
        // Najpierw usuń active z linku do samej strony głównej, jeśli jest
        document.querySelector('.main-nav a[href="index.html"]').classList.remove('active');
        link.classList.add("active");
      } else if (currentPage === "" && window.location.hash === "#news" && link.getAttribute("href") === "index.html#news") {
        // Najpierw usuń active z linku do samej strony głównej, jeśli jest
        document.querySelector('.main-nav a[href="index.html"]').classList.remove('active');
        link.classList.add("active");
      }
    });
  }

  setActiveNavLink(); // Wywołaj funkcję po załadowaniu DOM
  
  // Jeśli masz nawigację, która zmienia hash (np. link do sekcji #news),
  // możesz chcieć odświeżyć aktywny link po zmianie hasha
  window.addEventListener('hashchange', setActiveNavLink);

});
