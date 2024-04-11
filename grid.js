export class Grid {
  /** @type number */
  height = 0;
  /** @type number */
  width = 0;
  /** @type Array<number> */
  data = [];

  /**
   * @param {number} height
   * @param {number} width
   */
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.data = new Array(height * width);

    for (var i = 0; i < this.data.length; i++) {
      this.data[i] = Math.random() > 0.9 ? Math.floor((Math.random() + 0.2) * 100) / 100 : 0;
    }
  }

  update() {
    for (var y = this.height; y >= 0; y--) {
      for (var x = 0; x < this.width; x++) {
        const value = this.get(x, y);
        const filled = value > 0;
        const emptyBelow = this.get(x, y + 1) == 0;
        const emptyBelowL = this.get(x - 1, y + 1) == 0;
        const emptyBelowR = this.get(x + 1, y + 1) == 0;

        if (filled) {
          if (emptyBelow) {
            this.set(x, y, 0);
            this.set(x, y + 1, value);
          } else if (emptyBelowL) {
            this.set(x, y, 0);
            this.set(x - 1, y + 1, value);
          } else if (emptyBelowR) {
            this.set(x, y, 0);
            this.set(x + 1, y + 1, value);
          }
        }
      }
    }
  }

  toPixels() {
    const pixels = new Uint8ClampedArray(this.height * this.width * 4);

    for (let i = 0; i < pixels.length; i += 4) {
      const value = this.data[Math.floor(i / 4)] * 255;
      pixels[i] = value; //red
      pixels[i + 1] = value / 10; // green
      pixels[i + 2] = value / 10; // blue
      pixels[i + 3] = 255; // alpha
    }

    return pixels;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} value
   * @returns {number}
   */
  set(x, y, value) {
    if (x < 0 || x > this.width || y < 0 || y > this.height) {
      return -1;
    }
    return (this.data[x + y * this.height] = value);
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {number}
   */
  get(x, y) {
    if (x < 0 || x > this.width || y < 0 || y > this.height) {
      return -1;
    }

    return this.data[x + y * this.height];
  }
}
