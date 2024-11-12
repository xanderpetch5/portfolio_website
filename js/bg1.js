const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
}

window.addEventListener("resize", () => {
  setCanvasSize();
  // Reinitialize or adjust any canvas elements if necessary
});

setCanvasSize();

let waveArray = [];
let hue = 0;

// Wave class definition
class Wave {
  constructor(amplitudeFactor, wavelengthFactor, speed, offsetYFactor, color, opacity) {
    this.amplitudeFactor = amplitudeFactor;
    this.wavelengthFactor = wavelengthFactor;
    this.speed = speed;
    this.offsetYFactor = offsetYFactor;
    this.color = color;
    this.opacity = opacity;
    this.increment = 0;
  }

  draw() {
    const amplitude = canvas.height * this.amplitudeFactor;
    const wavelength = canvas.width * this.wavelengthFactor;
    const offsetY = canvas.height * this.offsetYFactor;

    ctx.strokeStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let x = 0; x <= canvas.width; x++) {
      const y = offsetY + Math.sin((x / wavelength) + this.increment) * amplitude;
      ctx.lineTo(x, y);
    }

    ctx.stroke();

    this.increment += this.speed;
  }
}

// Function to initialize waves
function initWaves() {
  waveArray = [];

  
  waveArray.push(
    new Wave(0.03, 0.025, 0.015, 0.575, "255, 255, 255", 0.3)
  );
  waveArray.push(
    new Wave(0.02, 0.02, 0.02, 0.5, "255, 255, 255", 0.5)
  );
  waveArray.push(
    new Wave(0.015, 0.03, 0.025, 0.425, "255, 255, 255", 0.7)
  );
}

// Function to draw the gradient background
function drawGradient() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, `hsl(${hue}, 60%, 40%)`);
  gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 60%, 40%)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGradient();

  waveArray.forEach((wave) => wave.draw());

  hue += 0.5;
  if (hue >= 360) hue = 0;

  requestAnimationFrame(animate);
}

initWaves();
animate();
