import './App.css';
import Maze from './components/Maze';
import { cloneEmptyMaze, getRandomNeighbour } from './utils/Maze';
import { useEffect, useState } from 'react';
import { getMaze } from './services/Maze';

function App() {

  const [maze,setMaze] = useState([]);
  const [emptyMaze,setEmptyMaze] = useState([]);
  const [startSolver,setStartSolver] = useState(false);

  const solveMaze = () => {
    let current = [0,0];
    let currentMaze = maze;
    let currentEmptyMaze = emptyMaze;
    while(currentMaze[current[0]][current[1]] != 'w')
    {
      currentMaze[current[0]][current[1]] = 'A';
      currentEmptyMaze[current[0]][current[1]] = 'A';
      current = getRandomNeighbour(current[0],current[1],currentMaze.length);
    }

    currentEmptyMaze[current[0]][current[1]] = 'w';
    setMaze(currentMaze);
    setEmptyMaze(currentEmptyMaze);
    setStartSolver(false);
  }

  useEffect(() => {
    if(startSolver)
      solveMaze();
  },[startSolver])

  useEffect(() => {
    getMaze()
    .then(response => {
      setMaze(response.data.maze);
      setEmptyMaze(cloneEmptyMaze(response.data.maze));
    })
    .catch(error => console.log(error));
  },[])

  return (
    <>
      <div style={{display: 'grid', gridTemplateColumns: '750px 750px', width: '1500px'}}>
        <Maze maze={maze}/>
        <Maze maze={emptyMaze}/>
      </div>
      <div>
        <button onClick={() => setStartSolver(true)}>Start solver</button>
      </div>
    </>
  );
}

export default App;
