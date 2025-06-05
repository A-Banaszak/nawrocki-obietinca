document.addEventListener("DOMContentLoaded", () => {
  async function loadHTML(url, elementId) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Nie można załadować ${url}: ${response.statusText}`);
      }
      const text = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = text;
        if (elementId === 'header-placeholder') {
          setActiveNavLink();
        }
      } else {
        console.error(`Element o ID '${elementId}' nie został znaleziony.`);
      }
    } catch (error) {
      console.error('Błąd podczas ładowania HTML:', error);
      const element = document.getElementById(elementId);
      if (element) {
          element.innerHTML = `<p style="color: red; text-align: center;">Nie udało się załadować sekcji: ${url}. Sprawdź konsolę po więcej informacji.</p>`;
      }
    }
  }

  function setActiveNavLink() {
    const navLinks = document.querySelectorAll(".main-nav a");
    if (!navLinks || navLinks.length === 0) {
        // Jeśli linki nawigacyjne nie są jeszcze załadowane (np. header wczytuje się asynchronicznie)
        // można spróbować ponownie po krótkim opóźnieniu lub poczekać na załadowanie headera.
        // Na razie, jeśli nie ma linków, po prostu zakończ.
        return;
    }
    let currentPath = window.location.pathname;
    // Normalizuj ścieżkę, usuwając ewentualne "index.html" z końca dla strony głównej
    if (currentPath.endsWith('/index.html')) {
        currentPath = currentPath.substring(0, currentPath.length - 'index.html'.length);
    }
    if (currentPath.endsWith('/')) {
        currentPath = currentPath.substring(0, currentPath.length - 1);
    }
     // Pobierz tylko nazwę pliku lub pusty string dla katalogu głównego
    const currentPage = currentPath.split("/").pop() || "index.html"; // Jeśli pop() zwróci pusty string (dla roota), użyj "index.html"
    const currentHash = window.location.hash;

    navLinks.forEach(link => {
      link.classList.remove("active");
      let linkHref = link.getAttribute("href");
      let linkPage = linkHref.split("/").pop().split("#")[0] || "index.html"; // Pobierz nazwę pliku z href, domyślnie index.html
      const linkHash = link.hash; // Pobierz hash z linku np. #news

      if (linkPage === currentPage) {
        if (linkHash && currentHash && linkHash === currentHash) { // Jeśli strona i hash się zgadzają
          link.classList.add("active");
        } else if (!linkHash && !currentHash) { // Jeśli strona się zgadza i nie ma hashy
          link.classList.add("active");
        } else if (linkPage === "index.html" && linkHref.includes("#news") && currentHash === "#news" && (currentPage === "index.html" || currentPage === "")) {
          // Specjalna obsługa dla linku #news na stronie głównej
           link.classList.add("active");
        } else if (linkPage === currentPage && !linkHash && !currentHash && !linkHref.includes('#')) {
            // Ogólne dopasowanie strony bez hasha
            link.classList.add("active");
        }
      }
    });

    // Jeśli po pętli żaden link nie jest aktywny, a jesteśmy na stronie głównej (bez konkretnego pliku w URL lub "index.html")
    // i nie ma hasha, aktywuj link do "index.html"
    const isActiveSet = Array.from(navLinks).some(link => link.classList.contains('active'));
    if (!isActiveSet && (currentPage === "index.html" || currentPage === "") && !currentHash) {
        const homeLink = document.querySelector('.main-nav a[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
     // Jeśli aktywny jest link do #news, a także link do index.html (bez #news), usuń active z index.html
     const newsLinkActive = document.querySelector('.main-nav a[href="index.html#news"].active');
     if (newsLinkActive && (currentPage === "index.html" || currentPage === "")) {
         const plainHomeLink = document.querySelector('.main-nav a[href="index.html"]');
         if (plainHomeLink && plainHomeLink !== newsLinkActive) {
             plainHomeLink.classList.remove('active');
         }
     }
  }


  async function initializePage() {
    await loadHTML('header.html', 'header-placeholder');
    await loadHTML('footer.html', 'footer-placeholder');
    
    const countdownElement = document.getElementById("countdown");
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (countdownElement) { // Sprawdź, czy elementy timera są na stronie
      const targetDate = new Date("2025-11-14T00:00:00").getTime();
      if (isNaN(targetDate)) {
        console.error("Nieprawidłowa data docelowa!");
        countdownElement.innerHTML = "<p style='color:red;'>Błąd: Nieprawidłowa data docelowa!</p>";
        return;
      }

      function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft < 0) {
          countdownElement.innerHTML = "<p style='font-size: 1.5em; color: var(--primary-red); font-weight: bold;'>CZAS MINĄŁ!</p>";
          const countdownHeading = document.querySelector(".countdown-section h3");
          if (countdownHeading) {
            countdownHeading.textContent = "TERMIN SPEŁNIENIA OBIETNICY UPŁYNĄŁ:";
          }
          clearInterval(timerInterval);
          return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
      }

      const timerInterval = setInterval(updateCountdown, 1000);
      updateCountdown();
    }
  }

  initializePage();
  window.addEventListener('hashchange', setActiveNavLink);
});