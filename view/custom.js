/**
 * This JS file is conncted to the index.html page.
 * This includes th functions to send AJAX requests for the annnotatorApplication.js API.
 */

var required_json=[]; //declare empty array

//creating a function to load connected ontologies to the GUI
function loadOntologies(){   
    
    var ontologyList = new Array();
    var request = new XMLHttpRequest(); //create a xmlhttp request
    request.open('GET', 'http://localhost:3000/annotatorapp/getontologylist', true); //define as an ALAX request
    request.onload = function () {

    // Begin accessing JSON data here
    var data = this.response; //get the response

        //if response status ok, then populate ontologyList array
        if (request.status >= 200 && request.status < 400) {
            data.forEach(ontology => {
            ontologyList.push(ontology.name);
            });
        } else {
            alert('some error occured');
        }
          
    }

    request.send(); //send the ALAX request

    //Jquery for autocomplete dropdown menu with id = 'ontologies'
    $( "#ontologies" ).autocomplete({
        source: ontologyList
    });
            
};

//creating a function to send AJAX request to getdefinition() in annotatorApplication.js API
function generateResult(){
        
    var annotateText=document.getElementById("annotorText").value; //get the text value

    var selectedOntologies = ["Adaptor1", "Adaptor2"]; //currently hardcoding the selected ontologies
    //var selectedOntologies=document.getElementById("ontologies").value; //get the correct ID array from UI
    
    var jsonStringOfSelectedOntologies = JSON.stringify(selectedOntologies); //make a JSON string from above 'selectedOntologies'

	console.log(annotateText+" "+jsonStringOfSelectedOntologies);
    
        var request = new XMLHttpRequest(); //create a xmlhttp request

        request.open('GET', 'http://localhost:3000/annotatorapp/getdefinition/:'+ annotateText +'/:'+jsonStringOfSelectedOntologies, true); //define as an ALAX request
        request.onload = function () {

        // Begin accessing JSON data here
        var data = this.response; //get the response 

        //if response status ok, then call populateResult() function with response data
        if (request.status >= 200 && request.status < 400) {
            populateResult(data);
        } else {
            alert('some error occured');
        }

        }

        request.send(); //send the ALAX request     
};


//creating a function to populate the table in index.html page
function populateResult(responseJsonString){
required_json = JSON.parse(responseJsonString);

for(var i in required_json){

    var row_content=required_json[i];

	//get table with id annotation_result
    var table=document.getElementById("annotation_result");
	//creates a tbody tag
	var tbody=document.createElement("tbody");
	//creates a tr tag
	var row=document.createElement("tr");
    
    /*
        Creating required TDs and setting values. 
    */
    var keywordCell = document.createElement("td");
    keywordCell.innerHTML = row_content["keyword"];
    row.appendChild(keywordCell); //set TD to ROW

    var descriptionCell = document.createElement("td");
    descriptionCell.innerHTML = row_content["description"];
    row.appendChild(descriptionCell); //set TD to ROW

    var resourceUrlCell = document.createElement("td");
    if (row_content["description"] === "No definition found") {
        resourceUrlCell.innerHTML = "No link found";
    }else if(row_content["description"] === "Ontology error"){
        resourceUrlCell.innerHTML = "Ontology error";
    } else {
        var resUrlElement = document.createElement("a");
        resUrlElement.setAttribute("href", row_content["resourceUrl"]);
        resUrlElement.setAttribute("target", "_blank");
        resUrlElement.innerHTML = "Go to resource";
        resourceUrlCell.appendChild(resUrlElement); //add link element to the TD
    }
    row.appendChild(resourceUrlCell); //set TD to ROW

    var ontologyCell = document.createElement("td");
    ontologyCell.innerHTML = row_content["ontology"];
    row.appendChild(ontologyCell); //set TD to ROW

    //appends entire row(tr) to the table body (tbody)
    tbody.innerHTML = "";
	tbody.appendChild(row);

	//appends tbody to the table
	table.appendChild(tbody);
}
};
