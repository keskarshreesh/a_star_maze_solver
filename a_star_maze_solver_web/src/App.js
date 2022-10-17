import './App.css';
import Maze from './components/Maze';
import { cloneEmptyMaze, getMazeForAstarInput, initializeAdaptiveHeuristicGrid } from './utils/Maze';
import { useEffect, useState } from 'react';
import { getMaze } from './services/Maze';
import { getAStarPath } from './utils/astar';

function App() {

  const [maze,setMaze] = useState([]);
  const [emptyMaze,setEmptyMaze] = useState([]);
  const [startedSolver,setStartedSolver] = useState(false);
  const [continueSolver,setContinueSolver] = useState(false);
  const [playerPosition,setPlayerPosition] = useState([0,0]);
  const [timer,setTimer] = useState(0);
  const [gmax,setGmax] = useState(true);
  const [forward,setForward] = useState(true);
  const [adaptive,setAdaptive] = useState(false);
  const [adaptiveHeuristicGrid,setAdaptiveHeuristicGrid] = useState([]);

  const resetMaze = () => {

    setPlayerPosition([0,0]);
    setEmptyMaze(cloneEmptyMaze(maze));
    setAdaptiveHeuristicGrid(initializeAdaptiveHeuristicGrid(maze.length));
    setTimer(0);
    setStartedSolver(false);
    setContinueSolver(false);
    const newMaze = getMazeForAstarInput(maze);
    newMaze[0][0] = 'A';
    newMaze[maze.length-1][maze.length-1] = 'T';
    setGmax(true);
    setForward(true);
    setAdaptive(false);
    setMaze(newMaze);
  }

  const getHeuristicRepeated = (pos,dest) => (Math.abs(pos[0] - dest[0]) + Math.abs(pos[1] - dest[1]));

  const getHeuristicAdaptive = (pos,dest) => adaptiveHeuristicGrid[pos[0]][pos[1]];

  const solveMaze = () => {

    const dest = [maze.length - 1,maze.length - 1];

    const isNodeDest = (x,y) => {
      return ((x === dest[0]) && (y === dest[1]))
    }

    const getHeuristicCurrent = adaptive ? getHeuristicAdaptive : getHeuristicRepeated;
    
    let currentAStarPathNodes;
    if(forward)
      currentAStarPathNodes = getAStarPath(playerPosition,dest,getMazeForAstarInput(emptyMaze),gmax,getHeuristicCurrent);
    else
    {
      currentAStarPathNodes = getAStarPath(dest,playerPosition,getMazeForAstarInput(emptyMaze),gmax,getHeuristicCurrent);
      currentAStarPathNodes = currentAStarPathNodes.reverse();
    }

    const currentAStarPath = currentAStarPathNodes.map(node => node.pos);

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
      if(adaptive && (maze.length > 0))
      {
        const currentAdaptiveHeuristicGrid = adaptiveHeuristicGrid;
        const endNode = currentAStarPathNodes[currentAStarPathNodes.length-1];
        for(let i = 0; i < pathIndex; i++)
        {
          const aStarPathNode = currentAStarPathNodes[i];
          currentAdaptiveHeuristicGrid[aStarPathNode.pos[0]][aStarPathNode.pos[1]] = endNode.path_cost_g - aStarPathNode.path_cost_g;
        }

        setAdaptiveHeuristicGrid(currentAdaptiveHeuristicGrid);
      }
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
      setStartedSolver(false);
    }
    
    setMaze(currentMaze);
    setEmptyMaze(currentEmptyMaze);
    setContinueSolver(false);
  }

  useEffect(() => {
    if(startedSolver && continueSolver)
    {
      setTimeout(() => {
        const startTime = Date.now();
        solveMaze();
        const endTime = Date.now();
        setTimer(prevState => (prevState + endTime - startTime));
      },500)
    }
    else if(startedSolver && (!continueSolver) && (!((playerPosition[0] === maze.length - 1) && (playerPosition[1] === maze.length - 1))))
      setContinueSolver(true);
  },[continueSolver])

  useEffect(() => {
    if(startedSolver)
      setContinueSolver(true);
  },[startedSolver])

  useEffect(() => console.log("Total time till now in ms: " + timer.toString()),[timer]);

  useEffect(() => {
    getMaze()
    .then(response => {
      setMaze(response.data.maze);
      setEmptyMaze(cloneEmptyMaze(response.data.maze));
      setAdaptiveHeuristicGrid(initializeAdaptiveHeuristicGrid(response.data.maze.length));
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
        <div>
          <button className={adaptive ? 'button-selected' : 'button-unselected'} onClick={() => setAdaptive(true)}>Adaptive AStar</button>
        </div>
        <div>
          <button className={adaptive ? 'button-unselected' : 'button-selected'} onClick={() => setAdaptive(false)}>Repeated AStar</button>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div>
          <button style={{margin: 2}} onClick={() => setStartedSolver(true)}>Start solver</button>
        </div>
        <div>
          <button style={{margin: 2}} onClick={() => resetMaze()}>Reset Maze</button>
        </div>
      </div>
    </>
  );
}

export default App;
