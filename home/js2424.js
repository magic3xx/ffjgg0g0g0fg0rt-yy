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
    'licenseExpired': "🔒 انتهت صلاحية ترخيصك",
    'licenseExpiredMessage': "انتهت صلاحية وصولك المميز. اتصل بـ @foxbet18_bot لتجديد ترخيصك.",
    'contactAdmin': "اتصل بالبوت",
    'validatingLicense': "جارٍ التحقق من ترخيصك...",
    'licenseError': "خطأ في التحقق من الترخيص"
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
  
  if (lang) params.append("lang", lang);
  if (username) params.append('us', username);
  if (userId) params.append('i', userId);
  if (telegramLink) params.append('lk', telegramLink);
  
  return gameUrl + (params.toString() ? '?' + params.toString() : '');
}


async function validateUserLicense() {
  let telegramId = getParam("i");
  const lang = getParam("lang") || "fr";
  const t = translations[lang] || translations.fr;

  console.log("🔍 === NETLIFY LICENSE VALIDATION STARTING ===");
  const loadingText = document.getElementById("loadingText");
  if (loadingText) {
    loadingText.textContent = t.validatingLicense;
  }

  if (!telegramId || telegramId === "" || telegramId === "null" || telegramId === "undefined") {
    showExpiredScreen(t.licenseError, "Missing user ID. Please access through bot.", lang);
    return false;
  }

  const telegramIdInt = parseInt(telegramId);
  if (isNaN(telegramIdInt) || telegramIdInt <= 0) {
    showExpiredScreen(t.licenseError, "Invalid user ID format", lang);
    return false;
  }

  try {
    console.log("📡 === CALLING MAIN LICENSE VALIDATION API ===");
    const apiUrl = `${BACKEND_URL}/api/check-license-validity`;
    const requestBody = { telegram_id: telegramIdInt };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(requestBody),
      mode: "cors",
      credentials: "omit",
      referrer: "no-referrer",
    });
    
    console.log("📊 API Response Status:", response.status);

    if (!response.ok) {
      let errorText = `Server responded with status: ${response.status}`;
      try {
        const data = await response.json();
        console.error("📊 Error Response Body:", data);
        errorText = data.message || data.error || errorText;
      } catch (e) {
        // Could not parse JSON, use the status text.
        errorText = `Server error: ${response.status} ${response.statusText}`;
      }
      showExpiredScreen(t.licenseError, errorText, lang);
      return false;
    }

    const data = await response.json();
    console.log("📊 License validation data:", JSON.stringify(data, null, 2));

    if (data.success === true && data.valid === true && data.expired !== true) {
      console.log("✅ LICENSE IS VALID - ALLOWING ACCESS");
      return true;
    } else {
      const message = data.message || data.error || t.licenseExpiredMessage;
      showExpiredScreen(t.licenseExpired, message, lang);
      return false;
    }
  } catch (error) {
    console.error("💥 === LICENSE VALIDATION FETCH ERROR ===", error);
    let errorMessage = "Cannot connect to license server. Please check your connection.";
    if (error.name === "TypeError") {
      errorMessage = "Connection to the license server was blocked. This may be a CORS or network issue.";
    }
    showExpiredScreen(t.licenseError, errorMessage, lang);
    return false;
  }
}

