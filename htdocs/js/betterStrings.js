String.prototype.isEmpty = function() { return (!this.length) }
String.prototype.isBlank = function() { return !this.match(/\S/) }
String.prototype.removeNonWords = function () { 
	return this.replace(/[^\w|\s]/g, '');
}