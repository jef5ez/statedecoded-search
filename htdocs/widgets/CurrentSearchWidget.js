var nameSwitcher = {
	law_code: 'Title',
	law_chapter: 'Chapter',
	tags: 'Tag'
};

(function ($) {
	AjaxSolr.CurrentSearchWidget = AjaxSolr.AbstractWidget.extend({
		afterRequest: function () {
    		$(this.target).show();
	  		var self = this;
  			var links = [];

  			var fq = this.manager.store.values('fq');
  			for (var i = 0, l = fq.length; i < l; i++) {
  				if(fq[i] && fq[i].search("doc_type") < 0 ) { //I don't want to show if it is part of checkboxes
    				links.push($('<a href="#" id="faceted_' + fq[i].split(':')[0] + '"/>').text('(x) ' + nameSwitcher[fq[i].split(':')[0]] + ': ' + fq[i].split(':')[1]).click(self.removeFacet(fq[i])));
  				}
  			}

  			if (links.length) {
    			AjaxSolr.theme('list_items', $(this.target).find('#selection'), links);
  			}
  			else {
    			$(this.target).hide();
  			}
		},

		removeFacet: function (facet) {
			var self = this;
  			return function () {
    			if (removeFrom(gFacets,facet)) {
    				updateFacets();
        			if (self.manager.store.removeByValue('fq', facet)) {
        				if (facet.search('law_code') >= 0) {
        					var chapter = $('#facet_section').find('#faceted_law_chapter');
        					if (chapter){
        						chapter.click();
        					}
        				}
						self.manager.doRequest(0);
					}
    			}
    			return false;
  			};
		}
	});
})(jQuery);