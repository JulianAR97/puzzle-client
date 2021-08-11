const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

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

/**
 * Takes an array idx and returns the cell id
 * @example
 * idxtoCellID(12) => "B3"
 * @param {Number} idx 
 * @returns cellID
 */
export const idxToCellID = (idx) => {
  return ALPHABET[Math.floor(idx / 9)] + idx % 9
}

/** 
 * Takes a cellID and returns the array index
 * @example
 * cellIDToIDX("B3") => 12
 * @param {String} cellID
 * @returns idx
*/
export const cellIDToIDX = (cellID) => {
  const row = cellID[0]
  const col = Number(cellID[1])
  return ALPHABET.indexOf(row) * 9 + col
}

export const getNewCell = (cellID, key) => {
  // keys will change the idx by this much
  const keyMap = {
    'w': -9,
    'a': -1,
    's': 9,
    'd': 1,
    'ArrowUp': -9,
    'ArrowLeft': -1,
    'ArrowDown': 9,
    'ArrowRight': 1
  }

  let idx = cellIDToIDX(cellID)
  let keyVal = keyMap[key]
  let newIdx = idx + keyVal;
  return newIdx < 0 || newIdx > 80 ? cellID : idxToCellID(newIdx)

}
