const express = require('express');
const router = express.Router();
const db = require('../util/db-interface.js');
const utils = require('../util/utils.js');

/**
 * Route for listing the catalog of parts.
 *
 * This serves as an example of joining tables to produce more complex queries. You do not need to modify anything
 * in this file.
 */
router.get('/user/:username', (req, res, next) => {
    var username = utils.escapeSQL(req.params.username);

    if(username.length == 0){
        db.close(req);
        res.render('404');
        return;

    }else{ //only doing DB query if the id is a valid integer
        req.db.query(
            `
        SELECT u.username, u.creationDate, u.isAuthor
        FROM Users u
        WHERE u.username="` + username + '"',
            (err, user) => {
                if(err || user.length == 0){
                    db.close(req);
                    res.render('404');
                    return;
                }

                req.db.query(
                    `
                    SELECT a.articleId, a.username, a.creationDate, a.title, a.articleID
                    FROM Articles a
                    WHERE a.username = "` + username + '"',
                    (err, articles) => {
                        if(err){
                            db.close(req);
                            res.render('404');
                            return;
                        }
                        db.close(req);
                        res.render('user', {user: user[0], articles: articles});
                        return;
                    });

            }
        );
    }
});

module.exports = router;
