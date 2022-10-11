export function generateRandomBinaryMaze(size) {

    let maze = [];
    for(var i = 0; i < size; i++)
    {
        let mazeRow = [];
        for(var j = 0; j < size; j++)
            mazeRow.push(Math.round(Math.random()));
        maze.push(mazeRow);
    }

    return maze;
}