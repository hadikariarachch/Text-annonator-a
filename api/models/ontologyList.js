/**
 * This JS file contains the external vocabulary list for refferences.
 * These details will be used by GUI as well as dictionary.js files.
 * Insert your new external vocabulary names and its Id as the next incrementing number.
 * Ex. When you want to addd another Adaptor class,
 *  { _id: 'Adaptor3', name: 'Full name of the ontology'}
 */

const ontologyList = [
    { _id: 'Adaptor1', name: 'Experimental Factor Ontology'},
    { _id: 'Adaptor2', name: 'National Cancer Institute Thesaurus'}
  ];

module.exports.OntologyList = ontologyList; //exports the JS array to the application