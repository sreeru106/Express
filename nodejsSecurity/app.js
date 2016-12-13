var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var helmet = require ('helmet');
var app = express();
var csrf = require ('csurf');

csrfProtection= csrf();


// view  setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//Helmet settings
app.use(helmet.contentSecurityPolicy({
	  directives: {
		defaultSrc: ["'self'"],
		styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
	  }
	}),
helmet.dnsPrefetchControl(),
helmet.frameguard({ action: 'sameorigin' }),
helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' })
)


	  var user = 
	  {
		  username : "admin",
		  password :"password"
	  };
	  
//using local strategy for password authentication 
passport.use(new LocalStrategy(function(username, password, done) {

	  if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    }
));

app.get('/',csrfProtection, function(req, res, next) {
	res.render(path.join(__dirname, 'index.html'), { csrfToken: req.csrfToken() });
});


//authenticating login request
app.post('/login', 
	passport.authenticate('local',{successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure',
		})
	);
	
	
app.get('/loginFailure', function(req, res, next) {
	console.log("log in failed");
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/loginSuccess',csrfProtection, function(req, res, next) {
	console.log("successfully logged in");
	res.render(path.join(__dirname, 'success.html'),{ csrfToken: req.csrfToken() });
});

//serializing and deserializing the user object, we can have entire user object or a single param of user like id
passport.serializeUser(function(user, done) {
	console.log("serializing user");
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	console.log("Deserializing user");
	done(null, user);
});

//user object will be there in all request once logged in
app.post('/submit', loggedIn, function(req, res, next) {
	console.log("in /submit hit");
    res.render(path.join(__dirname, 'logout.html'));
});
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('Not authenticated');
    }
}

//req.logOut() will remove the user object from requset
app.get('/logout', function(req, res, next) {
     req.logOut();
	res.redirect('/');
});

app.listen(8888);
console.log("server has started");