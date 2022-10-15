import './App.css';
import Maze from './components/Maze';
import { cloneEmptyMaze, getMazeForAstarInput, getRandomNeighbour } from './utils/Maze';
import { useEffect, useState } from 'react';
import { getMaze } from './services/Maze';
import { getAStarPath } from './utils/astar';

function App() {

  const [maze,setMaze] = useState([]);
  const [emptyMaze,setEmptyMaze] = useState([]);
  const [startSolver,setStartSolver] = useState(false);
  const [playerPosition,setPlayerPosition] = useState([0,0]);

  const solveMaze = () => {

    const dest = [maze.length - 1,maze.length - 1];

    const isNodeDest = (x,y) => {
      return ((x === dest[0]) && (y === dest[1]))
    } 
    
    const currentAStarPath = getAStarPath(playerPosition,dest,getMazeForAstarInput(emptyMaze));
    console.log(currentAStarPath);
    let prev = playerPosition;
    let current = playerPosition;
    let currentMaze = maze;
    let currentEmptyMaze = emptyMaze;
    
    let pathIndex = 0;
    while(pathIndex < currentAStarPath.length)
    {
      if((currentMaze[current[0]][current[1]] === 1) || (isNodeDest(current[0],current[1])))
        break;
      
      currentMaze[prev[0]][prev[1]] = 'A';
      currentEmptyMaze[prev[0]][prev[1]] = 'A';
      prev = current;
      pathIndex++;
      current = currentAStarPath[pathIndex];
    }

    currentMaze[prev[0]][prev[1]] = 'P';
    currentEmptyMaze[prev[0]][prev[1]] = 'P';
    if(currentMaze[current[0][current[1]]] === 1)
      currentEmptyMaze[current[0]][current[1]] = 1;
    setPlayerPosition(prev);
    
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
