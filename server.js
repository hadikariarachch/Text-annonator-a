var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  bodyParser = require('body-parser');

var path = require('path');

app.use(express.static(path.join(__dirname + "/view")));

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

app.get("/", function(req, res) {
  //res.send("Welcome to annotator");
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/annotatorApiRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Annotator RESTful API server started on: ' + port + 'port');