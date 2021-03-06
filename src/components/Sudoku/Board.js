import Cell from './Cell';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const Board = (props) => {

  const renderCells = (values) => {
    return values.map(
      (v, i) => {
        const id = ALPHABET[Math.floor(i / 9)] + i % 9
        return (
          <Cell 
            key={i} 
            id={id} 
            value={v}
            handleChange={props.handleCellChange}
            handleFocus={props.handleFocus}
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