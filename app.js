require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

//const Picture = require('./models/picture.js');

const app = express()
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const personalRouter = require('./routes/personal')



mongoose
  .connect('mongodb+srv://milton:mileteas123@cluster0-lduwt.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });


    
  app.use(session({
    secret: 'kaleidoscope',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 },
    store: new MongoStore({
      url: 'mongodb+srv://milton:mileteas123@cluster0-lduwt.mongodb.net/test?retryWrites=true&w=majority',
      ttl: 24 * 60 * 60 // 1 day
    })
  }));
  
  app.use((req, res, next) => {
    if (req.session.currentUser) {
      res.locals.currentUserInfo = req.session.currentUser;
      res.locals.isUserLoggedIn = true;
    } else {
      res.locals.isUserLoggedIn = false;
    }
  
    next();
  });



// add logging middleware
app.use(logger("dev"))

// Handling JSON data 
app.use(express.json({limit: '5mb',extended: true}));
app.use(express.urlencoded({limit: '5mb', extended: true}));

// set the path to the public assets
const publicPath = path.resolve(__dirname, 'public')
app.use( express.static(publicPath))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//MIDDLEWARE SETUP
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/personal', personalRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  module.exports = app;
  