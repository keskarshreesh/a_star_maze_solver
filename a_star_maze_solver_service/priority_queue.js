class Node {
    constructor(x) {
        this.val = x;
    }
}

class Heap {
    constructor(){
        this.heap =[];
    }

    printHeap() {
      console.log(this.heap);
    }
   

    heapify(k) {
        var temp;
      
        if (2 * k + 1 < this.heap.length && this.heap[k] > this.heap[2 * k + 1]) {
          temp = 2 * k + 1;
        } else {
          temp = k;
        }
      
        if (2 * k + 2 < this.heap.length && this.heap[temp] > this.heap[2 * k + 2]) {
          temp = 2 * k + 2;
        }
      
        if (k !== temp) {
          let temp1 = this.heap[k];
          this.heap[k] = this.heap[temp];
          this.heap[temp] = temp1;
          heapify(temp);
        }
      }

      insert(a) {
        var k;
        this.heap.append(a);
        k = this.heap.length - 1;

        while(this.heap[k] < this.heap[Math.floor((k-1)/2)]){
            let temp1 = this.heap[k];
            this.heap[k] = this.heap[Math.floor((k-1)/2)];
            this.heap[Math.floor((k-1)/2)]] = temp1;
            k = Math.floor((k-1)/2);
        }
      }

      remove() {
        var min;
        min = this.heap[0];
      
        try {
          this.heap[0] = this.heap.pop(-1);
        } catch (e) {
          this.heap = [];
        }
      
        this.heapify(0);
        return min;
      }

      peek(){
        return this.heap[0];
      }
    
      size(){
          return this.heap.length;
      }

      build(){
        for(let i=Math.floor(this.heap.length/2)-1;i>-1;i--){
            this.heapify(i);
        }
      }



      main(){
        let minHeap = new Heap();
        minHeap.insert(200);
        minHeap.insert(100);
        minHeap.insert(50);
    
        minHeap.build();
      
        minHeap.Print();
        console.log("The Min val is " + str(minHeap.remove()));
        minHeap.Print();
        console.log("The Min val is " + str(minHeap.remove()));
        minHeap.Print();
        console.log("The Min val is " + str(minHeap.remove()));
    
        minHeap.Print();
        minHeap.insert(50);
        minHeap.Print();
        console.log("The Min val is " + str(minHeap.remove()));
    
        minHeap.Print();
    }

}

