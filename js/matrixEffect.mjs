document.addEventListener('DOMContentLoaded', () => {
    initializeMatrixEffect(() => {
        const matrixWrapper = document.getElementById('matrixWrapper');
        const mainContent = document.getElementById('mainContent');
        matrixWrapper.style.transition = 'opacity 1s ease';
        matrixWrapper.style.opacity = '0';
        setTimeout(() => {
            matrixWrapper.remove();
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 10);
        }, 1000);
    });
});

function initializeMatrixEffect(callback) {
    const LANGS = {
        latin: 'abcdefghijklmnopqrstuvwxyz',
        hangul: '가나다라마바사아자차카타파하',
        cyrillic: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
        arabic: 'ءآأبپتثجحخدذرزسشصضطظعغفقکگلمنوهی'
    };

    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    let columns, rows;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / 20);
        rows = Math.floor(canvas.height / 20);
    }

    function generateRandomString(language) {
        return LANGS[language][Math.floor(Math.random() * LANGS[language].length)];
    }

    function matrixEffect() {
        const chars = [];
        const languages = Object.keys(LANGS);

        for (let i = 0; i < columns; i++) {
            chars[i] = {
                y: Math.random() * canvas.height,
                char: generateRandomString(languages[Math.floor(Math.random() * languages.length)])
            };
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0f0';
            ctx.font = '20px monospace';
            for (let i = 0; i < columns; i++) {
                const charObj = chars[i];
                ctx.fillText(charObj.char, i * 20, charObj.y);
                if (Math.random() < 0.05) {
                    charObj.char = generateRandomString(languages[Math.floor(Math.random() * languages.length)]);
                }

                charObj.y += 20;
                if (charObj.y > canvas.height) {
                    charObj.y = 0;
                }
            }
            requestAnimationFrame(draw);
        }
        draw();
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    matrixEffect();
    setTimeout(callback, 1250);
}
