import { Grid } from './grid.js';

const s = 384;

const grid = new Grid(s, s);
/** @type HTMLCanvasElement */
const canvas = document.createElement('canvas');
canvas.height = s;
canvas.width = s;

canvas.style.imageRendering = 'pixelated';
canvas.style.objectFit = 'cover';
canvas.style.height = '90vh';

document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let fps = 120;
let fpsInterval = 1000 / fps;
let now, elapsed, then;
then = Date.now();

// let mouseDown = false;
//
// canvas.onmousedown = (ev) => (mouseDown = true);
// canvas.onmouseup = (ev) => (mouseDown = false);
// canvas.onmouseleave = (ev) => (mouseDown = false);

canvas.onmousemove = (ev) => {
  //   if (mouseDown == false) {
  //     return;
  //   }
  const wRatio = canvas.width / canvas.offsetWidth;
  const pixX = Math.floor(ev.offsetX * wRatio);
  const hRatio = canvas.height / canvas.offsetHeight;
  const pixY = Math.floor(ev.offsetY * hRatio);

  const val = Math.floor((Math.random() + 0.4) * 100) / 100;

  const brushSize = 5;
  const offset = Math.floor(brushSize / 2);
  for (let x = -offset; x <= offset; x++) {
    for (let y = -offset; y <= offset; y++) {
      grid.set(pixX + x, pixY + y, val);
    }
  }

  //   grid.set(pixX, pixY, val);
  //   grid.set(pixX, pixY - 1, val);
  //   grid.set(pixX, pixY + 1, val);
  //   grid.set(pixX + 1, pixY, val);
  //   grid.set(pixX - 1, pixY, val);
  //   grid.set(pixX + 1, pixY + 1, val);
  //   grid.set(pixX - 1, pixY - 1, val);
  //   grid.set(pixX - 1, pixY + 1, val);
  //   grid.set(pixX + 1, pixY - 1, val);
};

const render = () => {
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    const pixels = grid.toPixels();
    const imageData = new ImageData(pixels, s, s);
    ctx.putImageData(imageData, 0, 0);

    grid.update();
  }

  window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);

console.log('hi');
