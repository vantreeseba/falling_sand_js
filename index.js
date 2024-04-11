import { Grid } from './grid.js';

const s = 128;

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

let fps = 90;
let fpsInterval = 1000 / fps;
let now, elapsed, then;
then = Date.now();

canvas.onmousemove = (ev) => {
  const wRatio = canvas.width / canvas.offsetWidth;
  const pixX = Math.floor(ev.offsetX * wRatio);
  const hRatio = canvas.height / canvas.offsetHeight;
  const pixY = Math.floor(ev.offsetY * hRatio);

  const val = Math.floor((Math.random() + 0.4) * 100) / 100;

  grid.set(pixX, pixY, val);
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
