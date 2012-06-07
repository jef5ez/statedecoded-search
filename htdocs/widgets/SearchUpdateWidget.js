(function ($) {
	AjaxSolr.SearchUpdateWidget = AjaxSolr.AbstractWidget.extend({
		afterRequest: function () {
			$(this.target).text('Searching for: ' + this.manager.store.get('q').value);
		}
	});
})(jQuery);
