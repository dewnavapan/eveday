(() => {
    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;

    function SetElementInnerText(id, text) {
        const element = document.getElementById(id);
        element.innerText = text;
    }

    function countdown() {
        const now = new Date().getTime();
        const newYear = new Date('November 8, 2024 23:59:59').getTime();
        const UnixTimeLeft = newYear - now;

        SetElementInnerText('days', Math.floor(UnixTimeLeft / DAY));
        SetElementInnerText('hours', Math.floor((UnixTimeLeft % DAY) / HOUR));
        SetElementInnerText('minutes', Math.floor((UnixTimeLeft % HOUR) / MINUTE));
        SetElementInnerText('seconds', Math.floor((UnixTimeLeft % MINUTE) / SECOND));
    }

    function setup() {
        const canvas = document.getElementById('falling-snow-canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        return {
            canvas,
            canvasContext: canvas.getContext('2d'),
            numberOfSnowBalls: 250
        };
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createSnowBalls(canvas, numberOfSnowBalls) {
        return [...Array(numberOfSnowBalls)].map(() => {
            return {
                x: random(0, canvas.width),
                y: random(0, canvas.height),
                opacity: Math.random() * (1 - 0.5) + 0.5,
                radius: random(2, 4),
                speedX: random(-5, 5),
                speedY: random(1, 3)
            };
        });
    }

    function drawSnowball(canvasContext, snowBall) {
        canvasContext.beginPath();
        canvasContext.arc(snowBall.x, snowBall.y, snowBall.radius, 0, Math.PI * 2);
        canvasContext.fillStyle = `rgba(240,230,140, ${snowBall.opacity})`;
        canvasContext.fill();
    }

    function moveSnowBall(canvas, snowBall) {
        snowBall.x += snowBall.speedX;
        snowBall.y += snowBall.speedY;

        if (snowBall.x > canvas.width) {
            snowBall.x = 0;
        } else if (snowBall.x < 0) {
            snowBall.x = canvas.width;
        }
        if (snowBall.y > canvas.height) {
            snowBall.y = 0;
        }
    }

    function run() {
        countdown();
        setInterval(countdown, SECOND);
        const { canvas, canvasContext, numberOfSnowBalls } = setup();
        const snowBalls = createSnowBalls(canvas, numberOfSnowBalls);

        setInterval(() => {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height);
            snowBalls.forEach((snowBall) => {
                drawSnowball(canvasContext, snowBall);
                moveSnowBall(canvas, snowBall);
            });
        }, 50);
    }

    run();
})();