function showExpiredScreen(title, message, lang) {
  const t = translations[lang] || translations.fr;

  console.log("🔒 === SHOWING EXPIRED SCREEN ===");
  console.log("🚫 Title:", title);
  console.log("💬 Message:", message);

  document.body.innerHTML = `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%); color: white; text-align: center; padding: 20px; font-family: Arial, sans-serif; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999999; overflow: hidden;">
      <div style="background: rgba(255,255,255,0.15); padding: 50px; border-radius: 25px; backdrop-filter: blur(15px); box-shadow: 0 25px 50px rgba(0,0,0,0.4); max-width: 600px; width: 100%; border: 1px solid rgba(255,255,255,0.2); animation: slideIn 0.5s ease-out;">
        <div style="font-size: 100px; margin-bottom: 25px; animation: lockPulse 2s infinite; text-shadow: 0 0 20px rgba(255,255,255,0.5);">🔒</div>
        <h1 style="margin: 0 0 25px 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${title}</h1>
        <p style="margin: 0 0 30px 0; font-size: 18px; line-height: 1.6; opacity: 0.95; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">${message}</p>
        <div style="margin-bottom: 30px; background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.2);">
          <p style="font-size: 16px; margin-bottom: 15px; opacity: 0.9;">🚫 Access Denied Because:</p>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin: 8px 0; font-size: 15px;">❌ License has expired</li>
            <li style="margin: 8px 0; font-size: 15px;">❌ No valid Premium subscription</li>
            <li style="margin: 8px 0; font-size: 15px;">❌ Account verification required</li>
          </ul>
        </div>
        <button onclick="window.location.reload()" style="display: inline-block; background: linear-gradient(45deg, #4ECDC4, #45B7D1); color: white; padding: 15px 35px; border-radius: 30px; border: none; font-weight: 700; font-size: 16px; margin-right: 15px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 10px 20px rgba(78,205,196,0.4);">
          🔄 Retry
        </button>
        <a href="https://t.me/foxbet18_bot" style="display: inline-block; background: linear-gradient(45deg, #FF6B6B, #FF8E53); color: white; padding: 15px 35px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 16px; transition: all 0.3s ease; box-shadow: 0 10px 20px rgba(255,107,107,0.4); text-transform: uppercase; letter-spacing: 1px;">
          🤖 ${t.contactAdmin}
        </a>
        <div style="margin-top: 30px; font-size: 14px; opacity: 0.7; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px;">
          © 2024 FOXBET - Protected by License System<br/>
          🤖 Contact @foxbet18_bot for license activation
        </div>
      </div>
      <style>
        @keyframes lockPulse { 0% { transform: scale(1); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-50px); } to { opacity: 1; transform: translateY(0); } }
      </style>
    </div>
  `;
}

function parseProfileFromUrl() {
  const username = getParam('us');
  const userId = getParam('i');
  const telegramLink = getParam('lk');
  const profileBtn = document.getElementById("profileBtn");
  const profileInfo = document.getElementById("profileInfo");
  const profileName = document.getElementById("profileName");
  
  if (userId && username && telegramLink) {
    const telegramUrl = "https://t.me/" + telegramLink;
    if (profileBtn) profileBtn.setAttribute("href", telegramUrl);
    if (profileName) profileName.textContent = username;
    if (profileInfo) profileInfo.style.display = 'block';
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
  if (modeText) {
    modeText.textContent = document.body.classList.contains('dark-mode') 
      ? translation.modeDark 
      : translation.modeLight;
  }
}

function checkLanguageAndRedirect() {
  const language = getParam("lang");
  if (!language) {
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingText = document.getElementById("loadingText");
    if (loadingText) loadingText.textContent = translations.fr.noLangError;
    if (loadingOverlay) loadingOverlay.classList.add('active');
    
    setTimeout(() => {
        window.location.href = 'https://t.me/foxbet18_bot';
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
  const translation = translations[language] || translations.fr;
  
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
  const translation = translations[language] || translations.fr;
  
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
    window.location.href = getGameUrlWithParams(gameUrl);
  }, 1000); // Reduced delay for faster loading
}

function populateGames() {
  const gamesGrid = document.getElementById('gamesGrid');
  if (!gamesGrid) return;
  
  const language = getParam("lang") || 'fr';
  const translation = translations[language] || translations.fr;
  
  gamesGrid.innerHTML = gamesData.map(game => {
    const categoryText = game.category === "1win bet" ? translation.category1win : translation.categoryOther;
    return `
      <div class="game-card" onclick="handleGameClick('${game.url}', event)">
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
      </div>
    `;
  }).join('');
}

function handleScroll() {
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    backToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log("🚀 FOXBET WEBAPP INITIALIZING...");

  if (!checkLanguageAndRedirect()) {
    console.log("❌ Language missing. Halting execution.");
    return;
  }

  parseProfileFromUrl();
  loadMode();
  
  const licenseValid = await validateUserLicense();

  if (!licenseValid) {
    console.log("🚫 LICENSE INVALID. WEBAPP BLOCKED.");
    return;
  }

  console.log("✅ LICENSE VALID. Loading full app.");
  hideLoading();
  populateGames();

  // Setup Event Listeners
  document.getElementById('modeToggle')?.addEventListener('click', e => { e.preventDefault(); toggleMode(); });
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");
  const overlay = document.getElementById('overlay');
  
  const toggleSidebar = (active) => {
    sidebar.classList.toggle("active", active);
    overlay.classList.toggle("active", active);
  };

  hamburgerBtn?.addEventListener('click', () => toggleSidebar(true));
  closeSidebar?.addEventListener('click', () => toggleSidebar(false));
  overlay?.addEventListener('click', () => toggleSidebar(false));

  const backToTop = document.getElementById('backToTop');
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", handleScroll);

  console.log("🎉 FOXBET WEBAPP LOADED SUCCESSFULLY.");
});
