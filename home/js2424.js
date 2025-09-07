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
    'licenseExpired': "🔒 Votre Licence a Expiré",
    'licenseExpiredMessage': "Votre accès Premium a expiré. Contactez l'administrateur pour renouveler votre licence.",
    'contactAdmin': "Contacter l'administrateur",
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
    'licenseExpired': "🔒 Your License Has Expired",
    'licenseExpiredMessage': "Your Premium access has expired. Please contact the administrator to renew your license.",
    'contactAdmin': "Contact Administrator",
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
    'licenseExpired': "🔒 Срок действия вашей лицензии истек",
    'licenseExpiredMessage': "Срок действия вашего Premium доступа истек. Обратитесь к администратору для продления лицензии.",
    'contactAdmin': "Связаться с администратором",
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
    'licenseExpired': "🔒 انتهت صلاحية ترخيصك",
    'licenseExpiredMessage': "انتهت صلاحية وصولك المميز. يرجى الاتصال بالمشرف لتجديد ترخيصك.",
    'contactAdmin': "اتصل بالمشرف",
    'validatingLicense': "جارٍ التحقق من ترخيصك...",
    'licenseError': "خطأ في التحقق من الترخيص"
  }
};

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
  const us = getParam('us');
  const i = getParam('i');
  const lk = getParam('lk');
  const params = new URLSearchParams();
  
  if (lang) params.append("lang", lang);
  if (us) params.append('us', us);
  if (i) params.append('i', i);
  if (lk) params.append('lk', lk);
  
  return gameUrl + (params.toString() ? '?' + params.toString() : '');
}

function parseProfileFromUrl() {
  const us = getParam('us');
  const i = getParam('i');
  const lk = getParam('lk');
  const profileBtn = document.getElementById("profileBtn");
  const profileInfo = document.getElementById("profileInfo");
  const profileName = document.getElementById('profileName');
  const profileId = document.getElementById("profileId");
  
  if (i && us && lk) {
    const telegramUrl = "https://t.me/" + lk;
    if (profileBtn) profileBtn.setAttribute("href", telegramUrl);
    if (profileName) profileName.textContent = us;
    if (profileId) profileId.style.display = 'none';
    if (profileInfo) profileInfo.style.display = 'block';
  }
}

