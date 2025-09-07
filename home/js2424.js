// ✅ BACKEND CONFIGURATION - YOUR LICENSE SERVER
const BACKEND_URL = "https://multilingual-telegram-bot-w-431.created.app";

// 🚧 TEMPORARY: Enable bypass mode for testing
const BYPASS_LICENSE_CHECK = true; // Set to false when backend is working

// --- CONFIGURATION DATA ---
// Object containing translations for different languages (French, English, Russian, Arabic)
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
    // ✅ ADDED: License validation messages
    licenseExpired: "🔒 Votre licence a expiré",
    licenseExpiredMessage:
      "Votre accès Premium a expiré. Contactez @foxbet18_bot pour renouveler votre licence.",
    contactAdmin: "Contacter le Bot",
    validatingLicense: "Vérification de votre licence...",
    licenseError: "Erreur de validation de licence",
    bypassMode: "🚧 Mode Test - Validation de licence contournée",
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
    // ✅ ADDED: License validation messages
    licenseExpired: "🔒 Your License Has Expired",
    licenseExpiredMessage:
      "Your Premium access has expired. Contact @foxbet18_bot to renew your license.",
    contactAdmin: "Contact Bot",
    validatingLicense: "Validating your license...",
    licenseError: "License validation error",
    bypassMode: "🚧 Test Mode - License validation bypassed",
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
    // ✅ ADDED: License validation messages
    licenseExpired: "🔒 Срок действия вашей лицензии истек",
    licenseExpiredMessage:
      "Срок действия вашего Premium доступа истек. Обратитесь к @foxbet18_bot для продления лицензии.",
    contactAdmin: "Связаться с ботом",
    validatingLicense: "Проверка вашей лицензии...",
    licenseError: "Ошибка проверки лицензии",
    bypassMode: "🚧 Тестовый режим - Проверка лицензии обойдена",
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
    // ✅ ADDED: License validation messages
    licenseExpired: "🔒 انتهت صلاحية ترخيصك",
    licenseExpiredMessage:
      "انتهت صلاحية وصولك المميز. اتصل بـ @foxbet18_bot لتجديد ترخيصك.",
    contactAdmin: "اتصل بالبوت",
    validatingLicense: "جارٍ التحقق من ترخيصك...",
    licenseError: "خطأ في التحقق من الترخيص",
    bypassMode: "🚧 وضع الاختبار - تم تجاوز التحقق من الترخيص",
  },
};

// Array of game objects, each with details for display
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
  return sanitizeInput(urlParams.get(paramName) || "");
}

/**
 * Constructs a game URL by appending existing URL parameters (lang, us, i, lk).
 * @param {string} gameUrl The base URL of the game.
 * @returns {string} The full game URL with query parameters.
 */
function getGameUrlWithParams(gameUrl) {
  const lang = getParam("lang");
  const userName = getParam("us");
  const userId = getParam("i");
  const telegramLink = getParam("lk");
  const newParams = new URLSearchParams();
  if (lang) newParams.append("lang", lang);
  if (userName) newParams.append("us", userName);
  if (userId) newParams.append("i", userId);
  if (telegramLink) newParams.append("lk", telegramLink);
  const queryString = newParams.toString();
  return `${gameUrl}${queryString ? "?" + queryString : ""}`;
}

// ✅ ADDED: LICENSE VALIDATION FUNCTION
/**
 * Validates user license by calling the backend API
 * @returns {Promise<boolean>} True if license is valid, false otherwise
 */
