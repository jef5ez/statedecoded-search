function getObjectKeys (obj){
	var keys = [];
	for(var x in obj){
		keys.push(x);
	}
	return keys;
}

function removeFrom(arr, str) {
	for (var x in arr){
		if(arr[x] === str){
			arr.splice(x, 1);
			return true;
		}
	}
	return false;
}

$(function(){
	$( '#query' ).autocomplete({
		delay: 0,
		source: function(request, response){
			qstr = 'terms.prefix=' + request.term;
			var params = [
				'wt=json'
				, 'indent=on'
				, 'terms.fl=law_text'
			].concat(qstr);
			var urlData = params.join('&');
			url = gSolrUrl +'terms?'+urlData;
			$.ajax({
				crossDomain: true,  
				dataType: "jsonp",
				url : url,
				type: "GET",
				dataType: "jsonp",
				jsonp : "json.wrf",
				success: function(data) {
					var suggestions = data.terms.law_text;
					for(var x=1; x<suggestions.length; x++){
						suggestions.splice(x, 1);
					} 
					response(suggestions);
				},
				error: function(data) { response(['error']) },
			});
		}
	});
});

function makeQuery () {
	if(gQuery){
		window.location.search ="q=" + gQuery;
	}
}
function updateFacets () {
	var newHash = '';
	if(gFacets[0]) {
		newHash = "facets=" + gFacets.toString();
	}
	window.location.hash = newHash;
}

var Manager;
(function ($) {
  $(function () {
    Manager = new AjaxSolr.Manager({
      solrUrl: gSolrUrl
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
    		$('#pager-header').append(' for <b><span id="curr_search"></span><span id="suggestions" /></b>');
  		}
	}));
	var fields = [
		{
			name:'Title', 
			field:'law_code'
		}, 
		{
			name:'Chapter', 
			field:'law_chapter',
			display: function(widget) {
				var arr = widget.manager.store.get('fq');
				if(arr[0].value){
					for(var x in arr){
						console.log(x);
						if (arr[x].value.search("law_code") === 0){
							return true;
						}
					}
				}
				return false;
			}
		}, 
		{
			name:'Tags', 
			field:'tags'
		}
	];
	for (var i = 0, l = fields.length; i < l; i++) {
	  	Manager.addWidget(new AjaxSolr.TagcloudWidget({
			id: fields[i].field,
			target: '#facet_section',
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
	
	Manager.addWidget(new AjaxSolr.SearchUpdateWidget({
		id: 'searchupdate',
		target: '#curr_search'
	}));
    
    Manager.addWidget(new AjaxSolr.SpellcheckWidget({
    	id: 'spellcheck',
    	target: '#suggestions'
    }));
    
    Manager.init();
    if (gQuery){
		Manager.store.addByValue('q', gQuery);
    }
    else { 
    	Manager.store.addByValue('q', '*:*');
    }
    /*
	var params = {
		'facet.field': fields,
		'facet.limit': 30,
		'facet.mincount': 1,
		'json.nl': 'map'
	};
	for (var name in params) {
		Manager.store.addByValue(name, params[name]);
	}
	*/
	if (gFacets[0]){
		for (var x=0, l=gFacets.length; x < l; x++){
			Manager.store.addByValue('fq', gFacets[x]);
		}
	}
	Manager.doRequest();
  });
})(jQuery);
