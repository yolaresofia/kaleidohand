require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const Picture = require('./models/picture.js');

const app = express()


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


app.get('/index', function(req, res, next) {
    Picture.find()
      .then(pictures => {
        res.render('index', { pictures });
      })
      .catch(error => {
        console.log(error);
      });
  });


app.post("/api", (req, res) => {
    // our unix timestamp
    const unixTimeCreated = new Date().getTime();
    // add our unix time as a "created" property and add it to our request.body
    const newData = Object.assign({"created": unixTimeCreated}, req.body)

    // add in our data object to our database using .insert()
    Picture.create({data:newData})
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      console.log(error);
    });

})


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
  