// ✅ BACKEND CONFIGURATION - YOUR LICENSE SERVER
const BACKEND_URL = "https://multilingual-telegram-bot-w-431.created.app";

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
    'categoryOther': "Autres Bets",
    // ✅ ADDED: License validation messages
    'licenseExpired': "🔒 Votre licence a expiré",
    'licenseExpiredMessage': "Votre accès Premium a expiré. Contactez @foxbet18_bot pour renouveler votre licence.",
    'contactAdmin': "Contacter le Bot",
    'validatingLicense': "Vérification de votre licence...",
    'licenseError': "Erreur de validation de licence"
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
    'categoryOther': "Other Bets",
    // ✅ ADDED: License validation messages
    'licenseExpired': "🔒 Your License Has Expired",
    'licenseExpiredMessage': "Your Premium access has expired. Contact @foxbet18_bot to renew your license.",
    'contactAdmin': "Contact Bot",
    'validatingLicense': "Validating your license...",
    'licenseError': "License validation error"
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
    'categoryOther': "Другие ставки",
    // ✅ ADDED: License validation messages
    'licenseExpired': "🔒 Срок действия вашей лицензии истек",
    'licenseExpiredMessage': "Срок действия вашего Premium доступа истек. Обратитесь к @foxbet18_bot для продления лицензии.",
    'contactAdmin': "Связаться с ботом",
    'validatingLicense': "Проверка вашей лицензии...",
    'licenseError': "Ошибка проверки лицензии"
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
    'categoryOther': "رهانات أخرى",
    // ✅ ADDED: License validation messages
    'licenseExpired': "🔒 انتهت صلاحية ترخيصك",
    'licenseExpiredMessage': "انتهت صلاحية وصولك المميز. اتصل بـ @foxbet18_bot لتجديد ترخيصك.",
    'contactAdmin': "اتصل بالبوت",
    'validatingLicense': "جارٍ التحقق من ترخيصك...",
    'licenseError': "خطأ في التحقق من الترخيص"
  }
};

const gamesData = [
  {
    'name': "Lucky Jet",
    'url': 'home/LuckyJet/game.html',
    'image': "home/LuckyJet/Imogos/LuckyBases.jpg",
    'category': "1win bet"
  },
  {
    'name': "Aviator",
    'url': "home/Aviator/gameAvia.html",
    'image': "home/Aviator/logo/aviator-game.webp",
    'category': "Autres Bets"
  },
  {
    'name': "Apple of Fortune",
    'url': 'home/apple/applegame.html',
    'image': "home/apple/stelo/logo .jpg",
    'category': "Autres Bets"
  },
  {
    'name': "Gems Mines",
    'url': "home/grile/mines.html",
    'image': "home/grile/vision/BaseMines.jpg",
    'category': "Autres Bets"
  },
  {
    'name': "Dragons",
    'url': "home/Dragons/dragonS/game.html",
    'image': "home/Dragons/dragonS/imag/baseDragons.jpg",
    'category': "Autres Bets"
  },
  {
    'name': "Thimbles",
    'url': "home/boll/thimble.html",
    'image': "home/boll/imog/BaseThimbles.jpg",
    'category': "Autres Bets"
  },
  {
    'name': 'Swimp',
    'url': 'home/crapaud/swimp.html',
    'image': "home/crapaud/imago/baseCrap.jpg",
    'category': "Autres Bets"
  },
  {
    'name': "Crash",
    'url': "crash/crash.html",
    'image': "crash/vision/logo.jpg",
    'category': "Autres Bets"
  },
  {
    'name': "Mundial",
    'url': "home/Mundial/game.html",
    'image': "home/Mundial/imogs/BaseMond.jpeg",
    'category': "Autres Bets"
  },
  {
    'name': "Wild Gost",
    'url': "home/WildG/wild.html",
    'image': "home/WildG/imog/west logo.jpg",
    'category': "Autres Bets"
  }
];

function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

function getParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return sanitizeInput(urlParams.get(paramName) || '');
}

function getGameUrlWithParams(gameUrl) {
  const lang = getParam("lang");
  const username = getParam('us');
  const userId = getParam('i');
  const telegramLink = getParam('lk');
  const params = new URLSearchParams();
  
  if (lang) {
    params.append("lang", lang);
  }
  if (username) {
    params.append('us', username);
  }
  if (userId) {
    params.append('i', userId);
  }
  if (telegramLink) {
    params.append('lk', telegramLink);
  }
  
  return gameUrl + (params.toString() ? '?' + params.toString() : '');
}

