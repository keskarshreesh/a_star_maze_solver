import { AStarMinHeap, Node, posToString } from "./priority_queue";

export function getAStarPath(startPos,endPos,grid,gmax) {
    
    const endNode = AStar(startPos,endPos,grid,gmax);

    let path = [];
    let currentNode = endNode;

    while (currentNode != null) {
    	path.unshift (currentNode);
    	currentNode = currentNode.pathParent;
    }
    
    return path;
}

function AStar(startPos, endPos, grid, gmax){

    let aStarHeap = new AStarMinHeap(gmax);

    let closedListSet = new Set();

    const startNode = new Node(startPos,endPos,0,null);
    aStarHeap.insertNode(startNode);

    let leastValueNode = null;
    let endNode = null;

    while(aStarHeap.size() !== 0){

        if(leastValueNode != null
            && aStarHeap.isNodeInOpenList(endPos)
            && (leastValueNode.f > aStarHeap.heap[aStarHeap.getNodeInOpenList(endPos)].path_cost_g))
            break;
        
        leastValueNode = aStarHeap.getMinNode();
        
        let adjacents = getAdjacents(leastValueNode,grid,closedListSet);

        for(let adjacent = 0; adjacent < adjacents.length; adjacent++){
            
            let distance = leastValueNode.path_cost_g + 1;
            let currentAdjacentPos = adjacents[adjacent];
          	
          	if(!closedListSet.has(posToString(currentAdjacentPos[0],currentAdjacentPos[1])))
          	{
                if(currentAdjacentPos[0] === endPos[0] && currentAdjacentPos[1] === endPos[1])
                {
                    if(!closedListSet.has(posToString(endPos[0],endPos[1])))
                    {
                        closedListSet.add(endPos);
                        endNode = new Node(endPos,endPos,distance,leastValueNode);
                    }
                    else if(distance < endNode.path_cost_g)
                    {
                        endNode.path_cost_g = distance;
                        endNode.f = distance;
                    }
                    
                    continue;
                }  
                if(!aStarHeap.isNodeInOpenList(currentAdjacentPos))
                {
                    const currentAdjacentNode = new Node(currentAdjacentPos,endPos,distance,leastValueNode);
                    aStarHeap.insertNode(currentAdjacentNode);
                }
                else
                    aStarHeap.updateNodeIfLessPathCost(currentAdjacentPos,distance,leastValueNode,endPos);
            }
        }

        closedListSet.add(posToString(leastValueNode.pos[0],leastValueNode.pos[1]));
    }

    return endNode;
}

function getAdjacents(leastValueNode,grid,closedListSet){
    let neighbours_list = [];
    let row = leastValueNode.pos[0];
    let col = leastValueNode.pos[1];

    if(row!==0){
        if((grid[row][col] === 0) && (!closedListSet.has(posToString(row,col))))
        neighbours_list.push([row-1,col]);
    }
    if(col!==0){
        if((grid[row][col] === 0) && (!closedListSet.has(posToString(row,col))))
        neighbours_list.push([row,col-1]);
    }
    if(col !== grid[0].length-1){
        if((grid[row][col] === 0) && (!closedListSet.has(posToString(row,col))))
        neighbours_list.push([row,col+1])
    }
    if(row !== grid.length-1){
        if((grid[row][col] === 0) && (!closedListSet.has(posToString(row,col))))
        neighbours_list.push([row+1,col]);
    }

    return neighbours_list;
}

