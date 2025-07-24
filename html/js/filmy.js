// Bezpieczne pobranie elementu
function getElementSafe(selector) {
  const el = document.querySelector(selector);
  if (!el) {
    console.error(`Nie znaleziono elementu: ${selector}`);
  }
  return el;
}

// Obsługa błędu ładowania obrazka
function handleImgError(img) {
  console.error('Błąd ładowania obrazka:', img.src);
  img.alt = "Brak obrazka";
  img.style.display = 'none'; // lub np. podmień na placeholder
}

// === SORTOWANIE Z TOGGLE ===
let alphabeticSorted = false;  // flaga
let originalOrder = [];        // zapamiętanie oryginalnego układu

function sortMovies() {
  try {
    const main = getElementSafe('main');
    if (!main) return;

    // Jeśli to pierwsze kliknięcie — zapamiętaj oryginalną kolejność
    if (originalOrder.length === 0) {
      originalOrder = Array.from(main.querySelectorAll('.movie-card'));
    }

    if (!alphabeticSorted) {
      // Sortowanie alfabetyczne
      const movies = Array.from(main.querySelectorAll('.movie-card'));

      movies.sort((a, b) => {
        const titleA = a.querySelector('.movie-title')?.innerText.trim().toLowerCase() || '';
        const titleB = b.querySelector('.movie-title')?.innerText.trim().toLowerCase() || '';
        return titleA.localeCompare(titleB);
      });

      main.innerHTML = '';
      movies.forEach(movie => main.appendChild(movie));

      alphabeticSorted = true;
      console.log('Filmy posortowane alfabetycznie.');
    } else {
      // Przywrócenie oryginalnej kolejności
      main.innerHTML = '';
      originalOrder.forEach(movie => main.appendChild(movie));

      alphabeticSorted = false;
      console.log('Przywrócono oryginalną kolejność.');
    }

    // Zmiana napisu przycisku
    const button = getElementSafe('button[onclick="sortMovies()"]');
    if (button) {
      button.innerText = alphabeticSorted ? 'Przywróć oryginalną kolejność' : 'Sortuj alfabetycznie';
      button.setAttribute('aria-label', button.innerText);
    }

  } catch (error) {
    console.error('Błąd podczas sortowania filmów:', error);
  }
}
