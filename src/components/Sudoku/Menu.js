const Menu = (props) => {
  const renderMenuButtons = (items) => {
    return items.map(
      item => 
        <button>{item}</button>
    )
  }

  return (
    <div id="sudokuMenu">
      {renderMenuButtons(props.items)}
    </div>
  )
}

Menu.defaultProps = {
  items: [
    "Solve Cell",
    "Solve Puzzle",
    "Check",
    "Generate",
  ]
}

export default Menu