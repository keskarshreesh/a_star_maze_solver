class Node (object):
	def __init__(self, x):
		self.val = x

class Heap (object):
	def __init__(self):
		self.heap = []

	def Print(self):
		print(self.heap)

	def heapify(self, k):
		if 2*k+1 < len(self.heap) and self.heap[k] > self.heap[2*k+1]:
			temp = 2*k+1
		else: 
			temp = k
		if 2*k+2 < len(self.heap) and self.heap[temp] > self.heap[2*k+2]:
			temp = 2*k+2
		if k != temp:
			self.heap[k], self.heap[temp] = self.heap[temp], self.heap[k]
			self.heapify(temp)

	def insert(self, a):
		self.heap.append(a)
		k = len(self.heap) - 1
		while self.heap[k] < self.heap[(k-1)//2]:
			self.heap[k], self.heap[(k-1)//2] = self.heap[(k-1)//2], self.heap[k]
			k = (k-1)//2

	def remove(self):
		min = self.heap[0]
		try:
			self.heap[0] = self.heap.pop(-1)
		except:
			self.heap = []
		self.heapify(0)
		return min

	def peek(self):
		return self.heap[0]

	def build(self):
		for i in range(len(self.heap)//2-1, -1, -1):
			self.heapify(i)

if __name__ == "__main__":
      
    print('The minHeap is ')
    minHeap = Heap()
    minHeap.insert(200)
    minHeap.insert(100)
    minHeap.insert(50)

    minHeap.build()
  
    minHeap.Print()
    print("The Min val is " + str(minHeap.remove()))
    minHeap.Print()
    print("The Min val is " + str(minHeap.remove()))
    minHeap.Print()
    print("The Min val is " + str(minHeap.remove()))

    minHeap.Print()
    minHeap.insert(50)
    minHeap.Print()
    print("The Min val is " + str(minHeap.remove()))

    minHeap.Print()

