//
// init of io connectivity
//
var gpio	= require('onoff').Gpio;
var led		= new gpio(14, 'out');


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
	res.render('index');
};

exports.ledOff = function(req, res){
	console.log("/off");
	led.writeSync(0);
	res.render('index');
};
