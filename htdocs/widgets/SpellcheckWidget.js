(function ($) {
	AjaxSolr.SpellcheckWidget = AjaxSolr.AbstractTextWidget.extend({
		
		afterRequest: function () {
			$(this.target).empty();
			if (this.manager.response.response.docs.length < 5) {
				if (this.manager.response.spellcheck && this.manager.response.spellcheck.suggestions.collation){
					AjaxSolr.theme('suggest', this.target, this.manager.response.spellcheck.suggestions.collation, this.searchSuggestion());
				}
			}
		},
		
		searchSuggestion: function() {
			var self = this;
			return function(e) {
				var value = $(this).text();
				if (value) {
					gQuery = value;
					makeQuery();
				}
			}
		}
		
	});
})(jQuery);
