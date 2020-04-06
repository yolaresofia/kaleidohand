var express = require('express');
var router = express.Router();
const Picture = require('../models/picture.js');

router.get('/main', function(req, res, next) {
    res.render('main');
  });
  
  router.get('/gallery', function(req, res, next) {
      Picture.find()
        .then(pictures => {
          res.render('gallery', { pictures });
        })
        .catch(error => {
          console.log(error);
        });
    });
  
  
  router.post("/api", (req, res) => {
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
  
  module.exports = router;
