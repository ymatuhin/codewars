// http://www.codewars.com/kata/52f831fa9d332c6591000511

function parseMolecule (str) {
	var obj = {}, arr = ['[', '(', '{'], hashObj = {'[':']', '(':')', '{':'}'};
	go(str);

	function go (str, factor) {
		var fnReturn, i;
		factor = factor || 1;
		fnReturn = spliceBrackets(str, factor);
		countMolecule(fnReturn[0][0], fnReturn[0][1]);

		for (i = 0; i < fnReturn[1].length; i++) {
			go(fnReturn[1][i].str, fnReturn[1][i].factor);
		}
	}

	function findFirstBracket (str) {
		var min, type, i, _stPos;
		for (i = 0, lg = arr.length; i < lg; i++) {
			_stPos = str.indexOf(arr[i]);
			if (_stPos !== -1 ) {
				min = (min === undefined) ? _stPos : (min > _stPos) ? _stPos : min;
			}
		}
		type = hashObj[str.charAt(min)];
		return {type:type, pos: min};
	}

	function spliceBrackets (str, inpFactor) {
		var strInBracketsArr = [],
			fstB, lastB, factor, newStr, symb, mod;

		while (true) {
			fstB = findFirstBracket(str);
			if (fstB.pos === undefined) break;

			lastB = str.indexOf(fstB.type,fstB.pos);

			factor = parseInt(str.charAt(lastB + 1), 10) * inpFactor;
			factor = (isNaN(factor)) ? inpFactor : factor;

			newStr = str.slice(fstB.pos + 1, lastB);
			strInBracketsArr.push({str:newStr, factor: factor});

			symb = str.charAt(lastB + 1);
			mod = (!isNaN(symb)) ? 2 : 1;

			str = str.slice(0, fstB.pos) + str.slice(lastB + mod);
		}

		// 1 simbol factor length
		return [[str, inpFactor] , strInBracketsArr];
	}

	function countMolecule (inpStr, factor) {
		var _arr = [], i = 0, curSymb, el, pos;
		while (i < inpStr.length) {
			curSymb = inpStr.charAt(i);
			if (!isNaN(curSymb)) {
				_arr[_arr.length - 1] += (_arr[_arr.length - 1].indexOf('|') === -1) ? '|' + curSymb : curSymb;
			} else if (curSymb == curSymb.toUpperCase()) {
				_arr.push(curSymb);
			} if (curSymb != curSymb.toUpperCase()) {
				_arr[_arr.length - 1] += curSymb;
			}
			i++;
		}

		for (i = 0; i < _arr.length; i++) {
			el = _arr[i];
			pos = el.indexOf("|");
			if (pos === -1) {
				obj[el] = (obj[el] === undefined) ? 0 : obj[el];
				obj[el] += 1 * factor;
			} else {
				obj[el.slice(0, pos)] = (obj[el.slice(0, pos)] === undefined) ? 0 : obj[el.slice(0, pos)];
				obj[el.slice(0, pos)] += +el.slice(pos + 1) * factor;
			}

		}
	}

	return obj;
}

// var water = 'H2O';
// parseMolecule(water);
// console.log('{H: 2, O: 1}');

// var magnesiumHydroxide = 'Mg(OH)2';
// parseMolecule(magnesiumHydroxide);
// console.log('{Mg: 1, O: 2, H: 2}');

// var fremySalt = 'K4[ON(SO3)2]2';
// parseMolecule('K4[ON(SO3)2]2');
// console.log('{K: 4, O: 14, N: 2, S: 4}');

// C6H12O6
// Mo(CO)6
// Mg(OH)2
// Fe(C5H5)2

// parseMolecule('(C5H5)Fe(CO)2CH3');


// parseMolecule('{[Co(NH3)4(OH)2]3Co}(SO4)3');
// parseMolecule('[Co(NH3)4(OH)2]3Co(SO4)3');
parseMolecule('Pd[P(C6H5)3]4');