/**
 * This JS file acts as an API to send responses for direct URL api calls.
 * This requires dictionary.js file to use external APIs.
 * This will return a converted JS object as the response.
 */

const dictionary = require('./dictionary.js'); //require the dictionary.js file and assign to a constant

//Creating an exportable getDescription() function to get descriptions for given word
exports.getDescription = function(req, res) { 

    //check the keyword parameter of 'req' for null or empty
    if (req.params.keyword != null && req.params.keyword.length != 0) {
        let keyword = req.params.keyword;  // Assigning the keyword if it's not null
    
        //check the length of the word is below than 50 characters
        if (keyword.length <= 50) {
           
            let ontologies = null;  //assigning the ontologies as null so that the word will be searched from all the connected vocabularies.
            
            dictionary.getDescription(keyword, ontologies, function (result) { //call the getDescription() function in dictionary.js file
              let myData = JSON.parse(result); //convert the result to an JS object
              res.send(myData); //send response
            });      
          
    
        } else { //when term is too long 
            res.send("Search term or phrase is too long!!!");
        }
      } else { //when term is empty
            res.send("No search term found!!!");
      }
};

//Creating an exportable getAllOntologiesFromOntologyList() function to retrieve all the connected ontologies
exports.getAllOntologiesFromOntologyList = function(req, res) {
    dictionary.getAllOntologiesFromOntologyList(function (result) { //call the getAllOntologiesFromOntologyList() function in dictionary.js file
      res.send(result); //send the response
    });
};