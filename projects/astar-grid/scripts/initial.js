// Other functions

function distance(cell1, cell2) {
	// Multiplied by 10 for easier debugging
	var a = (cell2.x - cell1.x);
	var b = (cell2.y - cell1.y);
	var c = 10 * Math.sqrt(a * a + b * b);
	return Math.floor(c);
}

function heuristic(cell1, cell2) {
	// Multiplied by 10 for easier debugging
	var dx = Math.abs(cell2.x - cell1.x);
	var dy = Math.abs(cell2.y - cell1.y);
	return 10 * (dx + dy);
}
