const translations = {
  fr: {
    pageTitle: "FOXBET",
    brandName: "FOXBET",
    sidebarTitle: "Menu",
    modeDark: "Mode Sombre",
    modeLight: "Mode Clair",
    gamesTitle: "Nos Jeux",
    loadingText: "Chargement de votre jeu...",
    noLangError: "Veuillez configurer la langue dans le bot avant de continuer",
    category1win: "1win bet",
    categoryOther: "Autres Bets",
    licenseStatus: "Statut de la licence",
    timeRemaining: "Temps restant",
    validLicense: "Licence valide",
    expires: "Expire",
    licenseExpired: "Licence expirée",
    licenseInvalid: "Licence invalide",
    validatingLicense: "Validation de la licence...",
    warningExpiresSoon: "La licence expire bientôt!",
    accessDenied: "Accès refusé - Licence invalide",
    redirectingToBot: "Redirection vers le bot...",
  },
  en: {
    pageTitle: "FOXBET",
    brandName: "FOXBET",
    sidebarTitle: "Menu",
    modeDark: "Dark Mode",
    modeLight: "Light Mode",
    gamesTitle: "Our Games",
    loadingText: "Loading your game...",
    noLangError: "Please configure the language in the bot before continuing",
    category1win: "1win bet",
    categoryOther: "Other Bets",
    licenseStatus: "License Status",
    timeRemaining: "Time Remaining",
    validLicense: "Valid License",
    expires: "Expires",
    licenseExpired: "License Expired",
    licenseInvalid: "License Invalid",
    validatingLicense: "Validating license...",
    warningExpiresSoon: "License expires soon!",
    accessDenied: "Access Denied - Invalid License",
    redirectingToBot: "Redirecting to bot...",
  },
  ru: {
    pageTitle: "FOXBET",
    brandName: "FOXBET",
    sidebarTitle: "Меню",
    modeDark: "Тёмный режим",
    modeLight: "Светлый режим",
    gamesTitle: "Наши игры",
    loadingText: "Загрузка вашей игры...",
    noLangError: "Пожалуйста, настройте язык в боте перед продолжением",
    category1win: "1win ставка",
    categoryOther: "Другие ставки",
    licenseStatus: "Статус лицензии",
    timeRemaining: "Время до истечения",
    validLicense: "Действующая лицензия",
    expires: "Истекает",
    licenseExpired: "Лицензия истекла",
    licenseInvalid: "Неверная лицензия",
    validatingLicense: "Проверка лицензии...",
    warningExpiresSoon: "Лицензия скоро истечет!",
    accessDenied: "Доступ запрещен - Неверная лицензия",
    redirectingToBot: "Перенаправление в бот...",
  },
  ar: {
    pageTitle: "FOXBET",
    brandName: "FOXBET",
    sidebarTitle: "القائمة",
    modeDark: "الوضع الداكن",
    modeLight: "الوضع الفاتح",
    gamesTitle: "ألعابنا",
    loadingText: "جارٍ تحميل لعبتك...",
    noLangError: "يرجى تهيئة اللغة في البوت قبل المتابعة",
    category1win: "رهان 1win",
    categoryOther: "رهانات أخرى",
    licenseStatus: "حالة الترخيص",
    timeRemaining: "الوقت المتبقي",
    validLicense: "ترخيص صحيح",
    expires: "ينتهي في",
    licenseExpired: "انتهت صلاحية الترخيص",
    licenseInvalid: "ترخيص غير صحيح",
    validatingLicense: "جاري التحقق من الترخيص...",
    warningExpiresSoon: "الترخيص ينتهي قريباً!",
    accessDenied: "تم رفض الوصول - ترخيص غير صحيح",
    redirectingToBot: "جاري التوجه إلى البوت...",
  },
};

