import { materials } from './data.js';

export class Grid {
  /** @type number */
  height = 0;
  /** @type number */
  width = 0;
  /** @type Array<number> */
  data = [];
  /** @type Array<number> */
  buffer = [];

  /**
   * @param {number} height
   * @param {number} width
   */
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.data = new Array(height * width);

    for (var i = 0; i < this.data.length; i++) {
      this.data[i] = 0;
    }
  }

  update() {
    this.buffer = this.data.slice(0);

    for (var y = this.height - 1; y >= 0; y--) {
      for (var x = 0; x < this.width - 1; x++) {
        const value = this.get(x, y);

        const mat = materials[value];
        if(mat.move) {
          mat.move(this, x, y);
        }

//         for (let direction of mat.directions) {
//           const destX = x + direction[0];
//           const destY = y + direction[1];
//           const destEmpty = this.get(destX, destY, this.buffer) == 0;
//           if (destEmpty) {
//             this.set(x, y, 0, this.buffer);
//             this.set(destX, destY, value, this.buffer);
//             break;
//           }
//         }
      }
    }

    this.data = this.buffer.slice(0);
  }
  //         const emptyBelow = this.get(x, y + 1) == 0;
  //         const emptyBelowL = this.get(x - 1, y + 1) == 0;
  //         const emptyBelowR = this.get(x + 1, y + 1) == 0;

  //         if (filled) {
  //           if (emptyBelow) {
  //             this.set(x, y, 0, this.buffer);
  //             this.set(x, y + 1, value, this.buffer);
  //           } else if (emptyBelowL) {
  //             this.set(x, y, 0, this.buffer);
  //             this.set(x - 1, y + 1, value, this.buffer);
  //           } else if (emptyBelowR) {
  //             this.set(x, y, 0, this.buffer);
  //             this.set(x + 1, y + 1, value, this.buffer);
  //           }
  //         }

  toPixels() {
    const pixels = new Uint8ClampedArray(this.height * this.width * 4);

    for (let i = 0; i < pixels.length; i += 4) {
      const id = this.data[Math.floor(i / 4)];
      const mat = materials[id];

      pixels[i] = mat.color.red; //red
      pixels[i + 1] = mat.color.green; // green
      pixels[i + 2] = mat.color.blue; // blue
      pixels[i + 3] = mat.color.alpha; // alpha
    }

    return pixels;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} value
   * @returns {number}
   */
  set(x, y, value, arr = this.data) {
    if (x < 0 || x > this.width || y < 0 || y > this.height) {
      return -1;
    }
    return (arr[x + y * this.height] = value);
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {number}
   */
  get(x, y, arr = this.data) {
    if (x < 0 || x > this.width || y < 0 || y > this.height) {
      return -1;
    }

    return arr[x + y * this.height];
  }
}
