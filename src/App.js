import React, {useEffect, useState} from 'react';
import Sudoku from './components/Sudoku/Sudoku.js'
import About from './components/About/About.js'
import './App.css';

function App() {
  const aboutFP = "./components/About/About.md"
  const [aboutMD, setAboutMD] = useState('')

  useEffect(() => {
    import (`${aboutFP}`) // unclear why it can't find file without interpolation here
      .then(res => {
        fetch(res.default) // .default is path to file
          .then(res => res.text())
          .then(res => setAboutMD(res))
      })
      .catch(err => console.error(`error: `, err))
  })

  return (
    <div className="App">
      <Sudoku />
      <About content={aboutMD} />
    </div>
  );
}

export default App;
