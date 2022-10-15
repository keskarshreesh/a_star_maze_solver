# Maze generator
# Credits: https://github.com/OrWestSide/python-scripts/blob/master/maze.py

import random

def getMaze():
	maze = []
	wall = 1
	cell = 0
	unvisited = -1
	dimension = 7

	for _ in range(dimension):
		line = []
		for _ in range(dimension):
			line.append(unvisited)
		maze.append(line)

	starting_dimension = int(dimension*random.random())
	if (starting_dimension == 0):
		starting_dimension += 1
	if (starting_dimension == dimension-1):
		starting_dimension -= 1

	walls = []
	maze[starting_dimension][starting_dimension] = cell
	walls.append([starting_dimension - 1, starting_dimension])
	maze[starting_dimension-1][starting_dimension] = 1
	walls.append([starting_dimension, starting_dimension - 1])
	maze[starting_dimension][starting_dimension - 1] = 1
	walls.append([starting_dimension, starting_dimension + 1])
	maze[starting_dimension][starting_dimension + 1] = 1
	walls.append([starting_dimension + 1, starting_dimension])
	maze[starting_dimension + 1][starting_dimension] = 1

	while (walls):
		rand_wall = walls[int(len(walls)*random.random())-1]

		if (rand_wall[1] != 0):
			if (maze[rand_wall[0]][rand_wall[1]-1] == -1 and maze[rand_wall[0]][rand_wall[1]+1] == 0):
				s_cells = 0
				if (maze[rand_wall[0]-1][rand_wall[1]] == 0):
					s_cells += 1
				if (maze[rand_wall[0]+1][rand_wall[1]] == 0):
					s_cells += 1
				if (maze[rand_wall[0]][rand_wall[1]-1] == 0):
					s_cells +=1
				if (maze[rand_wall[0]][rand_wall[1]+1] == 0):
					s_cells += 1

				if (s_cells < 2):
					maze[rand_wall[0]][rand_wall[1]] = 0

					if (rand_wall[0] != 0):
						if (maze[rand_wall[0]-1][rand_wall[1]] != 0):
							maze[rand_wall[0]-1][rand_wall[1]] = 1
						if ([rand_wall[0]-1, rand_wall[1]] not in walls):
							walls.append([rand_wall[0]-1, rand_wall[1]])
					if (rand_wall[0] != dimension-1):
						if (maze[rand_wall[0]+1][rand_wall[1]] != 0):
							maze[rand_wall[0]+1][rand_wall[1]] = 1
						if ([rand_wall[0]+1, rand_wall[1]] not in walls):
							walls.append([rand_wall[0]+1, rand_wall[1]])
					if (rand_wall[1] != 0):	
						if (maze[rand_wall[0]][rand_wall[1]-1] != 0):
							maze[rand_wall[0]][rand_wall[1]-1] = 1
						if ([rand_wall[0], rand_wall[1]-1] not in walls):
							walls.append([rand_wall[0], rand_wall[1]-1])
				
				for wall in walls:
					if (wall[0] == rand_wall[0] and wall[1] == rand_wall[1]):
						walls.remove(wall)

				continue

		if (rand_wall[1] != dimension-1):
			if (maze[rand_wall[0]][rand_wall[1]+1] == -1 and maze[rand_wall[0]][rand_wall[1]-1] == 0):
				s_cells = 0
				if (maze[rand_wall[0]-1][rand_wall[1]] == 0):
					s_cells += 1
				if (maze[rand_wall[0]+1][rand_wall[1]] == 0):
					s_cells += 1
				if (maze[rand_wall[0]][rand_wall[1]-1] == 0):
					s_cells +=1
				if (maze[rand_wall[0]][rand_wall[1]+1] == 0):
					s_cells += 1
				
				if (s_cells < 2):
					maze[rand_wall[0]][rand_wall[1]] = 0

					if (rand_wall[1] != dimension-1):
						if (maze[rand_wall[0]][rand_wall[1]+1] != 0):
							maze[rand_wall[0]][rand_wall[1]+1] = 1
						if ([rand_wall[0], rand_wall[1]+1] not in walls):
							walls.append([rand_wall[0], rand_wall[1]+1])
					if (rand_wall[0] != dimension-1):
						if (maze[rand_wall[0]+1][rand_wall[1]] != 0):
							maze[rand_wall[0]+1][rand_wall[1]] = 1
						if ([rand_wall[0]+1, rand_wall[1]] not in walls):
							walls.append([rand_wall[0]+1, rand_wall[1]])
					if (rand_wall[0] != 0):	
						if (maze[rand_wall[0]-1][rand_wall[1]] != 0):
							maze[rand_wall[0]-1][rand_wall[1]] = 1
						if ([rand_wall[0]-1, rand_wall[1]] not in walls):
							walls.append([rand_wall[0]-1, rand_wall[1]])

				for wall in walls:
					if (wall[0] == rand_wall[0] and wall[1] == rand_wall[1]):
						walls.remove(wall)

				continue

		if (rand_wall[0] != 0):
			if (maze[rand_wall[0]-1][rand_wall[1]] == -1 and maze[rand_wall[0]+1][rand_wall[1]] == 0):
				s_cells = 0
				if (maze[rand_wall[0]-1][rand_wall[1]] == 0):
					s_cells += 1
				if (maze[rand_wall[0]+1][rand_wall[1]] == 0):
					s_cells += 1
				if (maze[rand_wall[0]][rand_wall[1]-1] == 0):
					s_cells +=1
				if (maze[rand_wall[0]][rand_wall[1]+1] == 0):
					s_cells += 1
				
				if (s_cells < 2):
					maze[rand_wall[0]][rand_wall[1]] = 0
					if (rand_wall[0] != 0):
						if (maze[rand_wall[0]-1][rand_wall[1]] != 0):
							maze[rand_wall[0]-1][rand_wall[1]] = 1
						if ([rand_wall[0]-1, rand_wall[1]] not in walls):
							walls.append([rand_wall[0]-1, rand_wall[1]])
					if (rand_wall[1] != 0):
						if (maze[rand_wall[0]][rand_wall[1]-1] != 0):
							maze[rand_wall[0]][rand_wall[1]-1] = 1
						if ([rand_wall[0], rand_wall[1]-1] not in walls):
							walls.append([rand_wall[0], rand_wall[1]-1])
					if (rand_wall[1] != dimension-1):
						if (maze[rand_wall[0]][rand_wall[1]+1] != 0):
							maze[rand_wall[0]][rand_wall[1]+1] = 1
						if ([rand_wall[0], rand_wall[1]+1] not in walls):
							walls.append([rand_wall[0], rand_wall[1]+1])

				for wall in walls:
					if (wall[0] == rand_wall[0] and wall[1] == rand_wall[1]):
						walls.remove(wall)

				continue

		if (rand_wall[0] != dimension-1):
			if (maze[rand_wall[0]+1][rand_wall[1]] == -1 and maze[rand_wall[0]-1][rand_wall[1]] == 0):
				s_cells = 0
				if (maze[rand_wall[0]-1][rand_wall[1]] == 0):
					s_cells += 1
				if (maze[rand_wall[0]+1][rand_wall[1]] == 0):
					s_cells += 1
				if (maze[rand_wall[0]][rand_wall[1]-1] == 0):
					s_cells +=1
				if (maze[rand_wall[0]][rand_wall[1]+1] == 0):
					s_cells += 1
				if (s_cells < 2):
					maze[rand_wall[0]][rand_wall[1]] = 0

					if (rand_wall[0] != dimension-1):
						if (maze[rand_wall[0]+1][rand_wall[1]] != 0):
							maze[rand_wall[0]+1][rand_wall[1]] = 1
						if ([rand_wall[0]+1, rand_wall[1]] not in walls):
							walls.append([rand_wall[0]+1, rand_wall[1]])
					if (rand_wall[1] != 0):
						if (maze[rand_wall[0]][rand_wall[1]-1] != 0):
							maze[rand_wall[0]][rand_wall[1]-1] = 1
						if ([rand_wall[0], rand_wall[1]-1] not in walls):
							walls.append([rand_wall[0], rand_wall[1]-1])
					if (rand_wall[1] != dimension-1):
						if (maze[rand_wall[0]][rand_wall[1]+1] != 0):
							maze[rand_wall[0]][rand_wall[1]+1] = 1
						if ([rand_wall[0], rand_wall[1]+1] not in walls):
							walls.append([rand_wall[0], rand_wall[1]+1])

				for wall in walls:
					if (wall[0] == rand_wall[0] and wall[1] == rand_wall[1]):
						walls.remove(wall)

				continue

		for wall in walls:
			if (wall[0] == rand_wall[0] and wall[1] == rand_wall[1]):
				walls.remove(wall)
		
	for i in range(dimension):
		for j in range(dimension):
			if (maze[i][j] == -1):
				maze[i][j] = 1

	for i in range(dimension):
		if (maze[1][i] == 0):
			maze[0][i] = 0
			break

	for i in range(dimension-1, 0, -1):
		if (maze[dimension-2][i] == 0):
			maze[dimension-1][i] = 0
			break

	maze.pop(0)
	maze.pop(-1)
	for i in maze:
		i.pop(0)
		i.pop(-1)

	maze[0][0] = 'A'
	maze[-1][-1] = 'T'

	k = 0
	for i in range(len(maze)):
		for j in range(len(maze[0])):
			if maze[i][j]==1 and k%3==0:
				maze[i][j] = 0
				k += 1
			elif maze[i][j]==1:
				k += 1

	return maze;