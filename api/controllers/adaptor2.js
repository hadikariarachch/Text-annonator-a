/**
 * This Adaptor1 class is here for contacting the external API.
 * API sends a JSON response, and later it will be converted as a JS object to make it easier to read.
 * After process ends, this returns a JSON convertd object to wherever it has been called.
 * This class will be exported at the end
 */

//declare a vaiable to grab request module
let request = require('request');

//Class Adaptor2 begins here
class Adaptor2 {
    //Writing the function getDrscription with the accepted keyword and the call back parameter
    getDescription(keyword, callback) {
        let ontology = 'NCIT'; // ontology name variable
        let fullOntologyName = "National Cancer Institute Thesaurus"; // ontology fullname variable
        let apiKey = 'f5a8d06a-60b6-4ccf-afc1-953c1874a896'; //API key for external API
        let url = `http://data.bioontology.org/search?q=${keyword}&ontologies=${ontology}&roots_only=true&apikey=${apiKey}`; //External API call URL

        var description = ""; //declaring an empty description variable
        var result = { keyword: keyword, description: description, ontology: fullOntologyName }; //creating the result object structure with declared variables

        //sending a request to the external API
        request(url, function (error, res, body) {            
            //checking first for conection errors with the API
            if (error) {
                return callback(error); //sending the error through callback parameter
            } else {
                //declare a variable to grab the body of response from API
                let response = JSON.parse(body); //pass the response body to JavaScript object.              
                
                //Check whether there is a collection in the response body
                if(response.collection[0]){
                    //Check if the definition value exists on the response collection object
                    if(("definition" in response.collection[0])) {
                    
                        result.description = response.collection[0].definition[0]; //get the definition from the  response object and assign to description variable
                        console.log("RESULT FROM AD2 = " + JSON.stringify(result));
                
                        //console.log("COLLECTION FROM AD2 = " + JSON.stringify(response.collection[0]));

                        return callback(JSON.stringify(result)); //callback the result
                                   
                    }
                    else {
                        result.description = 'No definition found'; //assign 'No Definition found' to description variable
                        return callback(JSON.stringify(result)); //callback the JSON converted result object
                    }
                }
                else{
                    result.description = 'No definition found'; //assign 'No Definition found' to description variable
                    return callback(JSON.stringify(result)); //callback the JSON converted result object
                }
                
            }
        });       
    }
}
module.exports.Adaptor2 = Adaptor2; //export the Adaptor2 class