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

export class AStarMinHeap {
  
  heap = [];
  heapSize = 0;
  openList = new Map();

  size = () => {
    return this.heapSize;
  }

  swapNodes = (idx1,idx2) => {

    let temp;
    temp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = temp;
    this.openList.set(posToString(this.heap[idx1].pos[0],this.heap[idx1].pos[1]),idx1);
    this.openList.set(posToString(this.heap[idx2].pos[0],this.heap[idx2].pos[1]),idx2);
  }

  heapParentIdx = (heapIdx) => {
    return Math.floor((heapIdx-1)/2);
  }

  leftChildIdx = (heapIdx) => {
    return (2*heapIdx + 1);
  }

  rightChildIdx = (heapIdx) => {
    return (2*heapIdx + 2);
  }

  insertNode = (node) => {
    
    this.heap.push(node);
    this.heapSize++;
    let currIndex = this.heapSize - 1;
    this.openList.set(posToString(node.pos[0],node.pos[1]),currIndex);
    
    while(currIndex !== 0)
    {
      if(this.heap[this.heapParentIdx(currIndex)].f < this.heap[currIndex].f)
        break;
      else if(this.heap[this.heapParentIdx(currIndex)].f < this.heap[currIndex].f 
              && this.heap[this.heapParentIdx(currIndex)].path_cost_g > this.heap[currIndex].path_cost_g)
        break;
      
      this.swapNodes(this.heapParentIdx(currIndex),currIndex);
      currIndex = this.heapParentIdx(currIndex);
    }
  }

  updateNodeIfLessPathCost = (pos,new_path_cost_g,newPathParent,dest) => {
    
    let currIndex = this.openList.get(posToString(pos[0],pos[1]));
    
    const foundNode = this.heap[currIndex];
    if(new_path_cost_g < foundNode.path_cost_g)
    {
      foundNode.path_cost_g = new_path_cost_g;
      const h = Math.abs(pos[0] - dest[0]) + Math.abs(pos[1] - dest[1]);
      foundNode.f = foundNode.path_cost_g + h;
      foundNode.pathParent = newPathParent;
    }

    while(currIndex !== 0)
    {
      if(this.heap[this.heapParentIdx(currIndex)].f < this.heap[currIndex].f)
        break;
      else if(this.heap[this.heapParentIdx(currIndex)].f < this.heap[currIndex].f 
              && this.heap[this.heapParentIdx(currIndex)].path_cost_g > this.heap[currIndex].path_cost_g)
        break;

      this.swapNodes(this.heapParentIdx(currIndex),currIndex);
      currIndex = this.heapParentIdx(currIndex);
    }
  }

  getMinNode = () => {

    if(this.heapSize <= 0)
      return null;
    
    if(this.heapSize === 1)
    {
      const minNode = this.heap[0];
      this.heap.shift();
      this.heapSize--;
      this.openList.delete(posToString(minNode.pos[0],minNode.pos[1]));
      return minNode;
    }

    const minNode = this.heap[0];
    this.openList.delete(posToString(minNode.pos[0],minNode.pos[1]));
    const newMin = this.heap.pop();
    this.heap[0] = newMin;
    this.openList.set(posToString(newMin.pos[0],newMin.pos[1]),0);
    this.heapSize--;

    this.minHeapifyAStar(0);

    return minNode;
  }

  isNodeInOpenList = (pos) => {
    return this.openList.has(posToString(pos[0],pos[1]));
  }

  getNodeInOpenList = (pos) => {
    return this.openList.get(posToString(pos[0],pos[1]));
  }

  minHeapifyAStar = (heapIdx) => {

    const leftIdx = this.leftChildIdx(heapIdx);
    const rightIdx = this.rightChildIdx(heapIdx);
    let leastIdx = heapIdx;

    if(leftIdx < this.heapSize)
    {
      if(this.heap[leftIdx].f < this.heap[heapIdx].f)
        leastIdx = leftIdx;
      else if((this.heap[leftIdx].f === this.heap[heapIdx].f) && (this.heap[leftIdx].path_cost_g > this.heap[heapIdx].path_cost_g))
        leastIdx = leftIdx;
    }
    if(rightIdx < this.heapSize)
    {
      if(this.heap[rightIdx].f < this.heap[leastIdx].f)
        leastIdx = rightIdx;
      else if((this.heap[rightIdx].f === this.heap[leastIdx].f) && (this.heap[rightIdx].path_cost_g > this.heap[leastIdx].path_cost_g))
        leastIdx = rightIdx;
    }
    if(leastIdx !== heapIdx)
    {
      this.swapNodes(heapIdx,leastIdx);
      this.minHeapifyAStar(leastIdx);
    }
  }
}

