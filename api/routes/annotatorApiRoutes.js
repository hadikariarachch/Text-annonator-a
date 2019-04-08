/**
 * This JS file contains the required functions routing paths to respond API calls.
 * If the API call matches any of below URL templates, it will automatically route to the required JS file function.
 */

'use strict'; //In strict mode you can't use undeclared variables, it makes this page more secure

//Creating a exported function to accept an express app, so that these routes can be regietered to that app.
module.exports = function(app) {
  var annotatorAPI = require('../controllers/annotatorAPI.js'); //require the annotatorAPI.js file and assign to a variable
  var annotatorApplication = require('../controllers/annotatorApplication.js'); //require the annotatorApplication.js file and assign to a variable

  // annotator Routes
  app.route('/annotator/ontologylist')
    .get(annotatorAPI.getAllOntologiesFromOntologyList); //route the request to getAllOntologiesFromOntologyList() in annotatorAPI.js

  app.route('/annotator/search/:keyword')
    .get(annotatorAPI.getDescription); //route the request to getDescription() in annotatorAPI.js with the search term

  app.route('/annotatorapp/getontologylist')
    .get(annotatorApplication.getOntologyList); //route the request to getOntologyList() in annotatorApplication.js

  app.route('/annotatorapp/getdefinition/:searchtext/:selectedontologies')
    .get(annotatorApplication.getDefinition); ////route the request to getDefinition() in annotatorApplication.js with the search string and selected ontologies list
  
};

