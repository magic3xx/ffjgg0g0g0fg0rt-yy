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

        // --- NEW --- This will hold the state for the "hard" random part (Row 5+).
        this.predictionBag = [];

        this.updateLanguage(this.language);
        this.initializeApp();
    }

    // --- NEW HELPER 1 --- For the hard part of the game (Row 5 and beyond).
    _getNextFromShuffledBag() {
        if (this.predictionBag.length === 0) {
            this.predictionBag = [0, 1, 2, 3, 4];
            for (let i = this.predictionBag.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.predictionBag[i], this.predictionBag[j]] = [this.predictionBag[j], this.predictionBag[i]];
            }
        }
        return this.predictionBag.pop();
    }

    // --- NEW CORE LOGIC FUNCTION --- This implements YOUR specific rules.
    _getPatternedPrediction(rowNumber) {
        let choices;
        const roll = Math.random(); // A random number for weighted choices.

        switch (rowNumber) {
            case 1:
                // Rule: "best 1,2,4,5" -> The prediction will be one of these four.
                console.log("Row 1: Predicting one of [1, 2, 4, 5]");
                choices = [0, 1, 3, 4];
                return choices[Math.floor(Math.random() * choices.length)];

            case 2:
                // Rule: "best 1,4,5 and sometime 3" -> High chance for 1,4,5, low chance for 3.
                console.log("Row 2: High chance for [1, 4, 5], low for [3]");
                if (roll < 0.85) { // 85% chance for a "best" choice
                    choices = [0, 3, 4];
                    return choices[Math.floor(Math.random() * choices.length)];
                } else { // 15% chance for the "sometime" choice
                    return 2; // Index for position 3
                }

            case 3:
                // Rule: "best 4,5 and sometime 2,1"
                console.log("Row 3: High chance for [4, 5], low for [1, 2]");
                if (roll < 0.80) { // 80% chance for a "best" choice
                    return Math.random() < 0.5 ? 3 : 4; // Index 3 or 4
                } else { // 20% chance for a "sometime" choice
                    return Math.random() < 0.5 ? 0 : 1; // Index 0 or 1
                }
            
            case 4:
                // Rule: "best 1,3 and sometime 4,5"
                console.log("Row 4: High chance for [1, 3], low for [4, 5]");
                 if (roll < 0.75) { // 75% chance for a "best" choice
                    return Math.random() < 0.5 ? 0 : 2; // Index 0 or 2
                } else { // 25% chance for a "sometime" choice
                    return Math.random() < 0.5 ? 3 : 4; // Index 3 or 4
                }

            default:
                // Rule: "fifth to the end... hard... everytime diffrent"
                console.log(`Row ${rowNumber}: Hard mode. Truly random.`);
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
            
            // Get the current row number to determine which rule to apply.
            const currentRowNumber = rows.length;

            if (rows.length >= 11) {
                const alertBox = document.getElementById('alertBox');
                alertBox.textContent = t.limitReached;
                alertBox.style.display = 'block';
                predictButton.disabled = true;
                setTimeout(() => { alertBox.style.display = 'none'; }, 4000);
            } else if (currentRow) {
                const circles = currentRow.querySelectorAll('.circle');
                
                // --- MODIFIED --- Get the prediction using your custom pattern logic.
                const randomIndex = this._getPatternedPrediction(currentRowNumber);

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
        // --- MODIFIED --- Reset the bag so the "hard mode" sequence is fresh.
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
