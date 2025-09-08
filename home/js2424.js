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
    profileBtn.setAttribute("href", telegramUrl);
    profileName.textContent = username;
    profileId.style.display = 'none'; // Hides the user ID display
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
  modeText.textContent = document.body.classList.contains('dark-mode') 
    ? translation.modeDark 
    : translation.modeLight;
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
      if (telegramLink) {
        window.location.href = "https://t.me/" + telegramLink;
      } else {
        window.location.href = 'https://t.me/';
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
  const translation = translations[language] || translations.fr;
  
  body.classList.remove("dark-mode", 'light-mode');
  body.classList.add(savedTheme);
  modeText.textContent = savedTheme === 'dark-mode' ? translation.modeDark : translation.modeLight;
  modeIcon.className = savedTheme === "dark-mode" ? "fas fa-moon" : "fas fa-sun";
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
    modeText.textContent = translation.modeLight;
    modeIcon.className = "fas fa-sun";
    saveMode("light-mode");
  } else {
    body.classList.remove('light-mode');
    body.classList.add("dark-mode");
    modeText.textContent = translation.modeDark;
    modeIcon.className = "fas fa-moon";
    saveMode('dark-mode');
  }
}

function showLoading() {
  const loadingOverlay = document.getElementById("loadingOverlay");
  loadingOverlay.classList.add("active");
}

function hideLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  loadingOverlay.classList.remove("active");
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
document.addEventListener('DOMContentLoaded', () => {
  if (!checkLanguageAndRedirect()) {
    return;
  }
  
  parseProfileFromUrl();
  loadMode();
  populateGames();
  
  // Mode toggle event
  const modeToggle = document.getElementById('modeToggle');
  modeToggle.addEventListener('click', event => {
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
    window.scrollTo({
      'top': 0,
      'behavior': "smooth"
    });
  });
  
  window.addEventListener("scroll", handleScroll);
});
