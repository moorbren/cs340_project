const express = require('express');
const router = express.Router();
const sessionHandler = require('../util/session-handler.js');
const utils = require('../util/utils.js');

router.post('/addRating', (req, res, next) => {
  var backURL=req.header('Referer') || '/';
  if(!sessionHandler.isValidSession(req.body.session, req.body.username)){
    res.redirect(backURL+'?err=Please login to rate!');
  }

    var username = utils.escapeSQL(req.body.username.substring(1).slice(0,-1))
    var rating = req.body.rating;
    var mediaID = req.body.passedMediaID;
    var query = "INSERT INTO `Ratings` (`mediaID`, `username`, `rating`) VALUES ("+mediaID+", '"+username+"', "+rating+") ON DUPLICATE KEY UPDATE `rating` = "+rating
    console.log(query)
    req.db.query(query, (results, err) =>{
      if(err) return next(err);
      console.log("Rating successfully recorded!")
    });
    res.redirect(backURL);
});

module.exports = router;
