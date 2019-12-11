const express = require('express');
const router = express.Router();


//Route for creating user
router.get('/login_user', (req, res, next) => {
  res.render('login_user')
})

module.exports = router;
