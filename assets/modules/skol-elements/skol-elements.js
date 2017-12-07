

//function to add dynamic event to skol element
function SkolElement(skolElement){
	var skol = this;
	skol.children = [];
	skol.selector = "[skol-"+skolElement.type+"="+skolElement.id+"]",
		strFn = "$skolElem = this.$skolElem;";
	
	skol.$skolElement = $(this.selector);
	
	if(skolElement.actions.init) {
		strFn = skolElement.actions.init;
		strFn = new Function("return function foo(){ " + strFn + " }")();
		strFn();	
	}
	if(skolElement.actions.onClick) {
		strFn = skolElement.actions.onClick;
		$(skol.selector).click(new Function("return function foo(){ " + strFn + " }")() );
	}
	jQuery.each(skolElement.children, function(index, skolChildren) {
		var children = new SkolElement(skolChildren);
		skol.children.push(children);
	});
}

/*
 * @extends `SkolElement`
 */
SkolElement.prototype = {
	 
	get : function() {
		return 'asdfGet';
	},
	set : function(value){
	},
	getChildren : function(){
		
	},
	render: function(){
		
	}
};

function RenderSelectGroup($select,groups) {
	var $optgroup = null,
		$option = '',
		items = null;
	$.each(groups, function (index, group) {	
		$optgroup = '<optgroup label="'+group.name+'">'; 
		$option = '';
		$.each(group.items, function (i, item) {
			$option = $option + '<option value="'+item.value+'">'+item.text+'</option>';
		});
		$optgroup = $optgroup + $option + '</optgroup>'; 
		$select.append($($optgroup));
	});
}

function getResource(resourceName,params,callback){
	var view = params.view ? '/'+params.view : '';
	/*$.get( "resources/"+resourceName+view, function( data ) {
	  callback(data);
	});*/
}