// ✅ CRITICAL: Real-time license validation with your bot database
async function validateUserLicense() {
  const telegramId = getParam('i');
  const lang = getParam("lang") || 'fr';
  const t = translations[lang] || translations.fr;
  
  // COMPREHENSIVE DEBUG LOGGING
  console.log('🔍 === LICENSE VALIDATION STARTING ===');
  console.log('📋 Full URL:', window.location.href);
  console.log('🆔 Telegram ID from URL:', telegramId);
  console.log('🌍 Language:', lang);
  
  // Check if telegram ID is valid
  if (!telegramId || telegramId === '' || telegramId === 'null' || telegramId === 'undefined') {
    console.log('❌ INVALID TELEGRAM ID - BLOCKING ACCESS');
    showExpiredScreen(t.licenseError, "No valid user ID provided", lang);
    return false;
  }
  
  // Convert to integer and validate
  const telegramIdInt = parseInt(telegramId);
  if (isNaN(telegramIdInt) || telegramIdInt <= 0) {
    console.log('❌ INVALID TELEGRAM ID FORMAT - BLOCKING ACCESS');
    showExpiredScreen(t.licenseError, "Invalid user ID format", lang);
    return false;
  }
  
  // Show validation message
  const loadingText = document.getElementById("loadingText");
  if (loadingText) {
    loadingText.textContent = t.validatingLicense;
  }
  
  try {
    console.log('📡 === MAKING API CALL TO YOUR BOT SYSTEM ===');
    console.log('🎯 API Endpoint: /api/check-license-validity');
    console.log('📤 Sending telegram_id:', telegramIdInt);
    
    const requestBody = { telegram_id: telegramIdInt };
    console.log('📦 Request body:', JSON.stringify(requestBody, null, 2));
    
    // CRITICAL: This connects to your bot's license checking system
    const response = await fetch('/api/check-license-validity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log('📥 === API RESPONSE ===');
    console.log('🔢 Status:', response.status, response.statusText);
    console.log('✅ Response OK:', response.ok);
    
    if (!response.ok) {
      console.error('❌ API response not ok:', response.status);
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('📊 Response data:', JSON.stringify(data, null, 2));
    
    // CRITICAL DECISION LOGIC - CONNECTS TO YOUR BOT DATABASE
    console.log('🎯 === LICENSE VALIDATION DECISION ===');
    console.log('✅ data.success:', data.success);
    console.log('✅ data.valid:', data.valid);
    console.log('❌ data.expired:', data.expired);
    console.log('📅 data.expires_at:', data.expires_at);
    console.log('💬 data.message:', data.message);
    
    // Check if license is valid - STRICT validation
    if (data.success === true && data.valid === true) {
      console.log('✅ ✅ ✅ LICENSE IS VALID - ALLOWING ACCESS ✅ ✅ ✅');
      return true;
    } else {
      // License is invalid/expired - BLOCK ACCESS
      console.log('❌ ❌ ❌ LICENSE IS INVALID/EXPIRED - BLOCKING ACCESS ❌ ❌ ❌');
      console.log('🚫 Blocking reason:', data.message || data.error || 'License validation failed');
      
      const message = data.message || data.error || t.licenseExpiredMessage;
      showExpiredScreen(t.licenseExpired, message, lang);
      return false;
    }
    
  } catch (error) {
    console.error('💥 === LICENSE VALIDATION ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    
    showExpiredScreen(t.licenseError, "Could not validate license: " + error.message, lang);
    return false;
  }
}

// ✅ CRITICAL: Show expired license screen - COMPLETELY BLOCKS webapp
function showExpiredScreen(title, message, lang) {
  const t = translations[lang] || translations.fr;
  const lk = getParam('lk');
  
  console.log('🔒 === SHOWING EXPIRED SCREEN ===');
  console.log('🚫 Title:', title);
  console.log('💬 Message:', message);
  console.log('🌍 Language:', lang);
  
  // COMPLETELY REPLACE PAGE CONTENT - NO ACCESS TO GAMES
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
            <li style="margin: 8px 0; font-size: 15px;">❌ Account verification failed</li>
          </ul>
        </div>
        
        <a href="https://t.me/${lk || 'admin'}" style="
          display: inline-block;
          background: linear-gradient(45deg, #FF6B6B, #FF8E53);
          color: white;
          padding: 15px 35px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 700;
          font-size: 18px;
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
          © 2024 FOXBET - Protected by Advanced License System<br/>
          🛡️ Unauthorized access attempts are logged and monitored
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
  console.log('🚫 DISABLING ALL FURTHER JAVASCRIPT EXECUTION');
  
  // Disable all event listeners
  window.addEventListener = function() {};
  document.addEventListener = function() {};
  
  // Disable setTimeout/setInterval
  window.setTimeout = function() {};
  window.setInterval = function() {};
  
  // Remove all existing intervals/timeouts
  for(let i = 0; i < 10000; i++) {
    clearTimeout(i);
    clearInterval(i);
  }
  
  console.log('🔒 WEBAPP COMPLETELY LOCKED DOWN');
}

function applyTranslations(lang) {
  const t = translations[lang] || translations.fr;
  const elements = {
    "page-title": t.pageTitle,
    "brand-name": t.brandName,
    "sidebar-title": t.sidebarTitle,
    "games-title": t.gamesTitle,
    "loadingText": t.loadingText
  };
  
  Object.entries(elements).forEach(([id, text]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  });
  
  const modeText = document.getElementById("modeText");
  if (modeText) {
    modeText.textContent = document.body.classList.contains('dark-mode') ? t.modeDark : t.modeLight;
  }
}

function checkLanguageAndRedirect() {
  const lang = getParam("lang");
  const lk = getParam('lk');
  
  console.log('🌍 Language check:', lang);
  
  if (!lang) {
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingText = document.getElementById("loadingText");
    if (loadingText) {
      loadingText.textContent = translations.fr.noLangError;
    }
    if (loadingOverlay) {
      loadingOverlay.classList.add('active');
    }
    
    setTimeout(() => {
      if (lk) {
        window.location.href = "https://t.me/" + lk;
      } else {
        window.location.href = 'https://t.me/';
      }
      setTimeout(() => {
        window.close();
      }, 100);
    }, 2000);
    return false;
  }
  
  applyTranslations(lang);
  return true;
}

function loadMode() {
  const theme = localStorage.getItem('theme') || "dark-mode";
  const body = document.body;
  const modeText = document.getElementById("modeText");
  const modeIcon = document.querySelector("#modeToggle i");
  const lang = getParam("lang") || 'fr';
  const t = translations[lang] || translations.fr;
  
  body.classList.remove("dark-mode", 'light-mode');
  body.classList.add(theme);
  
  if (modeText) {
    modeText.textContent = theme === 'dark-mode' ? t.modeDark : t.modeLight;
  }
  if (modeIcon) {
    modeIcon.className = theme === "dark-mode" ? "fas fa-moon" : "fas fa-sun";
  }
}

function saveMode(theme) {
  localStorage.setItem('theme', theme);
}

function toggleMode() {
  const body = document.body;
  const modeText = document.getElementById('modeText');
  const modeIcon = document.querySelector("#modeToggle i");
  const lang = getParam("lang") || 'fr';
  const t = translations[lang] || translations.fr;
  
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    if (modeText) modeText.textContent = t.modeLight;
    if (modeIcon) modeIcon.className = "fas fa-sun";
    saveMode("light-mode");
  } else {
    body.classList.remove('light-mode');
    body.classList.add("dark-mode");
    if (modeText) modeText.textContent = t.modeDark;
    if (modeIcon) modeIcon.className = "fas fa-moon";
    saveMode('dark-mode');
  }
}

function showLoading() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (loadingOverlay) {
    loadingOverlay.classList.add("active");
  }
}

function hideLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.remove("active");
  }
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
    console.log('❌ Games grid not found');
    return;
  }
  
  const lang = getParam("lang") || 'fr';
  const t = translations[lang] || translations.fr;
  
  console.log('🎮 Populating games...');
  gamesGrid.innerHTML = '';
  
  gamesData.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = "game-card";
    gameCard.onclick = event => handleGameClick(game.url, event);
    
    const category = game.category === "1win bet" ? t.category1win : t.categoryOther;
    
    gameCard.innerHTML = `
      <div class="game-image" style="background-image: url('${game.image}');">
        <div class="game-overlay">
          <div class="play-btn" aria-label="Jouer à ${game.name}">
            <i class="fas fa-play"></i>
          </div>
        </div>
      </div>
      <div class="game-info">
        <div class="game-name">${game.name}</div>
        <div class="game-category">${category}</div>
      </div>
    `;
    
    gamesGrid.appendChild(gameCard);
  });
  
  console.log('✅ Games populated successfully');
}

