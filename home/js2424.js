// --- CONFIGURATION DATA ---

// Object containing translations for different languages (French, English, Russian, Arabic)
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
  'en': {
    'pageTitle': "FOXBET",
    'brandName': "FOXBET",
    'sidebarTitle': "Menu",
    'modeDark': "Dark Mode",
    'modeLight': "Light Mode",
    'gamesTitle': "Our Games",
    'loadingText': "Loading your game...",
    'noLangError': "Please configure the language in the bot before continuing",
    'category1win': "1win bet",
    'categoryOther': "Other Bets"
  },
  'ru': {
    'pageTitle': "FOXBET",
    'brandName': 'FOXBET',
    'sidebarTitle': 'Меню',
    'modeDark': "Тёмный режим",
    'modeLight': "Светлый режим",
    'gamesTitle': "Наши игры",
    'loadingText': "Загрузка вашей игры...",
    'noLangError': "Пожалуйста, настройте язык в боте перед продолжением",
    'category1win': "1win ставка",
    'categoryOther': "Другие ставки"
  },
  'ar': {
    'pageTitle': "FOXBET",
    'brandName': "FOXBET",
    'sidebarTitle': "القائمة",
    'modeDark': "الوضع الداكن",
    'modeLight': "الوضع الفاتح",
    'gamesTitle': 'ألعابنا',
    'loadingText': "جارٍ تحميل لعبتك...",
    'noLangError': "يرجى تهيئة اللغة في البوت قبل المتابعة",
    'category1win': "رهان 1win",
    'categoryOther': "رهانات أخرى"
  }
};

// Array of game objects, each with details for display
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
}, {
  'name': "Apple of Fortune",
  'url': 'home/apple/applegame.html',
  'image': "home/apple/stelo/logo .jpg",
  'category': "Autres Bets"
}, {
  'name': "Gems Mines",
  'url': "home/grile/mines.html",
  'image': "home/grile/vision/BaseMines.jpg",
  'category': "Autres Bets"
}, {
  'name': "Dragons",
  'url': "home/Dragons/dragonS/game.html",
  'image': "home/Dragons/dragonS/imag/baseDragons.jpg",
  'category': "Autres Bets"
}, {
  'name': "Thimbles",
  'url': "home/boll/thimble.html",
  'image': "home/boll/imog/BaseThimbles.jpg",
  'category': "Autres Bets"
}, {
  'name': 'Swimp',
  'url': 'home/crapaud/swimp.html',
  'image': "home/crapaud/imago/baseCrap.jpg",
  'category': "Autres Bets"
}, {
  'name': "Crash",
  'url': "crash/crash.html",
  'image': "crash/vision/logo.jpg",
  'category': "Autres Bets"
}, {
  'name': "Mundial",
  'url': "home/Mundial/game.html",
  'image': "home/Mundial/imogs/BaseMond.jpeg",
  'category': "Autres Bets"
}, {
  'name': "Wild Gost",
  'url': "home/WildG/wild.html",
  'image': "home/WildG/imog/west logo.jpg",
  'category': "Autres Bets"
}];


// --- UTILITY FUNCTIONS ---

/**
 * Sanitizes a string to prevent XSS attacks by converting HTML special characters.
 * @param {string} inputString The string to sanitize.
 * @returns {string} The sanitized string.
 */
function sanitizeInput(inputString) {
  const tempDiv = document.createElement("div");
  tempDiv.textContent = inputString;
  return tempDiv.innerHTML;
}

/**
 * Gets a specific parameter's value from the current URL's query string.
 * @param {string} paramName The name of the parameter to retrieve.
 * @returns {string} The sanitized value of the parameter, or an empty string if not found.
 */
function getParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return sanitizeInput(urlParams.get(paramName) || '');
}

/**
 * Constructs a game URL by appending existing URL parameters (lang, us, i, lk).
 * @param {string} gameUrl The base URL of the game.
 * @returns {string} The full game URL with query parameters.
 */
function getGameUrlWithParams(gameUrl) {
  const lang = getParam("lang");
  const userName = getParam('us');
  const userId = getParam('i');
  const telegramLink = getParam('lk');

  const newParams = new URLSearchParams();
  if (lang) newParams.append("lang", lang);
  if (userName) newParams.append('us', userName);
  if (userId) newParams.append('i', userId);
  if (telegramLink) newParams.append('lk', telegramLink);

  const queryString = newParams.toString();
  return `${gameUrl}${queryString ? '?' + queryString : ''}`;
}


// --- CORE LOGIC FUNCTIONS ---

/**
 * Parses user profile information from URL parameters and updates the UI.
 * This is used to display the user's name and link to their Telegram profile.
 */
function parseProfileFromUrl() {
  const userName = getParam('us');
  const userId = getParam('i');
  const telegramLinkHandle = getParam('lk');

  const profileButton = document.getElementById("profileBtn");
  const profileInfoContainer = document.getElementById("profileInfo");
  const profileNameElement = document.getElementById('profileName');
  const profileIdElement = document.getElementById("profileId");

  if (userId && userName && telegramLinkHandle) {
    const telegramProfileUrl = "https://t.me/" + telegramLinkHandle;
    profileButton.setAttribute("href", telegramProfileUrl);
    profileNameElement.textContent = userName;
    profileIdElement.style.display = 'none'; // The user ID is received but hidden from the UI
    profileInfoContainer.style.display = 'block';
  }
}

/**
 * Applies translations to the page based on the provided language code.
 * @param {string} langCode The language code (e.g., 'fr', 'en').
 */
