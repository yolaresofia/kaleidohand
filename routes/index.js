const express = require('express');
const router = express.Router();
const Picture = require('../models/picture.js');
const User = require('../models/user');


router.get('/', function (req, res, next) {
  res.render('home');
});

router.get('/main', function (req, res, next) {
  res.render('main');
});

router.get('/gallery', function (req, res, next) {
  Picture.find()
    .then(pictures => {
      res.render('gallery', {
        pictures
      });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/api", (req, res) => {
  // our unix timestamp
  const unixTimeCreated = new Date().getTime();
  // add our unix time as a "created" property and add it to our request.body
  const user = req.session.currentUser._id;
  const newData = Object.assign({
    "created": unixTimeCreated
  }, req.body)

  // add in our data object to our database using .insert()
  Picture.create({
      user: user,
      data: newData
    })
    .then(() => {
      res.redirect('/main');
    })
    .catch(error => {
      console.log(error);
    });
})

router.get('/profiles/:id', function (req, res, next) {
  Picture.find({user: req.params.id})
    .populate('user')
    .then(pictures => { 
      let {name, website, city, email, imgPath} = pictures[0].user;
      res.render('profiles', { pictures, name, email, city, website, imgPath })
    })
    .catch(error => console.log(error));
});


router.get('/gallery/:id', (req, res, next) => {
    Picture.findById(req.params.id)
    .populate('user', 'name')
    .then(picture => {
      res.render('single-piece', { picture });
    })
    .catch(error => {
      console.log(error);
    });
})

module.exports = router;