export class AStarMinHeapGmin {
  
  heap = [];
  heapSize = 0;
  openList = new Map();

  size = () => {
    return this.heapSize;
  }

  swapNodes = (idx1,idx2) => {

    let temp;
    temp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = temp;
    this.openList.set(posToString(this.heap[idx1].pos[0],this.heap[idx1].pos[1]),idx1);
    this.openList.set(posToString(this.heap[idx2].pos[0],this.heap[idx2].pos[1]),idx2);
  }

  heapParentIdx = (heapIdx) => {
    return Math.floor((heapIdx-1)/2);
  }

  leftChildIdx = (heapIdx) => {
    return (2*heapIdx + 1);
  }

  rightChildIdx = (heapIdx) => {
    return (2*heapIdx + 2);
  }

  insertNode = (node) => {
    
    this.heap.push(node);
    this.heapSize++;
    let currIndex = this.heapSize - 1;
    this.openList.set(posToString(node.pos[0],node.pos[1]),currIndex);
    
    while(currIndex !== 0)
    {
      if(this.heap[this.heapParentIdx(currIndex)].f < this.heap[currIndex].f)
        break;
      else if(this.heap[this.heapParentIdx(currIndex)].f < this.heap[currIndex].f 
              && this.heap[this.heapParentIdx(currIndex)].path_cost_g < this.heap[currIndex].path_cost_g)
        break;
      
      this.swapNodes(this.heapParentIdx(currIndex),currIndex);
      currIndex = this.heapParentIdx(currIndex);
    }
  }

  updateNodeIfLessPathCost = (pos,new_path_cost_g,newPathParent,dest) => {
    
    let currIndex = this.openList.get(posToString(pos[0],pos[1]));
    
    const foundNode = this.heap[currIndex];
    if(new_path_cost_g < foundNode.path_cost_g)
    {
      foundNode.path_cost_g = new_path_cost_g;
      const h = Math.abs(pos[0] - dest[0]) + Math.abs(pos[1] - dest[1]);
      foundNode.f = foundNode.path_cost_g + h;
      foundNode.pathParent = newPathParent;
    }

    while(currIndex !== 0)
    {
      if(this.heap[this.heapParentIdx(currIndex)].f < this.heap[currIndex].f)
        break;
      else if(this.heap[this.heapParentIdx(currIndex)].f < this.heap[currIndex].f 
              && this.heap[this.heapParentIdx(currIndex)].path_cost_g < this.heap[currIndex].path_cost_g)
        break;
      this.swapNodes(this.heapParentIdx(currIndex),currIndex);
      currIndex = this.heapParentIdx(currIndex);
    }
  }

  getMinNode = () => {

    if(this.heapSize <= 0)
      return null;
    
    if(this.heapSize === 1)
    {
      const minNode = this.heap[0];
      this.heap.shift();
      this.heapSize--;
      this.openList.delete(posToString(minNode.pos[0],minNode.pos[1]));
      return minNode;
    }

    const minNode = this.heap[0];
    this.openList.delete(posToString(minNode.pos[0],minNode.pos[1]));
    const newMin = this.heap.pop();
    this.heap[0] = newMin;
    this.openList.set(posToString(newMin.pos[0],newMin.pos[1]),0);
    this.heapSize--;

    this.minHeapifyAStar(0);

    return minNode;
  }

  isNodeInOpenList = (pos) => {
    return this.openList.has(posToString(pos[0],pos[1]));
  }

  getNodeInOpenList = (pos) => {
    return this.openList.get(posToString(pos[0],pos[1]));
  }

  minHeapifyAStar = (heapIdx) => {

    const leftIdx = this.leftChildIdx(heapIdx);
    const rightIdx = this.rightChildIdx(heapIdx);
    let leastIdx = heapIdx;

    if(leftIdx < this.heapSize)
    {
      if(this.heap[leftIdx].f < this.heap[heapIdx].f)
        leastIdx = leftIdx;
      else if((this.heap[leftIdx].f === this.heap[heapIdx].f) && (this.heap[leftIdx].path_cost_g < this.heap[heapIdx].path_cost_g))
        leastIdx = leftIdx;
    }
    if(rightIdx < this.heapSize)
    {
      if(this.heap[rightIdx].f < this.heap[leastIdx].f)
        leastIdx = rightIdx;
      else if((this.heap[rightIdx].f === this.heap[leastIdx].f) && (this.heap[rightIdx].path_cost_g < this.heap[leastIdx].path_cost_g))
        leastIdx = rightIdx;
    }
    if(leastIdx !== heapIdx)
    {
      this.swapNodes(heapIdx,leastIdx);
      this.minHeapifyAStar(leastIdx);
    }
  }
}
