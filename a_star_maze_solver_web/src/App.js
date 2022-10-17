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
  const [timer,setTimer] = useState(0);
  const [gmax,setGmax] = useState(true);
  const [forward,setForward] = useState(true);
  const [adaptiveHeuristicGrid,setAdaptiveHeuristicGrid] = useState([]);

  const resetMaze = () => {

    setPlayerPosition([0,0]);
    setEmptyMaze(cloneEmptyMaze(maze));
    setTimer(0);
    setStartSolver(false);
    const newMaze = getMazeForAstarInput(maze);
    newMaze[0][0] = 'A';
    newMaze[maze.length-1][maze.length-1] = 'T';
    setMaze(newMaze);
  }

  const solveMaze = () => {

    const dest = [maze.length - 1,maze.length - 1];

    const isNodeDest = (x,y) => {
      return ((x === dest[0]) && (y === dest[1]))
    } 
    
    let currentAStarPath;
    if(forward)
      currentAStarPath = getAStarPath(playerPosition,dest,getMazeForAstarInput(emptyMaze),gmax).map(node => node.pos);
    else
    {
      currentAStarPath = getAStarPath(dest,playerPosition,getMazeForAstarInput(emptyMaze),gmax).map(node => node.pos);
      currentAStarPath = currentAStarPath.reverse();
    }
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

    if(currentMaze[current[0]][current[1]] === 1)
    {
      currentEmptyMaze[current[0]][current[1]] = 1;
      currentMaze[prev[0]][prev[1]] = 'P';
      currentEmptyMaze[prev[0]][prev[1]] = 'P';
      setPlayerPosition(prev);
    }
    else if(isNodeDest(current[0],current[1]))
    {
      currentMaze[prev[0]][prev[1]] = 'A';
      currentEmptyMaze[prev[0]][prev[1]] = 'A';
      currentMaze[current[0]][current[1]] = 'P';
      currentEmptyMaze[current[0]][current[1]] = 'P';
      setPlayerPosition(current);
    }
    
    setMaze(currentMaze);
    setEmptyMaze(currentEmptyMaze);
    setStartSolver(false);
  }

  useEffect(() => {
    if(startSolver)
    {
      const startTime = Date.now();
      solveMaze();
      const endTime = Date.now();
      setTimer(prevState => (prevState + endTime - startTime));
    }
  },[startSolver])

  useEffect(() => console.log("Total time till now in ms: " + timer.toString()),[timer]);

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
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div>
          <button className={gmax ? 'button-selected' : 'button-unselected'} onClick={() => setGmax(true)}>Gmax</button>
        </div>
        <div>
          <button className={gmax ? 'button-unselected' : 'button-selected'} onClick={() => setGmax(false)}>Gmin</button>
        </div>
        <div>
          <button className={forward ? 'button-selected' : 'button-unselected'} onClick={() => setForward(true)}>Forward AStar</button>
        </div>
        <div>
          <button className={forward ? 'button-unselected' : 'button-selected'} onClick={() => setForward(false)}>Backward AStar</button>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div>
          <button style={{margin: 2}} onClick={() => setStartSolver(true)}>Start solver</button>
        </div>
        <div>
          <button style={{margin: 2}} onClick={() => resetMaze()}>Reset Maze</button>
        </div>
      </div>
    </>
  );
}

export default App;
