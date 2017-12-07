var customer =  {
  personalInfo: {
	name: 'John Doe',
	contactInfo: {
		country: '-----', 
		city: '-----',
		address: '-----',
		phone: '-----',
		phone2: '',
		email: 'jhondone@skolserna.com.co'
	}
  },
  userProfile: {
	userName: 'jhondone',
	icon: 'modules/user-profiles/resources/1231312312/img.jpg'
  },
  rol: {
     name: 'admin',
	 authentication : {
		 passwordEncrypt: 'md5',
		 flagCache: true,
		 caducidad: '60day',
		 inactivitySession: '2minutes'
	 }
  }
};



var Form = function(selector) {
   this.name = 'Form';
   this.obj = selector
};

Form.prototype.validatorForm = function(arg1) {
	console.log(arg1);
	console.log(this);
};

var strClass = "·skol-button";
var strId = "#skol-button";
var strAttr = "[skol-button]";

var $form = new Form('[skol-form]');
var $submit = $(strAttr);

var onClick = function(arg1){
	$form.validatorForm();
};
$submit.name = 'Button';
$submit.on('click', onClick);
