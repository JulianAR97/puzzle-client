import React, { useState } from 'react';
import Cell from './Cell';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const Board = (props) => {
  const [cellValues, setCellValues] = useState(props.cellValues)

  const handleCellChange = (event) => {
    const target = event.target
    const value = Number(target.value)
    const parent = target.parentElement
    const id = parent.id.split('-')[1] // ids are in form c-A0 to c-I8
    const row = id[0]
    const col = Number(id[1])
    const aIDX = ALPHABET.indexOf(row) * 9 + col // 00 to 80
    setCellValues([...cellValues.slice(0, aIDX), value, ...cellValues.slice(aIDX + 1)])
    
  }

  const renderCells = (values) => {
    return values.map(
      (v, i) => {
        let cellNum = ALPHABET[Math.floor(i / 9)] + i % 9
        let id = `c-${cellNum}`
        return (
          <Cell 
            key={i} 
            id={id} 
            value={v}
            handleChange={handleCellChange}
          />
        )
      }
        
    )
  }

  console.log(cellValues)
  return (
    <div id="board">
      {renderCells(cellValues)}
    </div>
  )
}


const genDefaultValues = () => {
  return Array.from({length: 81}, () => 0);
}

Board.defaultProps = {
  cellValues: genDefaultValues()
}

export default Board