function updateTogglePosition() {
  const theme = localStorage.getItem("theme");
  const toggle = document.getElementById("themeToggle");

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  } else if (theme === "light") {
    document.body.classList.remove("dark-mode");
    toggle.checked = false;
  } else {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add("dark-mode");
      toggle.checked = true;
    }
  }
}

document.addEventListener("DOMContentLoaded", updateTogglePosition);

function toggleTheme() {
  const toggle = document.getElementById("themeToggle");
  if (toggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
}

document.getElementById("zapisForm").addEventListener("submit", function (e) {
  e.preventDefault();

  document.querySelectorAll(".error-message").forEach(el => el.remove());
  document.querySelectorAll(".field-error").forEach(el => el.classList.remove("field-error"));

  let isValid = true;

  const imie = document.getElementById("imie");
  const telefon = document.getElementById("telefon");
  const wiek = document.getElementById("wiek");
  const poziom = document.getElementById("poziom");

  function showError(input, message) {
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    input.classList.add("field-error");
    input.parentNode.insertBefore(error, input.nextSibling);
    isValid = false;
  }

  if (imie.value.trim() === "") showError(imie, "Wypełnij to pole");
  if (!/^[0-9]{9}$/.test(telefon.value.trim())) showError(telefon, "Wpisz poprawny numer telefonu (9 cyfr)");
  if (wiek.value < 5 || wiek.value > 99) showError(wiek, "Wiek musi być w przedziale 5-99");
  if (poziom.value === "") showError(poziom, "Wybierz poziom");

  if (isValid) {
    const dane = {
      imie: imie.value.trim(),
      telefon: telefon.value.trim(),
      wiek: wiek.value.trim(),
      poziom: poziom.value,
      cele: Array.from(document.querySelectorAll('input[name="cel[]"]:checked')).map(el => el.value),
      wiadomosc: document.getElementById("wiadomosc").value.trim()
    };

    fetch("http://localhost:3000/zapisz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dane)
    })
      .then(res => res.json())
      .then(() => {
        document.getElementById("potwierdzenie").textContent = "Zgłoszenie zostało zapisane!";
        document.getElementById("potwierdzenie").style.color = "green";
        document.getElementById("zapisForm").reset();
      })
      .catch(err => {
        alert("Błąd zapisu: " + err.message);
      });
  }
});
