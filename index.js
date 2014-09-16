var express = require('express');

var app =  express();

app.engine('jade', require('jade').__express);

app.set('views', __dirname + '/app/views');
app.use(express.static(__dirname + '/app/bower_components'));
app.use(express.static(__dirname + '/app/public_build'));

app.get('/', function (req, res) {
	res.render('index.jade');
});

app.listen(3030);
console.log('Server listening on port 3030');
