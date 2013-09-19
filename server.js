var httpProxy = require('http-proxy'), 
	express = require('express');
	
var apiProxy 	= httpProxy.createServer(8080, 'localhost');
var app 		= express();

app.configure(function () 
{
	app.use(express.static(__dirname + '/public'));
    app.use('/api', apiProxy);
});

app.listen(9000);
console.log('Web server up & running');