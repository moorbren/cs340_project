const express = require('express');
const router = express.Router();
const sessionHandler = require('../util/session-handler.js');
const utils = require('../util/utils.js');

//Route for adding new media
router.post('/uploadComment', (req, res, next) => {
  var backURL=req.header('Referer') || '/';
  var query = backURL.lastIndexOf('?');
  if(query != -1){
    backURL = backURL.substring(0, query);
  }

  var articleID = utils.escapeSQL(req.body.articleID); //Will always have data
  var body = utils.escapeSQL(req.body.body);


  if(!sessionHandler.isValidSession(req.body.session, req.body.username)){
    res.redirect(backURL + '?err=Please login to post!');
    return;
  }

  var query = "INSERT INTO `Comments` ( `commentID`, `dateAdded`, `body`, `articleID`, `username`) VALUES" +
  "(NULL, current_timestamp(), '" + body + "', '" + articleID + "', "+ req.body.username+")";
  req.db.query(query, function(err, results){
    if (err) {console.log(err); return next(err); }
    console.log("Media successfully uploaded!");
    res.redirect(backURL);
    return;
  });

});

module.exports = router;
