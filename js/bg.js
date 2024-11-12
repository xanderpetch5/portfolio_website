const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let starsArray = [];

class Star {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
  }

  draw() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = 0 - this.radius;
      this.x = Math.random() * canvas.width;
      this.speed = Math.random() * 1 + 0.2;
    }
    this.draw();
  }
}

function initStars() {
  starsArray = [];
  const numberOfStars = 200;
  for (let i = 0; i < numberOfStars; i++) {
    const radius = Math.random() * 1.5;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random() * 1 + 0.2;
    starsArray.push(new Star(x, y, radius, speed));
  }
}

function animateStars() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Creates a trailing effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let star of starsArray) {
    star.update();
  }
  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
});

initStars();
animateStars();
