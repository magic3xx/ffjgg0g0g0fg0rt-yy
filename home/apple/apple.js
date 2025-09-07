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

        // --- AI MEMORY ---
        // This is the core of the new system.
        this.lastPredictionIndex = null;

        this.updateLanguage(this.language);
        this.initializeApp();
    }

    // --- NEW CORE LOGIC: The "Smart AI Opponent" ---
    _getSmartPrediction() {
        // --- Base Case: First prediction ---
        // If the AI has no memory, its first move is truly random.
        if (this.lastPredictionIndex === null) {
            const firstChoice = Math.floor(Math.random() * 5);
            console.log(`AI Start: No memory, picking randomly -> ${firstChoice + 1}`);
            this.lastPredictionIndex = firstChoice; // Now the AI has a memory.
            return firstChoice;
        }

        // --- AI's Intelligent Decision Making ---
        let allPossibleChoices = [0, 1, 2, 3, 4];

        // Rule #1: NEVER repeat the last move.
        let nonRepeatingChoices = allPossibleChoices.filter(index => index !== this.lastPredictionIndex);
        
        const roll = Math.random();
        let nextChoice;

        // --- AI Moods ---
        // 80% chance for a "Tricky Jump" to a non-adjacent spot.
        if (roll < 0.80) {
            const last = this.lastPredictionIndex;
            const neighbors = [last - 1, last + 1];
            
            // Filter out the neighbors to find "far away" spots.
            let farChoices = nonRepeatingChoices.filter(index => !neighbors.includes(index));

            // If there are no far choices (e.g., last pick was 2, non-repeating are 0,1,3,4, neighbors are 1,3),
            // then just pick from any non-repeating choice to avoid errors.
            if (farChoices.length === 0) {
                farChoices = nonRepeatingChoices;
            }
            
            nextChoice = farChoices[Math.floor(Math.random() * farChoices.length)];
            console.log(`AI Mood: Tricky Jump. Last was ${last + 1}. Jumping to -> ${nextChoice + 1}`);

        } 
        // 20% chance for an "Obvious Move" to an adjacent spot.
        else {
            const last = this.lastPredictionIndex;
            
            // Find the direct neighbors.
            let neighborChoices = nonRepeatingChoices.filter(index => index === last - 1 || index === last + 1);

            // If there are no valid neighbors, just pick from any non-repeating to avoid errors.
            if (neighborChoices.length === 0) {
                neighborChoices = nonRepeatingChoices;
            }
            
            nextChoice = neighborChoices[Math.floor(Math.random() * neighborChoices.length)];
            console.log(`AI Mood: Obvious Move. Last was ${last + 1}. Moving to -> ${nextChoice + 1}`);
        }

        // --- CRITICAL: Update AI's memory with the new choice ---
        this.lastPredictionIndex = nextChoice;
        return nextChoice;
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
            
            if (rows.length >= 11) {
                // Handle limit reached
            } else if (currentRow) {
                const circles = currentRow.querySelectorAll('.circle');
                
                // --- MODIFIED --- Use the new Smart AI to get a prediction.
                const randomIndex = this._getSmartPrediction();

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
        // --- CRITICAL: The AI must forget everything when the game resets. ---
        this.lastPredictionIndex = null;

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