const gamesData = [
  {
    name: "Lucky Jet",
    url: "home/LuckyJet/game.html",
    image: "home/LuckyJet/Imogos/LuckyBases.jpg",
    category: "1win bet",
  },
  {
    name: "Aviator",
    url: "home/Aviator/gameAvia.html",
    image: "home/Aviator/logo/aviator-game.webp",
    category: "Autres Bets",
  },
  {
    name: "Apple of Fortune",
    url: "home/apple/applegame.html",
    image: "home/apple/stelo/logo .jpg",
    category: "Autres Bets",
  },
  {
    name: "Gems Mines",
    url: "home/grile/mines.html",
    image: "home/grile/vision/BaseMines.jpg",
    category: "Autres Bets",
  },
  {
    name: "Dragons",
    url: "home/Dragons/dragonS/game.html",
    image: "home/Dragons/dragonS/imag/baseDragons.jpg",
    category: "Autres Bets",
  },
  {
    name: "Thimbles",
    url: "home/boll/thimble.html",
    image: "home/boll/imog/BaseThimbles.jpg",
    category: "Autres Bets",
  },
  {
    name: "Swimp",
    url: "home/crapaud/swimp.html",
    image: "home/crapaud/imago/baseCrap.jpg",
    category: "Autres Bets",
  },
  {
    name: "Crash",
    url: "crash/crash.html",
    image: "crash/vision/logo.jpg",
    category: "Autres Bets",
  },
  {
    name: "Mundial",
    url: "home/Mundial/game.html",
    image: "home/Mundial/imogs/BaseMond.jpeg",
    category: "Autres Bets",
  },
  {
    name: "Wild Gost",
    url: "home/WildG/wild.html",
    image: "home/WildG/imog/west logo.jpg",
    category: "Autres Bets",
  },
];

// Global variable to store license data and refresh interval
let licenseData = null;
let licenseRefreshInterval = null;

function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

function getParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return sanitizeInput(urlParams.get(paramName) || "");
}

function getGameUrlWithParams(gameUrl) {
  const lang = getParam("lang");
  const username = getParam("us");
  const userId = getParam("i");
  const telegramLink = getParam("lk");
  const licenseKey = getParam("key");
  const params = new URLSearchParams();

  if (lang) {
    params.append("lang", lang);
  }
  if (username) {
    params.append("us", username);
  }
  if (userId) {
    params.append("i", userId);
  }
  if (telegramLink) {
    params.append("lk", telegramLink);
  }
  if (licenseKey) {
    params.append("key", licenseKey);
  }

  return gameUrl + (params.toString() ? "?" + params.toString() : "");
}