// ✅ ADDED: LICENSE VALIDATION FUNCTION - CROSS-DOMAIN READY
async function validateUserLicense() {
  let telegramId = getParam("i");
  const lang = getParam("lang") || "fr";
  const t = translations[lang] || translations.fr;

  // COMPREHENSIVE DEBUG LOGGING
  console.log("🔍 === NETLIFY CROSS-DOMAIN LICENSE VALIDATION STARTING ===");
  console.log("📋 Full URL:", window.location.href);
  console.log("🆔 Telegram ID from URL:", telegramId);
  console.log("🌍 Language:", lang);
  console.log("🖥️  Backend URL:", BACKEND_URL);
  console.log("🌐 Current domain:", window.location.origin);
  console.log("🔗 Target domain:", BACKEND_URL);

  // Show validation message
  const loadingText = document.getElementById("loadingText");
  if (loadingText) {
    loadingText.textContent = t.validatingLicense;
  }

  // STRICT: Block access if no telegram ID provided - NO FALLBACKS
  if (!telegramId || telegramId === "" || telegramId === "null" || telegramId === "undefined") {
    console.log("❌ NO TELEGRAM ID PROVIDED - BLOCKING ACCESS");
    showExpiredScreen(t.licenseError, "Missing user ID. Please access through bot.", lang);
    return false;
  }

  // Convert to integer and validate
  const telegramIdInt = parseInt(telegramId);
  if (isNaN(telegramIdInt) || telegramIdInt <= 0) {
    console.log("❌ INVALID TELEGRAM ID FORMAT - BLOCKING ACCESS");
    showExpiredScreen(t.licenseError, "Invalid user ID format", lang);
    return false;
  }

  try {
    console.log("📡 === CALLING CROSS-DOMAIN LICENSE VALIDATION API ===");

    // ✅ CRITICAL: Use full URL for cross-domain calls
    const apiUrl = `${BACKEND_URL}/api/check-license-validity`;
    console.log("🎯 Cross-domain API Endpoint:", apiUrl);
    console.log("📤 Sending telegram_id:", telegramIdInt, "type:", typeof telegramIdInt);

    // FIRST: Test backend connectivity for cross-domain
    console.log("🧪 Testing cross-domain backend connectivity...");
    try {
      const testResponse = await fetch(`${BACKEND_URL}/api/test`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Cache-Control": "no-cache",
        },
        mode: "cors", // ✅ EXPLICIT CORS mode for cross-domain
        credentials: "omit", // ✅ Don't send credentials
      });
      console.log("🧪 Test API Status:", testResponse.status, testResponse.ok);
      console.log("🧪 CORS headers received:", testResponse.headers.has('access-control-allow-origin'));
      
      if (testResponse.ok) {
        const testData = await testResponse.json();
        console.log("🧪 Cross-domain connectivity: SUCCESS");
        console.log("🧪 Test API Response:", testData);
      }
    } catch (testError) {
      console.error("🚨 Cross-domain connectivity test FAILED:", testError);
      console.error("🚨 Error type:", testError.name);
      console.error("🚨 Error message:", testError.message);
      
      let errorMsg = "Cannot connect to license server.";
      if (testError.name === "TypeError" && testError.message.includes("fetch")) {
        errorMsg += " CORS policy may be blocking cross-domain requests.";
      } else if (testError.message.includes("CORS")) {
        errorMsg += " CORS configuration issue detected.";
      } else {
        errorMsg += ` Network error: ${testError.message}`;
      }
      
      showExpiredScreen(t.licenseError, errorMsg, lang);
      return false;
    }

    const requestBody = { telegram_id: telegramIdInt };
    console.log("📦 Request body:", JSON.stringify(requestBody, null, 2));

    // ✅ CROSS-DOMAIN API CALL with comprehensive CORS handling
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(requestBody),
      mode: "cors", // ✅ EXPLICIT CORS mode
      credentials: "omit", // ✅ Don't send credentials for cross-domain
      referrer: "no-referrer", // ✅ Don't send referrer for privacy
    });

    console.log("📥 === CROSS-DOMAIN API RESPONSE ===");
    console.log("🔢 Status:", response.status, response.statusText);
    console.log("✅ Response OK:", response.ok);
    console.log("🌐 CORS Headers Present:", response.headers.has('access-control-allow-origin'));
    console.log("🔗 CORS Origin Header:", response.headers.get('access-control-allow-origin'));
    console.log("🔄 CORS Methods:", response.headers.get('access-control-allow-methods'));

    if (!response.ok) {
      console.error("❌ Cross-domain API response not ok:", response.status);
      let errorText = "";
      try {
        errorText = await response.text();
        console.error("❌ Error response body:", errorText);
      } catch (textError) {
        console.error("❌ Could not read error response:", textError);
      }
      
      // Enhanced error handling for CORS and network issues
      let errorMessage;
      if (response.status === 0) {
        errorMessage = "Network request failed. Likely CORS or connectivity issue.";
      } else if (response.status === 404) {
        errorMessage = "License validation API not found on server.";
      } else if (response.status === 500) {
        errorMessage = "Server error during license validation.";
      } else if (response.status >= 400 && response.status < 500) {
        errorMessage = `Client error: ${response.status} - ${response.statusText}`;
      } else {
        errorMessage = `Server error: ${response.status} - ${response.statusText}`;
      }
      
      showExpiredScreen(t.licenseError, errorMessage, lang);
      return false;
    }

    const data = await response.json();
    console.log("📊 Cross-domain response data:", JSON.stringify(data, null, 2));

    // ULTRA-STRICT DECISION LOGIC - ZERO TOLERANCE
    console.log("🎯 === ULTRA-STRICT CROSS-DOMAIN LICENSE DECISION ===");
    console.log("✅ data.success:", data.success);
    console.log("✅ data.valid:", data.valid);
    console.log("❌ data.expired:", data.expired);
    console.log("📅 data.expires_at:", data.expires_at);
    console.log("💬 data.message:", data.message);
    console.log("⚠️  data.error:", data.error);

    // ONLY allow access if license is EXPLICITLY valid and NOT expired
    if (data.success === true && data.valid === true && data.expired !== true) {
      console.log("✅ ✅ ✅ CROSS-DOMAIN: LICENSE IS VALID AND NOT EXPIRED - ALLOWING ACCESS ✅ ✅ ✅");
      return true;
    } else {
      // License is invalid/expired - COMPLETE LOCKDOWN
      console.log("❌ ❌ ❌ CROSS-DOMAIN: LICENSE IS INVALID/EXPIRED - TOTAL LOCKDOWN ❌ ❌ ❌");
      console.log("🚫 Blocking reason:", data.message || data.error || "License validation failed");

      const message = data.message || data.error || t.licenseExpiredMessage;
      showExpiredScreen(t.licenseExpired, message, lang);
      return false;
    }
  } catch (error) {
    console.error("💥 === CROSS-DOMAIN LICENSE VALIDATION ERROR ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Comprehensive error handling for cross-domain scenarios
    let errorMessage = "Cross-domain license validation failed. Access denied.";
    
    if (error.name === "TypeError") {
      if (error.message.includes("Failed to fetch")) {
        errorMessage = "Network error or CORS policy blocking cross-domain request. Cannot connect to license server.";
      } else if (error.message.includes("NetworkError")) {
        errorMessage = "Network error during cross-domain license validation. Check internet connection.";
      } else {
        errorMessage = `Cross-domain request failed: ${error.message}`;
      }
    } else if (error.message.includes("CORS") || error.message.includes("cors")) {
      errorMessage = "CORS policy blocking cross-domain license validation. Server configuration issue.";
    } else if (error.message.includes("blocked")) {
      errorMessage = "Cross-domain request blocked by browser security policy.";
    } else if (error.name === "AbortError") {
      errorMessage = "License validation request timed out or was aborted.";
    } else {
      errorMessage = `Cross-domain validation error: ${error.message}. Access denied.`;
    }

    console.log("🚫 SECURITY FIRST: Blocking cross-domain access due to validation error");
    showExpiredScreen(t.licenseError, errorMessage, lang);
    return false;
  }
}

