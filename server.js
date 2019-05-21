/**
 * This JS file will be created a Node.express application to run our project.
 * This includes all the requirements to run the app.
 * We use require keyword to install specific libraries which needed to run our app.
 */

var express = require('express'), //require Node.express
  app = express(), //app variable assigns the express app.
  port = process.env.PORT || 3000; //setting the port number
  bodyParser = require('body-parser'); //requires body-parser

var path = require('path'); //requires path

app.use(express.static(path.join(__dirname + "/view"))); //use the 'view' directory

//getting the document object
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document; //making a global variable to make use of document

app.get("/", function(req, res) {
  //res.send("Welcome to annotator");
  res.sendFile(path.join(__dirname, "view", "index.html")); //call the startup html file and display it
});

//using the required libraries
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//requiring  the annotatorApiRoutes file
var routes = require('./api/routes/annotatorApiRoutes'); //importing route
routes(app); //register the route

//if the status is 404, send a message
app.use(function(req, res) { 
    res.status(404).send({ url: req.originalUrl + ' not found'})
});

app.listen(port); //starting to listen at 3000 port

console.log('Annotator RESTful API server started on: ' + port + 'port');