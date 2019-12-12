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
    console.log(username)

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
            (err, results) => {
                db.close(req);
                console.log(results);
                if (err) return next(err);
                if(results.length == 0){
                    res.render('404');
                    return;
                }else if(results.length > 1){
                    res.render('500');
                    return;
                }
                res.render('user', results[0]);
            }
        );   
    }

    
});

module.exports = router;
