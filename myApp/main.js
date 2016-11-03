var express = require('express');
var app = express();
var routes = require('./routes/index');

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// all environments
app.set('port', process.env.PORT || 3000);

app.use('/index', routes);
var server=app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});