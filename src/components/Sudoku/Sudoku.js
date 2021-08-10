import React, {useState} from 'react'
import Board from './Board.js'
import Menu from './Menu.js'
import ErrorContainer from './ErrorContainer.js'
import ReactLoading from 'react-loading'
import './Sudoku.css'
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
    fetch('http://192.168.0.132:8001/solve', requestOptions)
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setState({
        ...state, 
        cellValues: json.solution,
        errors: json.errors, 
        loading: false
      })})
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

  const renderContent = () => {
    let loading = <ReactLoading id="loading" type="spin" color="#FFFFFF" />
    let board = <Board handleCellChange={handleCellChange} cellValues={state.cellValues} />
    let menu = <Menu handleClick={handleMenuClick} items={state.menuItems} />
    let errorContainer = <ErrorContainer errors={state.errors} />
    let boardMenuContainer = <div className="boardMenuContainer">{board}{menu}</div>
    
    if (state.loading) {
      return <>{loading}</>
    } else {
      return (
        <>
          {state.errors[0] ? errorContainer : <></>}
          {boardMenuContainer}
        </>
      )
    }
  }

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
  errors: []

}
export default Sudoku