async function validateUserLicense() {
  let telegramId = getParam("i");
  const lang = getParam("lang") || "fr";
  const t = translations[lang] || translations.fr;

  // 🚧 BYPASS MODE - REMOVE THIS WHEN BACKEND IS WORKING
  if (BYPASS_LICENSE_CHECK) {
    console.log(
      "🚧 🚧 🚧 BYPASS MODE ENABLED - SKIPPING LICENSE CHECK 🚧 🚧 🚧",
    );
    console.log("⚠️ This is for testing only - license validation is disabled");

    // Show bypass warning
    const loadingText = document.getElementById("loadingText");
    if (loadingText) {
      loadingText.textContent = t.bypassMode;
    }

    // Brief delay to show the bypass message
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("✅ BYPASS MODE: Allowing access without license check");
    return true;
  }

  // COMPREHENSIVE DEBUG LOGGING
  console.log("🔍 === FOXBET LICENSE VALIDATION STARTING ===");
  console.log("📋 Full URL:", window.location.href);
  console.log("🆔 Telegram ID from URL:", telegramId);
  console.log("🌍 Language:", lang);
  console.log("🖥️  Backend URL:", BACKEND_URL);
  console.log("🤖 Bot: @foxbet18_bot");

  // Show validation message
  const loadingText = document.getElementById("loadingText");
  if (loadingText) {
    loadingText.textContent = t.validatingLicense;
  }

  // FOR TESTING: Use test user ID if no ID provided
  if (
    !telegramId ||
    telegramId === "" ||
    telegramId === "null" ||
    telegramId === "undefined"
  ) {
    console.log("⚠️ No telegram ID provided, using test ID for development");
    telegramId = "123456789"; // Test user we created
  }

  // Convert to integer and validate
  const telegramIdInt = parseInt(telegramId);
  if (isNaN(telegramIdInt) || telegramIdInt <= 0) {
    console.log("❌ INVALID TELEGRAM ID FORMAT - BLOCKING ACCESS");
    showExpiredScreen(t.licenseError, "Invalid user ID format", lang);
    return false;
  }

  try {
    console.log("📡 === CALLING YOUR BACKEND API ===");

    // ✅ CRITICAL: Call your backend license validation
    const apiUrl = `${BACKEND_URL}/api/check-license-validity`;
    console.log("🎯 API Endpoint:", apiUrl);
    console.log(
      "📤 Sending telegram_id:",
      telegramIdInt,
      "type:",
      typeof telegramIdInt,
    );

    // FIRST: Test if backend is reachable
    console.log("🧪 Testing backend connectivity...");
    try {
      const testResponse = await fetch(`${BACKEND_URL}/api/test`);
      console.log("🧪 Test API Status:", testResponse.status, testResponse.ok);
      if (testResponse.ok) {
        const testData = await testResponse.json();
        console.log("🧪 Test API Response:", testData);
      }
    } catch (testError) {
      console.error("🚨 Backend connectivity test FAILED:", testError);
      showExpiredScreen(
        t.licenseError,
        `Cannot connect to license server: ${testError.message}`,
        lang,
      );
      return false;
    }

    const requestBody = { telegram_id: telegramIdInt };
    console.log("📦 Request body:", JSON.stringify(requestBody, null, 2));

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("📥 === API RESPONSE ===");
    console.log("🔢 Status:", response.status, response.statusText);
    console.log("✅ Response OK:", response.ok);
    console.log("📋 Response headers:", [...response.headers.entries()]);

    if (!response.ok) {
      console.error("❌ API response not ok:", response.status);
      const errorText = await response.text();
      console.error("❌ Error response body:", errorText);
      throw new Error(
        `API returned ${response.status}: ${response.statusText} - ${errorText}`,
      );
    }

    const data = await response.json();
    console.log("📊 Response data:", JSON.stringify(data, null, 2));

    // CRITICAL DECISION LOGIC
    console.log("🎯 === LICENSE VALIDATION DECISION ===");
    console.log("✅ data.success:", data.success);
    console.log("✅ data.valid:", data.valid);
    console.log("❌ data.expired:", data.expired);
    console.log("📅 data.expires_at:", data.expires_at);
    console.log("💬 data.message:", data.message);
    console.log("⚠️  data.error:", data.error);

    // Check if license is valid - STRICT validation
    if (data.success === true && data.valid === true) {
      console.log("✅ ✅ ✅ LICENSE IS VALID - ALLOWING ACCESS ✅ ✅ ✅");
      return true;
    } else {
      // License is invalid/expired - BLOCK ACCESS
      console.log(
        "❌ ❌ ❌ LICENSE IS INVALID/EXPIRED - BLOCKING ACCESS ❌ ❌ ❌",
      );
      console.log(
        "🚫 Blocking reason:",
        data.message || data.error || "License validation failed",
      );

      const message = data.message || data.error || t.licenseExpiredMessage;
      showExpiredScreen(t.licenseExpired, message, lang);
      return false;
    }
  } catch (error) {
    console.error("💥 === LICENSE VALIDATION ERROR ===");
    console.error("Error details:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Show helpful error message
    let errorMessage = "Could not validate license with server. ";
    if (error.message.includes("Failed to fetch")) {
      errorMessage +=
        "Network connection failed. Please check your internet connection.";
    } else if (error.message.includes("CORS")) {
      errorMessage += "CORS policy issue. Please check server configuration.";
    } else {
      errorMessage += error.message;
    }

    showExpiredScreen(t.licenseError, errorMessage, lang);
    return false;
  }
}

// ✅ ADDED: EXPIRED SCREEN FUNCTION
/**
 * Shows expired license screen - COMPLETELY BLOCKS webapp
 * @param {string} title The title to show
 * @param {string} message The message to show
 * @param {string} lang The language code
 */
function showExpiredScreen(title, message, lang) {
  const t = translations[lang] || translations.fr;

  console.log("🔒 === SHOWING EXPIRED SCREEN ===");
  console.log("🚫 Title:", title);
  console.log("💬 Message:", message);
  console.log("🌍 Language:", lang);

  // COMPLETELY REPLACE PAGE CONTENT
  document.body.innerHTML = `
    <div style="
      display: flex; 
      flex-direction: column; 
      justify-content: center; 
      align-items: center; 
      min-height: 100vh; 
      background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%);
      color: white;
      text-align: center;
      padding: 20px;
      font-family: Arial, sans-serif;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999999;
      overflow: hidden;
    ">
      <div style="
        background: rgba(255,255,255,0.15);
        padding: 50px;
        border-radius: 25px;
        backdrop-filter: blur(15px);
        box-shadow: 0 25px 50px rgba(0,0,0,0.4);
        max-width: 600px;
        width: 100%;
        border: 1px solid rgba(255,255,255,0.2);
        animation: slideIn 0.5s ease-out;
      ">
        <div style="
          font-size: 100px; 
          margin-bottom: 25px; 
          animation: lockPulse 2s infinite;
          text-shadow: 0 0 20px rgba(255,255,255,0.5);
        ">🔒</div>
        
        <h1 style="
          margin: 0 0 25px 0; 
          font-size: 28px; 
          font-weight: bold;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ">${title}</h1>
        
        <p style="
          margin: 0 0 30px 0; 
          font-size: 18px; 
          line-height: 1.6; 
          opacity: 0.95;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        ">${message}</p>
        
        <div style="
          margin-bottom: 30px;
          background: rgba(255,255,255,0.1);
          padding: 20px;
          border-radius: 15px;
          border: 1px solid rgba(255,255,255,0.2);
        ">
          <p style="font-size: 16px; margin-bottom: 15px; opacity: 0.9;">🚫 Access Denied Because:</p>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin: 8px 0; font-size: 15px;">❌ License has expired</li>
            <li style="margin: 8px 0; font-size: 15px;">❌ No valid Premium subscription</li>
            <li style="margin: 8px 0; font-size: 15px;">❌ Account verification required</li>
          </ul>
        </div>
        
        <button onclick="window.location.reload()" style="
          display: inline-block;
          background: linear-gradient(45deg, #4ECDC4, #45B7D1);
          color: white;
          padding: 15px 35px;
          border-radius: 30px;
          border: none;
          font-weight: 700;
          font-size: 16px;
          margin-right: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(78,205,196,0.4);
        " onmouseover="
          this.style.transform='translateY(-3px) scale(1.05)';
          this.style.boxShadow='0 15px 30px rgba(78,205,196,0.6)';
        " onmouseout="
          this.style.transform='translateY(0) scale(1)';
          this.style.boxShadow='0 10px 20px rgba(78,205,196,0.4)';
        ">
          🔄 Retry
        </button>
        
        <a href="https://t.me/foxbet18_bot" style="
          display: inline-block;
          background: linear-gradient(45deg, #FF6B6B, #FF8E53);
          color: white;
          padding: 15px 35px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(255,107,107,0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        " onmouseover="
          this.style.transform='translateY(-3px) scale(1.05)';
          this.style.boxShadow='0 15px 30px rgba(255,107,107,0.6)';
        " onmouseout="
          this.style.transform='translateY(0) scale(1)';
          this.style.boxShadow='0 10px 20px rgba(255,107,107,0.4)';
        ">
          🤖 ${t.contactAdmin}
        </a>
        
        <div style="
          margin-top: 30px; 
          font-size: 14px; 
          opacity: 0.7;
          border-top: 1px solid rgba(255,255,255,0.2);
          padding-top: 20px;
        ">
          © 2024 FOXBET - Protected by License System<br/>
          🤖 Contact @foxbet18_bot for license activation
        </div>
      </div>
      
      <style>
        @keyframes lockPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.8; text-shadow: 0 0 30px rgba(255,255,255,0.8); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(-50px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        * {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
      </style>
    </div>
  `;

  // NUCLEAR OPTION: Prevent any further JavaScript execution
  console.log("🚫 DISABLING ALL FURTHER JAVASCRIPT EXECUTION");

  // Disable all event listeners
  window.addEventListener = function () {};
  document.addEventListener = function () {};

  // Disable setTimeout/setInterval
  window.setTimeout = function () {};
  window.setInterval = function () {};

  // Remove all existing intervals/timeouts
  for (let i = 0; i < 10000; i++) {
    clearTimeout(i);
    clearInterval(i);
  }

  console.log("🔒 FOXBET WEBAPP COMPLETELY LOCKED DOWN");
}

// --- CORE LOGIC FUNCTIONS ---
/**
 * Parses user profile information from URL parameters and updates the UI.
 * This is used to display the user's name and link to their Telegram profile.
 */
function parseProfileFromUrl() {
  const userName = getParam("us");
  const userId = getParam("i");
  const telegramLinkHandle = getParam("lk");
  const profileButton = document.getElementById("profileBtn");
  const profileInfoContainer = document.getElementById("profileInfo");
  const profileNameElement = document.getElementById("profileName");
  const profileIdElement = document.getElementById("profileId");
  if (userId && userName && telegramLinkHandle) {
    const telegramProfileUrl = "https://t.me/" + telegramLinkHandle;
    if (profileButton) profileButton.setAttribute("href", telegramProfileUrl);
    if (profileNameElement) profileNameElement.textContent = userName;
    if (profileIdElement) profileIdElement.style.display = "none"; // The user ID is received but hidden from the UI
    if (profileInfoContainer) profileInfoContainer.style.display = "block";
  }
}

/**
 * Applies translations to the page based on the provided language code.
 * @param {string} langCode The language code (e.g., 'fr', 'en').
 */
function applyTranslations(langCode) {
  const selectedTranslations = translations[langCode] || translations.fr; // Default to French

  const elements = [
    { id: "page-title", text: selectedTranslations.pageTitle },
    { id: "brand-name", text: selectedTranslations.brandName },
    { id: "sidebar-title", text: selectedTranslations.sidebarTitle },
    { id: "games-title", text: selectedTranslations.gamesTitle },
    { id: "loadingText", text: selectedTranslations.loadingText },
  ];

  elements.forEach(({ id, text }) => {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
  });

  // Update dark/light mode text based on current mode
  const modeTextElement = document.getElementById("modeText");
  if (modeTextElement) {
    const isDarkMode = document.body.classList.contains("dark-mode");
    modeTextElement.textContent = isDarkMode
      ? selectedTranslations.modeDark
      : selectedTranslations.modeLight;
  }
}

/**
 * Checks if a language is set in the URL. If not, it shows an error and redirects.
 * @returns {boolean} True if language is set, false otherwise.
 */
function checkLanguageAndRedirect() {
  const lang = getParam("lang");
  const telegramLinkHandle = getParam("lk");

  if (!lang) {
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingText = document.getElementById("loadingText");
    if (loadingText) loadingText.textContent = translations.fr.noLangError; // Show error in default language
    if (loadingOverlay) loadingOverlay.classList.add("active");

    // After a delay, redirect the user to their Telegram bot link
    setTimeout(() => {
      window.location.href = telegramLinkHandle
        ? `https://t.me/${telegramLinkHandle}`
        : "https://t.me/foxbet18_bot";
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
  const savedTheme = localStorage.getItem("theme") || "dark-mode"; // Default to dark mode
  const bodyElement = document.body;
  const modeTextElement = document.getElementById("modeText");
  const modeIcon = document.querySelector("#modeToggle i");
  const lang = getParam("lang") || "fr";
  const currentTranslations = translations[lang] || translations.fr;

  bodyElement.classList.remove("dark-mode", "light-mode");
  bodyElement.classList.add(savedTheme);

  if (modeTextElement) {
    if (savedTheme === "dark-mode") {
      modeTextElement.textContent = currentTranslations.modeDark;
      if (modeIcon) modeIcon.className = "fas fa-moon";
    } else {
      modeTextElement.textContent = currentTranslations.modeLight;
      if (modeIcon) modeIcon.className = "fas fa-sun";
    }
  }
}

/**
 * Saves the current theme to localStorage.
 * @param {string} theme The theme to save ('dark-mode' or 'light-mode').
 */
function saveMode(theme) {
  localStorage.setItem("theme", theme);
}

/**
 * Toggles the theme between dark and light mode and saves the preference.
 */
function toggleMode() {
  const bodyElement = document.body;
  const modeTextElement = document.getElementById("modeText");
  const modeIcon = document.querySelector("#modeToggle i");
  const lang = getParam("lang") || "fr";
  const currentTranslations = translations[lang] || translations.fr;

  if (bodyElement.classList.contains("dark-mode")) {
    bodyElement.classList.replace("dark-mode", "light-mode");
    if (modeTextElement)
      modeTextElement.textContent = currentTranslations.modeLight;
    if (modeIcon) modeIcon.className = "fas fa-sun";
    saveMode("light-mode");
  } else {
    bodyElement.classList.replace("light-mode", "dark-mode");
    if (modeTextElement)
      modeTextElement.textContent = currentTranslations.modeDark;
    if (modeIcon) modeIcon.className = "fas fa-moon";
    saveMode("dark-mode");
  }
}

/**
 * Displays the loading screen overlay.
 */
function showLoading() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (loadingOverlay) loadingOverlay.classList.add("active");
}

/**
 * Hides the loading screen overlay.
 */
function hideLoading() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (loadingOverlay) loadingOverlay.classList.remove("active");
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
  const gamesGridContainer = document.getElementById("gamesGrid");
  if (!gamesGridContainer) {
    console.log("❌ Games grid not found");
    return;
  }

  const lang = getParam("lang") || "fr";
  const currentTranslations = translations[lang] || translations.fr;

  console.log("🎮 Populating games...");
  gamesGridContainer.innerHTML = ""; // Clear existing content

  gamesData.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.className = "game-card";
    gameCard.onclick = (event) => handleGameClick(game.url, event);

    // Get the translated category name
    const categoryName =
      game.category === "1win bet"
        ? currentTranslations.category1win
        : currentTranslations.categoryOther;

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

  console.log("✅ Games populated successfully");
}

/**
 * Shows or hides the "Back to Top" button based on scroll position.
 */
function handleScroll() {
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    if (window.scrollY > 300) {
      // 300px
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  }
}

// ✅ MODIFIED: MAIN EXECUTION WITH LICENSE VALIDATION
// Run setup functions after the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚀 === FOXBET WEBAPP INITIALIZATION STARTING ===");
  console.log("📅 Time:", new Date().toISOString());
  console.log("🌐 URL:", window.location.href);
  console.log("🤖 Bot: @foxbet18_bot");
  console.log("🖥️  Backend URL:", BACKEND_URL);

  // Step 1: Check for language; stop if not present
  console.log("📋 Step 1: Language check");
  if (!checkLanguageAndRedirect()) {
    console.log("❌ Language check failed - stopping");
    return;
  }
  console.log("✅ Language check passed");

  // Step 2: Setup basic page features
  console.log("📋 Step 2: Basic setup");
  parseProfileFromUrl();
  loadMode();
  console.log("✅ Basic setup completed");

  // Step 3: ⚡ CRITICAL - Validate license BEFORE showing games
  console.log("📋 Step 3: LICENSE VALIDATION - THIS IS THE CRITICAL STEP");
  console.log("🔐 === STARTING LICENSE VALIDATION ===");

  const licenseValid = await validateUserLicense();

  console.log("📊 License validation result:", licenseValid);

  if (!licenseValid) {
    console.log("🚫 🚫 🚫 LICENSE VALIDATION FAILED - WEBAPP BLOCKED 🚫 🚫 🚫");
    console.log("⛔ STOPPING ALL EXECUTION - USER CANNOT ACCESS GAMES");
    return; // Stop execution completely if license is invalid
  }

  console.log(
    "✅ ✅ ✅ LICENSE VALIDATION PASSED - PROCEEDING TO LOAD GAMES ✅ ✅ ✅",
  );

  // Step 4: Only show games if license is valid
  console.log("📋 Step 4: Loading games (only reached if license is valid)");
  hideLoading();
  populateGames();
  console.log("✅ Games loaded");

  // Step 5: Add event listeners for UI elements (only if license is valid)
  console.log("📋 Step 5: Setting up event listeners");
  const modeToggleButton = document.getElementById("modeToggle");
  if (modeToggleButton) {
    modeToggleButton.addEventListener("click", (event) => {
      event.preventDefault();
      toggleMode();
    });
  }

  // Sidebar (Hamburger Menu) functionality
  const hamburgerButton = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const closeSidebarButton = document.getElementById("closeSidebar");
  const overlay = document.getElementById("overlay");

  const openSidebar = () => {
    if (sidebar) sidebar.classList.add("active");
    if (overlay) overlay.classList.add("active");
  };
  const closeSidebar = () => {
    if (sidebar) sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
  };

  if (hamburgerButton) hamburgerButton.addEventListener("click", openSidebar);
  if (closeSidebarButton)
    closeSidebarButton.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  // "Back to Top" button functionality
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("scroll", handleScroll);
  console.log("✅ Event listeners set up");

  console.log("🎉 === FOXBET WEBAPP FULLY LOADED AND SECURED ===");
  console.log("✅ User has valid license and can access games");
  console.log("🤖 Licensed via @foxbet18_bot");
});
