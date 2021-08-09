import './App.css';
import Navbar from './components/Nav/Navbar.js'
import Sudoku from './components/Sudoku/Sudoku.js'

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Sudoku></Sudoku>
    </div>
  );
}

export default App;
