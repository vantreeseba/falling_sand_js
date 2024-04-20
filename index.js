import { materials } from './data.js';
import { Grid } from './grid.js';

const s = 384;

const grid = new Grid(s, s);
/** @type HTMLCanvasElement */
const canvas = document.createElement('canvas');
canvas.height = s;
canvas.width = s;

document.body.style.margin = '0px';
document.body.style.padding = '0px';

//build material selector
const select = document.createElement('select');
for (let material of materials) {
  const option = document.createElement('option');
  option.text = material.name;
  option.value = materials.findIndex((x) => x.name == material.name).toString();
  select.append(option);
}
document.body.appendChild(select);

let currentVal = 1;
select.onchange = (ev) => (currentVal = Number(ev.target.value));

canvas.style.imageRendering = 'pixelated';
canvas.style.objectFit = 'cover';
canvas.style.width = '100vw';
// canvas.style.height = '90vh';

document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let fps = 120;
let fpsInterval = 1000 / fps;
let now, elapsed, then;
then = Date.now();

let mouseDown = false;

canvas.ontouchstart = (ev) => (mouseDown = true);
canvas.ontouchend = (ev) => (mouseDown = false);
// canvas.ontouchcancel = (ev) => (mouseDown = false);
canvas.onmousedown = (ev) => (mouseDown = true);
canvas.onmouseup = (ev) => (mouseDown = false);
canvas.onmouseleave = (ev) => (mouseDown = false);

const placePixels = (ev) => {
  if (mouseDown == false) {
    return;
  }
  const wRatio = canvas.width / canvas.offsetWidth;
  const pixX = Math.floor(ev.offsetX * wRatio);
  const hRatio = canvas.height / canvas.offsetHeight;
  const pixY = Math.floor(ev.offsetY * hRatio);

  const brushSize = 10;
  const offset = Math.floor(brushSize / 2);
  for (let x = -offset; x <= offset; x++) {
    for (let y = -offset; y <= offset; y++) {
      grid.set(pixX + x, pixY + y, currentVal);
    }
  }
};

canvas.onmousemove = placePixels;
canvas.ontouchmove = placePixels;

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
