(function ($) {
	AjaxSolr.CurrentSearchWidget = AjaxSolr.AbstractWidget.extend({
		afterRequest: function () {
	  		var self = this;
  			var links = [];

  			var fq = this.manager.store.values('fq');
  			for (var i = 0, l = fq.length; i < l; i++) {
    			links.push($('<a href="#"/>').text('(x) ' + fq[i]).click(self.removeFacet(fq[i])));
  			}

  			if (links.length) {
    			AjaxSolr.theme('list_items', this.target, links);
  			}
  			else {
    			$(this.target).html('<div>No facets selected.</div>');
  			}
		},

		removeFacet: function (facet) {
  			var self = this;
  			return function () {
    			if (self.manager.store.removeByValue('fq', facet)) {
      				self.manager.doRequest(0);
    			}
    		return false;
  			};
		}
	});
})(jQuery);