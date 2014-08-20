// http://www.codewars.com/kata/evaluate-mathematical-expression

function calc (str) {
	regExp = {
		multAndDiv: /-*\d*\.*\d+\s*(\/|\*)\s*-*\d*\.*\d+/g,
		plusAndMinus: /-*\d*\.*\d+\s*(\+|-)\s*-*\d*\.*\d+/g,
		numbMinusNumb: /\d+-\d+/g,
		brackets: /\(([^()]+)\)/g
	};

	brackets();
	str = multiplyAndDivision(str);
	str = plusAndMinus(str);

	function brackets () {
		var found = str.match(regExp.brackets),
			i, ind, splitArr, splitRez, hasNMN,
			foundWithoutBracket, newNMN, _temp;
		if (found === null || !found.length) return;

		for (i = 0; i < found.length; i++) {
			foundWithoutBracket = found[i].slice(1, -1);
			hasNMN = regExp.numbMinusNumb.exec(foundWithoutBracket);
			if (hasNMN) {
				ind = hasNMN[0].indexOf('-');
				newNMN = hasNMN[0].slice(0, ind) + ' - ' + hasNMN[0].slice(ind + 1);
				foundWithoutBracket = hasNMN.input.replace(hasNMN[0], newNMN);
			}
			str = str.replace(found[i], plusAndMinus(multiplyAndDivision(foundWithoutBracket)));
		}
		brackets();
	}

	function multiplyAndDivision (inpStr) {
		(function count () {
			var found = inpStr.match(regExp.multAndDiv), newFound,
				i, j, splitArr, splitRez = null, oldFound;
			if (found === null || !found.length) return;

			for (i = 0; i < found.length; i++) {
				oldFound = found[i]; newFound = found[i];
				newFound = newFound.replace(/--/g, '').replace(/\+\+/g, '');

				if (newFound.indexOf('*') !== -1) {
					splitArr = newFound.split('*');
					splitRez = splitArr[0] * splitArr[1];
				} else {
					splitArr = newFound.split('/');
					splitRez = splitArr[0] / splitArr[1];
				}
				inpStr = inpStr.replace(oldFound, splitRez);
			}
			count();
		})();
		return inpStr;
	}

	function plusAndMinus (inpStr) {
		(function count () {
			var found = inpStr.match(regExp.plusAndMinus), currFound,
				i, splitArr, splitRez, oldFound, minus, newFound;
			if (found === null || !found.length) return;

			for (i = 0; i < found.length; i++) {
				oldFound = found[i]; newFound = found[i];
				newFound = newFound.replace(/--/g, '').replace(/\+\+/g, '');

				if (newFound.indexOf('+') !== -1) {
					splitArr = newFound.split('+');
					splitRez = +splitArr[0] + +splitArr[1];
				} else {
					minus = (newFound.charAt(0) == '-') ? newFound.indexOf('-', 1) : newFound.indexOf('-');
					newFound = newFound.slice(0, minus) + '|' + newFound.slice(minus + 1);
					splitArr = newFound.split('|');
					splitRez = splitArr[0] - splitArr[1];
				}
				inpStr = inpStr.replace(oldFound, splitRez);
			}
			count();
		})();
		return inpStr;
	}
	return +str;
}