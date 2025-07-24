const quotes = [
  ["Szachy to wojna na szachownicy.", "Bobby Fischer"],
  ["Szachy to życie.", "Bobby Fischer"],
  ["Najgroźniejszy przeciwnik to ten, który nie boi się przegrać.", "Bent Larsen"],
  ["W szachach nie ma miejsca na przypadek.", "Garri Kasparow"],
  ["Szachy to próba charakteru, nie tylko intelektu.", "Garri Kasparow"],
  ["Każda porażka jest lekcją, a każda wygrana obowiązkiem.", "Magnus Carlsen"],
  ["Najpiękniejsze partie to te, w których znajduje się harmonia.", "Anatolij Karpow"],
  ["Tylko głupiec nie boi się królowej przeciwnika.", "Wasilij Smysłow"],
  ["Szachy uczą, że błędy mają konsekwencje.", "Judit Polgar"],
  ["W szachach nie chodzi tylko o wygraną. Chodzi o znalezienie prawdy.", "Vladimir Kramnik"],
  ["Grając w szachy, człowiek poznaje samego siebie.", "Albert Einstein"],
  ["Szachy są nieskończone.", "Magnus Carlsen"],
  ["Czasem trzeba poświęcić królową, by uratować partię.", "Viswanathan Anand"],
  ["Szachy to najokrutniejsza z gier.", "George Bernard Shaw"],
  ["Dobrze rozegrana partia szachów to poezja na 64 polach.", "Marcel Duchamp"],
  ["Każde posunięcie ma znaczenie.", "Mikhail Botvinnik"],
  ["Szachy to jedyna gra, która nie zależy od szczęścia.", "Siegbert Tarrasch"],
  ["Szachy to sztuka walki na intelektualnym polu.", "Reuben Fine"],
  ["Nie ma większego mistrzostwa niż prostota w szachach.", "José Raúl Capablanca"],
  ["Szachownica nie zna litości.", "Alexei Shirov"],
  ["Myślenie jest bronią, nie luksusem.", "Levon Aronian"],
  ["Pionek ma marzenie, by stać się hetmanem.", "Andrei Volokitin"],
  ["Szachy to cierpliwość i odwaga.", "Tigran Petrosian"],
  ["Każda partia to nowa historia.", "Hikaru Nakamura"],
  ["Szachy uczą życia bez skrótów.", "Susan Polgar"],
  ["Nie istnieje idealna partia – tylko dążenie do niej.", "Peter Svidler"],
  ["Szachy to najczystsza forma koncentracji.", "Nigel Short"],
  ["Milczenie graczy to rozmowa umysłów.", "Lajos Portisch"],
  ["Szachy uczą, że każda figura ma swoją rolę.", "Rustam Kasimdzhanov"],
  ["Słabość jest początkiem strategii.", "Max Euwe"]
];

function updateTogglePosition() {
  const theme = localStorage.getItem('theme');
  const toggle = document.getElementById('themeToggle');

  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  } else if (theme === 'light') {
    document.body.classList.remove('dark-mode');
    toggle.checked = false;
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
      toggle.checked = true;
    } else {
      document.body.classList.remove('dark-mode');
      toggle.checked = false;
    }
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
}

function filterQuotes() {
  const input = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".quote-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(input) ? "block" : "none";
  });
}

function showQuotes() {
  const container = document.getElementById("quotes-container");
  container.innerHTML = "";

  quotes.forEach(([text, author]) => {
    const card = document.createElement("div");
    card.className = "quote-card";
    card.innerHTML = `<div class="quote">„${text}”</div><div class="author">- ${author}</div>`;
    container.appendChild(card);
  });
}

function showRandomQuote() {
  const [text, author] = quotes[Math.floor(Math.random() * quotes.length)];
  const quoteEl = document.getElementById("random-quote");
  quoteEl.textContent = `💬 „${text}” – ${author}`;
  quoteEl.scrollIntoView({ behavior: "smooth" });
}

function scrollToTop() {
  document.getElementById("top").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener('DOMContentLoaded', function () {
  updateTogglePosition();

  const toggleSwitch = document.getElementById('themeToggle');
  toggleSwitch.addEventListener('change', function () {
    toggleTheme();
  });

  showQuotes();
});
