
// grab the canvas object created in index.html
const canvas = document.getElementById("gameCanvas");

// pull a reference to the 2d context from that canvas
const ctx = canvas.getContext("2d");

// set the canvas width and height
canvas.width = 760;
canvas.height = 400;

// initialize variables
let x = 10;
let y = canvas.height - 20;
let lastTime = 0;
let speed = 0;

// set starting color of square
ctx.fillStyle = "red";

// start animation/game loop
requestAnimationFrame(gameLoop);

function gameLoop(timestamp) {
  // get the amount of time that has passed since last update
  const deltaTime = timestamp - lastTime;

  // detect collision between square and right side of screen
  if (x > canvas.width - 11) {
    speed = 0;
    x = canvas.width - 11;
  }

  // detect collision between square and left side of screen
  if (x < 1) {
    speed = 0;
    x = 1;
  }
  
  // update x value based on speed and time passed
  x += speed / deltaTime;
  lastTime = timestamp;

  // clear screen
  ctx.clearRect(0, 0, 800, 600)

  // draw square in current position
  ctx.fillRect(x, y, 10, 10);

  // next frame in loop
  requestAnimationFrame(gameLoop);
}


// adding event listeners
document.addEventListener('keydown', (event) => {
  // move right/left based on arrow keys
  if(event.keyCode === 39) speed = 10;
  if(event.keyCode === 37) speed = -10;
  // alert(`you pressed keyCode ${event.keyCode}`);
});

document.addEventListener('keyup', (event) => {
  // all movement on any key up
  speed = 0;
})

