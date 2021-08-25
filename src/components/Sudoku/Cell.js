const Cell = (props) => {
  return (
    <div className="cell" id={props.id}>
      <input 
        maxLength="1" 
        value={props.value || ''} 
        onChange={props.handleChange}
        onFocus={props.handleFocus}
      />
    </div>
  )
}

Cell.defaultProps = {
  value: 0
}

export default Cell