// --- TRANSLATIONS & GAME DATA ---
const translations = {
  'fr': {
    'pageTitle': "FOXBET", 'brandName': "FOXBET", 'sidebarTitle': 'Menu', 'modeDark': "Mode Sombre", 'modeLight': "Mode Clair", 'gamesTitle': "Nos Jeux", 'loadingText': "Chargement de votre jeu...", 'noLangError': "Veuillez configurer la langue dans le bot avant de continuer", 'category1win': "1win bet", 'categoryOther': "Autres Bets",
    // New license translations
    'licenseTitle': "Activation Requise", 'licensePrompt': "Veuillez entrer votre clé de licence pour déverrouiller le contenu.", 'licensePlaceholder': "Entrez votre clé de licence", 'licenseButton': "Activer", 'licenseValidating': "Validation en cours...", 'licenseErrorUsed': "Cette clé de licence a déjà été utilisée.", 'licenseErrorInvalid': "Clé de licence invalide.",
  },
  'en': {
    'pageTitle': "FOXBET", 'brandName': "FOXBET", 'sidebarTitle': "Menu", 'modeDark': "Dark Mode", 'modeLight': "Light Mode", 'gamesTitle': "Our Games", 'loadingText': "Loading your game...", 'noLangError': "Please configure the language in the bot before continuing", 'category1win': "1win bet", 'categoryOther': "Other Bets",
    // New license translations
    'licenseTitle': "Activation Required", 'licensePrompt': "Please enter your license key to unlock the content.", 'licensePlaceholder': "Enter your license key", 'licenseButton': "Activate", 'licenseValidating': "Validating...", 'licenseErrorUsed': "This license key has already been used.", 'licenseErrorInvalid': "Invalid license key.",
  },
  'ru': {
    'pageTitle': "FOXBET", 'brandName': 'FOXBET', 'sidebarTitle': 'Меню', 'modeDark': "Тёмный режим", 'modeLight': "Светлый режим", 'gamesTitle': "Наши игры", 'loadingText': "Загрузка вашей игры...", 'noLangError': "Пожалуйста, настройте язык в боте перед продолжением", 'category1win': "1win ставка", 'categoryOther': "Другие ставки",
    // New license translations
    'licenseTitle': "Требуется активация", 'licensePrompt': "Пожалуйста, введите ваш лицензионный ключ, чтобы разблокировать контент.", 'licensePlaceholder': "Введите ваш лицензионный ключ", 'licenseButton': "Активировать", 'licenseValidating': "Проверка...", 'licenseErrorUsed': "Этот лицензионный ключ уже был использован.", 'licenseErrorInvalid': "Неверный лицензионный ключ.",
  },
  'ar': {
    'pageTitle': "FOXBET", 'brandName': "FOXBET", 'sidebarTitle': "القائمة", 'modeDark': "الوضع الداكن", 'modeLight': "الوضع الفاتح", 'gamesTitle': 'ألعابنا', 'loadingText': "جارٍ تحميل لعبتك...", 'noLangError': "يرجى تهيئة اللغة في البوت قبل المتابعة", 'category1win': "رهان 1win", 'categoryOther': "رهانات أخرى",
    // New license translations
    'licenseTitle': "التنشيط مطلوب", 'licensePrompt': "الرجاء إدخال مفتاح الترخيص الخاص بك لفتح المحتوى.", 'licensePlaceholder': "أدخل مفتاح الترخيص الخاص بك", 'licenseButton': "تفعيل", 'licenseValidating': "يتم التحقق...", 'licenseErrorUsed': "مفتاح الترخيص هذا تم استخدامه بالفعل.", 'licenseErrorInvalid': "مفتاح ترخيص غير صالح.",
  }
};

const gamesData = [
  { 'name': "Lucky Jet", 'url': 'home/LuckyJet/game.html', 'image': "home/LuckyJet/Imogos/LuckyBases.jpg", 'category': "1win bet" },
  { 'name': "Aviator", 'url': "home/Aviator/gameAvia.html", 'image': "home/Aviator/logo/aviator-game.webp", 'category': "Autres Bets" },
  { 'name': "Apple of Fortune", 'url': 'home/apple/applegame.html', 'image': "home/apple/stelo/logo .jpg", 'category': "Autres Bets" },
  { 'name': "Gems Mines", 'url': "home/grile/mines.html", 'image': "home/grile/vision/BaseMines.jpg", 'category': "Autres Bets" },
  { 'name': "Dragons", 'url': "home/Dragons/dragonS/game.html", 'image': "home/Dragons/dragonS/imag/baseDragons.jpg", 'category': "Autres Bets" },
  { 'name': "Thimbles", 'url': "home/boll/thimble.html", 'image': "home/boll/imog/BaseThimbles.jpg", 'category': "Autres Bets" },
  { 'name': 'Swimp', 'url': 'home/crapaud/swimp.html', 'image': "home/crapaud/imago/baseCrap.jpg", 'category': "Autres Bets" },
  { 'name': "Crash", 'url': "crash/crash.html", 'image': "crash/vision/logo.jpg", 'category': "Autres Bets" },
  { 'name': "Mundial", 'url': "home/Mundial/game.html", 'image': "home/Mundial/imogs/BaseMond.jpeg", 'category': "Autres Bets" },
  { 'name': "Wild Gost", 'url': "home/WildG/wild.html", 'image': "home/WildG/imog/west logo.jpg", 'category': "Autres Bets" }
];


