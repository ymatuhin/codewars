// http://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1

snail = function(array) {
	var rez = [];

	if (array[0] instanceof Array) {

		if (array.length <= 1) {
			return array[0];
		}

	} else {
		return [];
	}

	getCorner(true);
	return rez;

	function getCorner(first) {
		if (first) {
			this.arr = array;
			this.side = 1;
		} else {
			this.arr = this.arr || array;
		}
		this.side = (this.side !== 0) ? 0 : 1;

		var i = 0,
			lg;

		if (this.side === 0) {
			lg = this.arr.length;
			for (; i < lg; i++) {
				rez.push(this.arr[0][i]);
			}
			for (i = 1; i < lg; i++) {
				rez.push(this.arr[i][lg - 1]);
				this.arr[i].pop();
			}
			this.arr.shift();
			(this.arr.length >= 1) ? getCorner() : 0;
		} else {
			lg = this.arr.length;
			for (i = lg - 1; i >= 0; i--) {
				rez.push(this.arr[lg - 1][i]);
			}
			for (i = lg - 2; i >= 0; i--) {
				rez.push(this.arr[i][0]);
				this.arr[i].shift();
			}
			this.arr.pop();
			(this.arr.length >= 1) ? getCorner() : 0;
		}
	}
};