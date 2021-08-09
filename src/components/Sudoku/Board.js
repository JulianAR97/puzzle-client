import Cell from './Cell';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const Board = (props) => {
  
  const genCellID = (i) => {
    let cellNum = ALPHABET[Math.floor(i / 9)] + i % 9
    return `c-${cellNum}`
  }

  const renderCells = (values) => {
    return values.map(
      (v, i) => {
        const id = genCellID(i)
        return (
          <Cell 
            key={i} 
            id={id} 
            value={v}
            handleChange={props.handleCellChange}
          />
        )
      }
        
    )
  }

  return (
    <div id="board">
      {renderCells(props.cellValues)}
    </div>
  )
}

export default Board