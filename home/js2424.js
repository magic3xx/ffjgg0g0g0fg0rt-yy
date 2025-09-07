// =================================================================
// DATA & CONFIGURATION
// =================================================================

// Object containing all translations for supported languages
const translations = {
  'fr': {
    'pageTitle': "FOXBET",
    'brandName': "FOXBET",
    'sidebarTitle': 'Menu',
    'modeDark': "Mode Sombre",
    'modeLight': "Mode Clair",
    'gamesTitle': "Nos Jeux",
    'loadingText': "Chargement de votre jeu...",
    'noLangError': "Veuillez configurer la langue dans le bot avant de continuer",
    'category1win': "1win bet",
    'categoryOther': "Autres Bets"
  },
  'en': { // ... English translations
  },
  'ru': { // ... Russian translations
  },
  'ar': { // ... Arabic translations
  }
};

// Array of game objects, each with a name, URL, image, and category
const gamesData = [{
  'name': "Lucky Jet",
  'url': 'home/LuckyJet/game.html',
  'image': "home/LuckyJet/Imogos/LuckyBases.jpg",
  'category': "1win bet"
}, {
  'name': "Aviator",
  'url': "home/Aviator/gameAvia.html",
  'image': "home/Aviator/logo/aviator-game.webp",
  'category': "Autres Bets"
},
// ... other game objects
];


// =================================================================
// HELPER FUNCTIONS
// =================================================================

/**
 * Sanitizes a string to prevent Cross-Site Scripting (XSS) by converting HTML characters.
 * @param {string} inputText - The string to sanitize.
 * @returns {string} The sanitized HTML-encoded string.
 */
function sanitizeInput(inputText) {
  const tempDiv = document.createElement("div");
  tempDiv.textContent = inputText;
  return tempDiv.innerHTML;
}

/**
 * Gets a specific parameter from the current page's URL query string.
 * @param {string} paramName - The name of the parameter to retrieve (e.g., "lang").
 * @returns {string} The sanitized value of the parameter, or an empty string if not found.
 */
function getUrlParameter(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return sanitizeInput(urlParams.get(paramName) || '');
}

/**
 * Constructs the full URL for a game, preserving existing URL parameters.
 * This is crucial for maintaining the user's session (lang, user info, etc.).
 * @param {string} gameUrl - The base URL of the game.
 * @returns {string} The full game URL with query parameters appended.
 */
function getGameUrlWithParams(gameUrl) {
  const lang = getUrlParameter("lang");
  const username = getUrlParameter('us');
  const userId = getUrlParameter('i');
  const telegramLink = getUrlParameter('lk');

  const newParams = new URLSearchParams();
  if (lang) newParams.append("lang", lang);
  if (username) newParams.append('us', username);
  if (userId) newParams.append('i', userId);
  if (telegramLink) newParams.append('lk', telegramLink);

  const queryString = newParams.toString();
  return `${gameUrl}${queryString ? '?' + queryString : ''}`;
}


// =================================================================
// CORE LOGIC FUNCTIONS
// =================================================================

/**
 * Parses user profile information from URL parameters and updates the UI.
 * It sets the profile link and displays the username.
 */
function setupUserProfile() {
  const username = getUrlParameter('us');
  const userId = getUrlParameter('i');
  const telegramLink = getUrlParameter('lk');

  const profileButton = document.getElementById("profileBtn");
  const profileInfoContainer = document.getElementById("profileInfo");
  const profileNameElement = document.getElementById('profileName');
  const profileIdElement = document.getElementById("profileId");

  if (userId && username && telegramLink) {
    const telegramProfileUrl = `https://t.me/${telegramLink}`;
    profileButton.setAttribute("href", telegramProfileUrl);
    profileNameElement.textContent = username;
    profileIdElement.style.display = 'none'; // The ID is hidden
    profileInfoContainer.style.display = 'block';
  }
}

/**
 * Applies translations to all relevant text elements on the page.
 * @param {string} languageCode - The language code (e.g., "fr", "en").
 */
function applyTranslations(languageCode) {
  const currentTranslation = translations[languageCode] || translations.fr;
  document.getElementById("page-title").textContent = currentTranslation.pageTitle;
  document.getElementById("brand-name").textContent = currentTranslation.brandName;
  document.getElementById("sidebar-title").textContent = currentTranslation.sidebarTitle;
  document.getElementById('games-title').textContent = currentTranslation.gamesTitle;
  document.getElementById('loadingText').textContent = currentTranslation.loadingText;

  // Update mode toggle text based on the current theme
  const modeTextElement = document.getElementById("modeText");
  modeTextElement.textContent = document.body.classList.contains('dark-mode') ? currentTranslation.modeDark : currentTranslation.modeLight;
}

/**
 * Checks if the 'lang' URL parameter is present. If not, it shows an error,
 * redirects the user to Telegram, and closes the window.
 * @returns {boolean} - True if the language is set, false otherwise.
 */
