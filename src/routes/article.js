const express = require('express');
const router = express.Router();
const db = require('../util/db-interface.js');

/**
 * Route for listing the catalog of parts.
 * 
 * This serves as an example of joining tables to produce more complex queries. You do not need to modify anything
 * in this file.
 */
router.get('/article/:articleID', (req, res, next) => {
    var articleID = req.params.articleID, validInt = true;
    for(var x = 0; x < articleID.length; x++){
        if(articleID[x] < '0' && articleID[x] > '9'){
            validInt = false;
            break;
        }
    }

    
    if(!validInt || articleID.length == 0){
        console.log('tset')
        db.close(req);
        res.render('404');
        console.log('test2')
        return;

    }else{ //only doing DB query if the id is a valid integer
        
        req.db.query(
            `
            SELECT a.title, a.creationDate, a.body, a.articleID, a.username, a.mediaID
            FROM Articles a 
            WHERE a.articleID = ` + articleID + `
            `,
            (err, results) => {
                db.close(req);

                if (err) return next(err);
                if(results.length == 0){
                    res.render('404');
                    return;
                }else if(results.lengthn > 1){
                    res.render('500');
                    return;
                }
                res.render('article', results[0]);
            }
        );   
    }

    
});

module.exports = router;
