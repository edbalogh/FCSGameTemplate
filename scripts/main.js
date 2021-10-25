
// grab the canvas object created in index.html
const canvas = document.getElementById("gameCanvas");

// pull a reference to the 2d context from that canvas
const ctx = canvas.getContext("2d");

// set the canvas width and height
canvas.width = 600;
canvas.height = 400;

/* INITIALIZE VARIABLES */
let lastTime = 0;
let score = 0;
let gameOver = false;

// initialze the paddle settings
let paddleWidth = 50;
let paddleHeight = 10;
let paddleSpeedX = 0;
let paddleX = canvas.width / 2;
let paddleY = canvas.height - 20;

// initialize the ball settings
let ball = {
  x: canvas.width / 2 + Math.random() * 45,
  y: canvas.height / 2 + Math.random() * 30,
  width: 5, height: 5, speed: { x: 25 + Math.random() *10, y: 25 + Math.random() * 10 }
};


// initialize bricks
const tBrick = {
  height: 10, width: 20,
  topBuffer: 40, sideBuffer: 10
};
let bricks = [];
const bricksInRow = (canvas.width - tBrick.sideBuffer * 2) / tBrick.width

for (let col = 0; col < 4; col++) {
  for (let row = 0; row < bricksInRow; row++ ) {
    bricks.push({
      x: tBrick.sideBuffer + (row * tBrick.width),
      y: tBrick.topBuffer + (col * tBrick.height),
      active: true,
      width: tBrick.width - 1,
      height: tBrick.height - 1
    })
  }
}

// start animation/game loop
requestAnimationFrame(gameLoop);

function gameLoop(timestamp) {
  // get the amount of time that has passed since last update
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  /*  COLLISION DETECTION */
  // detect collision between paddle and right side of screen
  if (paddleX > canvas.width - paddleWidth - 1) {
    paddleSpeedX = 0;
    paddleX = canvas.width - paddleWidth -1;
  }

  // detect collision between paddle and left side of screen
  if (paddleX < 1) {
    paddleSpeedX = 0;
    paddleX = 1;
  }

  // check for collision between ball and walls
  if (ball.x > canvas.width - 11 || ball.x < 1) {
    ball.speed.x *= -1;
  }

  if (ball.y < 1) {
    ball.speed.y *= -1;
  }

  if (ball.y > canvas.height - 11) {
    gameOver = true;
  } 

  // check collision between ball and paddle
  if(ball.y > paddleY - paddleHeight && ball.x > paddleX && ball.x < paddleX + paddleWidth) {
    ball.speed.y *= -1;
  }

  // check collision between ball and brick
  bricks.forEach(brick => {
    if(ball.y + ball.height > brick.y && ball.y < brick.y + brick.height
        && ball.x + ball.width > brick.x && ball.x < brick.x + brick.width) {
      brick.active = false;
      score += 10;
      if (ball.y + ball.height > brick.y || ball.y < brick.y + brick.height) {
        ball.speed.y *= -1;
      } else {
        ball.speed.x *= -1;
      }
    }
  })  

  /* UPDATE OBJECTS */
  if (gameOver) {
    ctx.font = "30px Arial"
    ctx.fillStyle = "#333"
    ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2)
  } else {
    // update paddle x value based on speed and time passed
    paddleX += paddleSpeedX / deltaTime;

    // update the ball on both axis
    ball.x += ball.speed.x / deltaTime;
    ball.y += ball.speed.y / deltaTime;

    /* START DRAWING NEXT FRAME */
    // clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // draw paddle in current position
    ctx.fillStyle = "blue";
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

    // draw the ball
    ctx.fillStyle = "#222";
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

    // draw brick(s)
    bricks.forEach(brick => {
      if (brick.active) {
        // console.log({ brick, ball })
        ctx.fillStyle = "red"
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
      }
    })

    // delete unused bricks
    bricks = bricks.filter(b => b.active);

    // show the score
    ctx.font = "14px Arial"
    ctx.fillStyle = "#333"
    ctx.fillText(`Score: ${score}`, canvas.width / 2 - 25, 15);
  }
  
  

  // next frame in loop
  requestAnimationFrame(gameLoop);
}


// adding event listeners
document.addEventListener('keydown', (event) => {
  // move right/left based on arrow keys
  if(event.keyCode === 39) paddleSpeedX = 50;
  if(event.keyCode === 37) paddleSpeedX = -50;
  if(event.keyCode === 32 && paddleSpeedX !== 0) {
    paddleSpeedX = paddleSpeedX > 0 ? paddleSpeedX = 100 : paddleSpeedX = -100;
  }

  // alert(`you pressed keyCode ${event.keyCode}`);
});

document.addEventListener('keyup', (event) => {
  // all movement on any key up
  if(event.keyCode === 32 && paddleSpeedX !== 0) {
    paddleSpeedX = paddleSpeedX > 0 ? 50 : -50;
  } else {
    paddleSpeedX = 0;
  }
})

