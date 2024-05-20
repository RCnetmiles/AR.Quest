let canvas, ctx;
let snake, food, score, direction, intervalId;
let nickname;

function showInstructions() {
    nickname = document.getElementById('nicknameInput').value;
    if (nickname.trim() === '') {
        alert('Por favor, digite seu nickname.');
        return;
    }
    document.getElementById('nicknameScreen').style.display = 'none';
    document.getElementById('instructionsScreen').style.display = 'flex';
}

function startGame() {
    document.getElementById('instructionsScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'flex';
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    resetGame();
    intervalId = setInterval(gameLoop, 100);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    score = 0;
    direction = 'right';
}

function gameLoop() {
    update();
    draw();
}

function update() {
    let head = { ...snake[0] };

    switch (direction) {
        case 'right':
            head.x += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
    }

    if (head.x === food.x && head.y === food.y) {
        snake.push({});
        score += 10;
        placeFood();
    } else {
        snake.pop();
    }

    if (isGameOver(head)) {
        endGame();
        return;
    }

    snake.unshift(head);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x * 20, part.y * 20, 20, 20);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

    ctx.fillStyle = 'black';
    ctx.fillText(Score: ${score}, 10, 290);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * 15),
        y: Math.floor(Math.random() * 15)
    };
}

function isGameOver(head) {
    if (head.x < 0 || head.x >= 15 || head.y < 0 || head.y >= 15) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

function endGame() {
    clearInterval(intervalId);
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('finalScore').innerText = score;
    document.getElementById('gameOverScreen').style.display = 'flex';
}

function showNextGame() {
    alert('Aqui você pode implementar o próximo minigame!');
}

function moveSnake(newDirection) {
    const allowedMoves = {
        'up': ['left', 'right'],
        'down': ['left', 'right'],
        'left': ['up', 'down'],
        'right': ['up', 'down']
    };

    if (allowedMoves[direction].includes(newDirection)) {
        direction = newDirection;
    }
}
