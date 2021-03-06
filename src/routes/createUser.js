const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const sessionHandler = require('../util/session-handler.js');
var uuid = require('uuid');
const db = require('../util/db-interface.js');

const saltRounds = 10;

//Route for creating user
router.post('/newuser', (req, res, next) => {
  var username = req.db.escape(req.body.username)
  var password = req.body.password;
  var passwordConfirm = req.body.passwordConfirm;
  var isJournalist = req.body.isJournalist;

  if (isJournalist == undefined){
    isJournalist = 0;
  }
  else {
    isJournalist = 1;
  }
  //Compare passwords to confirm spelling, if not redirect to create user page.
  if(password !== passwordConfirm){
    console.log("PASSWORDS DO NOT MATCH");
    req.url += ''
    db.close(req);
    res.redirect('newuser?err=Passwords do not match!');
    return;
  }


  //Check to see if username exists. If yes, redirect to create user page.
  var query = "SELECT * FROM Users WHERE Users.username = " + username;
  req.db.query(query, function(err, results){
    if (err){
      console.log(err);
      res.render('404');
      return;
    };

    if (results.length != 0){
      console.log("USERNAME EXISTS");
      db.close(req);
      res.redirect('newuser?err=User already exists!');
      return;
    }

    bcrypt.hash(password, saltRounds, function(err, hash) {
      query = "INSERT INTO `Users` (`username`, `hash`, `creationDate`, `isAuthor`) VALUES (" + username + ", '" + hash + "', current_timestamp(), '" + isJournalist + "')"
  
      if(!req.db){
        res.render('404');
        return;
      }
  
      req.db.query(query, function(err, results){
        if (err){
          console.log(err);
          res.render('404');
          return;
        }

        db.close(req)
  
  
        var session = uuid.v4();
        sessionHandler.addSession(session, username);
      
        res.cookie('username', username);
        res.cookie('session', session);
        res.redirect('home');
      })
    });
    
  })
})

module.exports = router;
