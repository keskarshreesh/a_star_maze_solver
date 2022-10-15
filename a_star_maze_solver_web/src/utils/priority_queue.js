export class Node {

    pos = [-1,-1];
    path_cost_g = 10205;
    f = 20210;
    pathParent = null

    constructor(pos,dest,g_new,pathParent) {
      const h = Math.abs(pos[0] - dest[0]) + Math.abs(pos[1] - dest[1]);
      this.pos = pos;
      this.path_cost_g = g_new;
      this.f = g_new + h;
      this.pathParent = pathParent;        
    }
}

export const posToString = (row,col) => {

  return row.toString() + ' ' + col.toString();
}

export const AStarMinHeap = () => {
  
  this.heap = [];
  this.heapSize = 0;
  this.openList = new Map();

  this.size = () => {
    return this.heapSize;
  }

  this.swapNodes = (idx1,idx2) => {

    let temp;
    temp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = temp;
  }

  this.heapParentIdx = (heapIdx) => {
    return (heapIdx-1)/2;
  }

  this.leftChildIdx = (heapIdx) => {
    return (2*heapIdx + 1);
  }

  this.rightChildIdx = (heapIdx) => {
    return (2*heapIdx + 2);
  }

  this.insertNode = (node) => {
    this.heap.push(node);
    this.heapSize++;
    let currIndex = this.heapSize - 1;
    
    while(currIndex !== 0 && this.heap[this.heapParentIdx(currIndex)].f > this.heap[currIndex].f)
    {
      this.swapNodes(this.heapParentIdx(currIndex),currIndex);
      currIndex = this.heapParentIdx(currIndex);
    }

    this.openList.set(posToString(node.pos[0],node.pos[1]),currIndex);
  }

  this.updateNodeIfLessPathCost = (pos,new_path_cost_g,newPathParent,dest) => {
    let currIndex = this.heap[this.openList.get(posToString(pos[0],pos[1]))];
    const foundNode = this.heap[currIndex];
    if(new_path_cost_g < foundNode.path_cost_g)
    {
      foundNode.path_cost_g = new_path_cost_g;
      const h = Math.abs(pos[0] - dest[0]) + Math.abs(pos[1] - dest[1]);
      foundNode.f = foundNode.path_cost_g + h;
      foundNode.pathParent = newPathParent;
    }

    while(currIndex !== 0 && this.heap[this.heapParentIdx(currIndex)].f > this.heap[currIndex].f)
    {
      this.swapNodes(this.heapParentIdx(currIndex),currIndex);
      currIndex = this.heapParentIdx(currIndex);
    }

    this.openList.set(posToString(pos[0],pos[1]),currIndex);
  }

  this.getMinNode = () => {
    
    if(this.heapSize <= 0)
      return null;

    if(this.heapSize === 1)
    {
      this.heapSize--;
      return this.heap[0];
    }

    const minNode = this.heap[0];
    this.heap[0] = this.heap[this.heapSize-1];
    this.heapSize--;

    this.minHeapifyAStar(0);

    return minNode;
  }

  this.isNodeInOpenList = (pos) => {
    return this.openList.has(posToString(pos[0],pos[1]));
  }

  this.getNodeInOpenList = (pos) => {
    return this.openList.get(posToString(pos[0],pos[1]));
  }

  this.minHeapifyAStar = (heapIdx) => {
    
    const leftIdx = this.leftChildIdx(heapIdx);
    const rightIdx = this.rightChildIdx(heapIdx);
    let leastIdx = heapIdx;

    if(leftIdx < this.heapSize && this.heap[leftIdx] < this.heap[heapIdx])
      leastIdx = heapIdx;
    if(rightIdx < this.heapSize && this.heap[rightIdx] < this.heap[leastIdx])
      leastIdx = rightIdx;
    if(leastIdx !== heapIdx)
    {
      this.swapNodes(this.heap[heapIdx],this.heap[leastIdx]);
      this.minHeapifyAStar(leastIdx);
    }
  }
}

