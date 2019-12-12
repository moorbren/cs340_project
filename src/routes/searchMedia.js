const express = require('express');
const router = express.Router();
const utils = require('../util/utils.js');
const db = require('../util/db-interface.js');

//Route for searching for media
router.post('/searchMedia', (req, res, next) => {
  var type = utils.escapeSQL(req.body.type); //Will always have data
  if(type == "") type = "%";

  var title = utils.escapeSQL(req.body.title); //May or may not have data
  var description = utils.escapeSQL(req.body.description); //May or may not have data
  var creator = utils.escapeSQL(req.body.creator); //May or may not have data.

  //format query strings
  var titleString = " AND `t`.`title` LIKE '%" + title + "%'"
  var descriptionString = " AND `t`.`description` LIKE '%" + description + "%'"
  var creatorString = " AND `t`.`creator` LIKE '%" + creator + "%'"
  var groupByString = " GROUP BY `t`.`mediaID`"

  //Check to see if username exists. If yes, redirect to login user page.
  var query = "SELECT `t`.`title` AS `Title`, `t`.`creator` AS `Creator`, AVG(`r`.`rating`) AS `Rating`, `t`.`type` AS `Type`, `t`.`description` AS `Description`, `t`.`mediaID` FROM (`cs340_steelebe`.`Media` `t` LEFT JOIN `cs340_steelebe`.`Ratings` `r` ON (`t`.`mediaID` = `r`.`mediaID`)) WHERE `t`.`type` LIKE '" + type + "'"

    if(title != ""){
      query += titleString
    }
    if(description != ""){
      query += descriptionString
    }
    if(creator != ""){
      query += creatorString
    }
    query += groupByString

  req.db.query(query, function(err, results){
    if (err) return next(err);
    console.log("Media successfully searched!")
    if(results.length == 0){
      res.redirect("/mediasearch")
    }else{
      res.render("mediasearch", {results: results});
    }
  })
  db.close(req);
})

module.exports = router;
