(function ($) {
	AjaxSolr.TagcloudWidget = AjaxSolr.AbstractFacetWidget.extend({
		init: function() {
			this.name = this.field.name;
			if (this.field.display) {
				this.display = this.field.display;
			} else { 
				this.display = function (){return true};
			};
			this.field = this.field.field;
			$(this.target).append('<div class="facet" id="' + this.field + '_facet"> \
				<h2>' + this.name + '</h2> \
				<div class="tagcloud" id="' + this.field + '"></div> \
			</div>');
			this.tagcloud = $(this.target).find('#' + this.field);
		},
		
		afterRequest: function () {
			$(this.target).find('#' + this.field + '_facet').hide();
		  	if(this.display(this) && getObjectKeys(this.manager.response.facet_counts.facet_fields[this.field]).length > 1) {
		  		$(this.target).find('#' + this.field + '_facet').show();
			} 
			
		  	var maxCount = 0;
		  	var objectedItems = [];
		  	for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
				var count = parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet]);
				if (count > maxCount) {
			 		maxCount = count;
				}
				objectedItems.push({ facet: facet, count: count });
		  	}
		  	objectedItems.sort(function (a, b) {
				return a.facet < b.facet ? -1 : 1;
		  	});
		
		  	var self = this;
		  	this.tagcloud.empty();
		  	for (var i = 0, l = objectedItems.length; i < l; i++) {
				var facet = objectedItems[i].facet;
				this.tagcloud.append(AjaxSolr.theme('tag', facet, parseInt(objectedItems[i].count / maxCount * 10), self.addFacet(facet)));
		  	}
		  	this.tagcloud.append('<div class="clear"></div>');
		},
		
		addFacet: function(facet) {
			var self = this;
			return function () {
				if(facet.split(' ').length > 1) {
					gFacets.push(self.field + ':"' + facet + '"');
				} else {gFacets.push(self.field + ":" + facet);}
				updateFacets();
				self.clickHandler(facet)();
			}
		}
	});
})(jQuery);