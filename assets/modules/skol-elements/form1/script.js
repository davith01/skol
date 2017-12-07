//Structure
var structForm1 = {
  "type": "form",
  "id": "form-person",
  "actions" : {
	"onSubmit": "return function foo(){ alert('another event');  }"
  },
  "children": [{
	  "type": "button",
	  "id": "button-form-person",
	  "actions": {
		  "init": "this.value='11234';",
		  "get": "console.log(this); return true;",
		  "set": "console.log(this); return true;"
	  },
	  "validator": "required"
	},
	{
	  "type": "select-group",
	  "id": "cities",
	  "actions": {
		  //"init": "alert($skolElem);"
		  //"init": "var groups = [{'name':'grop1','items':[{'value':'1','text':'1'},{'value':'2','text':'2'}]}]; console.log($skolElem);var $select = $skolElem, 	$optgroup = null,	items = null;$.each(groups, function (i, group) {		$optgroup = $('<optgroup>');    	$optgroup.attr('label',group.name);		$.each(groups.items, function (i, item) {				$optgroup.append($('<option>', { 						value: item.value,						text : item.text 				}));	});});"
		  "init": "getResource('region_city',{'view':'misc'},function(cities){RenderSelectGroup(this.$skolElement,cities);})"
	  },
	  "validator": "required"
	}]
};

/////////////////////////////////////////////////////////////////////
var form1 = new SkolElement(structForm1);
/////////////////////////////////////////////////////////////////////
console.log(form1);