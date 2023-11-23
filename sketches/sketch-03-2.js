const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

function sketch({ context, width, height }) {
  const agents = [];

  for (let i = 0; i < 20; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = i + 1; j < agents.length; j++) {
        Math.random() * 244;

        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 200) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 10, 1);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        // context.strokeStyle = 'hsl(' + Math.random() * 360 + ', 80%, 50%)';
        context.stroke();
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
}
// adding a comment for a small change
canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-2, 4), random.range(-2, 4));
    this.radius = random.range(6, 16);
    this.color = `hsl(${Math.random() * 360}, 80%, 50%)`;
    console.log("🚀 ~ file: sketch-03-2.js:75 ~ Agent ~ constructor ~ this:", this)
  }

  // 

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.x >= height) this.vel.y *= -1;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    // Math.random() * 255;


    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 5;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.strokeStyle = this.color;
    // context.strokeStyle = 'hsl(' + Math.random() * 360 + ', 80%, 50%)';
      
      

    // The most important parts:
    // I try to understand the what I am doing
    // I go back and check my questions to make sure that they are correct and to the point

    // So, what is line 96 doing?
    // It is making the arc stroke color random, and it changing the color quickly
    // What is HSL?
    // HSL stands for the hue, the saturation, and the lightness
    // What do I want to do?
    // I want to get the color of each arc to change gradually
    // How do I do that?
    // I set 

    context.fill();
    context.stroke();

    context.restore();
  }
};