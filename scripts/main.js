
// grab the canvas object created in index.html
const canvas = document.getElementById("gameCanvas");

// pull a reference to the 2d context from that canvas
const ctx = canvas.getContext("2d");

// set the canvas width and height
canvas.width = 600;
canvas.height = 400;

/* INITIALIZE VARIABLES */
let lastTime;
let gameOver = false;

// start animation/game loop
requestAnimationFrame(gameLoop);

function gameLoop(timestamp) {
  // get the amount of time that has passed since last update
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;  

  /* UPDATE OBJECTS */
  if (gameOver) {
    ctx.font = "30px Arial"
    ctx.fillStyle = "#333"
    ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2)
  } else {
    /* START DRAWING NEXT FRAME */
    // clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  
  // next frame in loop
  requestAnimationFrame(gameLoop);
}


// adding event listeners
document.addEventListener('keydown', (event) => {
  alert(`you pressed keyCode ${event.keyCode}`);
});

document.addEventListener('keyup', (event) => {
  // all movement on any key up
})

