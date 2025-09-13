// --- TRANSLATIONS & GAME DATA ---
const translations = {
  'fr': {
    'pageTitle': "FOXBET", 'brandName': "FOXBET", 'sidebarTitle': 'Menu', 'modeDark': "Mode Sombre", 'modeLight': "Mode Clair", 'gamesTitle': "Nos Jeux", 'loadingText': "Chargement de votre jeu...", 'noLangError': "Veuillez configurer la langue dans le bot avant de continuer", 'category1win': "1win bet", 'categoryOther': "Autres Bets",
    'licenseTitle': "Activation Requise", 'licensePrompt': "Veuillez entrer votre clé de licence pour déverrouiller le contenu.", 'licensePlaceholder': "Entrez votre clé de licence", 'licenseButton': "Activer", 'licenseValidating': "Validation en cours...", 'licenseErrorUsed': "Cette clé de licence a déjà été utilisée.", 'licenseErrorInvalid': "Clé de licence invalide.",
    'timerExpiresIn': "Expire dans :" // New translation
  },
  'en': {
    'pageTitle': "FOXBET", 'brandName': "FOXBET", 'sidebarTitle': "Menu", 'modeDark': "Dark Mode", 'modeLight': "Light Mode", 'gamesTitle': "Our Games", 'loadingText': "Loading your game...", 'noLangError': "Please configure the language in the bot before continuing", 'category1win': "1win bet", 'categoryOther': "Other Bets",
    'licenseTitle': "Activation Required", 'licensePrompt': "Please enter your license key to unlock the content.", 'licensePlaceholder': "Enter your license key", 'licenseButton': "Activate", 'licenseValidating': "Validating...", 'licenseErrorUsed': "This license key has already been used.", 'licenseErrorInvalid': "Invalid license key.",
    'timerExpiresIn': "Expires in:" // New translation
  },
  'ru': {
    'pageTitle': "FOXBET", 'brandName': 'FOXBET', 'sidebarTitle': 'Меню', 'modeDark': "Тёмный режим", 'modeLight': "Светлый режим", 'gamesTitle': "Наши игры", 'loadingText': "Загрузка вашей игры...", 'noLangError': "Пожалуйста, настройте язык в боте перед продолжением", 'category1win': "1win ставка", 'categoryOther': "Другие ставки",
    'licenseTitle': "Требуется активация", 'licensePrompt': "Пожалуйста, введите ваш лицензионный ключ, чтобы разблокировать контент.", 'licensePlaceholder': "Введите ваш лицензионный ключ", 'licenseButton': "Активировать", 'licenseValidating': "Проверка...", 'licenseErrorUsed': "Этот лицензионный ключ уже был использован.", 'licenseErrorInvalid': "Неверный лицензионный ключ.",
    'timerExpiresIn': "Истекает через:" // New translation
  },
  'ar': {
    'pageTitle': "FOXBET", 'brandName': "FOXBET", 'sidebarTitle': "القائمة", 'modeDark': "الوضع الداكن", 'modeLight': "الوضع الفاتح", 'gamesTitle': 'ألعابنا', 'loadingText': "جارٍ تحميل لعبتك...", 'noLangError': "يرجى تهيئة اللغة في البوت قبل المتابعة", 'category1win': "رهان 1win", 'categoryOther': "رهانات أخرى",
    'licenseTitle': "التنشيط مطلوب", 'licensePrompt': "الرجاء إدخال مفتاح الترخيص الخاص بك لفتح المحتوى.", 'licensePlaceholder': "أدخل مفتاح الترخيص الخاص بك", 'licenseButton': "تفعيل", 'licenseValidating': "يتم التحقق...", 'licenseErrorUsed': "مفتاح الترخيص هذا تم استخدامه بالفعل.", 'licenseErrorInvalid': "مفتاح ترخيص غير صالح.",
    'timerExpiresIn': "ينتهي في:" // New translation
  }
};
const gamesData = [ { 'name': "Lucky Jet", 'url': 'home/LuckyJet/game.html', 'image': "home/LuckyJet/Imogos/LuckyBases.jpg", 'category': "1win bet" }, { 'name': "Aviator", 'url': "home/Aviator/gameAvia.html", 'image': "home/Aviator/logo/aviator-game.webp", 'category': "Autres Bets" }, { 'name': "Apple of Fortune", 'url': 'home/apple/applegame.html', 'image': "home/apple/stelo/logo .jpg", 'category': "Autres Bets" }, { 'name': "Gems Mines", 'url': "home/grile/mines.html", 'image': "home/grile/vision/BaseMines.jpg", 'category': "Autres Bets" }, { 'name': "Dragons", 'url': "home/Dragons/dragonS/game.html", 'image': "home/Dragons/dragonS/imag/baseDragons.jpg", 'category': "Autres Bets" }, { 'name': "Thimbles", 'url': "home/boll/thimble.html", 'image': "home/boll/imog/BaseThimbles.jpg", 'category': "Autres Bets" }, { 'name': 'Swimp', 'url': 'home/crapaud/swimp.html', 'image': "home/crapaud/imago/baseCrap.jpg", 'category': "Autres Bets" }, { 'name': "Crash", 'url': "crash/crash.html", 'image': "crash/vision/logo.jpg", 'category': "Autres Bets" }, { 'name': "Mundial", 'url': "home/Mundial/game.html", 'image': "home/Mundial/imogs/BaseMond.jpeg", 'category': "Autres Bets" }, { 'name': "Wild Gost", 'url': "home/WildG/wild.html", 'image': "home/WildG/imog/west logo.jpg", 'category': "Autres Bets" } ];

