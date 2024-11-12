// bg.js

// Get the canvas element and set up the context
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// Set canvas to full screen
function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", setCanvasSize);
setCanvasSize();

// Mouse object for interactivity
const mouse = {
  x: null,
  y: null,
  radius: 100,
};

// Update mouse position
window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Create an array to store particles
let particlesArray;

// Particle class
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // Draw particle
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Update particle position
  update() {
    // Move particles in wave patterns
    this.x += Math.sin(this.directionX);
    this.y += Math.cos(this.directionY);

    // Create a hovering effect
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;

    // Interactivity with mouse
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius + this.size) {
      this.size = 8;
    } else {
      // Return to original size
      if (this.size > 3) this.size -= 0.1;
      if (this.size < 3) this.size = 3;
    }

    this.draw();
  }
}

function initParticles() {
  particlesArray = [];
  const numberOfParticles = (canvas.width * canvas.height) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const directionX = Math.random() * 0.6 - 0.3;
    const directionY = Math.random() * 0.6 - 1.2;
    const color = `hsl(${200}, 50%, 50%)`;
    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGradient();
  connectParticles();
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  requestAnimationFrame(animateParticles);
}

// Create gradient background
function drawGradient() {
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 5,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 1.5
  );
  gradient.addColorStop(0, "#0f2027");
  gradient.addColorStop(0.5, "#203a43");
  gradient.addColorStop(1, "#2c5364");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Connect particles with lines
function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        let opacity = 1 - distance / 100;
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

initParticles();
animateParticles();
