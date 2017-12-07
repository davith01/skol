$(function() {
	var selector  = '#enctype';
	var interfaces = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: './skol-maker/interfaces'
	});
	interfaces.initialize();

	/**
	 * Categorizing tags
	 */
	var elt = $(selector);
	elt.tagsinput({
	  defaultText:'add a entity',
	  tagClass: function(item) {	  
		switch (item.type) {
		  case 'Entity'   : return 'skol-success'; 
		  case 'Relation'  : return 'skol-primary';
		  default: return 'skol-success';
		}
	  },
	  onAddTag: function(item){ console.log('item add');console.log(item);},
	  onChange: function(item,item1){ console.log('item change');console.log(item);console.log(item1);},
	  itemValue: 'value',
	  itemText: 'text',
	  typeaheadjs: [
		{ hint: true, highlight: true, minLength: 0 },
		{ name: 'interfaces', displayKey: 'text', source: interfaces.ttAdapter() }
	  ]
	});

	// HACK: overrule hardcoded display inline-block of typeahead.js
	$(".twitter-typeahead").css('display', 'inline');

	$(selector).on('change', function(event) {
	   var $element = $(event.target),
		  	  items = JSON.stringify($element.tagsinput('items'));
		
	}).trigger('change');

	$(selector).on('beforeItemAdd', function(event) {
	   var tag = event.item;
	   // Do some processing here

	   if (!event.options || !event.options.preventPost) {
		  /*$.ajax('/ajax-url', ajaxData, function(response) {
			 if (response.failure) {
				// Remove the tag since there was a failure
				// "preventPost" here will stop this ajax call from running when the tag is removed
				$('#tags-input').tagsinput('remove', tag, {preventPost: true});
			 }
		  });*/
	   }
	});

	$(selector).on('beforeItemRemove', function(event) {
	   var tag = event.item;
	   // Do some processing here

	   if (!event.options || !event.options.preventPost) {
		  /*$.ajax('/ajax-url', ajaxData, function(response) {
			 if (response.failure) {
				// Re-add the tag since there was a failure
				// "preventPost" here will stop this ajax call from running when the tag is added
				$('#tags-input').tagsinput('add', tag, {preventPost: true});
			 }
		  });*/
	   }
	});

});
 
/*
var citynames = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: {
    url: '/interfaces',
    filter: function(list) {
      return $.map(list, function(cityname) {
		return { name: 'cityname' }; });
    }
  }
});
citynames.initialize(); 

$('#tags_1').tagsInput({
  typeaheadjs: {
    name: 'citynames',
    displayKey: 'name',
    valueKey: 'name',
    source: citynames.ttAdapter()
  }
}); 



$('#tags_2').tagsInput({
   'autocomplete_url': '/interfaces',
   'autocomplete':{selectFirst:true, width:'100px', autoFill:true},
   'defaultText':'add a entity',
   'onAddTag': function(item){},
   'onChange' :  function(item){},   
   'delimiter': [',',';'],   // Or a string with a single delimiter. Ex: ';'
   'removeWithBackspace' : true,
   'minChars' : 0,
   'maxChars' : 0, // if not provided there is no limit
   'placeholderColor' : '#666666'
});

 
$('#tags_3').tagsInput({
  defaultText:'add a entity',
  tagClass: function(item) {
    switch (item.type) {
      case 'entity'   : return 'label label-primary';
      case 'interface'     : return 'label label-warning';
    }
  },
  itemValue: 'name',
  itemText: 'name',
  typeaheadjs: {
    name: 'name',
    displayKey: 'name',
    source: function(query) {
      return $.get('./interfaces');
    }
  }
});

var citynames = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: {
    url: '/interfaces',
    filter: function(list) {
      return $.map(list, function(cityname) {
        return { name: cityname }; });
    }
  }
});
citynames.initialize();

$('#tags_4').tagsInput({
  typeaheadjs: {
    name: 'citynames',
    displayKey: 'name',
    valueKey: 'name',
    source: citynames.ttAdapter()
  }
});
*/