(function ($) {
	AjaxSolr.TextWidget = AjaxSolr.AbstractTextWidget.extend({
		
		init: function () {
  			var self = this;
  			$(this.target).find('input#query').bind('keydown', function(e) {
  				if (e.which == 13) {
      				var value = $(this).val();
      				$( '#query' ).autocomplete("close");
					if (value){
						makeQuery.q = value;
						makeQuery();
					}
    			}
  			});
  			$(this.target).find('input:button').click(function(e) {
				var value = $(self.target).find('input#query').val();
				$( '#query' ).autocomplete("close");
				if (value){
					makeQuery.q = value;
					makeQuery();
				}
  			});
		},
		
		afterRequest: function () {
 	 		$(this.target).find('input#query').val('');
		}
		
	});
})(jQuery);