let countdownInterval = null; // Global variable to hold the timer interval

// --- HELPER FUNCTIONS ---
function sanitizeInput(input) { const div = document.createElement("div"); div.textContent = input; return div.innerHTML; }
function getParam(paramName) { const urlParams = new URLSearchParams(window.location.search); return sanitizeInput(urlParams.get(paramName) || ''); }

// --- MAIN APPLICATION LOGIC ---
function initializeApp() {
    if (!checkLanguageAndRedirect()) return;
    parseProfileFromUrl();
    loadMode();
    populateGames();
    document.getElementById('modeToggle').addEventListener('click', e => { e.preventDefault(); toggleMode(); });
    const hamburgerBtn = document.getElementById("hamburgerBtn"), sidebar = document.getElementById("sidebar"), closeSidebar = document.getElementById("closeSidebar"), overlay = document.getElementById('overlay');
    hamburgerBtn.addEventListener('click', () => { sidebar.classList.add("active"); overlay.classList.add("active"); });
    closeSidebar.addEventListener('click', () => { sidebar.classList.remove("active"); overlay.classList.remove("active"); });
    overlay.addEventListener("click", () => { sidebar.classList.remove("active"); overlay.classList.remove("active"); });
    document.getElementById('backToTop').addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", handleScroll);
}

// --- ORIGINAL FUNCTIONS ---
function getGameUrlWithParams(gameUrl) { const lang = getParam("lang"), username = getParam('us'), userId = getParam('i'), telegramLink = getParam('lk'), params = new URLSearchParams(); if (lang) params.append("lang", lang); if (username) params.append('us', username); if (userId) params.append('i', userId); if (telegramLink) params.append('lk', telegramLink); return gameUrl + (params.toString() ? '?' + params.toString() : ''); }
function parseProfileFromUrl() { const username = getParam('us'), userId = getParam('i'), telegramLink = getParam('lk'), profileBtn = document.getElementById("profileBtn"), profileInfo = document.getElementById("profileInfo"), profileName = document.getElementById("profileName"); if (userId && username && telegramLink) { profileBtn.setAttribute("href", "https://t.me/" + telegramLink); profileName.textContent = username; document.getElementById("profileId").style.display = 'none'; profileInfo.style.display = 'block'; } }
function applyTranslations(language) { const t = translations[language] || translations.fr; document.getElementById("page-title").textContent = t.pageTitle; document.getElementById("brand-name").textContent = t.brandName; document.getElementById("sidebar-title").textContent = t.sidebarTitle; document.getElementById('games-title').textContent = t.gamesTitle; document.getElementById('loadingText').textContent = t.loadingText; const modeText = document.getElementById("modeText"); modeText.textContent = document.body.classList.contains('dark-mode') ? t.modeDark : t.modeLight; }
function checkLanguageAndRedirect() { const language = getParam("lang"), telegramLink = getParam('lk'); if (!language) { const loadingOverlay = document.getElementById("loadingOverlay"), loadingText = document.getElementById("loadingText"); loadingText.textContent = translations.fr.noLangError; loadingOverlay.classList.add('active'); setTimeout(() => { window.location.href = telegramLink ? "https://t.me/" + telegramLink : 'https://t.me/'; setTimeout(() => window.close(), 100); }, 2000); return false; } applyTranslations(language); return true; }
function loadMode() { const savedTheme = localStorage.getItem('theme') || "dark-mode", lang = getParam("lang") || 'fr', t = translations[lang] || translations.fr; document.body.className = savedTheme; document.getElementById("modeText").textContent = savedTheme === 'dark-mode' ? t.modeDark : t.modeLight; document.querySelector("#modeToggle i").className = savedTheme === "dark-mode" ? "fas fa-moon" : "fas fa-sun"; }
function saveMode(mode) { localStorage.setItem('theme', mode); }
function toggleMode() { const lang = getParam("lang") || 'fr', t = translations[lang] || translations.fr, body = document.body; if (body.classList.contains("dark-mode")) { body.classList.replace("dark-mode", "light-mode"); document.getElementById('modeText').textContent = t.modeLight; document.querySelector("#modeToggle i").className = "fas fa-sun"; saveMode("light-mode"); } else { body.classList.replace('light-mode', "dark-mode"); document.getElementById('modeText').textContent = t.modeDark; document.querySelector("#modeToggle i").className = "fas fa-moon"; saveMode('dark-mode'); } }
function showLoading() { document.getElementById("loadingOverlay").classList.add("active"); }
function hideLoading() { document.getElementById('loadingOverlay').classList.remove("active"); }
function handleGameClick(gameUrl, event) { event.preventDefault(); showLoading(); setTimeout(() => { hideLoading(); window.location.href = getGameUrlWithParams(gameUrl); }, 2000); }
function populateGames() { const gamesGrid = document.getElementById('gamesGrid'), lang = getParam("lang") || 'fr', t = translations[lang] || translations.fr; gamesGrid.innerHTML = ''; gamesData.forEach(game => { const gameCard = document.createElement('div'); gameCard.className = "game-card"; gameCard.onclick = event => handleGameClick(game.url, event); const categoryText = game.category === "1win bet" ? t.category1win : t.categoryOther; gameCard.innerHTML = `<div class="game-image" style="background-image: url('${game.image}');"><div class="game-overlay"><div class="play-btn" aria-label="Play ${game.name}"><i class="fas fa-play"></i></div></div></div><div class="game-info"><div class="game-name">${game.name}</div><div class="game-category">${categoryText}</div></div>`; gamesGrid.appendChild(gameCard); }); }
function handleScroll() { const backToTopBtn = document.getElementById("backToTop"); window.scrollY > 300 ? backToTopBtn.classList.add("active") : backToTopBtn.classList.remove("active"); }

