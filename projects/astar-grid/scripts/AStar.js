function AStar(cols, rows) {
	this.rows = rows;
	this.cols = cols;
	this.startingPoint = new AStar.Cell(2, 2, true);
	this.endingPoint = new AStar.Cell(cols - 3, rows - 3, true);
	this.walls = [];
	
	this.openList = [];
	this.closedList = [];
	this.path = [];
	this.running = false;
	this.failed = false;
	this.calculations = 0;
	this.interval = undefined;
	
	this.addWalls = function (w) {
		this.walls = w;
	};
	this.setStartingPoint = function (x, y) {
		this.startingPoint = new AStar.Cell(x, y, true);
	};
	this.setEndingPoint = function (x, y) {
		this.endingPoint = new AStar.Cell(x, y, true);
	};
	this.loop = function (a) {
		if (a.running)
			a.update();
		else
			clearInterval(a.interval);
	};
	this.findPath = function (fps) {
		this.running = true;
		
		this.startingPoint.g = 0;
		this.startingPoint.f = AStar.heuristic(this.startingPoint, this.endingPoint);
		this.openList.push(this.startingPoint);
	
		if (fps) {
			this.interval = setInterval(this.loop, 1000 / fps, this);
		}
		else {
			while (this.running) {
				this.update();
			}
		}
	};
	this.update = function () {
		
		if (this.openList.length == 0) {
			this.running = false;
			this.failed = true;
			return;
		}
		this.calculations++;
	
		var currentIndex = 0;
		for (var i = 0; i < this.openList.length; i++) {
			if (this.openList[i].f < this.openList[currentIndex].f)
				currentIndex = i;
		}
		var current = this.openList[currentIndex];
	
		if (AStar.heuristic(current, this.endingPoint) == 0) {
			this.path.push(current);
			for (i = 0; i < this.closedList.length; i++) {
				if (current.parent != undefined) {
					this.path.push(current.parent);
					current = current.parent;
				}
			}
			this.running = false;
			return;
		}
	
		this.openList.splice(currentIndex, 1);
		this.closedList.push(current);
	
	
		var children = current.getChildren(this.walls, this.rows, this.cols);
	
		for (i = 0; i < children.length; i++) {
			
			if (!children[i].walkable) continue;
	
			var c = false;
			AStar.Cell.search(children[i], this.closedList, function (j) {
				c = true;
			});
			if (c) continue;
	
			var inOpen = false;
			AStar.Cell.search(children[i], this.openList, function (j) {
				inOpen = true;
			});
			if (!inOpen) this.openList.push(children[i]);
	
			var childIndex = 0;
			AStar.Cell.search(children[i], this.openList, function (j) {
				childIndex = j;
			});
	
	
			var tempG = current.g + AStar.distance(current, children[i]);
			if (tempG >= this.openList[childIndex].g) continue;
	
			this.openList[childIndex].parent = current;
			this.openList[childIndex].g = tempG;
			this.openList[childIndex].f = tempG +
				AStar.heuristic(this.openList[childIndex], this.endingPoint);
	
		}
	};
}

AStar.cost = 10;
AStar.distance = function (cell1, cell2) {
	var a = (cell2.x - cell1.x);
	var b = (cell2.y - cell1.y);
	return AStar.cost * Math.sqrt(a * a + b * b);
};
AStar.heuristic = function (cell1, cell2) {
	var dx = Math.abs(cell2.x - cell1.x);
	var dy = Math.abs(cell2.y - cell1.y);
	return AStar.cost * (dx + dy);
};

AStar.Cell = function (x, y, walkable) {
	this.x = x;
	this.y = y;
	this.walkable = walkable;
};
AStar.Cell.search = function (cell, list, callback) {
	for (var index = 0; index < list.length; index++) {
		if (list[index].x == cell.x &&
			list[index].y == cell.y) {
			callback(index);
			break;
		}
	}
};
AStar.Cell.prototype.getChildren = function (walls, rows, cols) {
	
	var children = [
		// Children cells on the side
		new AStar.Cell(this.x, this.y - 1, true),
		new AStar.Cell(this.x - 1, this.y, true),
		new AStar.Cell(this.x, this.y + 1, true),
		new AStar.Cell(this.x + 1, this.y, true),
		// Diagonal children cells
		new AStar.Cell(this.x - 1, this.y - 1, true),
		new AStar.Cell(this.x - 1, this.y + 1, true),
		new AStar.Cell(this.x + 1, this.y + 1, true),
		new AStar.Cell(this.x + 1, this.y - 1, true)
	];
	
	// Checks if the children are walkable
	for (var i = 0; i < children.length; i++) {
		// Not walkable if outside of grid
		if (children[i].x < 0 || children[i].y < 0 ||
			children[i].x > cols - 1 || children[i].y > rows - 1) {
			children[i].walkable = false;
			continue;
		}
		// Not walkable if in a wall
		AStar.Cell.search(children[i], walls, function (j) {
			children[i].walkable = false;
		});
	}
	
	children[4].walkable = children[4].walkable &&
	    children[0].walkable && children[1].walkable;
	children[5].walkable = children[5].walkable &&
	    children[1].walkable && children[2].walkable;
	children[6].walkable = children[6].walkable &&
	    children[2].walkable && children[3].walkable;
	children[7].walkable = children[7].walkable &&
	    children[3].walkable && children[0].walkable;
	
	return children;
	
};
