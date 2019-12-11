const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

var match = false;
//Route for validating login
router.post('/validatelogin', (req, res, next) => {
  var password = req.body.password
  var username = req.body.username
  var hash = "";

  //Check to see if username exists. If yes, redirect to login user page.
  var query = "SELECT * FROM Users WHERE Users.username = '" + username + "'";
  req.db.query(query, function(err, results){
    if (err) return next(err);
    //If no results
    if (results.length == 0){
      //DO FAILED LOGIN MAGIC
      console.log("NO USER BY THAT NAME")
    }
    else {
      hash = results[0].hash
      bcrypt.compare(password, hash, function(err, data) {
        if(err) return next(err);
        if(data == true){
          res.redirect('home')
        }
        else{
          res.redirect('login_user')
        }
      });
    }
  })
})

module.exports = router;
