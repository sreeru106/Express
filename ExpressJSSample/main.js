var express = require('express');
var app = express();
var routes = require('./routes/index');
var add = require('./routes/add');
var bodyParser = require('body-parser');



app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// all environments
app.set('port', process.env.PORT || 3000);

app.use('/index', routes);
app.use('/add', add);
app.use(express.static(__dirname + '/public'));
var server=app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


