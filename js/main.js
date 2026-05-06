// Мобильное меню
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');

function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', closeMobileMenu);

// Закрытие баннера предупреждения
function closeBanner() {
    document.getElementById('warningBanner').style.display = 'none';
}

// Функция для показа/скрытия правил
function toggleRule(card) {
    card.classList.toggle('active');
}

// Показать все правила
function showAllRules() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>Все правила Бойцовского клуба</h3>
        <div class="all-rules">
            <div class="full-rule">
                <strong>Правило 1:</strong> Никому не рассказывать о Бойцовском клубе.
            </div>
            <div class="full-rule">
                <strong>Правило 2:</strong> Никому не рассказывать о Бойцовском клубе.
            </div>
            <div class="full-rule">
                <strong>Правило 3:</strong> Если кто-то кричит "стоп", падает без сознания или делает "хватит" - бой окончен.
            </div>
            <div class="full-rule">
                <strong>Правило 4:</strong> В бою участвуют только двое.
            </div>
            <div class="full-rule">
                <strong>Правило 5:</strong> Только один бой за раз.
            </div>
            <div class="full-rule">
                <strong>Правило 6:</strong> Бойцы сражаются без обуви и рубашек.
            </div>
            <div class="full-rule">
                <strong>Правило 7:</strong> Бой продолжается столько, сколько потребуется.
            </div>
            <div class="full-rule">
                <strong>Правило 8:</strong> Если это ваш первый вечер в клубе, вы должны драться.
            </div>
        </div>
        <p class="rules-note">Запомните их. Соблюдайте их. Никогда не нарушайте их.</p>
    `;
    showModal();
}

// Генератор цитат Тайлера Дёрдена
const quotes = [
    {
        text: '"Ты — не твоя работа. Ты — не то, сколько у тебя денег на счету. Ты — не машина, на которой ты ездишь. Ты — не содержимое твоего бумажника. Ты — не твои штаны."',
        author: "Тайлер Дёрден"
    },
    {
        text: '"Только потеряв всё, мы получаем свободу делать что угодно."',
        author: "Тайлер Дёрден"
    },
    {
        text: '"Это твоя жизнь, и она заканчивается с каждой минутой."',
        author: "Тайлер Дёрден"
    },
    {
        text: '"Самосовершенствование — это самовыпячивание. А самовыпячивание — это мастурбация."',
        author: "Тайлер Дёрден"
    },
    {
        text: '"Мы — поколение, выросшее без великой депрессии и без великой войны. Наша великая война — это духовная война. Наша великая депрессия — это наши жизни."',
        author: "Тайлер Дёрден"
    },
    {
        text: '"Вещи, которыми ты владеешь, в конце концов начинают владеть тобой."',
        author: "Тайлер Дёрден"
    },
    {
        text: '"Я вижу в представителях сильного пола самую сильную и замечательную породу, какую только создал Бог. Я вижу потенциал, и вы тратите его впустую."',
        author: "Тайлер Дёрден"
    },
    {
        text: '"Без страданий и жертв мы не имеем ничего."',
        author: "Тайлер Дёрден"
    },
    {
        text: '"Реклама заставляет нас гнаться за машинами и одеждой, работать на jobs которые мы ненавидим, чтобы мы могли кустить shit которая нам не нужна."',
        author: "Тайлер Дёрден"
    },
    {
        text: '"Ты не особенный. Ты не прекрасная и уникальная снежинка. Ты такой же разлагающийся органический мусор, как и все остальные."',
        author: "Тайлер Дёрден"
    }
];

function newQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').textContent = quotes[randomIndex].text;
    document.getElementById('quoteAuthor').textContent = `— ${quotes[randomIndex].author}`;
}

// Избранные цитаты
function addToFavorites() {
    const currentQuote = document.getElementById('quote').textContent;
    const currentAuthor = document.getElementById('quoteAuthor').textContent;
    
    const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    
    // Проверяем, нет ли уже такой цитаты в избранном
    if (!favorites.some(fav => fav.text === currentQuote)) {
        favorites.push({
            text: currentQuote,
            author: currentAuthor
        });
        localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
        updateFavoritesDisplay();
        
        // Показываем уведомление
        showNotification('Цитата добавлена в избранное');
    } else {
        showNotification('Эта цитата уже в избранном');
    }
}

function updateFavoritesDisplay() {
    const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    const favoritesContainer = document.getElementById('favorites');
    
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>Пока нет избранных цитат</p>';
        return;
    }
    
    favoritesContainer.innerHTML = '<h4>Избранные цитаты:</h4>';
    
    favorites.forEach((quote, index) => {
        const quoteElement = document.createElement('div');
        quoteElement.className = 'favorite-quote';
        quoteElement.innerHTML = `
            <p>${quote.text}</p>
            <p class="quote-author-small">${quote.author}</p>
            <button class="remove-favorite" onclick="removeFavorite(${index})">×</button>
        `;
        favoritesContainer.appendChild(quoteElement);
    });
}

function removeFavorite(index) {
    const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    favorites.splice(index, 1);
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    updateFavoritesDisplay();
    showNotification('Цитата удалена из избранного');
}

// Мини-игра по созданию мыла
let addedIngredients = [];
const correctOrder = ['fat', 'lye', 'glycerin', 'perfume'];

document.querySelectorAll('.ingredient').forEach(ingredient => {
    ingredient.addEventListener('click', () => {
        const ingredientType = ingredient.dataset.ingredient;
        
        if (!addedIngredients.includes(ingredientType)) {
            addedIngredients.push(ingredientType);
            updateCauldron();
            updateSelectedIngredients();
            
            // Визуальная обратная связь
            ingredient.classList.add('selected');
            
            // Активируем кнопку смешивания, если добавлены все ингредиенты
            document.getElementById('mixBtn').disabled = addedIngredients.length !== 4;
        }
    });
});

function updateCauldron() {
    const cauldronContent = document.getElementById('cauldronContent');
    const fillPercentage = (addedIngredients.length / 4) * 100;
    cauldronContent.style.height = `${fillPercentage}%`;
}

function updateSelectedIngredients() {
    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.textContent = addedIngredients.length > 0 
        ? addedIngredients.map(ing => {
            const ingredientNames = {
                'fat': 'Жир',
                'lye': 'Щёлок',
                'glycerin': 'Глицерин',
                'perfume': 'Отдушка'
            };
            return ingredientNames[ing];
        }).join(', ')
        : 'Нет';
}

function mixIngredients() {
    const resultMessage = document.getElementById('resultMessage');
    const craftedSoap = document.getElementById('craftedSoap');
    
    // Проверяем правильность порядка
    const isCorrect = JSON.stringify(addedIngredients) === JSON.stringify(correctOrder);
    
    if (isCorrect) {
        resultMessage.innerHTML = `
            <h3>Успех! Мыло "Большая надежда" создано!</h3>
            <p>Вы достойны стать мыловаром, как Тайлер Дёрден.</p>
            <p class="success-text">✧ Рецепт усвоен ✧</p>
        `;
        craftedSoap.style.display = 'flex';
        
        // Добавляем анимацию успеха
        craftedSoap.style.animation = 'fadeIn 1s, soap-shine 3s infinite';
        
        // Сохраняем успех в localStorage
        localStorage.setItem('soapGameSuccess', 'true');
    } else {
        resultMessage.innerHTML = `
            <h3>Неудача! Мыло не получилось.</h3>
            <p>Порядок ингредиентов неправильный. Тайлер не одобряет.</p>
            <p class="error-text">☠ Попробуйте еще раз ☠</p>
        `;
        craftedSoap.style.display = 'none';
    }
}

function resetGame() {
    addedIngredients = [];
    updateCauldron();
    updateSelectedIngredients();
    document.getElementById('mixBtn').disabled = true;
    document.getElementById('resultMessage').innerHTML = '';
    document.getElementById('craftedSoap').style.display = 'none';
    
    // Снимаем выделение с ингредиентов
    document.querySelectorAll('.ingredient').forEach(ing => {
        ing.classList.remove('selected');
    });
}

// Проверка пароля для Проекта "Разгром"
function showPasswordPrompt() {
    document.getElementById('passwordPrompt').style.display = 'block';
    document.getElementById('secretContent').style.display = 'none';
}

function hidePasswordPrompt() {
    document.getElementById('passwordPrompt').style.display = 'none';
}

function checkPassword() {
    const password = document.getElementById('password').value.toLowerCase().trim();
    
    if (password === 'разгром' || password === 'project mayhem') {
        document.getElementById('passwordPrompt').style.display = 'none';
        document.getElementById('secretContent').style.display = 'block';
        document.getElementById('password').value = '';
        
        // Запускаем таймер обратного отсчета
        startCountdownTimer();
        
        // Сохраняем доступ в localStorage
        localStorage.setItem('projectMayhemAccess', 'true');
    } else {
        // Перенаправляем на страницу-предупреждение
        redirectToWarning();
    }
}

// Таймер обратного отсчета для Проекта "Разгром"
function startCountdownTimer() {
    const hoursElement = document.querySelector('.countdown-timer span:nth-child(1)');
    const minutesElement = document.querySelector('.countdown-timer span:nth-child(3)');
    const secondsElement = document.querySelector('.countdown-timer span:nth-child(5)');
    
    // Устанавливаем время до следующей операции (например, 2:14 утра)
    const now = new Date();
    const target = new Date();
    target.setHours(2, 14, 0, 0);
    
    // Если текущее время уже прошло 2:14, устанавливаем на следующий день
    if (now > target) {
        target.setDate(target.getDate() + 1);
    }
    
    function updateCountdown() {
        const now = new Date();
        const diff = target - now;
        
        if (diff <= 0) {
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            clearInterval(countdownInterval);
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Функция для отправки анкеты
function submitApplication() {
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value;
    const reason = document.getElementById('reason').value.trim();
    const rule1 = document.getElementById('rule1').value.toLowerCase().trim();
    const agreeRules = document.getElementById('agreeRules').checked;
    const agreeSecrecy = document.getElementById('agreeSecrecy').checked;
    
    const resultDiv = document.getElementById('applicationResult');
    
    // Проверяем обязательные поля
    if (!name || !age || !reason || !rule1) {
        resultDiv.innerHTML = '<p style="color: var(--danger)">Заполните все обязательные поля!</p>';
        resultDiv.style.display = 'block';
        return;
    }
    
    if (!agreeRules || !agreeSecrecy) {
        resultDiv.innerHTML = '<p style="color: var(--danger)">Вы должны принять все условия!</p>';
        resultDiv.style.display = 'block';
        return;
    }
    
    // Проверяем знание правила
    if (!rule1.includes('не рассказывать') && !rule1.includes('никому не рассказывать')) {
        resultDiv.innerHTML = '<p style="color: var(--danger)">Вы неправильно указали первое правило. Попробуйте еще раз.</p>';
        resultDiv.style.display = 'block';
        return;
    }
    
    // Успешная отправка
    resultDiv.innerHTML = `
        <p style="color: var(--success)">✓ Заявка отправлена!</p>
        <p>Мы свяжемся с вами в течение 48 часов. Ждите инструкций.</p>
        <p class="warning-text">Помните: никому не рассказывайте о Бойцовском клубе.</p>
    `;
    resultDiv.style.display = 'block';
    
    // Сохраняем заявку в localStorage
    const application = {
        name,
        age,
        reason,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('fightClubApplication', JSON.stringify(application));
    
    // Очищаем форму через 5 секунд
    setTimeout(() => {
        document.querySelectorAll('.form-control').forEach(input => {
            if (input.type !== 'radio' && input.type !== 'checkbox') {
                input.value = '';
            }
        });
        
        document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });
        
        resultDiv.style.display = 'none';
    }, 5000);
}

// Счетчик символов для поля причины
const reasonTextarea = document.getElementById('reason');
const reasonCounter = document.getElementById('reasonCounter');

reasonTextarea.addEventListener('input', () => {
    const maxLength = 500;
    const currentLength = reasonTextarea.value.length;
    const remaining = maxLength - currentLength;
    
    reasonCounter.textContent = remaining;
    
    if (remaining < 0) {
        reasonTextarea.value = reasonTextarea.value.substring(0, maxLength);
        reasonCounter.textContent = 0;
    }
    
    reasonCounter.style.color = remaining < 50 ? 'var(--danger)' : 'var(--text-muted)';
});

// Запрос доступа к разделам
function requestAccess(section) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>Запрос доступа</h3>
        <p>Для получения доступа к разделу "${getSectionName(section)}" необходимо:</p>
        <ul>
            <li>Быть членом Бойцовского клуба</li>
            <li>Посетить не менее 5 встреч</li>
            <li>Получить рекомендацию от действующего члена</li>
            <li>Соблюдать все правила</li>
        </ul>
        <p class="warning-text">Доступ предоставляется лично Тайлером Дёрденом.</p>
        <button class="submit-btn" onclick="closeModal()">Понятно</button>
    `;
    showModal();
}