function applyTranslations(langCode) {
  const selectedTranslations = translations[langCode] || translations.fr; // Default to French
  document.getElementById("page-title").textContent = selectedTranslations.pageTitle;
  document.getElementById("brand-name").textContent = selectedTranslations.brandName;
  document.getElementById("sidebar-title").textContent = selectedTranslations.sidebarTitle;
  document.getElementById('games-title').textContent = selectedTranslations.gamesTitle;
  document.getElementById('loadingText').textContent = selectedTranslations.loadingText;

  // Update dark/light mode text based on current mode
  const modeTextElement = document.getElementById("modeText");
  const isDarkMode = document.body.classList.contains('dark-mode');
  modeTextElement.textContent = isDarkMode ? selectedTranslations.modeDark : selectedTranslations.modeLight;
}

/**
 * Checks if a language is set in the URL. If not, it shows an error and redirects.
 * @returns {boolean} True if language is set, false otherwise.
 */
function checkLanguageAndRedirect() {
  const lang = getParam("lang");
  const telegramLinkHandle = getParam('lk');

  if (!lang) {
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingText = document.getElementById("loadingText");
    loadingText.textContent = translations.fr.noLangError; // Show error in default language
    loadingOverlay.classList.add('active');

    // After a delay, redirect the user to their Telegram bot link
    setTimeout(() => {
      window.location.href = telegramLinkHandle ? `https://t.me/${telegramLinkHandle}` : 'https://t.me/';
      // Attempt to close the window shortly after redirecting
      setTimeout(() => window.close(), 100);
    }, 2000); // 2000ms = 2 seconds

    return false; // Stop further execution
  }

  applyTranslations(lang);
  return true;
}

/**
 * Loads the user's preferred theme (dark/light) from localStorage.
 */
function loadMode() {
  const savedTheme = localStorage.getItem('theme') || "dark-mode"; // Default to dark mode
  const bodyElement = document.body;
  const modeTextElement = document.getElementById("modeText");
  const modeIcon = document.querySelector("#modeToggle i");
  const lang = getParam("lang") || 'fr';
  const currentTranslations = translations[lang] || translations.fr;

  bodyElement.classList.remove("dark-mode", 'light-mode');
  bodyElement.classList.add(savedTheme);

  if (savedTheme === 'dark-mode') {
    modeTextElement.textContent = currentTranslations.modeDark;
    modeIcon.className = "fas fa-moon";
  } else {
    modeTextElement.textContent = currentTranslations.modeLight;
    modeIcon.className = "fas fa-sun";
  }
}

/**
 * Saves the current theme to localStorage.
 * @param {string} theme The theme to save ('dark-mode' or 'light-mode').
 */
function saveMode(theme) {
  localStorage.setItem('theme', theme);
}

/**
 * Toggles the theme between dark and light mode and saves the preference.
 */
function toggleMode() {
  const bodyElement = document.body;
  const modeTextElement = document.getElementById('modeText');
  const modeIcon = document.querySelector("#modeToggle i");
  const lang = getParam("lang") || 'fr';
  const currentTranslations = translations[lang] || translations.fr;

  if (bodyElement.classList.contains("dark-mode")) {
    bodyElement.classList.replace("dark-mode", "light-mode");
    modeTextElement.textContent = currentTranslations.modeLight;
    modeIcon.className = "fas fa-sun";
    saveMode("light-mode");
  } else {
    bodyElement.classList.replace('light-mode', "dark-mode");
    modeTextElement.textContent = currentTranslations.modeDark;
    modeIcon.className = "fas fa-moon";
    saveMode('dark-mode');
  }
}

/**
 * Displays the loading screen overlay.
 */
function showLoading() {
  document.getElementById("loadingOverlay").classList.add("active");
}

/**
 * Hides the loading screen overlay.
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
  // Simulate loading time before redirecting to the game
  setTimeout(() => {
    hideLoading();
    window.location.href = getGameUrlWithParams(gameUrl);
  }, 2000); // 2000ms = 2 seconds
}

/**
 * Dynamically creates and adds game cards to the page from the gamesData array.
 */
function populateGames() {
  const gamesGridContainer = document.getElementById('gamesGrid');
  const lang = getParam("lang") || 'fr';
  const currentTranslations = translations[lang] || translations.fr;

  gamesGridContainer.innerHTML = ''; // Clear existing content

  gamesData.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = "game-card";
    gameCard.onclick = (event) => handleGameClick(game.url, event);

    // Get the translated category name
    const categoryName = game.category === "1win bet" ?
      currentTranslations.category1win :
      currentTranslations.categoryOther;

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
          <div class="game-category">${categoryName}</div>
      </div>
    `;
    gamesGridContainer.appendChild(gameCard);
  });
}

/**
 * Shows or hides the "Back to Top" button based on scroll position.
 */
function handleScroll() {
  const backToTopButton = document.getElementById("backToTop");
  if (window.scrollY > 300) { // 300px
    backToTopButton.classList.add("active");
  } else {
    backToTopButton.classList.remove("active");
  }
}


// --- MAIN EXECUTION ---

// Run setup functions after the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
  // 1. Check for language; stop if not present
  if (!checkLanguageAndRedirect()) {
    return;
  }

  // 2. Setup page features
  parseProfileFromUrl();
  loadMode();
  populateGames();

  // 3. Add event listeners for UI elements
  const modeToggleButton = document.getElementById('modeToggle');
  modeToggleButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMode();
  });

  // Sidebar (Hamburger Menu) functionality
  const hamburgerButton = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const closeSidebarButton = document.getElementById("closeSidebar");
  const overlay = document.getElementById('overlay');

  const openSidebar = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  };
  const closeSidebar = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  };

  hamburgerButton.addEventListener('click', openSidebar);
  closeSidebarButton.addEventListener('click', closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  // "Back to Top" button functionality
  const backToTopButton = document.getElementById('backToTop');
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  window.addEventListener("scroll", handleScroll);
});
