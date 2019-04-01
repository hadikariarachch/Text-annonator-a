'use strict';
module.exports = function(app) {
  var annotatorAPI = require('../controllers/annotatorAPI.js');
  var annotatorApplication = require('../controllers/annotatorApplication.js');

  // annotator Routes
  app.route('/annotator/ontologylist')
    .get(annotatorAPI.getAllOntologiesFromOntologyList);

  app.route('/annotator/search/:keyword')
    .get(annotatorAPI.getDescription);

  app.route('/annotatorapp/getontologylist')
    .get(annotatorApplication.getOntologyList);

  app.route('/annotatorapp/getdefinition/:searchtext/:selectedontologies')
    .get(annotatorApplication.getDefinition);

  // app.route('/annotatorapp/getdefinition')
  //   .get(annotatorApplication.getDefinition);
};

