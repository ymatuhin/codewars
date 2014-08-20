// http://www.codewars.com/kata/537e18b6147aa838f600001b

function justify(text, size) {
	var rez = '';
	line(text);

	function line(newText) {
		var prevText = newText;
		if (newText.length <= size) {
			rez += newText;
			return;
		}

		newText = newText.slice(0, size + 1);
		var lastSpacePos = newText.lastIndexOf(' ');

		newText = newText.slice(0, lastSpacePos);
		var lineArr = newText.split(' ');
		var needSpace = size - newText.replace(new RegExp(' ', 'g'), '').length;
		var last = lineArr.pop();

		var i = 0;
		while (needSpace !== 0) {
			lineArr[i % lineArr.length] += ' ';
			needSpace--;
			i++;
		}

		rez += lineArr.join('') + last + '\n';
		line(prevText.slice(lastSpacePos + 1));
	}

	console.log(rez);
	return rez;
}