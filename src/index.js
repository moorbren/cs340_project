/**
 * Node.js Web Application Template
 * 
 * The code below serves as a starting point for anyone wanting to build a
 * website using Node.js, Express, Handlebars, and MySQL. You can also use
 * Forever to run your service as a background process.
 */
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const db = require('./util/db-interface.js');
const utils = require('./util/misc.js');

const app = express();

// Configure handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs'
});

// Configure the views
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(path.basename(__dirname), 'views'));

//contains all the views for handlebars
var viewDictionary = utils.discoverViews('./src/views/'); 

// Setup static content serving
app.use(express.static(path.join(path.basename(__dirname), 'public')));



 
/**
 * This is the handler for our main page. The middleware pipeline includes
 * our custom `connectDb()` function that creates our database connection and
 * exposes it as `req.db`.
 */
app.get('/', db.connectDb, function(req, res) {
  res.render('home');

  db.close(req);
});

app.get('/:pageName', db.connectDb, function(req, res){
  if(viewDictionary[req.params.pageName + '.hbs']){
    console.log("Rendering page: " + req.params.pageName);
    res.render(req.params.pageName);
  }else{
    res.render('404');
  }

  db.close(req);
});

app.get('*', db.connectDb, function(req, res){
  res.render('404');
});



/**
 * Capture the port configuration for the server. We use the PORT environment
 * variable's value, but if it is not set, we will default to port 3000.
 */
const port = process.env.PORT || 3000;

/**
 * Start the server.
 */
app.listen(port, function() {
  console.log('== Server is listening on port', port);
});
