(function ($) {
	AjaxSolr.TextWidget = AjaxSolr.AbstractTextWidget.extend({
		init: function () {
  			var self = this;
  			$(this.target).find('input#query').bind('keydown', function(e) {
  				if (e.which == 13) {
      				var value = $(this).val();
      				$( '#query' ).autocomplete("close");
      				if (value && self.set(value)) {
        				self.manager.doRequest(0);
      				}
    			}
  			});
		},

		afterRequest: function () {
 	 		$(this.target).find('input#query').val('');
		}
	});
})(jQuery);