function handleScroll() {
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  }
}

// ✅ MAIN INITIALIZATION - License validation FIRST!
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 === WEBAPP INITIALIZATION STARTING ===');
  console.log('📅 Time:', new Date().toISOString());
  console.log('🌐 URL:', window.location.href);
  
  // Step 1: Check language
  console.log('📋 Step 1: Language check');
  if (!checkLanguageAndRedirect()) {
    console.log('❌ Language check failed - stopping');
    return;
  }
  console.log('✅ Language check passed');
  
  // Step 2: Basic setup
  console.log('📋 Step 2: Basic setup');
  parseProfileFromUrl();
  loadMode();
  console.log('✅ Basic setup completed');
  
  // Step 3: ⚡ CRITICAL - Validate license BEFORE showing anything
  console.log('📋 Step 3: LICENSE VALIDATION - CONNECTS TO YOUR BOT DATABASE');
  console.log('🔐 === STARTING REAL-TIME LICENSE VALIDATION ===');
  
  const licenseValid = await validateUserLicense();
  
  console.log('📊 License validation result:', licenseValid);
  
  if (!licenseValid) {
    console.log('🚫 🚫 🚫 LICENSE VALIDATION FAILED - WEBAPP BLOCKED 🚫 🚫 🚫');
    console.log('⛔ STOPPING ALL EXECUTION - USER CANNOT ACCESS GAMES');
    return; // Stop execution completely if license is invalid
  }
  
  console.log('✅ ✅ ✅ LICENSE VALIDATION PASSED - PROCEEDING TO LOAD GAMES ✅ ✅ ✅');
  
  // Step 4: Only show games if license is valid
  console.log('📋 Step 4: Loading games (only reached if license is valid)');
  hideLoading();
  populateGames();
  console.log('✅ Games loaded');
  
  // Step 5: Setup event listeners
  console.log('📋 Step 5: Setting up event listeners');
  const modeToggle = document.getElementById('modeToggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', event => {
      event.preventDefault();
      toggleMode();
    });
  }
  
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");
  const overlay = document.getElementById('overlay');
  
  if (hamburgerBtn && sidebar) {
    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.add("active");
      if (overlay) overlay.classList.add("active");
    });
  }
  
  if (closeSidebar && sidebar) {
    closeSidebar.addEventListener('click', () => {
      sidebar.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
    });
  }
  
  if (overlay && sidebar) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  }
  
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
  console.log('✅ Event listeners set up');
  
  console.log('🎉 === WEBAPP FULLY LOADED AND SECURED ===');
  console.log('✅ User has valid license and can access games');
});
