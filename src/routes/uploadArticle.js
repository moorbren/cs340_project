const express = require('express');
const router = express.Router();
const sessionHandler = require('../util/session-handler.js');
const utils = require('../util/utils.js');

//Route for adding new media
router.post('/submit_article', (req, res, next) => {
  var mediaID = utils.escapeSQL(req.body.mediaID); //Will always have data
  
  var title = utils.escapeSQL(req.body.title);
  var body = utils.escapeSQL(req.body.body);


  if(!sessionHandler.isValidSession(req.body.session, req.body.username)){
    res.redirect('submit_article?err=Please login to post!');
    return;
  }

  var query = "INSERT INTO 'Articles' ( 'articleID', 'title', 'creationDate', 'body', 'mediaID', 'username') VALUES" +
  "('NULL', " + title + "', 'NULL', '" + body + "', 'NULL', '" + req.body.username+"')";
  req.db.query(query, function(err, results){
    if (err) {console.log(err); return next(err); }
    console.log("Media successfully uploaded!");
    res.redirect("/articles");
    return;
  });

});

module.exports = router;
