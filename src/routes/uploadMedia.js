const express = require('express');
const router = express.Router();
const sessionHandler = require('../util/session-handler.js');
const utils = require('../util/utils.js');

//Route for adding new media
router.post('/submit_media', (req, res, next) => {
  var type = utils.escapeSQL(req.body.type); //Will always have data
  if(type == "") type = "%";
  
  var title = utils.escapeSQL(req.body.title);
  var description = utils.escapeSQL(req.body.description);
  var creator = utils.escapeSQL(req.body.creator);


  if(!sessionHandler.isValidSession(req.body.session, req.body.username)){
    res.redirect('submit_media?err=Please login to post!');
    return;
  }

  var query = "INSERT INTO `Media` (`type`, `description`, `creator`, `mediaID`, `title`, `icon`) VALUES ('"+type+"', '"+description+"', '"+creator+"', NULL, '"+title+"', NULL)"
  req.db.query(query, function(err, results){
    if (err) return next(err);
    console.log("Media successfully uploaded!");
    res.redirect("/media");
    return;
  });

});

module.exports = router;
