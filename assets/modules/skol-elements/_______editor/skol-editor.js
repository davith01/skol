var interfaces = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: './skol-maker/interfaces'
});
interfaces.initialize();

/**
 * Categorizing tags
 */
var elt = $('#enctype');
elt.tagsinput({
  tagClass: function(item) {
    switch (item.type) {
      case 'entity'   : return 'label label-primary';
      case 'interface'  : return 'label label-danger label-important';
	  default: return 'label label-primary';
    }
  },
  itemValue: 'value',
  itemText: 'text',
  typeaheadjs: [
	{ hint: true, highlight: true, minLength: 3 },
    { name: 'interfaces', displayKey: 'text', source: interfaces.ttAdapter() }
  ]
});
//elt.tagsinput('add', { "value": 3, "name": "Region_City", "type": "interface" });

// HACK: overrule hardcoded display inline-block of typeahead.js
$(".twitter-typeahead").css('display', 'inline');


 
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