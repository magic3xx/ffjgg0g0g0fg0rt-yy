const translations = {
  fr: {
    pageTitle: "FOXBET",
    brandName: "FOXBET",
    sidebarTitle: "Menu",
    gamesTitle: "Nos Jeux",
    loadingText: "Vérification de votre licence...",
    noLangError: "Veuillez configurer la langue dans le bot avant de continuer",
    category1win: "1win bet",
    categoryOther: "Autres Bets",
    licenseExpired: "🔒 Votre licence a expiré",
    licenseExpiredMessage: "Votre accès Premium a expiré. Contactez l'administrateur pour renouveler votre licence.",
    contactAdmin: "Contacter l'administrateur",
    validatingLicense: "Vérification de votre licence...",
    licenseError: "Erreur de validation de licence",
  },
  en: {
    pageTitle: "FOXBET",
    brandName: "FOXBET",
    sidebarTitle: "Menu",
    gamesTitle: "Our Games",
    loadingText: "Validating your license...",
    noLangError: "Please configure the language in the bot before continuing",
    category1win: "1win bet",
    categoryOther: "Other Bets",
    licenseExpired: "🔒 Your License Has Expired",
    licenseExpiredMessage: "Your Premium access has expired. Please contact the administrator to renew your license.",
    contactAdmin: "Contact Administrator",
    validatingLicense: "Validating your license...",
    licenseError: "License validation error",
  },
  ru: {
    pageTitle: "FOXBET",
    brandName: "FOXBET",
    sidebarTitle: "Меню",
    gamesTitle: "Наши игры",
    loadingText: "Проверка вашей лицензии...",
    noLangError: "Пожалуйста, настройте язык в боте перед продолжением",
    category1win: "1win ставка",
    categoryOther: "Другие ставки",
    licenseExpired: "🔒 Срок действия вашей лицензии истек",
    licenseExpiredMessage: "Срок действия вашего Premium доступа истек. Обратитесь к администратору для продления лицензии.",
    contactAdmin: "Связаться с администратором",
    validatingLicense: "Проверка вашей лицензии...",
    licenseError: "Ошибка проверки лицензии",
  },
  ar: {
    pageTitle: "FOXBET",
    brandName: "FOXBET",
    sidebarTitle: "القائمة",
    gamesTitle: "ألعابنا",
    loadingText: "جارٍ التحقق من ترخيصك...",
    noLangError: "يرجى تهيئة اللغة في البوت قبل المتابعة",
    category1win: "رهان 1win",
    categoryOther: "رهانات أخرى",
    licenseExpired: "🔒 انتهت صلاحية ترخيصك",
    licenseExpiredMessage: "انتهت صلاحية وصولك المميز. يرجى الاتصال بالمشرف لتجديد ترخيصك.",
    contactAdmin: "اتصل بالمشرف",
    validatingLicense: "جارٍ التحقق من ترخيصك...",
    licenseError: "خطأ في التحقق من الترخيص",
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

// ✅ IMPORTANT: Your backend server URL
const BACKEND_URL = "https://multilingual-telegram-bot-w-431.created.app";

// Security state - NO ACCESS until validated
let licenseValidated = false;
let isValidating = false;

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
  const us = getParam("us");
  const i = getParam("i");
  const lk = getParam("lk");
  const params = new URLSearchParams();

  if (lang) params.append("lang", lang);
  if (us) params.append("us", us);
  if (i) params.append("i", i);
  if (lk) params.append("lk", lk);

  return gameUrl + (params.toString() ? "?" + params.toString() : "");
}

// ✅ NUCLEAR LICENSE VALIDATION - BLOCKS EVERYTHING
async function validateUserLicense() {
  if (isValidating) {
    console.log('🔄 License validation already in progress...');
    return false;
  }

  isValidating = true;
  let telegramId = getParam("i");
  const lang = getParam("lang") || "fr";
  const t = translations[lang] || translations.fr;

  console.log("🔍 === CRITICAL LICENSE VALIDATION STARTING ===");
  console.log("📋 Full URL:", window.location.href);
  console.log("🆔 Telegram ID from URL:", telegramId);
  console.log("🖥️ Backend URL:", BACKEND_URL);

  // STRICT ID VALIDATION
  if (!telegramId || telegramId === "" || telegramId === "null" || telegramId === "undefined") {
    console.log("❌ MISSING TELEGRAM ID - COMPLETE LOCKDOWN");
    showExpiredScreen(t.licenseError, "No user ID provided. Please use the bot to access games.", lang);
    return false;
  }

  const telegramIdInt = parseInt(telegramId);
  if (isNaN(telegramIdInt) || telegramIdInt <= 0) {
    console.log("❌ INVALID TELEGRAM ID FORMAT - COMPLETE LOCKDOWN");
    showExpiredScreen(t.licenseError, "Invalid user ID format", lang);
    return false;
  }

  try {
    console.log("📡 === CALLING YOUR BACKEND API ===");

    const apiUrl = `${BACKEND_URL}/api/check-license-validity`;
    console.log("🎯 API Endpoint:", apiUrl);

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

    if (!response.ok) {
      console.error("❌ API response not ok:", response.status);
      const errorText = await response.text();
      console.error("❌ Error response body:", errorText);
      throw new Error(`API returned ${response.status}: ${response.statusText} - ${errorText}`);
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

    // Check if license is valid - ULTRA STRICT validation
    if (data.success === true && data.valid === true) {
      console.log("✅ ✅ ✅ LICENSE IS VALID - ALLOWING ACCESS ✅ ✅ ✅");
      licenseValidated = true;
      return true;
    } else {
      // License is invalid/expired - TOTAL LOCKDOWN
      console.log("❌ ❌ ❌ LICENSE IS INVALID/EXPIRED - TOTAL LOCKDOWN ❌ ❌ ❌");
      console.log("🚫 Blocking reason:", data.message || data.error || "License validation failed");

      const message = data.message || data.error || t.licenseExpiredMessage;
      showExpiredScreen(t.licenseExpired, message, lang);
      return false;
    }
  } catch (error) {
    console.error("💥 === LICENSE VALIDATION ERROR ===");
    console.error("Error details:", error);

    let errorMessage = "Could not validate license with server. ";
    if (error.message.includes("Failed to fetch")) {
      errorMessage += "Network connection failed. Please check your internet connection.";
    } else if (error.message.includes("CORS")) {
      errorMessage += "CORS policy issue. Please check server configuration.";
    } else {
      errorMessage += error.message;
    }

    showExpiredScreen(t.licenseError, errorMessage, lang);
    return false;
  }
}

// COMPLETE PAGE LOCKDOWN - NO BYPASS POSSIBLE
function showExpiredScreen(title, message, lang) {
  const t = translations[lang] || translations.fr;
  const lk = getParam("lk");

  console.log("🔒 === SHOWING COMPLETE LOCKDOWN SCREEN ===");
  console.log("🚫 Title:", title);
  console.log("💬 Message:", message);

  // NUCLEAR OPTION: COMPLETELY REPLACE PAGE CONTENT
  document.body.innerHTML = `
    <div id="lockdownScreen" style="
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
        <div id="lockIcon" style="
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
          <p style="font-size: 16px; margin-bottom: 15px; opacity: 0.9;">🚫 Access Completely Blocked:</p>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin: 8px 0; font-size: 15px;">❌ License validation required</li>
            <li style="margin: 8px 0; font-size: 15px;">❌ No bypass methods available</li>
            <li style="margin: 8px 0; font-size: 15px;">❌ All game access denied</li>
            <li style="margin: 8px 0; font-size: 15px;">✅ Contact bot for valid license</li>
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
          🔄 Try Again
        </button>
        
        <a href="https://t.me/${lk || "admin"}" style="
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
          📞 ${t.contactAdmin}
        </a>
        
        <div style="
          margin-top: 30px; 
          font-size: 14px; 
          opacity: 0.7;
          border-top: 1px solid rgba(255,255,255,0.2);
          padding-top: 20px;
        ">
          © 2024 FOXBET - Ultra Secure License System<br/>
          🛡️ Zero tolerance security policy - No exceptions
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
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
        }
      </style>
    </div>
  `;

  // DISABLE ALL JAVASCRIPT EXECUTION
  console.log("🚫 DISABLING ALL FURTHER JAVASCRIPT EXECUTION");
  
  // Disable event listeners
  window.addEventListener = function () {};
  document.addEventListener = function () {};
  
  // Disable timers
  window.setTimeout = function () {};
  window.setInterval = function () {};
  
  // Clear all existing timers
  for (let i = 0; i < 10000; i++) {
    clearTimeout(i);
    clearInterval(i);
  }

  console.log("🔒 WEBAPP COMPLETELY LOCKED DOWN - NO ACCESS POSSIBLE");
}

// Show loading screen during validation
function showValidationScreen(lang) {
  const t = translations[lang] || translations.fr;
  
  document.body.innerHTML = `
    <div id="validationScreen" style="
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
    ">
      <div style="
        background: rgba(255,255,255,0.15);
        padding: 50px;
        border-radius: 25px;
        backdrop-filter: blur(15px);
        box-shadow: 0 25px 50px rgba(0,0,0,0.4);
        max-width: 500px;
        width: 100%;
        border: 1px solid rgba(255,255,255,0.2);
      ">
        <div id="loadingIcon" style="
          font-size: 60px;
          margin-bottom: 25px;
          animation: spin 2s linear infinite;
        ">🔍</div>
        <h2 style="margin: 0 0 20px 0; font-size: 24px;">${t.validatingLicense}</h2>
        <p style="margin: 0; font-size: 16px; opacity: 0.8;">Please wait while we verify your access...</p>
        
        <style>
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        </style>
      </div>
    </div>
  `;
}

// ONLY show games if license is validated
function showGamesInterface() {
  if (!licenseValidated) {
    console.log('🚫 Attempted to show games without license validation - BLOCKED');
    return;
  }

  const lang = getParam("lang") || "fr";
  const us = getParam("us");
  const t = translations[lang] || translations.fr;

  console.log('🎮 === SHOWING GAMES (LICENSE VALIDATED) ===');

  document.body.innerHTML = `
    <div style="
      min-height: 100vh; 
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); 
      color: white;
      font-family: Arial, sans-serif;
    ">
      <!-- Header -->
      <div style="
        padding: 20px; 
        text-align: center; 
        border-bottom: 2px solid #333;
      ">
        <h1 style="
          margin: 0; 
          font-size: 48px; 
          font-weight: bold; 
          background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        ">
          🦊 ${t.brandName}
        </h1>
        
        ${us ? `<div style="
          margin-top: 10px;
          background: rgba(255,255,255,0.1);
          padding: 10px 20px;
          border-radius: 20px;
          display: inline-block;
        ">
          👤 ${us}
        </div>` : ''}
      </div>

      <!-- Games Section -->
      <div style="padding: 40px 20px;">
        <h2 style="
          text-align: center; 
          font-size: 36px; 
          margin-bottom: 40px;
          color: #FF8E53;
        ">
          🎮 ${t.gamesTitle}
        </h2>
        
        <div id="gamesGrid" style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        ">
          <!-- Games will be populated here -->
        </div>
      </div>
      
      <!-- Footer -->
      <div style="
        text-align: center;
        padding: 30px 20px;
        border-top: 1px solid #333;
        margin-top: 40px;
        opacity: 0.7;
      ">
        <p style="margin: 0; font-size: 14px;">
          © 2024 FOXBET - Premium Gaming Platform<br/>
          🛡️ Protected by Advanced License System
        </p>
      </div>
    </div>
  `;

  // Populate games
  const gamesGrid = document.getElementById("gamesGrid");
  if (gamesGrid) {
    gamesData.forEach((game) => {
      const gameCard = document.createElement("div");
      gameCard.style.cssText = `
        background: rgba(255,255,255,0.1);
        border-radius: 15px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid rgba(255,255,255,0.2);
        backdrop-filter: blur(10px);
      `;

      const category = game.category === "1win bet" ? t.category1win : t.categoryOther;

      gameCard.innerHTML = `
        <div style="
          width: 100%;
          height: 180px;
          background-image: url('${game.image}');
          background-size: cover;
          background-position: center;
          border-radius: 10px;
          margin-bottom: 15px;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 15px;
            border-radius: 50%;
            font-size: 24px;
            opacity: 0.9;
          ">▶️</div>
        </div>
        
        <h3 style="
          margin: 0 0 10px 0; 
          font-size: 20px; 
          font-weight: bold;
        ">${game.name}</h3>
        
        <div style="
          background: ${game.category === "1win bet" ? '#FF6B6B' : '#4ECDC4'};
          color: white;
          padding: 5px 15px;
          border-radius: 15px;
          font-size: 14px;
          display: inline-block;
        ">${category}</div>
      `;

      // Add hover effects
      gameCard.addEventListener('mouseenter', () => {
        gameCard.style.transform = 'translateY(-5px) scale(1.02)';
        gameCard.style.boxShadow = '0 15px 30px rgba(0,0,0,0.4)';
        gameCard.style.background = 'rgba(255,255,255,0.15)';
      });

      gameCard.addEventListener('mouseleave', () => {
        gameCard.style.transform = 'translateY(0) scale(1)';
        gameCard.style.boxShadow = 'none';
        gameCard.style.background = 'rgba(255,255,255,0.1)';
      });

      // Add click handler
      gameCard.addEventListener('click', () => {
        if (licenseValidated) {
          window.location.href = getGameUrlWithParams(game.url);
        }
      });

      gamesGrid.appendChild(gameCard);
    });
  }
}

// MAIN INITIALIZATION - SECURITY FIRST
document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚀 === SECURE WEBAPP INITIALIZATION ===");
  console.log("📅 Time:", new Date().toISOString());
  console.log("🌐 URL:", window.location.href);

  // STEP 1: IMMEDIATELY HIDE ANY EXISTING CONTENT
  console.log("🔒 === HIDING ALL CONTENT IMMEDIATELY ===");
  document.body.style.display = 'none';

  const lang = getParam("lang");
  const lk = getParam("lk");

  // Step 2: Language check
  if (!lang) {
    console.log("❌ No language parameter - redirecting");
    document.body.style.display = 'block';
    setTimeout(() => {
      if (lk) {
        window.location.href = "https://t.me/" + lk;
      } else {
        window.location.href = "https://t.me/";
      }
      setTimeout(() => {
        window.close();
      }, 100);
    }, 2000);
    return;
  }

  // Step 3: Show validation screen
  document.body.style.display = 'block';
  showValidationScreen(lang);

  // Step 4: CRITICAL - Validate license
  console.log("🔐 === STARTING MANDATORY LICENSE VALIDATION ===");
  
  const licenseValid = await validateUserLicense();
  
  if (!licenseValid) {
    console.log("🚫 🚫 🚫 LICENSE VALIDATION FAILED - WEBAPP LOCKED 🚫 🚫 🚫");
    // showExpiredScreen already called in validateUserLicense
    return;
  }

  console.log("✅ ✅ ✅ LICENSE VALIDATED - SHOWING GAMES ✅ ✅ ✅");
  
  // Step 5: Only show games if license is valid
  showGamesInterface();
  
  console.log("🎉 === SECURE WEBAPP FULLY LOADED ===");
});
