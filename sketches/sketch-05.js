const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

let manager;

let text = 'A';
let fontSize = 1200;
let fontFamily = 'Gabriola';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width  = cols;
  typeCanvas.height = rows;
  
  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    fontSize = cols * 1.2;

    typeContext.fillStyle = 'white';

    typeContext.font = fontSize + 'px ' + fontFamily; // "1200px Gabriola"
    typeContext.font = `${fontSize}px ${fontFamily}`; // "1200px Gabriola"

    typeContext.textBaseline = 'middle';
    context.textAlign = 'center';


    const metrics = typeContext.measureText(text);
    const mX = metrics.actualBoundingBoxLeft * -1;
    const mY = metrics.actualBoundingBoxAscent * -1;
    const mW = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mH = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (cols  - mW) * 0.5 - mX;
    const ty = (rows - mH) * 0.5 - mY;

    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    typeContext.rect(mX, mY, mW, mH);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    // context.drawImage(typeCanvas, 0, 0);

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1)context.font = `${cell * 4}px ${fontFamily}`;

      context.fillStyle = `white`;

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      // context.fillRect(0, 0, cell, cell);

      // context.beginPath();
      // context.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      // context.fill();

      context.fillText(glyph, 0, 0);

      context.restore();
    }
  };
};

const getGlyph = (v) => {
  if (v < 50) return '';
  if (v < 100) return 'kit';
  if (v < 150) return '+';
  if (v < 200) return 'cat';

  const glyphs = '_= /'.split('');


  return random.pick(glyphs);
}

const onKeyDown = (e) => {
    text = e.key.toUpperCase();
    manager.render();
}

document.addEventListener('keydown', onKeyDown);


const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

start();





/*
const url = 'https://picsum.photos/200';


const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};


const start = async () => {
  const img = await loadMeSomeImage(url);
  console.log('image width', img.width);
  console.log('this line');
};

// const start = () => {
//   loadMeSomeImage(url).then(img => {
//     console.log('image width', img.width);
//   });
//   console.log('this line');
// };

start();

*/