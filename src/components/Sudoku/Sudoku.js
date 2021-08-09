import React, {useState} from 'react'
import Board from './Board.js'
import Menu from './Menu.js'
import {genArray} from '../../Helpers.js'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'


const Sudoku = (props) => {
  const [state, setState] = useState(props)

  /** 
   * Takes an event object and modifies state.cellValues to reflect changes
   * @param {Object} event
  */
  const handleCellChange = (event) => {
    const target = event.target
    const value = Number(target.value)
    const parent = target.parentElement
    const id = parent.id.split('-')[1] // ids are in form c-A0 to c-I8
    const row = id[0]
    const col = Number(id[1])
    const aIDX = ALPHABET.indexOf(row) * 9 + col // 00 to 80

    setState({
      ...state, 
      cellValues: [
        ...state.cellValues.slice(0, aIDX), 
        value, 
        ...state.cellValues.slice(aIDX + 1)
      ]
    })    
  }

  /** 
   * Takes an array representing the current state.cellValues, fetches the solution, and then modifies state
   * @param {Array} puzzle
  */
  const getSolution = (puzzle) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(puzzle)
    }
    
    setState({...state, loading: true})
    fetch('http://localhost:8001/solve', requestOptions)
      .then(res => res.json())
      .then(json => setState({
        ...state, 
        cellValues: json, 
        loading: false
      }))
  }
  

  const handleMenuClick = (event) => {
    let button = event.target.innerText
    switch(button) {
      case 'Solve Puzzle':
        getSolution(state.cellValues)
        return
      case 'Clear':
        setState({...state, cellValues: genArray(81, 0)})
        return
      default:
        return
    }
    
  }

  if (state.loading) {
    return <div>loading...</div>
  } else {
    return (
      <div>
        <Board handleCellChange={handleCellChange} cellValues={state.cellValues}></Board>
        <Menu handleClick={handleMenuClick} items={state.menuItems}></Menu>
      </div>
    )
  }
}



Sudoku.defaultProps = {
  menuItems: [
    "Solve Cell",
    "Solve Puzzle",
    "Clear",
    "Check",
    "Generate"
  ],
  cellValues: genArray(81, 0),
  loading: false,

}
export default Sudoku