// ✅ ADDED: EXPIRED SCREEN FUNCTION
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

function parseProfileFromUrl() {
  const username = getParam('us');
  const userId = getParam('i');
  const telegramLink = getParam('lk');
  const profileBtn = document.getElementById("profileBtn");
  const profileInfo = document.getElementById("profileInfo");
  const profileName = document.getElementById("profileName");
  const profileId = document.getElementById("profileId");
  
  if (userId && username && telegramLink) {
    const telegramUrl = "https://t.me/" + telegramLink;
    if (profileBtn) profileBtn.setAttribute("href", telegramUrl);
    if (profileName) profileName.textContent = username;
    if (profileId) profileId.style.display = 'none'; // Hides the user ID display
    if (profileInfo) profileInfo.style.display = 'block';
  }
}

function applyTranslations(language) {
  const translation = translations[language] || translations.fr; // ✅ FIXED: Syntax error
  
  const pageTitle = document.getElementById("page-title");
  const brandName = document.getElementById("brand-name");
  const sidebarTitle = document.getElementById("sidebar-title");
  const gamesTitle = document.getElementById('games-title');
  const loadingText = document.getElementById('loadingText');
  
  if (pageTitle) pageTitle.textContent = translation.pageTitle;
  if (brandName) brandName.textContent = translation.brandName;
  if (sidebarTitle) sidebarTitle.textContent = translation.sidebarTitle;
  if (gamesTitle) gamesTitle.textContent = translation.gamesTitle;
  if (loadingText) loadingText.textContent = translation.loadingText;
  
  const modeText = document.getElementById("modeText");
  if (modeText) {
    modeText.textContent = document.body.classList.contains('dark-mode') 
      ? translation.modeDark 
      : translation.modeLight;
  }
}

