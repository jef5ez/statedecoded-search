$(function(){
	if(section_id && $( '#more-like-this' ).length){
		var params = [
			'wt=json'
			, 'indent=on'
			, 'fq=doc_type:Law'
		];
		params.push('q=id:' + section_id);
		var urlData = params.join('&');
		url = gSolrUrl +'select?'+urlData;
		$.ajax({
			crossDomain: true,  
			dataType: "jsonp",
			url : url,
			type: "GET",
			dataType: "jsonp",
			jsonp : "json.wrf",
			success: function(data) {
				var target = $( '#more-like-this' ).find('ul');
				var items = data.moreLikeThis['Law' + section_id].docs;
				if(items[0]){
					for (var doc in items){
						target.append('<li><a href="http://' + window.location.host + '/' + items[doc].law_section + '">&sect ' +
						items[doc].law_section + '</a> ' + items[doc].law_title + '</li>');
					}
				}
				else {$( '#more-like-this' ).hide();}
			},
			error: function(data) { alert('error') }
		});
	}
});
