//
// variables and init
//
var 	express	= require('express');
var	routes	= require('./routes');
var	path	= require('path');
var	ejs	= require('ejs');

//
// express setup
//
var app = express();
app.engine("html", ejs.renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

//
// routes
//
app.get('/', routes.index);
app.get('/on', routes.ledOn);
app.get('/off', routes.ledOff);
app.get('/order', routes.order);

//
// nodejs webserver
//
function startServer(){
	var server = app.listen(3000, function(){
		var port = server.address().port;
		console.log("Starting node server on port: " + port);
	})
}

startServer();