// Updated license validation function with better error handling
async function validateLicense() {
  const licenseKey = getParam("key");
  const lang = getParam("lang") || "en";
  const userId = getParam("i");

  console.log("Validating license with params:", { licenseKey: licenseKey ? "***" + licenseKey.slice(-4) : "missing", lang, userId });

  if (!licenseKey) {
    console.error("No license key provided in URL parameters");
    return { valid: false, error: "License key is required" };
  }

  try {
    const apiUrl = `https://telegram-bot-implementation-879.created.app/api/webapp/validate-license?key=${encodeURIComponent(licenseKey)}&lang=${encodeURIComponent(lang)}&userId=${encodeURIComponent(userId || "")}`;
    console.log("Making API request to:", apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    console.log("API Response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      return { valid: false, error: `API Error: ${response.status}` };
    }
    
    const data = await response.json();
    console.log("License validation result:", data);

    if (data.valid) {
      return data;
    } else {
      console.error("License validation failed:", data.error);
      return { valid: false, error: data.error || "License validation failed" };
    }
  } catch (error) {
    console.error("Error validating license:", error);
    return { valid: false, error: `Network error: ${error.message}` };
  }
}

// Create and display license status bar
function createLicenseStatusBar() {
  const language = getParam("lang") || "en";
  const translation = translations[language] || translations.en;

  // Create license status container
  const licenseBar = document.createElement("div");
  licenseBar.id = "licenseStatusBar";
  licenseBar.className = "license-status-bar";
  licenseBar.innerHTML = `
    <div class="license-container">
      <div class="license-info">
        <div class="license-status" id="licenseStatusText">
          <i class="fas fa-spinner fa-spin"></i> ${translation.validatingLicense}
        </div>
        <div class="license-time" id="licenseTimeText"></div>
      </div>
      <div class="license-warning" id="licenseWarning" style="display: none;"></div>
    </div>
  `;

  // Insert after header or at top of body
  const header = document.querySelector("header") || document.querySelector(".top-nav");
  if (header) {
    header.insertAdjacentElement("afterend", licenseBar);
  } else {
    document.body.insertBefore(licenseBar, document.body.firstChild);
  }

  // Add CSS styles
  addLicenseStatusStyles();
}

// Add CSS styles for license status bar
function addLicenseStatusStyles() {
  const styles = `
    .license-status-bar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: fixed;
      top: 81px;
      width: 100%;
      z-index: 999;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }
    
    .license-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    
    .license-info {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .license-status {
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .license-time {
      font-size: 14px;
      opacity: 0.9;
    }
    
    .license-warning {
      background: rgba(255, 193, 7, 0.2);
      border: 1px solid rgba(255, 193, 7, 0.5);
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 14px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .license-status.valid {
      color: #28a745;
    }
    
    .license-status.expired {
      color: #dc3545;
    }
    
    .license-status.invalid {
      color: #ffc107;
    }
    
    .license-status.error {
      color: #dc3545;
    }
    
    @media (max-width: 768px) {
      .license-status-bar {
        top: 61px;
        padding: 8px 15px;
      }
      
      .license-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      
      .license-info {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        width: 100%;
      }
      
      .license-status {
        font-size: 12px;
      }
      
      .license-time {
        font-size: 11px;
      }
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// Update license status display with better error handling
function updateLicenseStatusDisplay(data) {
  const language = getParam("lang") || "en";
  const translation = translations[language] || translations.en;

  const statusElement = document.getElementById("licenseStatusText");
  const timeElement = document.getElementById("licenseTimeText");
  const warningElement = document.getElementById("licenseWarning");

  if (!statusElement || !timeElement) return;

  if (data && data.valid) {
    // Valid license
    statusElement.innerHTML = `<i class="fas fa-check-circle"></i> ${translation.validLicense}`;
    statusElement.className = "license-status valid";

    timeElement.textContent = `${translation.timeRemaining}: ${data.license.time_remaining_text}`;

    // Show warning if expires soon
    if (data.warning && data.warning.type === "expires_soon") {
      warningElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${translation.warningExpiresSoon}`;
      warningElement.style.display = "block";
    } else {
      warningElement.style.display = "none";
    }

    licenseData = data;
    
    // Hide games initially and show them after license validation
    const gamesContainer = document.getElementById("gamesGrid");
    if (gamesContainer) {
      gamesContainer.style.display = "grid";
    }
    
  } else {
    // Invalid or expired license
    const errorMessage = data?.error || translation.licenseInvalid;
    statusElement.innerHTML = `<i class="fas fa-times-circle"></i> ${translation.accessDenied}`;
    statusElement.className = "license-status invalid";

    timeElement.textContent = errorMessage;
    warningElement.style.display = "none";

    // Hide games when license is invalid
    const gamesContainer = document.getElementById("gamesGrid");
    if (gamesContainer) {
      gamesContainer.style.display = "none";
    }
    
    // Show redirect message and redirect to bot after 5 seconds
    setTimeout(() => {
      timeElement.textContent = translation.redirectingToBot;
      const telegramLink = getParam("lk");
      
      setTimeout(() => {
        if (telegramLink) {
          window.location.href = `https://t.me/${telegramLink}`;
        } else {
          // Fallback - try to close window or redirect to telegram
          window.close();
        }
      }, 2000);
    }, 3000);
  }
}

// Initialize license tracking with better error handling
async function initializeLicenseTracking() {
  console.log("Initializing license tracking...");
  
  // Create the license status bar
  createLicenseStatusBar();

  // Initial validation
  const data = await validateLicense();
  updateLicenseStatusDisplay(data);

  // Only set up periodic refresh if license is valid
  if (data && data.valid) {
    if (licenseRefreshInterval) {
      clearInterval(licenseRefreshInterval);
    }

    licenseRefreshInterval = setInterval(async () => {
      console.log("Refreshing license status...");
      const refreshedData = await validateLicense();
      updateLicenseStatusDisplay(refreshedData);
    }, 30000); // 30 seconds
  }
}

function parseProfileFromUrl() {
  const username = getParam("us");
  const userId = getParam("i");
  const telegramLink = getParam("lk");
  const profileBtn = document.getElementById("profileBtn");
  const profileInfo = document.getElementById("profileInfo");
  const profileName = document.getElementById("profileName");
  const profileId = document.getElementById("profileId");

  if (userId && username && telegramLink) {
    const telegramUrl = "https://t.me/" + telegramLink;
    profileBtn.setAttribute("href", telegramUrl);
    profileName.textContent = username;
    profileId.style.display = "none";
    profileInfo.style.display = "block";
  }
}

