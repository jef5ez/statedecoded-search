function getValue(str, term) {
	if (str.match(term))
		return str.replace(term + '=', '');
	return false;
}
function getValueArray(str, term) {
	var str = getValue(str, term);
	if (str)
		return str.split(',');
	return [];
}
var gFacets = getValueArray(window.location.hash, '#facets');

