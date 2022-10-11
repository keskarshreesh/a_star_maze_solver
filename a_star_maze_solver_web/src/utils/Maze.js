export function generateRandomBinaryMaze(size) {

    let maze = [];
    for(var i = 0; i < size; i++)
    {
        let mazeRow = [];
        for(var j = 0; j < size; j++)
        {
            if(i == 0 && j == 0)
                mazeRow.push('A');
            else if(i == size-1 && j == size-1)
                mazeRow.push('T');
            else
                mazeRow.push(Math.round(Math.random()) == 0 ? 'c' : 'w');
        }
        maze.push(mazeRow);
    }

    return maze;
}