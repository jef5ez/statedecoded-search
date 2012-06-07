(function ($) {
	//target MUST be a HTML form element for this widget to work, and the show all checkbox must have name="ALL"
	//the names of the checkbox elements must be facets 
	AjaxSolr.CheckboxFilterWidget = AjaxSolr.AbstractFacetWidget.extend({
		checkedParams: [],
		
		currentValue: null,
		
		init: function () {
			var self = this;
			$.each($(this.target).find('input'), function () {
				this.onclick = self.checkEvent(this);
				if (this.checked) {
					self.checkedParams.push(this.name);
				}
			});
		},
		
		beforeRequest: function () {
			this.updateQuery(this.composeFQ());
		}, 
		
		afterRequest: function () {
		//show numbers
		},
		
		addFacet: function (facet) {
			if ( this.checkedParams.indexOf(facet) <= 0 ){
				this.checkedParams.push(facet);
				this.manager.doRequest(0);
			}
		},

		removeFacet: function (facet) {
			if ( this.checkedParams.indexOf(facet) >= 0 ){
				var params = this.checkedParams;
				params.splice(params.indexOf(facet), 1);
				this.manager.doRequest(0);
  			}
		},
		
		updateQuery: function (newValue) {
			if (newValue){
				if (this.manager.store.removeByValue('fq', this.currentValue) || !this.currentValue) { //Because we need to OR, we need to remove the current fq param, otherwise it will do an AND
					if (this.manager.store.addByValue('fq', newValue)) {
						this.currentValue = newValue;
					}
				}
			}
			else {
				this.manager.store.removeByValue('fq', this.currentValue);
				this.currentValue = newValue;
			}
		},
		
		composeFQ: function () {
			newValue = null;
			if (this.checkedParams.length){
				newValue = this.field + ':(';
				$.each(this.checkedParams, function () {
					newValue += this + " ";
				});
				newValue += ')'
			}
			return newValue;
		},
		
		checkEvent: function (e) {
			var self = this;
			return function() {
				self.checkAllCheck(e.form, e.name === 'ALL');
				if (e.name !== 'ALL'){
					if (e.checked){
						self.addFacet(e.name);
					}
					else {
						self.removeFacet(e.name);
					}
				}
			}
		},

		checkAllCheck: function (form, all) {
			if(all)
			{
				var self = this;
				$.each(form.elements, function () {
					if (this.name !== 'ALL'){
						if (this.checked !== true){
							this.checked = true;
							self.addFacet(this.name);
						}
					}
				});
				form.ALL.checked = true;
			}
			else {
				form.ALL.checked = true;
				$.each(form.elements, function () {
					if (!this.checked && this.name !== 'ALL') {
						form.ALL.checked = false;
					}
				});
			}
		}
	});
})(jQuery);