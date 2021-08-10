import './Menu.css'
const Menu = (props) => {
  const renderMenuButtons = (items) => {
    return items.map(
      (item, index) => 
        <div
          className="menuButton" 
          onClick={props.handleClick} 
          key={index}
        >
          <span>
            {item}
          </span>
        </div>
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