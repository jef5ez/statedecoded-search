function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}

$(function(){
	$( '#query' ).autocomplete({
		delay: 0,
		source: function(request, response){
				function suggestData(data) {
					var suggestions = data.terms.law_text;
					for(var x=1; x<suggestions.length; x++){
						suggestions.splice(x, 1);
					} 
					response(suggestions);
				}
				qstr = 'terms.prefix=' + request.term;
				// Assign handlers immediately after making the request,
				// and remember the jqxhr object for this request
				var params = getstandardargs().concat(qstr);
				var urlData = params.join('&');
				url = 'http://localhost:8983/solr/terms?'+urlData;
				$.ajax({
					crossDomain: true,  
					dataType: "jsonp",
					url : url,
					type: "GET",
					dataType: "jsonp",
					jsonp : "json.wrf",
					success: suggestData,
					error: function(data) { response(['error']) },
				});
			
			function getstandardargs() {
				var params = [
					'wt=json'
					, 'indent=on'
					, 'terms.fl=law_text'
				];
				return params;
			}
			
			/*var xmlHttpReq = false;
			//if (window.XMLHttpRequest) { // Mozilla/Safari
				xmlHttpReq = new XMLHttpRequest(); 
			//}
			//else if (window.ActiveXObject) { // IE
			//	this.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
			//}
			log('the request is' + request.term);
			xmlHttpReq.onreadystatechange=function(){
				if (xmlHttpReq.readyState==4 && xmlHttpReq.status==200){
					var jsondata=eval("("+xmlHttpReq.responseText+")"); //retrieve result as an JavaScript object
					var suggestions = jsondata.terms.cat;
					for(var x=0; x<suggestions.length; x++){
						log(x + ': ' + suggestions[x]);
					} 
					for(var x=1; x<suggestions.length; x++){
						log('removing: ' + suggestions[x]);
						suggestions.splice(x, 1);
					} 
					for(var x=0; x<suggestions.length; x++){
						log(x + ': ' + suggestions[x]);
					} 
					response(suggestions);
				}
				else{
					response(["error"]);
					log('error, httpreq no work');
				}
			}
			
			var url="http://localhost:8983/solr/terms?terms.fl=cat&wt=json&json.nl=map&omitHeader=true&terms.prefix=";
			xmlHttpReq.open("GET", url.concat(request.term), true)
			xmlHttpReq.send(null)*/
			
		}
	});
});
var Manager;
(function ($) {
  $(function () {
    Manager = new AjaxSolr.Manager({
      solrUrl: 'http://localhost:8983/solr/'
    });
    
    Manager.addWidget(new AjaxSolr.ResultWidget({
    	id: 'result',
  		target: '#docs'
	}));
    
    Manager.addWidget(new AjaxSolr.PagerWidget({
  		id: 'pager',
  		target: '#pager',
  		prevLabel: '&lt;',
  		nextLabel: '&gt;',
  		innerWindow: 1,
  		renderHeader: function (perPage, offset, total) {
    		$('#pager-header').html($('<span/>').text('displaying ' + Math.min(total, offset + 1) + ' to ' + Math.min(total, offset + perPage) + ' of ' + total));
  		}
	}));
	
	var fields = [ 'law_code', 'tags' ];
	for (var i = 0, l = fields.length; i < l; i++) {
	  	Manager.addWidget(new AjaxSolr.TagcloudWidget({
			id: fields[i],
			target: '#' + fields[i],
			field: fields[i]
	 	}));
	}
	
	Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
  		id: 'currentsearch',
  		target: '#selection',
	}));
	
	Manager.addWidget(new AjaxSolr.TextWidget({
		id: 'text',
		target: '#search',
		field: 'text'
	}));
	
	Manager.addWidget(new AjaxSolr.CheckboxFilterWidget({
		id: 'checkboxfilter',
		target: '#doc_filter',
		field: 'doc_type'
	}));
    
    Manager.init();
    Manager.store.addByValue('q', 'tiger');
    var params = {
	  	'facet.field': [ 'law_code' , 'tags'],
	  	'facet.limit': 30,
	  	'facet.mincount': 1,
	  	'f.topics.facet.limit': 50,
	  	'json.nl': 'map'
	};
	for (var name in params) {
	  	Manager.store.addByValue(name, params[name]);
	}
    Manager.doRequest();
  });
})(jQuery);