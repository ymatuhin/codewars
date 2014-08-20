// http://www.codewars.com/kata/534e01fbbb17187c7e0000c6

function spiralize (size) {
	var arr = [];
	var vectorNumber = 1;
	var vectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];

	for (var i = 0; i < size; i++) {
		arr.push([]);
		for (var j = 0; j < size; j++) {
			arr[i][j] = (i === 0) ? 1 : 0;
		}
	}

	var pos = [0, size - 1];
	function vectorSumm (pos, vector) {
		var newArr = [];
		for (var i = 0; i < pos.length; i++) {
			newArr[i] = pos[i] + vector[i];
		}
		return newArr;
	}

	function setLine (length) {
		for (var i = 0; i < length; i++) {
			pos = vectorSumm(pos, vectors[vectorNumber%4]);
			arr[pos[0]][pos[1]] = 1;
		}
		vectorNumber++;

	}
	while (true) {
		setLine(size - 1);
		setLine(size - 1);
		if (size <= 4) {
			(z == 4) && setLine(1);
			break;
		}
		size -= 2;
	}
	return arr;
}

spiralize(10);

