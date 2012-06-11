(function ($) {

AjaxSolr.theme.prototype.result = function (doc, snippet, highlighting) {
  var output = '';
  if (doc.doc_type === "Law"){
	  output += '<div><a href="http://' + window.location.host + '/' + doc.law_section + '"><h2>&sect' + doc.law_section + ': ' + doc.law_title + '</h2></a>';
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
  if (doc.doc_type === "Court_Decision"){
	  output += '<div><h2>' + doc.court_date + ': ' + doc.court_name + '</h2>';
	  output += '<p id="links_' + doc.id + '" class="links"></p>';
	  output += '<p>' + snippet + '</p></div>';
  }
  if (doc.doc_type === "Comment"){
	  output += '<div><h2>' + doc.title + ': ' + doc.author + '</h2>';
	  output += '<p id="links_' + doc.id + '" class="links"></p>';
	  output += '<p>' + doc.description + '</p></div>';
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
  else if (doc.doc_type === "Definition"){
	  output +=doc.def_text;
  }
  else if (doc.doc_type === "Court_Decision"){
	  output +=doc.court_name;
	  if (highlighting[doc.key].court_decision){
		output+='...';
		output+=highlighting[doc.key].court_decision[0];
		output+='...';
	  }	
	  else{
		output +=doc.court_abstract;
	  }
  }
  if (mlt[doc.key].numFound) {
  	output += '<br/><br/>Laws related to this: '
  	for (var x=0; x<mlt[doc.key].docs.length; x++){
  		output += '<span class="mlt"><a href="http://' + window.location.host + '/' + mlt[doc.key].docs[x].law_section + '">&sect'; 
  		output += mlt[doc.key].docs[x].law_section + ': ' + mlt[doc.key].docs[x].law_title + '</a></span>';
  	}
  }
  return output;
};

AjaxSolr.theme.prototype.tag = function (value, weight, handler) {
  return $('<a class="tagcloud_item"/>').text(value).addClass('tagcloud_size_' + weight).click(handler);
};

AjaxSolr.theme.prototype.facet_link = function (value, handler) {
  return $('<a/>').text(value).click(handler);
};

AjaxSolr.theme.prototype.suggest = function (target, value, handler) {
	$(target).text('Did you mean ');
	$(target).append($('<a href="#" />').text(value).click(handler));
	$(target).append('?');
}

AjaxSolr.theme.prototype.no_items_found = function () {
  return 'no items found in current selection';
};

})(jQuery);
