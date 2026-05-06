// Обратный отсчет до самоуничтожения страницы
let seconds = 30;
let countdownInterval;

function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const secondsElement = document.getElementById('seconds');
    
    countdownInterval = setInterval(function() {
        seconds--;
        countdownElement.textContent = seconds;
        secondsElement.textContent = seconds;
        
        if (seconds <= 10) {
            countdownElement.style.color = '#ff4444';
            countdownElement.style.animation = 'countdownPulse 0.5s infinite';
        }
        
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            selfDestruct();
        }
    }, 1000);
}

function selfDestruct() {
    const overlay = document.getElementById('destructionOverlay');
    overlay.style.display = 'flex';
    
    // Добавляем звуковые эффекты (закоментировано, так как требует аудио файлов)
    // const audio = new Audio('explosion.mp3');
    // audio.play();
    
    // Перенаправление на пустую страницу через 5 секунд
    setTimeout(() => {
        window.location.href = "about:blank";
    }, 5000);
}

// Принести извинения
function showApology() {
    clearInterval(countdownInterval);
    
    const apologyResult = document.getElementById('apologyResult');
    const escapeResult = document.getElementById('escapeResult');
    
    escapeResult.style.display = 'none';
    apologyResult.style.display = 'block';
    
    // Показываем обратный отсчет до перенаправления
    let redirectCount = 3;
    const redirectCountElement = document.getElementById('redirectCount');
    
    const redirectInterval = setInterval(() => {
        redirectCount--;
        redirectCountElement.textContent = redirectCount;
        
        if (redirectCount <= 0) {
            clearInterval(redirectInterval);
            window.location.href = 'index.html';
        }
    }, 1000);
}

// Попытаться скрыться
function attemptEscape() {
    const apologyResult = document.getElementById('apologyResult');
    const escapeResult = document.getElementById('escapeResult');
    
    apologyResult.style.display = 'none';
    escapeResult.style.display = 'block';
    
    // Ускоряем таймер
    seconds = Math.max(5, seconds - 10);
}

// Вернуться на главную
function returnToMain() {
    if (confirm('Вы уверены, что хотите вернуться? Помните правила.')) {
        window.location.href = 'index.html';
    }
}

// Запрет выхода со страницы
window.addEventListener('beforeunload', function (e) {
    if (seconds > 0) {
        e.preventDefault();
        e.returnValue = 'Вы пытаетесь покинуть страницу предупреждения. Это будет считаться дополнительным нарушением.';
    }
});

// Запрет копирования и правого клика
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('Нарушение правил отслеживается. Таймер ускорен.');
    seconds = Math.max(5, seconds - 5);
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
    alert('Информация защищена правилами клуба. Таймер ускорен.');
    seconds = Math.max(5, seconds - 5);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Запускаем обратный отсчет
    startCountdown();
    
    // Запрещаем масштабирование на мобильных
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Добавляем клавиатурные шорткаты
    document.addEventListener('keydown', function(e) {
        // Escape - попытка скрыться
        if (e.key === 'Escape') {
            attemptEscape();
        }
        
        // Enter - принести извинения
        if (e.key === 'Enter') {
            showApology();
        }
        
        // Backspace - вернуться
        if (e.key === 'Backspace') {
            returnToMain();
        }
    });
});