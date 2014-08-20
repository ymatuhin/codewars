// http://www.codewars.com/kata/51eead3461ccf7db04000017

function UriBuilder (str) {
	var self = this;

	str = decodeURI(str);
	this.domainUrl = '';
	this.params = {};
	setParamFromStr();

	function setParamFromStr () {
		var qPos = str.indexOf('?');
		self.domainUrl = (qPos >= 0) ? str.slice(0, qPos) : str;
		var paramStr = (qPos >= 0) ? str.slice(qPos + 1) : '';
		var paramArr = (!!paramStr) ? paramStr.split('&') : [];

		for (var i = 0; i < paramArr.length; i++) {
			var _temp = paramArr[i].split('=');
			self.params[_temp[0]] = _temp[1];
		}
	}

	this.build = function () {
		var rez = self.domainUrl + '?';
		for (param in self.params) rez += param + '=' + self.params[param] + '&';
		return encodeURI(rez.slice(0, -1));
	};
}