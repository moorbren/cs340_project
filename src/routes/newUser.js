const express = require('express');
const router = express.Router();


//Route for creating user
router.get('/newuser', (req, res, next) => {
  res.render('newuser.hbs')
})

module.exports = router;
