let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = [{ x: 8 * box, y: 8 * box }]
let direction = 'right'
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG() {
  context.fillStyle = '#141414'
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function createSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'green'
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

function drawFood() {
  context.fillStyle = 'red'
  context.fillRect(food.x, food.y, box, box)
}

// 键盘控制
document.addEventListener('keydown', update)

function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left'
  if (event.keyCode == 38 && direction != 'down') direction = 'up'
  if (event.keyCode == 39 && direction != 'left') direction = 'right'
  if (event.keyCode == 40 && direction != 'up') direction = 'down'
}

// 触摸控制
let touchStartX, touchStartY, touchEndX, touchEndY;
canvas.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}, false);

canvas.addEventListener('touchend', (event) => {
  touchEndX = event.changedTouches[0].clientX;
  touchEndY = event.changedTouches[0].clientY;

  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;

  // 判断滑动方向
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // 水平滑动
    if (deltaX > 0 && direction != 'left') direction = 'right';  // 向右滑动
    if (deltaX < 0 && direction != 'right') direction = 'left';  // 向左滑动
  } else {
    // 垂直滑动
    if (deltaY > 0 && direction != 'up') direction = 'down';    // 向下滑动
    if (deltaY < 0 && direction != 'down') direction = 'up';    // 向上滑动
  }
}, false);

function startGame() {
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(startGame)
      alert('Game over :(')
      startGame()
    }
  }

  createBG()
  createSnake()
  drawFood()

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (direction == 'right') snakeX += box
  if (direction == 'left') snakeX -= box
  if (direction == 'up') snakeY -= box
  if (direction == 'down') snakeY += box

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop()
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box
    food.y = Math.floor(Math.random() * 15 + 1) * box
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

let game = setInterval(startGame, 100)
