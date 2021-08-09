
/**
 * Takes length of array and value and returns an array filled with that value
 * @example
 * genArray(5, 1) => [1, 1, 1, 1, 1]
 * @param {Number} len 
 * @param {*} val 
 * @returns {Array} array
 */
export const genArray = (len, val) => {
  return Array.from({length: len}, () => val);
}


