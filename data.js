/** @typedef Color
 * @property {number} red
 * @property {number} blue
 * @property {number} green
 * @property {number} alpha
 */

/**
 * @typedef Material
 * @property {string} name
 * @property {Color} color
 * @property {Array<[number, number]>} directions
 **/

/** @type {Color} */
const black = {
  red: 0,
  blue: 0,
  green: 0,
  alpha: 255,
};

const gray = {
  red: 69,
  blue: 69,
  green: 69,
  alpha: 255,
};

/** @type {Color} */
const red = {
  red: 255,
  blue: 0,
  green: 0,
  alpha: 255,
};

/** @type {Color} */
const blue = {
  red: 0,
  blue: 255,
  green: 0,
  alpha: 255,
};

/** @type {Material} */
const air = {
  name: 'air',
  color: black,
  directions: [],
};

/** @type {Material} */
const rock = {
  name: 'rock',
  color: gray,
  directions: [],
};

/** @type {Material} */
const sand = {
  name: 'sand',
  id: 2,
  color: red,
  directions: [
    [0, 1], //down first
    [-1, 1], //left
    [1, 1], //right
  ],
  move: function (grid, x, y) {
    const value = grid.get(x, y);

    const mat = materials[value];

    if (grid.get(x, y + 1, grid.buffer) == 0) {
      grid.set(x, y, 0, grid.buffer);
      grid.set(x, y + 1, this.id, grid.buffer);
      return;
    }

    const leftright = Math.random() > 0.5 ? -1 : 1;

    if (grid.get(x + leftright, y + 1, grid.buffer) == 0) {
      grid.set(x, y, 0, grid.buffer);
      grid.set(x + leftright, y + 1, this.id, grid.buffer);
      return;
    }

    if (grid.get(x - leftright, y + 1, grid.buffer) == 0) {
      grid.set(x, y, 0, grid.buffer);
      grid.set(x - leftright, y + 1, this.id, grid.buffer);
      return;
    }
  },
};

/** @type {Material} */
const water = {
  id: 3,
  name: 'water',
  color: blue,
  move: function (grid, x, y) {
    const value = grid.get(x, y);

    const mat = materials[value];

    if (grid.get(x, y + 1, grid.buffer) == 0) {
      grid.set(x, y, 0, grid.buffer);
      grid.set(x, y + 1, this.id, grid.buffer);
      return;
    }

    const leftright = Math.random() > 0.5 ? -1 : 1;

    if (grid.get(x + leftright, y + 1, grid.buffer) == 0) {
      grid.set(x, y, 0, grid.buffer);
      grid.set(x + leftright, y + 1, this.id, grid.buffer);
      return;
    }

    if (grid.get(x - leftright, y + 1, grid.buffer) == 0) {
      grid.set(x, y, 0, grid.buffer);
      grid.set(x - leftright, y + 1, this.id, grid.buffer);
      return;
    }

    if (grid.get(x + leftright, y, grid.buffer) == 0) {
      grid.set(x, y, 0, grid.buffer);
      grid.set(x + leftright, y, this.id, grid.buffer);
      return;
    }

    if (grid.get(x - leftright, y, grid.buffer) == 0) {
      grid.set(x, y, 0, grid.buffer);
      grid.set(x - leftright, y, this.id, grid.buffer);
      return;
    }
  },
  //   directions: [
  //     [0, 1],
  //     [-1, 1],
  //     [1, 1],
  //     [-1, 0], //left
  //     [1, 0], // right
  //   ],
};

export const materials = [air, rock, sand, water];
