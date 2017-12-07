var mysql = require('mysql');

function SkolMysql() {
    this.con = mysql.createConnection({
        host: "localhost",
		port: 3306,
        user: "skolMysql",
        password: "q7STRhyJ6JXVpNKJ",
        database: "skolMysql"
    });	
};

SkolMysql.prototype.CreateTable = function(entity, callback) {
	var con  = this.con;
	var columns = "", attr = "";
	for(var i=0; i < entity.columns.length; i++) {
		if(columns.length !==0 ) columns = columns + ',';
		attr = entity.columns[i].attr || '';
		columns = columns + entity.columns[i].name + ' ' + entity.columns[i].type + ' ' + attr;
	}
	
	con.connect(function(err) {
		var sql = "CREATE TABLE " + entity.name + " (" + columns +" )";
		console.log(sql);
		con.query(sql, function(err, result) {
			if (err) { console.log('error to CREATE TABLE ' + entity.name + ' ' + err.message ); } 
			else {	
				console.log("CREATE TABLE " + entity.name + " successful"); 
				callback(err, result);
			}
		});	
    });
};

SkolMysql.prototype.DropTable = function(entity, callback) {
	var con  = this.con;
	con.connect(function(err) {
		
		var sql = "DROP TABLE IF EXISTS " + entity.name;
		con.query(sql, function(err, result) {
			if (err) { console.log('error to DROP TABLE ' + entity.name + ' ' + err.message ); } 
			else {	
				console.log("DROP TABLE " + entity.name + " successful"); 
				callback(err, result);
			}
		});	
    });
};

SkolMysql.prototype.InsertTable = function(entity, values, callback) {
	var con  = this.con;
	var columns = "", attr = "";
	for(var i=0; i < columns.length; i++) {
		if(columns.length !==0 ) columns = columns + ',';
		attr = entity.attr || '';
		columns = columns + entity.name;
	}
	con.connect(function(err) {
		var sql = "INSERT INTO "+entity.name+" ("+columns+") VALUES ?";
		con.query(sql, [values], function(err, result) {
			if (err) { console.log('error to INSERT INTO ' + entity.name + ' ' + err.message ); } 
			else {	
				console.log("INSERT INTO TABLE " + entity.name + " successful"); 
				callback(err, result);
			}
		});		
    });
};


SkolMysql.prototype.SelectView = function(entity,view,params,callback) {
	var con  = this.con;
	con.connect(function(err) {
	    if (err) throw err;
	    //query
		var where = '';
		for(var i=0; i < params.length; i++) {
			if(where.length ===0 ) where = ' WHERE ' + where;
			where = where + '';
		}
		var selectView = '*';
		var sql = 'SELECT '+selectView+' FROM '+entity.name+' '+where;
		con.query(sql, function (err, result) {
		  if (err) throw err;
		  callback(result);
		});
	});
};


/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table altered");
  });
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers (name, address) VALUES ?";
  var values = [
    ['John', 'Highway 71']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});


//Get Inserted ID
con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
});

con.connect(function(err) {
  if (err) throw err;
  //query
	var name = 'Amy';
	var adr = 'Mountain 21';
	var sql = 'SELECT * FROM customers WHERE name = ? OR address = ?';
	con.query(sql, [name, adr], function (err, result) {
	  if (err) throw err;
	  console.log(result);
	});
});
*/
module.exports = SkolMysql;