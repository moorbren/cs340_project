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
        db.close(req);
        res.render('404');
        return;
 
    }else{ //only doing DB query if the id is a valid integer
        
        req.db.query(
            `
            SELECT a.title, a.creationDate, a.body, a.articleID, a.username, a.mediaID
            FROM Articles a 
            WHERE a.articleID = ` + articleID + `
            `,
            (err, article) => {
                if (err){
                    db.close(req);
                    return;
                }

                if(article.length == 0){
                    db.close(req);
                    res.render('404');
                    return;
                }
                req.db.query(
                    `
                    SELECT c.commentID, c.body, c.dateAdded, c.username
                    FROM Comments c
                    WHERE c.articleID = ` + articleID + `
                    `,
                    (err, comments) => {
                        if (err) {console.log(err); return;}
                        
                        
                        res.render('article', {comments: comments, article: article[0]});
                    });
            }
        );   
    }

    
});

module.exports = router;
