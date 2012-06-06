(function ($) {
	AjaxSolr.TextWidget = AjaxSolr.AbstractTextWidget.extend({
		init: function () {
  			var self = this;
  			$(this.target).find('input#query').bind('keydown', function(e) {
  				if (e.which == 13) {
      				var value = $(this).val();
      				$( '#query' ).autocomplete("close");
      				if (value && self.set(value)) {      					
						var dt_params = '';
						if ($('input[name=law]').is(':checked')) dt_params += 'Law ';
						if ($('input[name=definition]').is(':checked')) dt_params += 'Definition ';
						if ($('input[name=court_decision]').is(':checked')) dt_params += 'Court_Decision ';
						if ($('input[name=comment]').is(':checked')) dt_params += 'Comment ';
						if (dt_params === '') dt_params = 'Law';
						self.manager.store.addByValue('fq', 'doc_type:(' + dt_params + ')');
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