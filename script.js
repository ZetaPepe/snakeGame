let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [{ x: 8 * box, y: 8 * box }];
let direction = 'right';
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};

// 加载蛇头、蛇身和食物图标
let snakeHeadIcon = new Image();
snakeHeadIcon.src = 'snake-head.png';  // 替换成你的蛇头图标路径
let snakeBodyIcon = new Image();
snakeBodyIcon.src = 'snake-body.png';  // 替换成你的蛇身图标路径
let foodIcon = new Image();
foodIcon.src = 'food-icon.png';  // 替换成你的食物图标路径

// 游戏控制变量
let game;
let gameInterval = 400;  // 初始游戏间隔时间

// 创建背景
function createBG() {
  context.fillStyle = '#141414';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

// 创建蛇
function createSnake() {
  // 绘制蛇的头部（第一个元素）- 圆形，使用自定义图标
  context.save();  // 保存当前状态
  context.beginPath();
  context.arc(snake[0].x + box / 2, snake[0].y + box / 2, box / 2, 0, 2 * Math.PI); // 绘制圆形蛇头
  context.clip();  // 裁剪区域，确保图标不会超出圆形区域
  context.drawImage(snakeHeadIcon, snake[0].x, snake[0].y, box, box);  // 在圆形区域内绘制图标
  context.restore();  // 恢复到之前的状态

  // 绘制蛇的身体（从第二个元素开始），每个身体部分也是圆形
  for (let i = 1; i < snake.length; i++) {
    context.save();  // 保存当前状态
    context.beginPath();
    context.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2, 0, 2 * Math.PI);  // 绘制圆形蛇身
    context.clip();  // 裁剪区域，确保图标不会超出圆形区域
    context.drawImage(snakeBodyIcon, snake[i].x, snake[i].y, box, box); // 使用蛇身图标
    context.restore();  // 恢复到之前的状态
  }
}

// 绘制食物（圆形，自定义图标）
function drawFood() {
  context.save();  // 保存当前状态
  context.beginPath();
  context.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);  // 绘制圆形食物
  context.clip();  // 裁剪区域，确保图标不会超出圆形区域
  context.drawImage(foodIcon, food.x, food.y, box, box);  // 在圆形区域内绘制图标
  context.restore();  // 恢复到之前的状态
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
      clearInterval(game); // 停止游戏
      alert('Game over :(');  // 弹出结束提示
      resetGame();  // 重置游戏
      return; // 不继续执行
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

// 重置游戏函数
function resetGame() {
  // 重置游戏状态
  snake = [{ x: 8 * box, y: 8 * box }];
  direction = 'right';
  food.x = Math.floor(Math.random() * 15 + 1) * box;
  food.y = Math.floor(Math.random() * 15 + 1) * box;

  // 重新开始游戏
  game = setInterv
