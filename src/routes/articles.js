const express = require('express');
const router = express.Router();
const db = require('../util/db-interface')

router.get('/articles', db.connectDb, (req, res, next) => {
    var query = "SELECT * FROM Articles"
    req.db.query(query, function(err, results){
  
      if(err){
        db.close(req);
        console.log(err);

        return;
      } 
      db.close(req);
      res.render('articles', {results: results});
    })
    db.close(req);
});

module.exports = router;