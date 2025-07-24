// Bezpieczne pobranie elementu
function getElementSafe(selector) {
  const el = document.querySelector(selector);
  if (!el) {
    console.error(`Nie znaleziono elementu: ${selector}`);
  }
  return el;
}

// Przewijanie na górę
function scrollToTop() {
  try {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } catch (error) {
    console.error('Błąd podczas przewijania na górę:', error);
  }
}

// Pokaż/ukryj przycisk przewijania
window.addEventListener('scroll', function () {
  try {
    const button = getElementSafe("#scrollToTopBtn");
    if (!button) return;

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop > 200) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  } catch (error) {
    console.error('Błąd podczas obsługi przewijania:', error);
  }
});

// Obsługa kliknięcia w przycisk przewijania
document.addEventListener('DOMContentLoaded', function () {
  try {
    const scrollBtn = getElementSafe("#scrollToTopBtn");
    if (scrollBtn) {
      scrollBtn.addEventListener('click', scrollToTop);
    }
  } catch (error) {
    console.error('Błąd podczas inicjalizacji przycisku przewijania:', error);
  }
});

// === SORTOWANIE ===
let numericAscending = true;

function toggleNumericSort() {
  try {
    const main = getElementSafe('main');
    if (!main) return;

    const masters = Array.from(main.querySelectorAll('.master-card'));

    masters.sort((a, b) => {
      const nameA = a.querySelector('.master-name')?.innerText.trim() || '';
      const nameB = b.querySelector('.master-name')?.innerText.trim() || '';
      const numberA = parseInt(nameA.split('.')[0]);
      const numberB = parseInt(nameB.split('.')[0]);

      return numericAscending ? (numberA - numberB) : (numberB - numberA);
    });

    main.innerHTML = '';
    masters.forEach(master => main.appendChild(master));

    numericAscending = !numericAscending;
    const button = getElementSafe('button[onclick="toggleNumericSort()"]');
    if (button) {
      button.innerText = numericAscending ? "Sortuj numerycznie (1-18)" : "Sortuj numerycznie (18-1)";
      button.setAttribute('aria-label', button.innerText);
    }
  } catch (error) {
    console.error('Błąd podczas sortowania numerycznego:', error);
  }
}

function sortAlphabetically() {
  try {
    const main = getElementSafe('main');
    if (!main) return;

    const masters = Array.from(main.querySelectorAll('.master-card'));

    masters.sort((a, b) => {
      const nameA = a.querySelector('.master-name')?.innerText.trim() || '';
      const nameB = b.querySelector('.master-name')?.innerText.trim() || '';

      const textA = nameA.split('.').slice(1).join('.').trim().toLowerCase();
      const textB = nameB.split('.').slice(1).join('.').trim().toLowerCase();

      return textA.localeCompare(textB);
    });

    main.innerHTML = '';
    masters.forEach(master => main.appendChild(master));
  } catch (error) {
    console.error('Błąd podczas sortowania alfabetycznego:', error);
  }
}
