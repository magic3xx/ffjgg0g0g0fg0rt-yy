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

        this.predictionBag = [];
        this.updateLanguage(this.language);
        this.initializeApp();
    }

    // --- NEW HELPER 1 --- For the truly random part of the game (Row 5+).
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

    // --- NEW CORE LOGIC: "The Winning Path" ---
    _getWinningPrediction(rowNumber) {
        let bestChoices;
        let sometimeChoices;
        const roll = Math.random();

        switch (rowNumber) {
            case 1: // Winning Zone: Guaranteed win
                console.log("Row 1 (Winning Zone): GUARANTEED choice from [1, 2, 4, 5]");
                bestChoices = [0, 1, 3, 4]; // The 'best' spots are 1, 2, 4, 5
                return bestChoices[Math.floor(Math.random() * bestChoices.length)];

            case 2: // Winning Zone: Guaranteed win
                console.log("Row 2 (Winning Zone): GUARANTEED choice from [1, 4, 5]");
                bestChoices = [0, 3, 4]; // The 'best' spots are 1, 4, 5
                return bestChoices[Math.floor(Math.random() * bestChoices.length)];

            case 3: // Challenge Zone: High chance to win, small risk
                console.log("Row 3 (Challenge Zone): High chance for [4, 5], small risk of [1, 2]");
                bestChoices = [3, 4]; // Best are 4, 5
                sometimeChoices = [0, 1]; // Sometime are 1, 2
                if (roll < 0.85) { // 85% chance to get a "best" choice
                    return bestChoices[Math.floor(Math.random() * bestChoices.length)];
                } else {
                    return sometimeChoices[Math.floor(Math.random() * sometimeChoices.length)];
                }

            case 4: // Challenge Zone: High chance to win, small risk
                console.log("Row 4 (Challenge Zone): High chance for [1, 3], small risk of [4, 5]");
                bestChoices = [0, 2]; // Best are 1, 3
                sometimeChoices = [3, 4]; // Sometime are 4, 5
                if (roll < 0.80) { // 80% chance to get a "best" choice
                    return bestChoices[Math.floor(Math.random() * bestChoices.length)];
                } else {
                    return sometimeChoices[Math.floor(Math.random() * sometimeChoices.length)];
                }

            default: // Expert Zone: Truly random and hard
                console.log(`Row ${rowNumber} (Expert Zone): Truly random.`);
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
            
            const currentRowNumber = rows.length;

            if (rows.length >= 11) {
                const alertBox = document.getElementById('alertBox');
                alertBox.textContent = t.limitReached;
                alertBox.style.display = 'block';
                predictButton.disabled = true;
                setTimeout(() => { alertBox.style.display = 'none'; }, 4000);
            } else if (currentRow) {
                const circles = currentRow.querySelectorAll('.circle');
                
                // --- MODIFIED --- Use the new "Winning Path" logic.
                const randomIndex = this._getWinningPrediction(currentRowNumber);

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

document.addEventListener('DOMContentLoaded', () => {
    new AppleCassa();
});