// --- HELPER FUNCTIONS ---
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

function getParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return sanitizeInput(urlParams.get(paramName) || '');
}

// --- MAIN APPLICATION LOGIC (runs after successful activation) ---
function initializeApp() {
  if (!checkLanguageAndRedirect()) {
    return; // Stop if language check fails
  }

  parseProfileFromUrl();
  loadMode();
  populateGames();

  // Mode toggle event
  document.getElementById('modeToggle').addEventListener('click', event => {
    event.preventDefault();
    toggleMode();
  });

  // Sidebar navigation
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");
  const overlay = document.getElementById('overlay');

  hamburgerBtn.addEventListener('click', () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  });

  closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", handleScroll);
}

// --- ORIGINAL FUNCTIONS (now called by initializeApp) ---
function getGameUrlWithParams(gameUrl) {
  const lang = getParam("lang");
  const username = getParam('us');
  const userId = getParam('i');
  const telegramLink = getParam('lk');
  const params = new URLSearchParams();
  if (lang) params.append("lang", lang);
  if (username) params.append('us', username);
  if (userId) params.append('i', userId);
  if (telegramLink) params.append('lk', telegramLink);
  return gameUrl + (params.toString() ? '?' + params.toString() : '');
}

function parseProfileFromUrl() {
  const username = getParam('us');
  const userId = getParam('i');
  const telegramLink = getParam('lk');
  const profileBtn = document.getElementById("profileBtn");
  const profileInfo = document.getElementById("profileInfo");
  const profileName = document.getElementById("profileName");
  if (userId && username && telegramLink) {
    profileBtn.setAttribute("href", "https://t.me/" + telegramLink);
    profileName.textContent = username;
    document.getElementById("profileId").style.display = 'none';
    profileInfo.style.display = 'block';
  }
}

function applyTranslations(language) {
  const translation = translations[language] || translations.fr;
  document.getElementById("page-title").textContent = translation.pageTitle;
  document.getElementById("brand-name").textContent = translation.brandName;
  document.getElementById("sidebar-title").textContent = translation.sidebarTitle;
  document.getElementById('games-title').textContent = translation.gamesTitle;
  document.getElementById('loadingText').textContent = translation.loadingText;
  const modeText = document.getElementById("modeText");
  modeText.textContent = document.body.classList.contains('dark-mode') ? translation.modeDark : translation.modeLight;
}

function checkLanguageAndRedirect() {
  const language = getParam("lang");
  const telegramLink = getParam('lk');
  if (!language) {
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingText = document.getElementById("loadingText");
    loadingText.textContent = translations.fr.noLangError;
    loadingOverlay.classList.add('active');
    setTimeout(() => {
      window.location.href = telegramLink ? "https://t.me/" + telegramLink : 'https://t.me/';
      setTimeout(() => window.close(), 100);
    }, 2000);
    return false;
  }
  applyTranslations(language);
  return true;
}

function loadMode() {
  const savedTheme = localStorage.getItem('theme') || "dark-mode";
  const language = getParam("lang") || 'fr';
  const translation = translations[language] || translations.fr;
  document.body.classList.remove("dark-mode", 'light-mode');
  document.body.classList.add(savedTheme);
  document.getElementById("modeText").textContent = savedTheme === 'dark-mode' ? translation.modeDark : translation.modeLight;
  document.querySelector("#modeToggle i").className = savedTheme === "dark-mode" ? "fas fa-moon" : "fas fa-sun";
}

function saveMode(mode) {
  localStorage.setItem('theme', mode);
}

function toggleMode() {
  const language = getParam("lang") || 'fr';
  const translation = translations[language] || translations.fr;
  const body = document.body;
  if (body.classList.contains("dark-mode")) {
    body.classList.replace("dark-mode", "light-mode");
    document.getElementById('modeText').textContent = translation.modeLight;
    document.querySelector("#modeToggle i").className = "fas fa-sun";
    saveMode("light-mode");
  } else {
    body.classList.replace('light-mode', "dark-mode");
    document.getElementById('modeText').textContent = translation.modeDark;
    document.querySelector("#modeToggle i").className = "fas fa-moon";
    saveMode('dark-mode');
  }
}

function showLoading() {
  document.getElementById("loadingOverlay").classList.add("active");
}

