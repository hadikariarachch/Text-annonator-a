var dictionary = require('./dictionary.js');

exports.getDefinition = function (req, res) {

    var text = req.params.searchtext;
    console.log("Text = "+text+" & ontologiesJsonString = "+req.params.selectedontologies);
    var selectedOntologiesString = req.params.selectedontologies;    
    var selectedOntolos = selectedOntologiesString.split(":")[1];
    var selectedOntologies = JSON.parse(selectedOntolos);
    
    //console.log("ontoss = "+ selectedOntologies);

    var filteredText = filterWords(text);
    var json_response = [];

    //console.log("This is filtered text = "+ filteredText);
    let filteredTextArray = [];

    filteredText.forEach(keyword => {
        filteredTextArray.push(keyword);
    });

    let textCount = filteredTextArray.length;
    let counter = 0;

    filteredText.forEach(keyword => {
        //console.log(keyword);
        dictionary.getDescription(keyword, selectedOntologies, function (result) {
            //console.log("In application result = "+ result);            

                counter++;
                let newArray = JSON.parse(result);
                newArray.forEach(element => {
                    json_response.push(element);
                });

                if(counter === textCount){
                //console.log("Total response to custom JS = "+ JSON.stringify(json_response));     
                
                res.send(JSON.stringify(json_response));
                }
        });

    });  

};


exports.getOntologyList = function (req, res) {

    dictionary.getAllOntologiesFromOntologyList(function (result) {

        res.send(result);

      });

};


function filterWords(text) {

    text = text.split(' ');

    var filter_words = ["I", "a", "above", "after", "against", "all", "alone", "always", "am", "amount", "an", "and", "any", "are", "around", "as", "at", "back", "be", "before", "behind", "below", "between", "bill", "both", "bottom", "but", "by", "call", "can", "co", "con", "de", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "eleven", "empty", "ever", "every", "few", "fill", "find", "fire", "first", "five", "for", "former", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "he", "her", "hers", "him", "his", "i", "ie", "if", "in", "into", "is", "it", "last", "less", "ltd", "many", "may", "me", "mill", "mine", "more", "most", "mostly", "must", "my", "name", "next", "nine", "no", "none", "nor", "not", "nothing", "now", "of", "off", "often", "on", "once", "one", "only", "or", "other", "others", "out", "over", "part", "per", "put", "re", "same", "see", "serious", "several", "she", "show", "side", "since", "six", "so", "some", "sometimes", "still", "take", "ten", "the", "then", "third", "this", "thick", "thin", "three", "through", "to", "together", "top", "toward", "towards", "twelve", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "when", "which", "while", "who", "whole", "will", "with", "within", "without", "you", "yourself", "yourselves"];

    text = text.filter(function (el) {
        return !filter_words.includes(el);
    });

    // text = text.join(' '); // array to string

    return text;

};