// --- LICENSE SYSTEM LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const licenseOverlay = document.getElementById('licenseOverlay'), licenseForm = document.getElementById('licenseForm'), licenseKeyInput = document.getElementById('licenseKey'), errorMessage = document.getElementById('errorMessage'), licenseTimer = document.getElementById('licenseTimer'), body = document.body;
    let isAppInitialized = false;

    // *** NEW FUNCTION: Starts and manages the countdown timer ***
    function startCountdown(expirationTimestamp) {
        if (countdownInterval) clearInterval(countdownInterval); // Clear any existing timer
        
        const lang = getParam("lang") || 'en';
        const t = translations[lang] || translations.en;

        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = expirationTimestamp - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                localStorage.removeItem('license_valid_until');
                lockPage(); // Re-lock the page when timer expires
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            let timeLeft = '';
            if (days > 0) timeLeft += `${days}d `;
            if (hours > 0 || days > 0) timeLeft += `${hours}h `;
            timeLeft += `${minutes}m ${String(seconds).padStart(2, '0')}s`;
            
            licenseTimer.innerHTML = `<i class="fas fa-clock"></i> ${t.timerExpiresIn} ${timeLeft}`;
        }, 1000);
    }

    function translateLicenseOverlay() { const lang = getParam("lang") || 'en', t = translations[lang] || translations.en; licenseOverlay.querySelector('h2').textContent = t.licenseTitle; licenseOverlay.querySelector('p').textContent = t.licensePrompt; licenseKeyInput.placeholder = t.licensePlaceholder; licenseOverlay.querySelector('button').textContent = t.licenseButton; }
    
    function lockPage() {
        body.classList.add('content-locked');
        licenseOverlay.style.display = 'flex';
        licenseTimer.style.display = 'none'; // Hide timer
        if (countdownInterval) clearInterval(countdownInterval); // Stop timer
    }
    
    function unlockPage() {
        body.classList.remove('content-locked');
        licenseOverlay.style.opacity = '0';
        setTimeout(() => { licenseOverlay.style.display = 'none'; }, 500);
        licenseTimer.style.display = 'block'; // Show timer
        if (!isAppInitialized) { initializeApp(); isAppInitialized = true; }
    }
    
    function checkLicenseStatus() {
        const validUntil = localStorage.getItem('license_valid_until');
        if (validUntil && new Date().getTime() < parseInt(validUntil)) {
            unlockPage();
            startCountdown(parseInt(validUntil)); // *** ADDED: Start countdown on page load
        } else {
            localStorage.removeItem('license_valid_until');
            lockPage();
        }
    }

    licenseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const key = licenseKeyInput.value.trim();
        if (!key) return;
        const lang = getParam("lang") || 'en', t = translations[lang] || translations.en;
        errorMessage.textContent = t.licenseValidating; errorMessage.style.color = 'inherit'; licenseKeyInput.style.borderColor = '';
        try {
            const url = `https://license-key-generator-with-236.created.app/api/validate-key?key=${key}`;
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            if (response.ok && data.valid && data.durationMs) {
                const expirationTime = new Date().getTime() + data.durationMs;
                localStorage.setItem('license_valid_until', expirationTime);
                unlockPage();
                startCountdown(expirationTime); // *** ADDED: Start countdown on successful activation
            } else {
                const defaultErrorMsg = response.status === 403 ? t.licenseErrorUsed : t.licenseErrorInvalid;
                throw new Error(data.message || defaultErrorMsg);
            }
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.color = '#ff4d4d';
            licenseKeyInput.style.borderColor = '#ff4d4d';
        }
    });
    
    checkLicenseStatus();
});