function checkLanguageAndRedirect() {
  const language = getUrlParameter("lang");
  const telegramLink = getUrlParameter('lk');

  if (!language) {
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingText = document.getElementById("loadingText");
    loadingText.textContent = translations.fr.noLangError; // Default to French for the error
    loadingOverlay.classList.add('active');

    // After 2 seconds, redirect to Telegram
    setTimeout(() => {
      window.location.href = telegramLink ? `https://t.me/${telegramLink}` : 'https://t.me/';
      // Attempt to close the window
      setTimeout(() => window.close(), 100);
    }, 2000);
    return false; // Stop further script execution
  }

  // If language is present, apply translations and continue
  applyTranslations(language);
  return true;
}

/**
 * Dynamically creates and adds all game cards to the page.
 */
function populateGames() {
  const gamesGrid = document.getElementById('gamesGrid');
  const language = getUrlParameter("lang") || 'fr';
  const currentTranslation = translations[language] || translations.fr;

  gamesGrid.innerHTML = ''; // Clear existing games

  gamesData.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = "game-card";
    gameCard.onclick = (event) => handleGameClick(game.url, event);

    // Translate the game category
    const categoryText = game.category === "1win bet" ? currentTranslation.category1win : currentTranslation.categoryOther;

    gameCard.innerHTML = `
      <div class="game-image" style="background-image: url('${game.image}');">
        <div class="game-overlay">
          <div class="play-btn" aria-label="Play ${game.name}">
            <i class="fas fa-play"></i>
          </div>
        </div>
      </div>
      <div class="game-info">
        <div class="game-name">${game.name}</div>
        <div class="game-category">${categoryText}</div>
      </div>
    `;
    gamesGrid.appendChild(gameCard);
  });
}


// =================================================================
// UI THEME & INTERACTION FUNCTIONS
// =================================================================

/**
 * Loads the user's preferred theme (dark/light) from localStorage.
 */
function loadMode() {
  const savedTheme = localStorage.getItem('theme') || "dark-mode";
  const body = document.body;
  const modeTextElement = document.getElementById("modeText");
  const modeIcon = document.querySelector("#modeToggle i");
  const language = getUrlParameter("lang") || 'fr';
  const currentTranslation = translations[language] || translations.fr;

  body.classList.remove("dark-mode", 'light-mode');
  body.classList.add(savedTheme);

  if (savedTheme === 'dark-mode') {
    modeTextElement.textContent = currentTranslation.modeDark;
    modeIcon.className = "fas fa-moon";
  } else {
    modeTextElement.textContent = currentTranslation.modeLight;
    modeIcon.className = "fas fa-sun";
  }
}

/**
 * Saves the current theme to localStorage.
 * @param {string} themeName - The theme to save ("dark-mode" or "light-mode").
 */
function saveMode(themeName) {
  localStorage.setItem('theme', themeName);
}

/**
 * Toggles between dark and light mode.
 */
function toggleMode() {
  const body = document.body;
  const modeTextElement = document.getElementById('modeText');
  const modeIcon = document.querySelector("#modeToggle i");
  const language = getUrlParameter("lang") || 'fr';
  const currentTranslation = translations[language] || translations.fr;

  if (body.classList.contains("dark-mode")) {
    body.classList.replace("dark-mode", "light-mode");
    modeTextElement.textContent = currentTranslation.modeLight;
    modeIcon.className = "fas fa-sun";
    saveMode("light-mode");
  } else {
    body.classList.replace('light-mode', "dark-mode");
    modeTextElement.textContent = currentTranslation.modeDark;
    modeIcon.className = "fas fa-moon";
    saveMode('dark-mode');
  }
}

/**
 * Displays the loading overlay.
 */
function showLoading() {
  document.getElementById("loadingOverlay").classList.add("active");
}

/**
 * Hides the loading overlay.
 */
function hideLoading() {
  document.getElementById('loadingOverlay').classList.remove("active");
}

/**
 * Handles the click event on a game card.
 * @param {string} gameUrl - The URL of the game to navigate to.
 * @param {Event} event - The click event object.
 */
function handleGameClick(gameUrl, event) {
  event.preventDefault();
  showLoading();
  // Simulate a delay before redirecting
  setTimeout(() => {
    hideLoading();
    window.location.href = getGameUrlWithParams(gameUrl);
  }, 2000); // 2000ms = 2 seconds
}

/**
 * Shows or hides the "back to top" button based on scroll position.
 */
function handleScroll() {
  const backToTopButton = document.getElementById("backToTop");
  if (window.scrollY > 300) { // 300px
    backToTopButton.classList.add("active");
  } else {
    backToTopButton.classList.remove("active");
  }
}

// =================================================================
// EVENT LISTENERS & INITIALIZATION
// =================================================================

// Main execution starts here when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
  // 1. Crucial: Check for language parameter. If it's missing, stop everything.
  if (!checkLanguageAndRedirect()) {
    return;
  }

  // 2. Setup UI elements based on URL parameters
  setupUserProfile();
  loadMode();
  populateGames();

  // 3. Attach all event listeners
  const modeToggleButton = document.getElementById('modeToggle');
  modeToggleButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMode();
  });

  const hamburgerButton = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const closeSidebarButton = document.getElementById("closeSidebar");
  const overlay = document.getElementById('overlay');

  hamburgerButton.addEventListener('click', () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  });

  closeSidebarButton.addEventListener('click', () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  const backToTopButton = document.getElementById('backToTop');
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  window.addEventListener("scroll", handleScroll);
});
