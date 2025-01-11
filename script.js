let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [{ x: 8 * box, y: 8 * box }];
let direction = 'right';
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};

// 加载蛇和食物图标
let snakeIcon = new Image();
snakeIcon.src = 'snake-icon.png';  // 替换成你的蛇图标路径
let foodIcon = new Image();
foodIcon.src = 'food-icon.png';  // 替换成你的食物图标路径

// 创建背景
function createBG() {
  context.fillStyle = '#141414';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

// 创建蛇
function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.drawImage(snakeIcon, snake[i].x, snake[i].y, box, box);  // 使用图标绘制蛇
  }
}

// 绘制食物
function drawFood() {
  context.drawImage(foodIcon, food.x, food.y, box, box);  // 使用图标绘制食物
}

// 键盘控制
document.addEventListener('keydown', update);

function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left';
  if (event.keyCode == 38 && direction != 'down') direction = 'up';
  if (event.keyCode == 39 && direction != 'left') direction = 'right';
  if (event.keyCode == 40 && direction != 'up') direction = 'down';
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
  // 处理蛇越界
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

  // 检查蛇是否撞到自己
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game);
      alert('Game over :(');
      startGame();
    }
  }

  // 更新游戏背景、蛇和食物
  createBG();
  createSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // 根据当前方向更新蛇的位置
  if (direction == 'right') snakeX += box;
  if (direction == 'left') snakeX -= box;
  if (direction == 'up') snakeY -= box;
  if (direction == 'down') snakeY += box;

  // 检查蛇是否吃到食物
  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  // 向蛇的头部添加新的位置
  snake.unshift(newHead);
}

// 设置游戏间隔时间来控制速度
let game = setInterval(startGame, 400);
