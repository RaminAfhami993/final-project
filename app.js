const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');

require('./tools/initialization')();


// handle mongoose collection.ensureIndex warn
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/final-project', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const apiRouter = require('./routes/api');

const app = express();



// req.session

// session 

// res.user_sid

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cookie
app.use(function(req, res, next) {
	console.log('Cookies:', req.cookies);
	res.cookie('name', 'Reza');
	console.log(req.session);
	
	// res.clearCookie('name')
	next();
});

app.use('/api', apiRouter);

app.use('/', apiRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	res.status(res.status || 500).send(err);
});

module.exports = app;