export function generateRandomBinaryMaze(size) {

    let maze = [];
    for(var i = 0; i < size; i++)
    {
        let mazeRow = [];
        for(var j = 0; j < size; j++)
        {
            if(i === 0 && j === 0)
                mazeRow.push('A');
            else if(i === size-1 && j === size-1)
                mazeRow.push('T');
            else
                mazeRow.push(Math.round(Math.random()) === 0 ? 0 : 1);
        }
        maze.push(mazeRow);
    }

    return maze;
}

export function cloneEmptyMaze(maze) {

    let emptyMaze = [];
    for(var i = 0; i < maze.length; i++)
    {
        let emptyMazeRow = [];
        for(var j = 0; j < maze.length; j++)
        {
            if(i === 0 && j === 0)
                emptyMazeRow.push('A');
            else if(i === maze.length-1 && j === maze.length-1)
                emptyMazeRow.push('T');
            else
                emptyMazeRow.push(0);
        }
        emptyMaze.push(emptyMazeRow)
    }

    return emptyMaze
}

export function getRandomNeighbour(x,y,size) {
    
    let neighbourValid = [true,true,true,true];
    const neighbourDistances = [[-1,0],[1,0],[0,-1],[0,1]];
    for(let i = 0; i < 4; i++)
    {
        const n_x = x + neighbourDistances[i][0];
        const n_y = y + neighbourDistances[i][1];
        if(n_x < 0 || n_x >= size || n_y < 0 || n_y >= size)
            neighbourValid[i] = false;
    }

    let neighbourNum = -1;
    while(neighbourNum === -1 || !neighbourValid[neighbourNum])
        neighbourNum = Math.floor(Math.random()*4);
    
    return [x + neighbourDistances[neighbourNum][0],y + neighbourDistances[neighbourNum][1]];
}

export function getMazeForAstarInput(maze) {

    let cleanMaze = [];

    for(let i = 0; i < maze.length; i++)
    {
        let cleanMazeRow = [];
        for(let j = 0; j < maze.length; j++)
        {
            if(maze[i][j] === 0 || maze[i][j] === 'T' || maze[i][j] === 'A' || maze[i][j] === 'P')
                cleanMazeRow.push(0);
            else if(maze[i][j] === 1)
                cleanMazeRow.push(1);
        }
        cleanMaze.push(cleanMazeRow);
    }

    return cleanMaze;
}