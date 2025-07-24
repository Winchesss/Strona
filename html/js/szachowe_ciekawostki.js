function updateTogglePosition() {
  const theme = localStorage.getItem('theme');
  const toggle = document.getElementById('themeToggle');

  if (!toggle) {
    console.error('Błąd: Nie znaleziono elementu #themeToggle');
    return;
  }

  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
    toggle.setAttribute('aria-checked', 'true');
  } else if (theme === 'light') {
    document.body.classList.remove('dark-mode');
    toggle.checked = false;
    toggle.setAttribute('aria-checked', 'false');
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
      toggle.checked = true;
      toggle.setAttribute('aria-checked', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      toggle.checked = false;
      toggle.setAttribute('aria-checked', 'false');
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  try {
    updateTogglePosition();

    const toggleSwitch = document.getElementById('themeToggle');

    if (!toggleSwitch) {
      console.error('Błąd: Nie znaleziono elementu #themeToggle');
      return;
    }

    toggleSwitch.addEventListener('change', function () {
      const isDark = this.checked;

      if (isDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }

      // Aktualizacja aria-checked dla dostępności
      toggleSwitch.setAttribute('aria-checked', isDark.toString());
    });

  } catch (err) {
    console.error('Błąd w obsłudze przełącznika motywu:', err);
  }
});
