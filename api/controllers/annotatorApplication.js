/**
 * This JS file acts as an API to send responses for GUI .
 * This requires dictionary.js file to use external APIs.
 * This will return a JSON string as the response.
 */

const dictionary = require('./dictionary.js'); //require the dictionary.js file and assign to a variable
const stopWordsList = require('../models/stopWords.js'); //requires stopWords.js file and hold it in a constant
var fs = require('fs');

//creating an exported getDefinition() function to respond GUI calls
exports.getDefinition = function (req, res) {

    var text = req.params.searchtext; //get the searchtext from from request parameters
    var selectedOntologiesString = req.params.selectedontologies; //get the selected ontologies from from request parameters
    
    //check for ":" exists in front of the parameters and remove them. (This is because it will be passing from request URL)
    if( text.charAt( 0 ) === ':' ) {
        text = text.slice( 1 );
    }
    if( selectedOntologiesString.charAt( 0 ) === ':' ) {
        selectedOntologiesString = selectedOntologiesString.slice( 1 );
    }
    console.log("Text = "+ text +" & ontologiesJsonString = "+ selectedOntologiesString);
    
    var selectedOntologies = JSON.parse(selectedOntologiesString); //parse the JSON to a JS object
    
    var filteredText = filterWords(text); //Call filterWords() function with the search text and get the filtered text
    var responseArray = []; //declaring an empty array

    let filteredTextArray = []; //declaring an empty array

    //get filtered text and put each word in the empty filteredTextArray
    filteredText.forEach(keyword => {
        filteredTextArray.push(keyword);
    });

    let textCount = filteredTextArray.length; //get length of filteredTextArray
    let counter = 0; //flag to hold a count
    var preparedDataObject = {}; //creating an empty object to pass down and get filled by "prepareOutputData" function
    var outputDataObject = {}; //creating an empty object to grab the returned object from "prepareOutputData" function and pass down to "saveToJsonFile" function

    filteredText.forEach(keyword => {
        
        //call dictionary.getDescription() with each words
        dictionary.getDescription(keyword, selectedOntologies, function (result) {         

            counter++; //increment the flag counter
            let newObj = JSON.parse(result); //assign the result as a JS object
            newObj.forEach(element => {
                responseArray.push(element); //add each result to responseArray array

                //prepare the result data to save in external JSON file
                outputDataObject = prepareOutputData(preparedDataObject, element);

            });

            //check if length of filteredTextArray equals to the flag counter 
            if(counter === textCount){

                //calling the "saveToJsonFile" function to save the results 
                saveToJsonFile(outputDataObject, function(error, result){
                    if(error){
                        console.log("ERROR: annotatorApplication.js, saveToJsonFile() : "+ error);                        
                    }else{
                        console.log("JSON FILE CREATED SUCCESSFULLY!");
                    }
                }); 

                res.send(JSON.stringify(responseArray)); //send the responseArray as a JSON string
            }    
                    
        });

    });  

};

//create a function to prepare the output data to write in external JSON file.
function prepareOutputData(dataObject, searchResultDataArray){
    //grab the search data from variables
    let keyword = searchResultDataArray.keyword;
    let description = searchResultDataArray.description;
    let resourceUrl = searchResultDataArray.resourceUrl;
    let ontology = searchResultDataArray.ontology;

    let combinedKeyName = (keyword.toLowerCase() + ontology.toUpperCase()); //creating a combined name for the ease of reading back data
    combinedKeyName = combinedKeyName.replace(/\s+/g, '_'); //replacing middle spaces with "_" to be more clear.
    console.log("COMBINED PRIMARY KEY : "+ combinedKeyName);
    
    var myObject = dataObject; //create empty object to pass values
    myObject[combinedKeyName] = {keyword: keyword, description: description, resourceUrl: resourceUrl, ontology: ontology}; //passing values to empty object

    return myObject;
}

//Creating normal JS function to handle data savings into a JSON.file in PC.
function saveToJsonFile(preparedDataObject, callback){    

    var jsonConvertedString = JSON.stringify(preparedDataObject); //convert to json data    
    fs.writeFile('output/myjsonfile.json', jsonConvertedString, 'utf8', callback); //write a JSON file with data inside "output" folder

};


//creating an exported getOntologyList() function to respond GUI calls
exports.getOntologyList = function (req, res) {

    //call dictionary.getAllOntologiesFromOntologyList() with a callback function to get the list of all ontologies.
    dictionary.getAllOntologiesFromOntologyList(function (result) {

        res.send(result); //send the result as response

      });

};

//crating a function to extract necessary words from the text string
function filterWords(text) {

    text = text.split(' '); //split the string by spaces

    //create an array to hold unnecessary words from stopWords.js file
    var filter_words = [];

    //check if stopWordsList variable is undefined
    if (stopWordsList !== undefined) {
        filter_words = stopWordsList.StopWordsList;
    }  

    //append all necessary words one by one to a string 'text'
    text = text.filter(function (el) {
        return !filter_words.includes(el);
    });

    console.log("Annotator application : NES WORDS = " + text);
    
    return text; //return the string text with filtered words

};
