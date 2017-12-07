var express = require('express'),
	session = require('express-session');

var router = express.Router();
 
router.get('/', function(req, res){
	var customer = null;
	var company = {
			title: 'Skol & Serna Asosiated',
			name: 'Skol & Serna Asosiated',
			ico: 'images/Skol&Serna.png'
		};
	getCustomer({key: "customer"}, Render);
	
	function Render(params){
		if(params.key=="customer") {
			customer=params.value;
		}		
		if(company && customer) {
			req.session.customer = customer;
			req.session.company = company;
			res.render('index', { "company": company, "customer": customer });
		}
	}	
});

router.get('/resources/:resourcesName/:view', function(req, res) {
	var view = req.params.view;
	var resource = req.params.resourcesName;
	var params = {};
	
	getEntity(resource,function(entity) {
		var SkolMysql = require('./maker-bd/skol-mysql'),
			skolMysql = new SkolMysql();
		
		skolMysql.SelectView(entity,view,params,function(result) {
			Tranformation(data);
			res.header('Content-Type', 'text/json').send(data);
		});
	});    
});

router.get('/views/:page', function(req, res) {	
	var page = 'templates/'+req.params.page,
		customer = req.session.customer ? req.session.customer : {},
		company = req.session.company;
		res.render(page, { "company": company, "customer": customer });
});

router.get('/content/:page', function(req, res) {	
	var page = 'contents/'+req.params.page,
		customer = req.session.customer ? req.session.customer : {},
		company = req.session.company;
		res.render(page, { "company": company, "customer": customer });
});



router.get('/skol-maker/interfaces', function(req, res) {
    var json = [
	  { "value": {"id":1,"name":"region"     ,"attr":[]}, "text": "Region"               , "type": "Entity"      },
	  { "value": {"id":2,"name":"city"       ,"attr":[]}, "text": "Ciudad"               , "type": "Entity"      },
	  { "value": {"id":3,"name":"region_city","attr":[]}, "text": "Region_Ciudad"        , "type": "Relation"    }
	];
    res.header('Content-Type', 'text/json').send(json);
});

module.exports = router;

function getCustomer(params,onSuccess) {
	
	var resource = "../modules/user-profiles/prototype-customer.json";
	try {
        //Modulo en Node.js para manipular archivos
        var fs = require('fs');
        var path = require('path');
        fs.readFile(path.join(__dirname,resource), "utf-8", function(err, data) {
            var _return = { "key": params.key, "value": JSON.parse(data)};
			onSuccess(_return);
        });
    } catch (err) {
        console.log(err.message);				
    }
}

function getEntity(entityName,onSuccess) {
	var resource = "./maker-bd/entities/"+entityName+".json";
	try {
        //Modulo en Node.js para manipular archivos
        var fs = require('fs');
        var path = require('path');
        fs.readFile(path.join(__dirname,resource), "utf-8", function(err, data) {
			var _return = {}; 
			try {
				_return = JSON.parse(data); 
				onSuccess(_return );
			} catch (err) { console.log(err); }
        });
    } catch (err) {
        console.log(err.message);				
    }
}
