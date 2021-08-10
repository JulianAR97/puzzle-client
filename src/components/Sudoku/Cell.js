const Cell = (props) => {
  return (
    <div style={{aspectRatio: "1/1"}} className="cell" id={props.id}>
      <input 
        maxLength="1" 
        value={props.value || ''} 
        onChange={props.handleChange}>

      </input>
    </div>
  )
}

Cell.defaultProps = {
  value: 0
}

export default Cell