// Express Framewor 'MVC' para crear aplicaciones web con Node.js
var express = require('express'),
    path    = require('path'),
	bodyParser = require('body-parser'),
    cons    = require('consolidate'),
    http    = require('http'),
    app     = express(),
	favicon = require('serve-favicon'),
    server  = http.createServer(app),
	port    = process.env.PORT || 5656;

	
//Configurando uso de session en el servidor
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var options = {
    host: 'localhost',
    port: 3306,
    user: 'skolMysql',
    password: 'q7STRhyJ6JXVpNKJ',
    database: 'skolMysql'
};
 
var sessionStore = null;// new MySQLStore(options);

app.use(session({
    secret: 'keyboard cat',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
	cookie: { path: '/', httpOnly: true, secure: false, maxAge: null }
}));

/*
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
*/	

// Configurando parametros de funcionamiento para express con respecto a la aplicacion
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// Motor de templates utilizando Consolidate y swig
app.engine('html', cons.swig);

// Tipo de templates que utilizaran; en nuestro caso `html`
app.set('view engine', 'html');

// Path o directorio donde se encuentran los templates
app.set('views', path.join(__dirname, 'views'));

// Sirviendo los estaticos de la aplicacion en nuestro caso los `assets`
app.use(express.static(path.join(__dirname, 'assets')));


// Encoding para las tramas HTTP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Quien resuelve y gestiona las url a través del controlador
var router = require('./modules/routers');
app.use(router);

// En el caso en que la url no sea conocida o resuelta
app.get('*', function(req, res) {
    res.status(405).send('Method not allowed');
});

server.listen(port, function(){
	console.log('Listen %d', port);
});


//SOCKET IO

//Gestion de peticiones por Socket io
var socket = require('./modules/sockets');

//Gestor de Entidades persistentes en bd
var managerBD = require('./modules/maker-bd/managment');
//managerBD.startInitConfiguration();