function applyTranslations(language) {
  const translation = translations[language] || translations.fr;

  document.getElementById("page-title").textContent = translation.pageTitle;
  document.getElementById("brand-name").textContent = translation.brandName;
  document.getElementById("sidebar-title").textContent = translation.sidebarTitle;
  document.getElementById("games-title").textContent = translation.gamesTitle;
  document.getElementById("loadingText").textContent = translation.loadingText;

  const modeText = document.getElementById("modeText");
  modeText.textContent = document.body.classList.contains("dark-mode")
    ? translation.modeDark
    : translation.modeLight;
}

function checkLanguageAndRedirect() {
  const language = getParam("lang");
  const telegramLink = getParam("lk");
  const licenseKey = getParam("key");

  console.log("Checking parameters:", { language, telegramLink: telegramLink ? "present" : "missing", licenseKey: licenseKey ? "present" : "missing" });

  if (!language || !licenseKey) {
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingText = document.getElementById("loadingText");

    loadingText.textContent = translations.fr.noLangError;
    loadingOverlay.classList.add("active");

    setTimeout(() => {
      if (telegramLink) {
        window.location.href = "https://t.me/" + telegramLink;
      } else {
        window.location.href = "https://t.me/";
      }
      setTimeout(() => {
        window.close();
      }, 100);
    }, 2000);

    return false;
  }

  applyTranslations(language);
  return true;
}

function loadMode() {
  const savedTheme = localStorage.getItem("theme") || "dark-mode";
  const body = document.body;
  const modeText = document.getElementById("modeText");
  const modeIcon = document.querySelector("#modeToggle i");
  const language = getParam("lang") || "fr";
  const translation = translations[language] || translations.fr;

  body.classList.remove("dark-mode", "light-mode");
  body.classList.add(savedTheme);
  modeText.textContent =
    savedTheme === "dark-mode" ? translation.modeDark : translation.modeLight;
  modeIcon.className =
    savedTheme === "dark-mode" ? "fas fa-moon" : "fas fa-sun";
}

function saveMode(mode) {
  localStorage.setItem("theme", mode);
}

function toggleMode() {
  const body = document.body;
  const modeText = document.getElementById("modeText");
  const modeIcon = document.querySelector("#modeToggle i");
  const language = getParam("lang") || "fr";
  const translation = translations[language] || translations.fr;

  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    modeText.textContent = translation.modeLight;
    modeIcon.className = "fas fa-sun";
    saveMode("light-mode");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    modeText.textContent = translation.modeDark;
    modeIcon.className = "fas fa-moon";
    saveMode("dark-mode");
  }
}

function showLoading() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.classList.add("active");
}

function hideLoading() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.classList.remove("active");
}

function handleGameClick(gameUrl, event) {
  event.preventDefault();

  // Check if license is valid before allowing game access
  if (!licenseData || !licenseData.valid) {
    const language = getParam("lang") || "en";
    const translation = translations[language] || translations.en;
    alert(translation.accessDenied);
    return;
  }

  showLoading();

  setTimeout(() => {
    hideLoading();
    window.location.href = getGameUrlWithParams(gameUrl);
  }, 2000);
}

function populateGames() {
  const gamesGrid = document.getElementById("gamesGrid");
  const language = getParam("lang") || "fr";
  const translation = translations[language] || translations.fr;

  gamesGrid.innerHTML = "";

  // Initially hide games until license is validated
  gamesGrid.style.display = "none";

  gamesData.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.className = "game-card";
    gameCard.onclick = (event) => handleGameClick(game.url, event);

    const categoryText =
      game.category === "1win bet"
        ? translation.category1win
        : translation.categoryOther;

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

function handleScroll() {
  const backToTopBtn = document.getElementById("backToTop");

  if (window.scrollY > 300) {
    backToTopBtn.classList.add("active");
  } else {
    backToTopBtn.classList.remove("active");
  }
}

// Main initialization
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing webapp...");
  
  if (!checkLanguageAndRedirect()) {
    return;
  }

  parseProfileFromUrl();
  loadMode();
  populateGames();

  // Initialize license tracking - this is the key part
  initializeLicenseTracking();

  // Mode toggle event
  const modeToggle = document.getElementById("modeToggle");
  modeToggle.addEventListener("click", (event) => {
    event.preventDefault();
    toggleMode();
  });

  // Sidebar navigation
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");
  const overlay = document.getElementById("overlay");

  hamburgerBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  });

  closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Back to top button
  const backToTop = document.getElementById("backToTop");
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", handleScroll);
});

// Clean up interval when page is unloaded
window.addEventListener("beforeunload", () => {
  if (licenseRefreshInterval) {
    clearInterval(licenseRefreshInterval);
  }
});
