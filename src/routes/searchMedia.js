const express = require('express');
const router = express.Router();
const utils = require('../util/utils.js');

//Route for searching for media
router.post('/searchMedia', (req, res, next) => {
  var type = utils.escapeSQL(req.body.type); //Will always have data
  if(type == "") type = "%";

  var title = utils.escapeSQL(req.body.title); //May or may not have data
  var description = utils.escapeSQL(req.body.description); //May or may not have data
  var creator = utils.escapeSQL(req.body.creator); //May or may not have data.

  //format query strings
  var titleString = " AND `title` LIKE '%" + title + "%'"
  var descriptionString = " AND `description` LIKE '%" + description + "%'"
  var creatorString = " AND `creator` LIKE '%" + creator + "%'"

  //Check to see if username exists. If yes, redirect to login user page.
  var query = "SELECT mediaId, `type` AS `Type`, `title` AS `Title`, `description` AS `Description`, `creator` AS `Creator` FROM `Media` WHERE `type` LIKE '" + type + "'"

    if(title != ""){
      query += titleString
    }
    if(description != ""){
      query += descriptionString
    }
    if(creator != ""){
      query += creatorString
    }

    console.log(query);

  req.db.query(query, function(err, results){
    if (err) return next(err);
    console.log(results);
    console.log("Media successfully searched!")
    if(results.length == 0){
      res.redirect("/mediasearch")
    }else{
      res.render("mediasearch", {results: results});
    }
  })
})

module.exports = router;
