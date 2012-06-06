(function ($) {

AjaxSolr.theme.prototype.result = function (doc, snippet, highlighting) {
  var output = '';
  if (doc.doc_type === "Law"){
	  output += '<div><a href="http://vacode.org/' + doc.law_section + '"><h2>&sect' + doc.law_section + ': ' + doc.law_title + '</h2></a>';
	  output += '<p id="links_' + doc.id + '" class="links"></p>';
	  output += '<p>' + snippet + '</p></div>';
  }
  if (doc.doc_type === "Definition"){
  	if(highlighting[doc.key].def_term){
  		output += '<div><h2>' + highlighting[doc.key].def_term[0] + '</h2>';
  	}
  	else{
	  output += '<div><h2>' + doc.def_term + '</h2>';
	  }
	  output += '<p id="links_' + doc.id + '" class="links"></p>';
	  output += '<p>' + snippet + '</p></div>';
  }
  return output;
};

AjaxSolr.theme.prototype.snippet = function (doc, highlighting, mlt) {
  var output = '';
  if (doc.doc_type === "Law"){
	  if (highlighting[doc.key].law_text){
		output+='...';
		output+=highlighting[doc.key].law_text[0];
		output+='...';
	  }	
	  else{
		  if (doc.law_text.length > 300) {
			output += doc.law_text.substring(0, 300);
			output += '<span style="display:none;">' + doc.law_text.substring(300);
			output += '</span> <a href="#" class="more">more</a>';
		  }
		  else {
			output +=doc.law_text;
		  }
	  }
  }
  if (doc.doc_type === "Definition"){
	  output +=doc.def_text;
  }
  if (mlt[doc.key].numFound) {
  	output += '<br/><br/>Laws related to this: '
  	for (var x=0; x<mlt[doc.key].docs.length; x++){
  		output += '<span class="mlt"><a href="http://vacode.org/' + mlt[doc.key].docs[x].law_section + '">&sect'; 
  		output += mlt[doc.key].docs[x].law_section + ': ' + mlt[doc.key].docs[x].law_title + '</a></span>';
  	}
  }
  return output;
};

AjaxSolr.theme.prototype.tag = function (value, weight, handler) {
  return $('<a href="#" class="tagcloud_item"/>').text(value).addClass('tagcloud_size_' + weight).click(handler);
};

AjaxSolr.theme.prototype.facet_link = function (value, handler) {
  return $('<a href="#"/>').text(value).click(handler);
};

AjaxSolr.theme.prototype.no_items_found = function () {
  return 'no items found in current selection';
};

})(jQuery);
