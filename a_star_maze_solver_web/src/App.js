import logo from './logo.svg';
import './App.css';
import Maze from './components/Maze';
import { generateRandomBinaryMaze } from './utils/Maze';
import { useEffect, useState } from 'react';
import { getMaze } from './services/Maze';

function App() {

  const [maze,setMaze] = useState([]);

  useEffect(() => {
    getMaze()
    .then(response => setMaze(response.data.maze))
    .catch(error => console.log(error));
  },[])

  return (
    <Maze maze={maze}/>
  );
}

export default App;
