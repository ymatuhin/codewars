// http://www.codewars.com/kata/5324945e2ece5e1f32000370

function sumStrings(a,b) {
  var temp = 0, rez = '';
  if (a.length > b.length) {
  	while (b.length < a.length) b = '0' + b;
  } else {
  	while (a.length < b.length) a = '0' + a;
  }

  for (var i = a.length - 1; i >= 0; i--) {

    var _temp = +a[i] + +b[i] + temp + '';
    temp = (+_temp >= 10) ? 1 : 0;
    _temp += '';
    rez += (+_temp >= 10) ? _temp%10 : _temp;

  }
  rez += (temp) ? 1 : '';

  return rez.split("").reverse().join("").replace(/^0+/, '');
}