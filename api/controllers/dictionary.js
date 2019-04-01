'use strict';
const adaptorRegistry = require('./adaptorRegistry.js');
const ontologyListFile = require('../models/ontologyList.js');

exports.getDescription = function(keywordText, selectedOntologiesList, callback) { 
   
  if (keywordText != null && keywordText.length != 0) {
    let keyword = keywordText;  // Assigning the keyword if it's not null
    var JSONObjectToApplication = null;

      if (selectedOntologiesList != null && selectedOntologiesList.length != 0) {  
        let selectedOntologies = selectedOntologiesList;  // Assigning the selectedOntologies array if it's not null
        let totalOntologies = selectedOntologiesList.length;
        let counter = 0;
        let dataArray = [];

        for (let index = 0; index < selectedOntologies.length; index++) {    
          let AdaptorObject = adaptorRegistry[selectedOntologies[index]];
          
          AdaptorObject.getDescription(keyword, function (result) {

                dataArray.push(JSON.parse(result));
                JSONObjectToApplication = JSON.stringify(dataArray);
                counter++;

                if(counter === totalOntologies){
                //console.log("Dictionary object with selected ontologies = "+JSONObjectToApplication);        
                return callback(JSONObjectToApplication);
                }
          });    
        }
  
      } else {  
        let allOntologies = [];
        let ontologiesVariable = ontologyListFile.OntologyList;
        let dataArray = [];

        for(var item in ontologiesVariable){
          allOntologies.push(ontologiesVariable[item]._id);
        }

        let totalOntologies = allOntologies.length;
        let counter = 0;
        
        for (let index = 0; index < allOntologies.length; index++) {    
          let AdaptorObject = adaptorRegistry[allOntologies[index]];
          
          AdaptorObject.getDescription(keyword, function (result) {

            dataArray.push(JSON.parse(result));
            JSONObjectToApplication = JSON.stringify(dataArray);
            counter++;

                if(counter === totalOntologies){
                //console.log("Dictionary object with all ontologies = "+JSONObjectToApplication);        
                return callback(JSONObjectToApplication);
                }                            
          });

        }
  
      }

  } else {
        return "No search term found!!!";
  }

};

exports.getAllOntologiesFromOntologyList = function(callback) {
    
    let ontologyJsonString = JSON.stringify(ontologyListFile.OntologyList); 
    //console.log("Ontologies list var = "+ontologyJsonString);   
    return callback(ontologyJsonString);

};