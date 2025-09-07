class AppleCassa {
    constructor() {
        this.language = this.getLanguageFromURL();
        this.translations = {
            fr: {
                title: "Apple Cassa",
                predictions: "Prédictions",
                reset: "Réinitialiser",
                back: "Retour",
                limitReached: "Limite atteinte ! Cliquez sur Réinitialiser",
                noLang: "Veuillez configurer la langue dans votre bot et réessayer"
            },
            en: {
                title: "Apple Cassa",
                predictions: "Predictions",
                reset: "Reset",
                back: "Back",
                limitReached: "Limit reached! Click Reset",
                noLang: "Please configure the language in your bot and try again"
            },
            ru: {
                title: "Apple Cassa",
                predictions: "Прогнозы",
                reset: "Сбросить",
                back: "Назад",
                limitReached: "Лимит достигнут! Нажмите Сбросить",
                noLang: "Пожалуйста, настройте язык в вашем боте и попробуйте снова"
            },
            ar: {
                title: "Apple Cassa",
                predictions: "التوقعات",
                reset: "إعادة تعيين",
                back: "رجوع",
                limitReached: "تم الوصول إلى الحد! انقر على إعادة تعيين",
                noLang: "يرجى تكوين اللغة في البوت الخاص بك وإعادة المحاولة"
            }
        };

        if (!this.language) {
            this.handleNoLanguage();
            return;
        }

        // --- NEW --- Initialize a "shuffled bag" for the hardest difficulty levels.
        this.predictionBag = [];

        this.updateLanguage(this.language);
        this.initializeApp();
    }

    // --- NEW HELPER FUNCTION 1 ---
    // This is the core logic for the "Very Hard" difficulty (rows 4+).
    // It ensures fair randomness without immediate repeats.
    _getNextFromShuffledBag() {
        if (this.predictionBag.length === 0) {
            this.predictionBag = [0, 1, 2, 3, 4]; // The 5 possible circle indices
            for (let i = this.predictionBag.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.predictionBag[i], this.predictionBag[j]] = [this.predictionBag[j], this.predictionBag[i]];
            }
        }
        return this.predictionBag.pop();
    }

    // --- NEW HELPER FUNCTION 2 ---
    // This is the main controller for the game's difficulty.
    // It returns a prediction index based on the current row number.
    _getPredictionForRow(rowNumber) {
        switch (rowNumber) {
            case 1: // First prediction (EASY)
                console.log("Difficulty: Easy. Predicting middle.");
                return 2; // Always the middle circle (index 2)

            case 2: // Second prediction (MEDIUM)
                console.log("Difficulty: Medium. Predicting adjacent to middle.");
                return Math.random() < 0.5 ? 1 : 3; // Either index 1 or 3

            case 3: // Third prediction (HARD)
                console.log("Difficulty: Hard. Predicting edges.");
                return Math.random() < 0.5 ? 0 : 4; // Either index 0 or 4

            default: // Rows 4 and up (VERY HARD / RANDOM)
                console.log(`Difficulty: Very Hard (Row ${rowNumber}). Using shuffled bag.`);
                return this._getNextFromShuffledBag();
        }
    }

    getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('lang');
    }

    handleNoLanguage() {
        document.body.innerHTML = `<div id="alertBox">${this.translations.fr.noLang}</div>`;
        document.getElementById('alertBox').style.display = 'block';
        setTimeout(() => {
            window.location.href = "https://t.me/PREDBOX2ROBOT?start=user22476018";
            setTimeout(() => window.close(), 500);
        }, 4000);
    }

    updateLanguage(lang) {
        document.documentElement.lang = lang;
        const t = this.translations[lang] || this.translations.fr;
        document.getElementById('page-title').textContent = t.title;
        document.getElementById('predictButton').innerHTML = `<svg class="button-icon" fill="white" viewBox="0 0 24 24"><path d="M12 4a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-7h2v4h-2zm0-3h2v2h-2z"/></svg> ${t.predictions}`;
        document.getElementById('resetButton').innerHTML = `<svg class="button-icon" fill="white" viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7a6 6 0 110 12 6 6 0 010-12h1z"/></svg> ${t.reset}`;
        document.getElementById('backButton').innerHTML = `<svg class="button-icon" fill="white" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"/></svg> ${t.back}`;
        document.getElementById('alertBox').textContent = t.limitReached;
    }

    initializeApp() {
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('content').classList.add('visible');
        }, 3000);
        document.getElementById('predictButton').addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(200);
            this.handlePredict();
        });
        document.getElementById('resetButton').addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(200);
            this.handleReset();
        });
        document.getElementById('backButton').addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(200);
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "https://t.me/PREDBOX2ROBOT?start=user22476018";
                setTimeout(() => window.close(), 500);
            }
        });
    }

    addNewRow() {
        const circleContainer = document.getElementById('circleContainer');
        const rows = circleContainer.querySelectorAll('.circle-row');
        const predictButton = document.getElementById('predictButton');
        const t = this.translations[this.language] || this.translations.fr;

        if (rows.length >= 10) {
            const alertBox = document.getElementById('alertBox');
            alertBox.textContent = t.limitReached;
            alertBox.style.display = 'block';
            predictButton.disabled = true;
            setTimeout(() => { alertBox.style.display = 'none'; }, 4000);
            return false;
        }

        const newRow = document.createElement('div');
        newRow.classList.add('circle-row');
        for (let i = 0; i < 5; i++) {
            newRow.appendChild(document.createElement('div')).classList.add('circle');
        }
        const rowNumber = document.createElement('span');
        rowNumber.classList.add('row-number');
        rowNumber.textContent = rows.length + 1;
        newRow.appendChild(rowNumber);
        circleContainer.prepend(newRow);
        return true;
    }

    handlePredict() {
        const predictButton = document.getElementById('predictButton');
        const loading = document.getElementById('prediction-loading');
        if (predictButton.disabled) return;

        predictButton.disabled = true;
        loading.style.display = 'flex';

        setTimeout(() => {
            loading.style.display = 'none';
            const circleContainer = document.getElementById('circleContainer');
            const rows = circleContainer.querySelectorAll('.circle-row');
            const currentRow = circleContainer.firstElementChild;
            const t = this.translations[this.language] || this.translations.fr;
            
            // --- MODIFIED --- Get the current row number to determine difficulty.
            const currentRowNumber = rows.length; // This will be 1 for the first prediction, 2 for the second, etc.

            if (rows.length >= 11) {
                const alertBox = document.getElementById('alertBox');
                alertBox.textContent = t.limitReached;
                alertBox.style.display = 'block';
                predictButton.disabled = true;
                setTimeout(() => { alertBox.style.display = 'none'; }, 4000);
            } else if (currentRow) {
                const circles = currentRow.querySelectorAll('.circle');
                
                // --- MODIFIED --- Get the prediction using the new difficulty logic.
                const randomIndex = this._getPredictionForRow(currentRowNumber);

                const randomCircle = circles[randomIndex];
                const image = document.createElement('img');
                image.src = "https://i.ibb.co/hBdQrHp/IMG-20241125-133222-422.jpg";
                image.alt = "Prediction Image";

                let img = randomCircle.querySelector('img');
                if (!img) {
                    randomCircle.appendChild(image);
                    img = image;
                }
                img.style.display = 'block';
                this.addNewRow();
            }
            predictButton.disabled = rows.length >= 10;
        }, 1500);
    }

    handleReset() {
        // --- MODIFIED --- We must also reset the prediction bag.
        this.predictionBag = [];

        const circleContainer = document.getElementById('circleContainer');
        const predictButton = document.getElementById('predictButton');
        circleContainer.innerHTML = `
            <div class="circle-row">
                <div class="circle" id="circle1"></div>
                <div class="circle" id="circle2"></div>
                <div class="circle" id="circle3"></div>
                <div class="circle" id="circle4"></div>
                <div class="circle" id="circle5"></div>
                <span class="row-number">1</span>
            </div>
        `;
        predictButton.disabled = false;
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    new AppleCassa();
});
