const dictionary = require('./dictionary.js');

exports.getDescription = function(req, res) { 
    if (req.params.keyword != null && req.params.keyword.length != 0) {
        let keyword = req.params.keyword;  // Assigning the keyword if it's not null
    
        if (keyword.length <= 50) {
           
            let ontologies = null;  
            
            dictionary.getDescription(keyword, ontologies, function (result) {
              let myData = JSON.parse(result);
              res.send(myData);
            });      
          
    
        } else {
            res.send("Search term or phrase is too long!!!");
        }
      } else {
            res.send("No search term found!!!");
      }
};

exports.getAllOntologiesFromOntologyList = function(req, res) {
    dictionary.getAllOntologiesFromOntologyList(function (result) {
      res.send(result);
    });
};