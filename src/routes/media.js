const express = require('express');
const router = express.Router();
const db = require('../util/db-interface.js');

/**
 * Route for listing the catalog of parts.
 *
 * This serves as an example of joining tables to produce more complex queries. You do not need to modify anything
 * in this file.
 */
router.get('/media/:mediaID', (req, res, next) => {
    var mediaID = req.params.mediaID, validInt = true;
    for(var x = 0; x < mediaID.length; x++){
        if(mediaID[x] < '0' && mediaID[x] > '9'){
            validInt = false;
            break;
        }
    }


    if(!validInt || mediaID.length == 0){
        db.close(req);
        res.render('404');
        return;

    }else{ //only doing DB query if the id is a valid integer

var query = "SELECT `t`.`title` AS `Title`, `t`.`creator` AS `Creator`, AVG(`r`.`rating`) AS `Rating`, `t`.`type` AS `Type`, `t`.`description` AS `Description`, `t`.mediaID AS mediaID FROM (`cs340_steelebe`.`Media` `t` LEFT JOIN `cs340_steelebe`.`Ratings` `r` ON (`t`.`mediaID` = `r`.`mediaID`)) WHERE `t`.`mediaID` = " + mediaID
req.db.query(query,
    (err, media) => {
                if (err){
                    db.close(req);
                    res.render('500');

                    return;
                }

                req.db.query(` SELECT a.articleId, a.username, a.creationDate, a.title AS "ArticleTitle"
                                FROM Articles a
                                WHERE a.mediaID = ` + mediaID,
                (err, articles) =>{
                    db.close(req);

                    if (err){
                        res.render('500');
                        return;
                    }

                    res.render('media', {articles: articles, media: media[0]});
                    return;
                });

                if(media.length == 0){
                    res.render('404');
                    return;
                }else if(media.length > 1){
                    res.render('500');
                    return;
                }
            }
        );

    }
});

module.exports = router;
