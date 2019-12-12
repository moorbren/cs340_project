const express = require('express');
const router = express.Router();
const sessionHandler = require('../util/session-handler.js');
const utils = require('../util/utils.js');
const db = require('../util/db-interface.js');

//Route for adding new media
router.post('/submit_article', (req, res, next) => {
  var mediaID = utils.escapeSQL(req.body.mediaID); //Will always have data
  var username = utils.escapeSQL(req.body.username.substring(1).slice(0,-1));
  var title = utils.escapeSQL(req.body.title);
  var body = utils.escapeSQL(req.body.body);

  if(!sessionHandler.isValidSession(req.body.session, req.body.username)){
    db.close(req)
    res.redirect('submit_article?mediaID='+mediaID+'&err=Please login to post!');
    return;
  }

  var query = "INSERT INTO `Articles` (`articleID`, `title`, `creationDate`, `body`, `mediaID`, `username`) VALUES (NULL, '"+title+"', current_timestamp(), '"+body+"', "+mediaID+", '"+username+"')"

  req.db.query(query, function(err, results){
    if (err) {console.log(err); return next(err); }
    console.log("Article successfully uploaded!");
    db.close(req)
    res.redirect("/articles");
    return;
  });

});

module.exports = router;
