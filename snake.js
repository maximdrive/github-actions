const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // Размер клетки sfaf
let snake = [{ x: 9 * box, y: 9 * box }]; // Начальная позиция змейки
let direction = 'RIGHT'; // Начальное направление
let food = spawnFood(); // Позиция еды

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}
   //hello world fasfa

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем еду
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
    
    // Рисуем змейку
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    // Старая голова змейки
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Двигаем змейку в зависимости от направления
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Проверка на поедание еды
    if (snakeX === food.x && snakeY === food.y) {
        food = spawnFood(); // Спавн новой еды
    } else {
        snake.pop(); // Удаляем последний элемент змейки
    }

    // Добавляем новую голову змейки
    const newHead = { x: snakeX, y: snakeY };

    // Проверка на столкновение с границами или самой собой
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Игра окончена!");
        return;
    }

    snake.unshift(newHead); // Добавляем новую голову в начало массива
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true; // Столкновение с телом змейки
        }
    }
    return false;
}

// Запускаем игру
const game = setInterval(draw, 100);
