let request = require('request');

class Adaptor1 {

  getDescription(keyword, callback) {
    let ontology = 'EFO';
    let fullOntologyName = "Experimental Factor Ontology"
    let apiKey = 'f5a8d06a-60b6-4ccf-afc1-953c1874a896';
    let url = `http://data.bioontology.org/search?q=${keyword}&ontologies=${ontology}&roots_only=true&apikey=${apiKey}`

    var description = "";
    var result = { keyword: keyword, description: description, ontology: fullOntologyName };  

    request(url, function (err, res, body) {
        // console.log("Trying to send request from Adaptor 1, keyword is "+ keyword);
        if (err) {
            console.log('Error: ', error);
            return callback(err);
        } else {

            let response = JSON.parse(body);              

            if (response.collection[0] && response.collection[0].definition[0]) {
                result.description = response.collection[0].definition[0];
                // console.log("Adaptor 1 result = "+ JSON.stringify(result));
                return callback(JSON.stringify(result));
            }
            else {
                result.description = 'No Definition found';
                return callback(JSON.stringify(result));
            }
        }
    });       
}
}
module.exports.Adaptor1 = Adaptor1;