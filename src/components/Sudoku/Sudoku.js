import React, {useState} from 'react'
import Board from './Board.js'
import Menu from './Menu.js'
import ErrorContainer from './ErrorContainer.js'
import ReactLoading from 'react-loading'
import './Sudoku.css'
import {genArray, cellIDToIDX} from '../../Helpers.js'


const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'


const Sudoku = (props) => {
  const [state, setState] = useState(props)

  /** 
   * Takes an event object and modifies state.cellValues to reflect changes
   * @param {Object} event
  */
  const handleCellChange = (event) => {
    const target = event.target
    const value = Number(target.value) || 0 // protects against letters being entered
    const parent = target.parentElement
    const id = parent.id // ids are in form A0 to I8
    const row = id[0]
    const col = Number(id[1])
    const aIDX = ALPHABET.indexOf(row) * 9 + col // 00 to 80

    setState({
      ...state, 
      cellValues: [
        ...state.cellValues.slice(0, aIDX), 
        value, 
        ...state.cellValues.slice(aIDX + 1)
      ],
      errors: [] // remove errors when cell changes
    })    
  }

  const getCellValues = (solution, type) => {
    if (type === 'puzzle') {
      return solution
    } else {
      let idx = cellIDToIDX(state.activeCell)
      let newA = [...state.cellValues.slice(0, idx), solution[idx], ...state.cellValues.slice(idx + 1)]
      return newA
    }
  }
  
  /** 
   * Takes an array representing the current state.cellValues, fetches the solution, and then modifies state
   * @param {Array} puzzle
  */
  const getSolution = (puzzle, type) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(puzzle)
    }
    
    setState({...state, loading: true})
    fetch('https://puzzle-solver-node.herokuapp.com/solve', requestOptions)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setState({
        ...state, 
        cellValues: getCellValues(json.solution, type),
        errors: json.errors, 
        loading: false
      })})
  }

  const checkPuzzle = (puzzle) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(puzzle)
    }

    setState({...state, loading: true})
    fetch('https://puzzle-solver-node.herokuapp.com/check', requestOptions)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setState({
        ...state,
        errors: json.errors, 
        loading: false
      })})
  }
  
  const handleMenuClick = (event) => {
    let button = event.target.innerText
    switch(button) {
      case 'Solve Puzzle':
        getSolution(state.cellValues, 'puzzle')
        return
      case 'Solve Cell':
        getSolution(state.cellValues, 'cell')
        return
      case 'Clear':
        setState({...state, cellValues: genArray(81, 0), errors: []})
        return
      case 'Check':
        checkPuzzle(state.cellValues)
        return
      case 'Generate':
        fetch('http://sugoku.herokuapp.com/board?difficulty=easy')
          .then(res => res.json())
          .then(res => setState({...state, cellValues: res.board.flat()}))
        return
      default:
        return
    }
    
  }

  const handleFocus = (event) => {
    const target = event.target
    const parent = target.parentElement
    const id = parent.id // ids are in form A0 to I8
    console.log(id)
    setState({...state, activeCell: id})
  }

  const renderContent = () => {
    let loading = state.loading ? <ReactLoading id="loading" type="spin" color="#FFFFFF" /> : <></>
    let board = <Board handleFocus={handleFocus} handleCellChange={handleCellChange} cellValues={state.cellValues} />
    let menu = <Menu handleClick={handleMenuClick} items={state.menuItems} />
    let errorContainer = state.errors[0] ? <ErrorContainer errors={state.errors} /> : <></>
    let boardMenuContainer = <div className="boardMenuContainer">{board}{menu}</div>
    

    return (
      <>
        {errorContainer}
        {loading}
        {boardMenuContainer}
      </>
    )
  }

  console.log(state)
  return (
    <div id="sudoku">
      <h1>Sudoku Solver</h1>
      {renderContent()}
    </div>
  )
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
  activeCell: 'A1',
  errors: []

}
export default Sudoku