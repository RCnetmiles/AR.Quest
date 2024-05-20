let canvas, ctx;
let snake, food, score, direction, intervalId;
let nickname;

// Function to show instructions screen
function showInstructions() {
  nickname = document.getElementById('nicknameInput').value; // Assuming you have an input with id="nicknameInput" in a separate screen
  if (nickname.trim() === '') {
    alert('Por favor, digite seu nickname.');
    return;
  }
  document.getElementById('nicknameScreen').style.display = 'none';
  document.getElementById('instructionsScreen').style.display = 'flex';
}

// Function to start the game
function startGame() {
  document.getElementById('instructionsScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'flex';
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  resetGame();
  intervalId = setInterval(gameLoop, 100);
}

// Function to reset the game to its initial state
function resetGame() {
  snake = [{ x: 10, y: 10 }]; // Initial snake position
  food = { x: 15, y: 15 }; // Random food position
  score = 0; // Initial score
  direction = 'right'; // Initial snake direction
}

// Main game loop function
function gameLoop() {
  update();
  draw();
}

// Function to update the game state (snake movement, food placement, etc.)
function update() {
  let head = { ...snake[0] }; // Create a copy of the snake's head

  switch (direction) {
    case 'right':
      head.x += 1; // Move the head to the right
      break;
    case 'left':
      head.x -= 1; // Move the head to the left
      break;
    case 'up':
      head.y -= 1; // Move the head up
      break;
    case 'down':
      head.y += 1; // Move the head down
      break;
  }

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    snake.push({}); // Grow the snake by one segment
    score += 10; // Increase the score by 10
    placeFood(); // Generate new food at a random location
  } else {
    // If the snake doesn't eat the food, remove the last segment
    snake.pop();
  }

  // Check if the game is over (snake hits walls or itself)
  if (isGameOver(head)) {
    endGame();
    return;
  }

  // Prepend the updated head to the snake array
  snake.unshift(head);
}

// Function to draw the game elements on the canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw the snake
  ctx.fillStyle = 'green';
  snake.forEach(part => {
    ctx.fillRect(part.x * 20, part.y * 20, 20, 20);
  });

  // Draw the food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

  // Draw the score
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${score}`, 10, 290); // Corrected score display
}

// Function to generate new food at a random location
function placeFood() {
  food = {
    x: Math.floor(Math.random() * 15),
    y: Math.floor(Math.random() * 15)
  };
}

// Function to check if the game is over
function isGameOver(head) {
  // Check if the snake hits the walls
  if (head.x < 0 || head.x >= 15 || head.y < 0 || head.y >= 15) {
    return true;
  }

  // Check if the snake hits itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
