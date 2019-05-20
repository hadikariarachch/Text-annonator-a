/**
 * This JS file will connect with adaptor classes to find definitions from external vocabularies.
 * This requires adaptorRegistry.js file to access the instances of all connected adaptors.
 * This will CALLBACK a JSON convertd array as the response.
 */

'use strict';  //In strict mode you can't use undeclared variables, it makes this page more secure

const adaptorRegistry = require('./adaptorRegistry.js'); //requires adaptorRegistry.js file and hold it in a constant
const ontologyListFile = require('../models/ontologyList.js'); //requires ontologyList.js file and hold it in a constant

//creating an exportable method which accepts a keyword stirng, selected ontology list array with a callback function.
exports.getDescription = function(keywordText, selectedOntologiesList, callback) { 
   
  //checking the keyword for null entries
  if (keywordText != null && keywordText.length != 0) {
    let keyword = keywordText;  // Assigning the keyword if it's not null
    var JSONObjectToApplication = null; //declaring a null variable

      //check for null entries on the selected Ontologies List
      if (selectedOntologiesList != null && selectedOntologiesList[0] != "") {  
        let selectedOntologies = selectedOntologiesList;  // Assigning the selectedOntologies array if it's not null
        let totalOntologies = selectedOntologiesList.length; //get the length of selectedOntologiesList
        let counter = 0; //creating a counter
        let dataArray = []; //declare an array

        //looping through  selectedOntologies array elements
        for (let index = 0; index < selectedOntologies.length; index++) {    
          let AdaptorObject = adaptorRegistry[selectedOntologies[index]]; //assigning the correct adaptor instance which matches the element name
          
          AdaptorObject.getDescription(keyword, function (result) { //call the getDescription() function of assigned adaptor instance with a callback function

            dataArray.push(JSON.parse(result)); //populate the empty data array with the JS object converted result
            JSONObjectToApplication = JSON.stringify(dataArray); //convert to JSON
            counter++; //increment the counter

            //if counter equals to the number of ontilogies from the given list, CALLBACK the function with the JSON result
            if(counter === totalOntologies){     
              return callback(JSONObjectToApplication);            
            }   

          });    
        }
  
      } else {  //When user didn't provide an selected ontology list, it proceed with all the connected ontologies. 
        let allOntologies = [];
        let ontologiesVariable = ontologyListFile.OntologyList; //get all the ontologies
        let dataArray = [];

        //putting ontology names to an array
        for(var item in ontologiesVariable){
          allOntologies.push(ontologiesVariable[item]._id);
        }

        let totalOntologies = allOntologies.length; //get the length
        let counter = 0; //create a counter
        
        //looping through  allOntologies array elements
        for (let index = 0; index < allOntologies.length; index++) {    
          let AdaptorObject = adaptorRegistry[allOntologies[index]]; //assigning the correct adaptor instance which matches the element name
          
          AdaptorObject.getDescription(keyword, function (result) { //call the getDescription() function of assigned adaptor instance with a callback function

            dataArray.push(JSON.parse(result)); //populate the empty data array with the JS object converted result
            JSONObjectToApplication = JSON.stringify(dataArray); //convert to JSON
            counter++;

                //if counter equals to the number of all ontilogies, CALLBACK the function with the JSON result
                if(counter === totalOntologies){    
                  return callback(JSONObjectToApplication);
                }                            
          });

        }
  
      }

  } else { //When no sarch word is given,
        return "No search term found!!!";
  }

};

//creating an exported function to send a JSON string of all the connected ontologies which accepts a CALLBACK function
exports.getAllOntologiesFromOntologyList = function(callback) {
    
    let ontologyJsonString = JSON.stringify(ontologyListFile.OntologyList); //get a list of all ontologies and convert it to a JSON string   
    return callback(ontologyJsonString); //CALLBACK the result after the process complete

};