function checkLanguageAndRedirect() {
  const language = getParam("lang");
  const telegramLink = getParam('lk');
  
  if (!language) {
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingText = document.getElementById("loadingText");
    
    if (loadingText) loadingText.textContent = translations.fr.noLangError;
    if (loadingOverlay) loadingOverlay.classList.add('active');
    
    setTimeout(() => {
      if (telegramLink) {
        window.location.href = "https://t.me/" + telegramLink;
      } else {
        window.location.href = 'https://t.me/foxbet18_bot';
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
  const savedTheme = localStorage.getItem('theme') || "dark-mode";
  const body = document.body;
  const modeText = document.getElementById("modeText");
  const modeIcon = document.querySelector("#modeToggle i");
  const language = getParam("lang") || 'fr';
  const translation = translations[language] || translations.fr; // ✅ FIXED: Syntax error
  
  body.classList.remove("dark-mode", 'light-mode');
  body.classList.add(savedTheme);
  if (modeText) modeText.textContent = savedTheme === 'dark-mode' ? translation.modeDark : translation.modeLight;
  if (modeIcon) modeIcon.className = savedTheme === "dark-mode" ? "fas fa-moon" : "fas fa-sun";
}

function saveMode(mode) {
  localStorage.setItem('theme', mode);
}

function toggleMode() {
  const body = document.body;
  const modeText = document.getElementById('modeText');
  const modeIcon = document.querySelector("#modeToggle i");
  const language = getParam("lang") || 'fr';
  const translation = translations[language] || translations.fr; // ✅ FIXED: Syntax error
  
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    if (modeText) modeText.textContent = translation.modeLight;
    if (modeIcon) modeIcon.className = "fas fa-sun";
    saveMode("light-mode");
  } else {
    body.classList.remove('light-mode');
    body.classList.add("dark-mode");
    if (modeText) modeText.textContent = translation.modeDark;
    if (modeIcon) modeIcon.className = "fas fa-moon";
    saveMode('dark-mode');
  }
}

function showLoading() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (loadingOverlay) loadingOverlay.classList.add("active");
}

function hideLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) loadingOverlay.classList.remove("active");
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
  if (!gamesGrid) {
    console.log("❌ Games grid not found");
    return;
  }
  
  const language = getParam("lang") || 'fr';
  const translation = translations[language] || translations.fr; // ✅ FIXED: Syntax error
  
  console.log("🎮 Populating games...");
  gamesGrid.innerHTML = '';
  
  gamesData.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = "game-card";
    gameCard.onclick = event => handleGameClick(game.url, event);
    
    const categoryText = game.category === "1win bet" 
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
  
  console.log("✅ Games populated successfully");
}

function handleScroll() {
  const backToTopBtn = document.getElementById("backToTop");
  
  if (backToTopBtn) {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  }
}

// ✅ MODIFIED: Main initialization WITH LICENSE VALIDATION
document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 === NETLIFY FOXBET WEBAPP INITIALIZATION STARTING ===");
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

  console.log("✅ ✅ ✅ LICENSE VALIDATION PASSED - PROCEEDING TO LOAD GAMES ✅ ✅ ✅");

  // Step 4: Only show games if license is valid
  console.log("📋 Step 4: Loading games (only reached if license is valid)");
  hideLoading();
  populateGames();
  console.log("✅ Games loaded");

  // Step 5: Add event listeners for UI elements (only if license is valid)
  console.log("📋 Step 5: Setting up event listeners");
  
  // Mode toggle event
  const modeToggle = document.getElementById('modeToggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', event => {
      event.preventDefault();
      toggleMode();
    });
  }
  
  // Sidebar navigation
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");
  const overlay = document.getElementById('overlay');
  
  if (hamburgerBtn && sidebar && overlay) {
    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.add("active");
      overlay.classList.add("active");
    });
  }
  
  if (closeSidebar && sidebar && overlay) {
    closeSidebar.addEventListener('click', () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  }
  
  if (overlay && sidebar) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  }
  
  // Back to top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        'top': 0,
        'behavior': "smooth"
      });
    });
  }
  
  window.addEventListener("scroll", handleScroll);
  console.log("✅ Event listeners set up");

  console.log("🎉 === NETLIFY FOXBET WEBAPP FULLY LOADED AND SECURED ===");
  console.log("✅ User has valid license and can access games");
  console.log("🤖 Licensed via @foxbet18_bot");
});
