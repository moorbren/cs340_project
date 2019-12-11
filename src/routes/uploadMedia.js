const express = require('express');
const router = express.Router();

//Route for adding new media
router.post('/submit_media', (req, res, next) => {
  var type = utils.escapeSQL(req.body.type); //Will always have data
  if(type == "") type = "%";
  
  var title = utils.escapeSQL(req.body.title);
  var description = utils.escapeSQL(req.body.description);
  var creator = utils.escapeSQL(req.body.creator);


  var query = "INSERT INTO `Media` (`type`, `description`, `creator`, `mediaID`, `title`, `icon`) VALUES ('"+type+"', '"+description+"', '"+creator+"', NULL, '"+title+"', NULL)"
  req.db.query(query, function(err, results){
    if (err) return next(err);
    console.log("Media successfully uploaded!")
    res.redirect("/media");
  })
})

module.exports = router;
