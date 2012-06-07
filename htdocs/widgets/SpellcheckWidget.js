(function ($) {
	AjaxSolr.SpellcheckWidget = AjaxSolr.AbstractWidget.extend({
		
		afterRequest: function () {
		  	$(this.target).empty();
			if (this.manager.response.spellcheck == undefined)
			{
				return;
			}
			var query = this.manager.store.get("q").value;
		  	for (var i = 0, l = this.manager.response.spellcheck.suggestions[query].suggestion.length; i < l; i++) {
				var doc = this.manager.response.spellcheck.suggestions[query].suggestion[i];
				$(this.target).append(doc, "<br/>");
			}
		}
		
	});
})(jQuery);
