(function ($) {
	AjaxSolr.SearchUpdateWidget = AjaxSolr.AbstractWidget.extend({
		afterRequest: function () {
			$(this.target).text(this.manager.store.get('q').value);
		}
	});
})(jQuery);
