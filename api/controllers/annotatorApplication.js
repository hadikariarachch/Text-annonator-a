/**
 * This JS file acts as an API to send responses for GUI .
 * This requires dictionary.js file to use external APIs.
 * This will return a JSON string as the response.
 */

const dictionary = require('./dictionary.js'); //require the dictionary.js file and assign to a variable
const stopWordsList = require('../models/stopWords.js'); //requires stopWords.js file and hold it in a constant


//creating an exported getDefinition() function to respond GUI calls
exports.getDefinition = function (req, res) {

    var text = req.params.searchtext; //get the searchtext from from request parameters

    console.log("Text = "+text+" & ontologiesJsonString = "+req.params.selectedontologies);

    var selectedOntologiesString = req.params.selectedontologies; //get the selected ontologies from from request parameters
    var selectedOntolos = selectedOntologiesString.split(":")[1]; //remove ':' from the selected Ontologies JSON String
    var selectedOntologies = JSON.parse(selectedOntolos); //parse the JSON to a JS object
    
    var filteredText = filterWords(text); //Call filterWords() function with the search text and get the filtered text
    var json_response = []; //declaring an empty array

    let filteredTextArray = []; //declaring an empty array

    //get filtered text and put each word in the empty filteredTextArray
    filteredText.forEach(keyword => {
        filteredTextArray.push(keyword);
    });

    let textCount = filteredTextArray.length; //get length of filteredTextArray
    let counter = 0; //flag to hold a count

    filteredText.forEach(keyword => {
        
        //call dictionary.getDescription() with each words
        dictionary.getDescription(keyword, selectedOntologies, function (result) {         

            counter++; //increment the flag counter
            let newObj = JSON.parse(result); //assign the result as a JS object
            newObj.forEach(element => {
                json_response.push(element); //add each result to json_response array
            });

            //check if length of filteredTextArray equals to the flag counter 
            if(counter === textCount){                
                res.send(JSON.stringify(json_response)); //send the json_response as a JSON string
            }    
                    
        });

    });  

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
