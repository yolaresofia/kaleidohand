//const User = require('../models/user');
const express = require('express');
const router = express.Router();
const Picture = require('../models/picture.js');


router.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
        return;
    }
    res.redirect('/auth/login');
});

router.get('/profile', function(req, res, next) {
  let query = { user: req.session.currentUser._id }
    Picture.find(query)
      .then(pictures => {
         // console.log(pictures);
        res.render('personal/profile', { pictures });
      })
      .catch(error => {
        console.log(error);
      });
  });

  router.post('/:id/delete', (req, res, next) => {
    Picture.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/personal/profile');
    })
    .catch(error => {
      console.log('Error while deleting', error);
    })
  })

  module.exports = router;