function hideLoading() {
  document.getElementById('loadingOverlay').classList.remove("active");
}

function handleGameClick(gameUrl, event) {
  event.preventDefault();
  showLoading();
  setTimeout(() => {
    hideLoading();
    window.location.href = getGameUrlWithParams(gameUrl);
  }, 2000);
}

function populateGames() {
  const gamesGrid = document.getElementById('gamesGrid');
  const language = getParam("lang") || 'fr';
  const translation = translations[language] || translations.fr;
  gamesGrid.innerHTML = '';
  gamesData.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = "game-card";
    gameCard.onclick = event => handleGameClick(game.url, event);
    const categoryText = game.category === "1win bet" ? translation.category1win : translation.categoryOther;
    gameCard.innerHTML = `
      <div class="game-image" style="background-image: url('${game.image}');">
        <div class="game-overlay">
          <div class="play-btn" aria-label="Play ${game.name}"><i class="fas fa-play"></i></div>
        </div>
      </div>
      <div class="game-info">
        <div class="game-name">${game.name}</div>
        <div class="game-category">${categoryText}</div>
      </div>`;
    gamesGrid.appendChild(gameCard);
  });
}

function handleScroll() {
  const backToTopBtn = document.getElementById("backToTop");
  window.scrollY > 300 ? backToTopBtn.classList.add("active") : backToTopBtn.classList.remove("active");
}


// --- NEW LICENSE SYSTEM LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // Get all DOM elements for the license system
    const licenseOverlay = document.getElementById('licenseOverlay');
    const licenseForm = document.getElementById('licenseForm');
    const licenseKeyInput = document.getElementById('licenseKey');
    const errorMessage = document.getElementById('errorMessage');
    const body = document.body;
    let isAppInitialized = false;

    // Translates the license overlay text
    function translateLicenseOverlay() {
        const language = getParam("lang") || 'en'; // Default to English for the lock screen
        const t = translations[language] || translations.en;
        licenseOverlay.querySelector('h2').textContent = t.licenseTitle;
        licenseOverlay.querySelector('p').textContent = t.licensePrompt;
        licenseKeyInput.placeholder = t.licensePlaceholder;
        licenseOverlay.querySelector('button').textContent = t.licenseButton;
    }

    // Locks the page and shows the activation form
    function lockPage() {
        translateLicenseOverlay();
        body.classList.add('content-locked');
        licenseOverlay.style.display = 'flex';
    }

    // Unlocks the page and initializes the main content
    function unlockPage() {
        body.classList.remove('content-locked');
        licenseOverlay.style.opacity = '0';
        setTimeout(() => {
            licenseOverlay.style.display = 'none';
        }, 500); // Wait for transition
        
        // IMPORTANT: Initialize the app only once
        if (!isAppInitialized) {
            initializeApp();
            isAppInitialized = true;
        }
    }

    // Checks for a valid license in browser storage on page load
    function checkLicenseStatus() {
        const validUntil = localStorage.getItem('license_valid_until');
        if (validUntil && new Date().getTime() < parseInt(validUntil)) {
            unlockPage();
        } else {
            localStorage.removeItem('license_valid_until'); // Clean up expired key
            lockPage();
        }
    }

    // Handles the form submission
    licenseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const key = licenseKeyInput.value.trim();
        if (!key) return;

        const language = getParam("lang") || 'en';
        const t = translations[language] || translations.en;
        
        errorMessage.textContent = t.licenseValidating;
        errorMessage.style.color = 'inherit';
        licenseKeyInput.style.borderColor = '';

        // ======================================================================
        //  THIS IS THE UPDATED SECTION FOR YOUR LIVE BACKEND
        // ======================================================================
        try {
            // Build the URL with the key as a query parameter
            const url = `https://license-key-generator-with-236.created.app/api/validate-key?key=${key}`;

            // Use a GET request without a body or special headers
            const response = await fetch(url, {
                method: 'GET',
            });

            const data = await response.json();

            if (response.ok && data.valid) {
                // SUCCESS: Key is valid. Store expiration time and unlock.
                // NOTE: This assumes your backend returns a `durationMs` value.
                // e.g., { "valid": true, "durationMs": 3600000 } for 1 hour.
                const expirationTime = new Date().getTime() + data.durationMs;
                localStorage.setItem('license_valid_until', expirationTime);
                unlockPage();
            } else {
                // FAILED: Use the server's error message if it exists, otherwise use a default translated one.
                const defaultErrorMsg = response.status === 403 ? t.licenseErrorUsed : t.licenseErrorInvalid;
                throw new Error(data.message || defaultErrorMsg);
            }
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.color = '#ff4d4d';
            licenseKeyInput.style.borderColor = '#ff4d4d';
        }
        // ======================================================================
        //  END OF UPDATED SECTION
        // ======================================================================
    });

    // --- START THE PROCESS ---
    checkLicenseStatus();
});
