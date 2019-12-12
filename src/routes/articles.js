const express = require('express');
const router = express.Router();
const db = require('../util/db-interface')

router.get('/articles', (req, res, next) => {
    var query = "SELECT * FROM Articles"
    req.db.query(query, function(err, results){
  
      if(err){
        console.log(err)
        return;
      } 
      console.log(results)
      db.close(req);
      res.render('articles', {results: results});
    })
    db.close(req);
});

module.exports = router;