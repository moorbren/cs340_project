const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Route for creating user
router.post('/createuser', (req, res, next) => {
  var password = req.body.password
  var passwordConfirm = req.body.password
  var username = req.body.username
  var isJournalist = req.body.isJournalist
  if (isJournalist == undefined){
    isJournalist = 0;
  }
  else {
    isJournalist = 1;
  }

  //Compare passwords to confirm spelling, if not redirect to create user page.
  if(password != passwordConfirm){
    console.log("PASSWORDS DO NOT MATCH")
    res.redirect('newuser.hbs');
  }

  //Check to see if username exists. If yes, redirect to create user page.
  var query = "SELECT * FROM Users WHERE Users.username = '" + username + "'";
  req.db.query(query, function(err, results){
    if (err) return next(err);
    if (results.length != 0){
      console.log("USERNAME EXISTS")
      res.redirect('newuser.hbs')
    }
  })

  bcrypt.hash(password, saltRounds, function(err, hash) {
    query = "INSERT INTO `Users` (`username`, `hash`, `creationDate`, `isAuthor`) VALUES ('" + username + "', '" + hash + "', current_timestamp(), '" + isJournalist + "')"
    req.db.query(query, function(err, results){
      if(err) return next(err)
    })
  });


  res.redirect('home')
})

module.exports = router;
