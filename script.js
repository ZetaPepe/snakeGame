let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = [{ x: 8 * box, y: 8 * box }]
let direction = 'right'
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

// 加载蛇和食物的图标
let snakeIcon = new Image();
let foodIcon = new Image();
snakeIcon.src = 'snake-icon.png';  // 设定蛇图标的路径
foodIcon.src = 'food-icon.png';    // 设定食物图标的路径

function createBG() {
  context.fillStyle = '#141414'
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function createSnake() {
  // 用图标代替颜色绘制蛇
  for (i = 0; i < snake.length; i++) {
    context.drawImage(snakeIcon, snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  // 用图标代替颜色绘制食物
  context.drawImage(foodIcon, food.x, food.y, box, box);
}

document.addEventListener('keydown', update)

function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left'
  if (event.keyCode == 38 && direction != 'down') direction = 'up'
  if (event.keyCode == 39 && direction != 'left') direction = 'right'
  if (event.keyCode == 40 && direction != 'up') direction = 'down'
}

function startGame() {
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game)  // 改为clearInterval(game)以停止游戏
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

// 设置更长的时间间隔以降低蛇的速度，例如 200 毫秒
let game = setInterval(startGame, 200)
