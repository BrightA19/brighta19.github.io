// Setting up stuff
var cvs = document.getElementById('c');
var ctx = cvs.getContext('2d');
var fps = 100, tileSize = 10;
var drawInterval = setInterval(drawAll, 1000 / fps);

var WIDTH = 70, HEIGHT = 50;

var startingPoint = { x: 1, y: 1, };
var endingPoint = { x: WIDTH - 2, y: HEIGHT - 2, };

cvs.width = WIDTH * tileSize;
cvs.height = HEIGHT * tileSize;

var as = new AStar(WIDTH, HEIGHT);

var walls = generateWalls();
as.addWalls(walls);
as.setStartingPoint(startingPoint.x, startingPoint.y);
as.setEndingPoint(endingPoint.x, endingPoint.y);
as.findPath(100);

// Draw visually
function draw(array, color, scale) {
	var ts = tileSize - (tileSize * scale);
	
	for (var i = 0; i < array.length; i++) {
		
		ctx.beginPath();
		ctx.rect(array[i].x * + tileSize + ts/2,
			array[i].y * tileSize + ts/2,
			tileSize - ts,
			tileSize - ts);
		ctx.closePath();
		
		ctx.fillStyle = color;
		ctx.fill();
		
	}
}

function drawAll() {
	var grid = [];
	for (var x = 0; x < WIDTH; x++) {
		for (var y = 0; y < HEIGHT; y++) {
			grid.push({
				x: x, y: y
			});
		}
	}

	ctx.clearRect(0, 0, cvs.width, cvs.height);
	
	draw(grid, "#000", 0.9);
	draw(as.walls, "#aaa", 1);
	draw(as.openList, "#aaf", 0.3);
	draw(as.closedList, (as.failed) ? "#f00" : "#00f", 0.5);
	draw(as.path, "#ff0", 0.9);
	draw([as.startingPoint], "#0f0", 1.2);
	draw([as.endingPoint], "#f00", 1.2);
}

function restart(random) {
	as = new AStar(WIDTH, HEIGHT);
	
	if (random)
		walls = generateWalls();
	
	as.addWalls(walls);
	as.setStartingPoint(1, 1);
	as.setEndingPoint(WIDTH - 2, HEIGHT - 2);
	as.findPath(30);
}

function generateWalls() {
	var walls = [];
	for (var w = 0; w < WIDTH * HEIGHT / 4; w++) {
		var x = Math.floor(Math.random() * WIDTH);
		var y = Math.floor(Math.random() * WIDTH);
		
		if (!(endingPoint.x == x && endingPoint.y == y)) {
			walls.push({ x: x, y: y, });
		}
	}
	return walls;
}