import logo from './logo.svg';
import './App.css';
import Maze from './components/Maze';
import { generateRandomBinaryMaze } from './utils/Maze';

function App() {

  const maze = generateRandomBinaryMaze(101);

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Maze maze={maze}/>
  );
}

export default App;