function getSectionName(section) {
    const sections = {
        'meetings': 'Места встреч',
        'rules': 'Новые правила',
        'mayhem': 'Проект "Разгром"'
    };
    return sections[section] || section;
}

// Тест на лояльность (перенаправление на страницу-предупреждение)
function redirectToWarning() {
    window.location.href = 'warning.html';
}

function testRules() {
    const confirmed = confirm('Вы уверены, что хотите проверить свою лояльность? Это может иметь последствия.');
    if (confirmed) {
        redirectToWarning();
    }
}

// Сброс всего прогресса
function resetSite() {
    const confirmed = confirm('Вы уверены, что хотите сбросить весь прогресс? Все данные будут удалены.');
    
    if (confirmed) {
        localStorage.clear();
        location.reload();
    }
}

// Функция для прокрутки к разделу
function scrollToApplication() {
    closeMobileMenu();
    document.getElementById('application').scrollIntoView({ behavior: 'smooth' });
}

// Модальное окно
const modal = document.getElementById('modal');

function showModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Клик вне модального окна закрывает его
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Escape закрывает модальное окно
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Показать уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent);
        color: white;
        padding: 15px 25px;
        border-radius: var(--radius);
        z-index: 2001;
        animation: slideIn 0.3s, fadeOut 0.3s 2.7s;
        box-shadow: var(--shadow);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Создаем стили для анимации уведомления
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Запрет копирования и правого клика
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showNotification('Нарушение правил отслеживается');
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
    showNotification('Информация защищена правилами клуба');
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем счетчик правил
    document.getElementById('rulesCount').textContent = '8';
    
    // Обновляем избранные цитаты
    updateFavoritesDisplay();
    
    // Проверяем, был ли успех в игре мыловарения
    if (localStorage.getItem('soapGameSuccess') === 'true') {
        const resultMessage = document.getElementById('resultMessage');
        const craftedSoap = document.getElementById('craftedSoap');
        resultMessage.innerHTML = `
            <h3>Мыло "Большая надежда" уже создано!</h3>
            <p>Вы доказали свои навыки мыловарения.</p>
        `;
        craftedSoap.style.display = 'flex';
    }
    
    // Проверяем доступ к Проекту "Разгром"
    if (localStorage.getItem('projectMayhemAccess') === 'true') {
        document.getElementById('passwordPrompt').style.display = 'none';
        document.getElementById('secretContent').style.display = 'block';
        startCountdownTimer();
    }
    
    // Добавляем эффект печатающегося текста для заголовка
    const title = document.querySelector('.title');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
    
    // Добавляем случайные вспышки на фоне
    setInterval(createFlash, 4000);
});

// Создание вспышек на фоне
function createFlash() {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: ${Math.random() * 100}vh;
        left: ${Math.random() * 100}vw;
        width: 2px;
        height: 2px;
        background: var(--accent);
        border-radius: 50%;
        box-shadow: 0 0 10px 5px var(--accent);
        pointer-events: none;
        z-index: 9999;
        animation: flash 1s forwards;
    `;
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.remove();
    }, 1000);
}

// Добавляем стили для анимации вспышки
const flashStyle = document.createElement('style');
flashStyle.textContent = `
    @keyframes flash {
        0% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
`;
document.head.appendChild(flashStyle);
