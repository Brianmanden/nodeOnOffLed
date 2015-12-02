//
// init
//
var 	gpio		= require('onoff').Gpio,
	led		= new gpio(14, 'out'),
	request		= require('request'),
	Q		= require('q'),
	clientIP	= '192.168.1.105',
	clientPort	= '4000',
	clientEndPoint1	= 'alive',
	clientEndPoint2	= 'order',
	clientURL	= 'http://' + clientIP + ':' + clientPort + '/'  + clientEndPoint1;

//
// definition of routes
//
exports.index = function(req, res){
	console.log("/index");
	res.render('index');
};

exports.ledOn = function(req, res){
	console.log("/on");
	led.writeSync(1);
	console.log("client up: " + clientStatus(clientURL));
	res.render('computer');
};

exports.ledOff = function(req, res){
	console.log("/off");
	led.writeSync(0);
	res.render('index');
};

exports.order = function(req, res){
	console.log("/order");

	/*
	var params = '';

	for(var param in req.query){
		params += req.query[param] + " ";
	}
	*/

	var url = 'http://' + clientIP + ':' + clientPort + '/' + clientEndPoint2;

	orderClient(url, req.query);

	res.render('computer');
};

function clientStatus(url){

	console.log('client up and running ? - ' + url);

	var deferred = Q.defer();

	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			console.log('status: ' + response.statusMessage);
			deferred.resolve();
		}
		else{
			console.log('error: ' + err);
			deferred.reject();
		}

	});

	return deferred.promise;
}

function orderClient(url, params){

	console.log('order client to start executable');

	var paramString = '?exec=';
	var i = 0;

	for (var param in params) {
		if(i == 0){
			paramString += params[param];
		}else{
			paramString += '&' + param + '=' + params[param];
		}
		i++;
	}
	
	console.log(url + paramString);
	var deferred = Q.defer();
	request(url+paramString, function(error, response, body){
		if(!error && response.statusCode == 200){
			console.log('executable started on client');
			deferred.resolve();
		}else{
			console.log('something went wrong');
			deferred.reject();
		}
	});

	return deferred.promise;
}
