// http://www.codewars.com/kata/my-smallest-code-interpreter-aka-brainf-star-star-k

function brainLuck(code, input) {
	var arr = [],
		i = 0,
		inpI = 0,
		output = '',
		forVar = 0,
		brc = 0;
	for (var j = 0; j < 30000; j++) arr.push(0);

	var action = {
		',': function() {
			arr[i] = input.charCodeAt(inpI);
			inpI++;
		},
		'.': function() {
			output += String.fromCharCode(arr[i]);
		},
		'>': function() {
			i++;
		},
		'<': function() {
			i--;
		},
		'+': function() {
			arr[i] = (arr[i] + 1 > 255) ? 0 : ++arr[i];
		},
		'-': function() {
			arr[i] = (arr[i] - 1 < 0) ? 255 : --arr[i];
		},
		'[': function() {
			if (arr[i] === 0) {
				brc++;
				while (brc) {
					forVar++;
					brc += (code[forVar] == '[') ? 1 : (code[forVar] == ']') ? -1 : 0;
				}
			}
		},
		']': function() {
			if (arr[i] !== 0) {
				if (code[forVar] == ']') brc++;
				while (brc) {
					forVar--;
					brc += (code[forVar] == '[') ? -1 : (code[forVar] == ']') ? 1 : 0;
				}
				forVar--;
			}
		}
	};

	for (; forVar < code.length; forVar++) action[code[forVar]]();
	return output;
}