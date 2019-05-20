/**
 * This JS file is conncted to the index.html page.
 * This includes th functions to send AJAX requests for the annnotatorApplication.js API.
 */

var required_json=[]; //declare empty array
var hasHeader = false; //flag to check if the results table has a header

//creating a function to load connected ontologies to the GUI
function loadOntologies(){   
    console.log("Running the loadOntologies function!");
    
    // Get the <datalist> elements.
    var options = ""; //create an empty string
    var request = new XMLHttpRequest(); //create a xmlhttp request
    request.open('GET', 'http://localhost:3000/annotatorapp/getontologylist', true); //define as an ALAX request
    request.onload = function () {

    // Begin accessing JSON data here
    var data = this.response; //get the response
    var dataToArray = JSON.parse(data); //convert to an JS array     

    //if response status ok, then populate dataList in index.html array
    if (request.status >= 200 && request.status < 400) {

        // Loop over the array.
        for (let index = 0; index < dataToArray.length; index++) {
            options += '<option id="'+ dataToArray[index]._id +'" name="'+ dataToArray[index].name +'" value="'+ dataToArray[index].name +'" onClick="setOntologyId()"/>'; //concatanate options string with all the array values   
            document.getElementById('jsonOntologyList').innerHTML = options; //grab the dataList element and insert options string
        }
        } else {
            alert('Error occured when loading ontology list!');
        }         
    }

    request.send(); //send the ALAX request            
};

//creating a function to set the selected ontology ID to hidden tag
// function setOntologyId(){
//     console.log("Inside setOntologyId() function");
    
//     var inputElementValue = document.getElementById("ontologies").value; //get the selected datalist item value
//     var ontologyId = document.getElementById("jsonOntologyList").options.namedItem(inputElementValue)._id; //get the _Id of selected item. We use the value to fild it's id
//     document.getElementById("selectedOntologyId").value = ontologyId; //set the ontologyId to the hidden tag    
// }

// run loadOntologies function and populate datalist when the window loads
window.onload = loadOntologies();   


//creating a function to send AJAX request to getdefinition() in annotatorApplication.js API
function generateResult(){
    var selectedOntologies = []; //creating an empty array to hold selected ontologies
    var annotateText=document.getElementById("typeArea").value; //get the text value

    //selectedOntologies = ["Adaptor1", "Adaptor2"]; //testing: hardcoding the selected ontologies
    
    //check if user provided a preffered ontology or else it stays as empty
    if(document.getElementById("selectedOntologyId").value != null){
        selectedOntologies.push(document.getElementById("selectedOntologyId").value); //put the value inside selectedOntologies array
    }

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

    //get table with id annotationResult
    var table=document.getElementById("annotationResult");

    //creates a header in table
    if (!hasHeader) {
        hasHeader = true;
        document.getElementById("saveSessionButton").disabled = false; //enable the save session button
        var thead = document.createElement("thead");
        var theadRow = document.createElement("tr");
        theadRow.setAttribute("style", "background-color : #dee0e2;");
        var th1 = document.createElement("th");
        th1.innerHTML = "Search word";
        var th2 = document.createElement("th");
        th2.innerHTML = "Description";
        var th3 = document.createElement("th");
        th3.innerHTML = "Ontology";
        theadRow.appendChild(th1);
        theadRow.appendChild(th2);
        theadRow.appendChild(th3);
        thead.appendChild(theadRow);
        table.appendChild(thead);
    }


    for(var i in required_json){

        var row_content=required_json[i];

        //creates a tbody tag
        var tbody=document.createElement("tbody");
	
	    //creates a tr tag
        var row=document.createElement("tr");
        row.setAttribute("style", "background-color : #f2f2f2;");
    
        /*
            Creating required TDs and setting values. 
        */
        var keywordCell = document.createElement("td");

        if (row_content["description"] === "No definition found") {
            keywordCell.innerHTML = row_content["keyword"];
        }else if(row_content["description"] === "Ontology error"){
            keywordCell.innerHTML = row_content["keyword"];
        } else {
            var resUrlElement = document.createElement("a");
            resUrlElement.setAttribute("href", row_content["resourceUrl"]);
            resUrlElement.setAttribute("target", "_blank");
            resUrlElement.innerHTML = row_content["keyword"];
            keywordCell.appendChild(resUrlElement);        
        }
        row.appendChild(keywordCell); //set TD to ROW

        var descriptionCell = document.createElement("td");
        descriptionCell.innerHTML = row_content["description"];
        row.appendChild(descriptionCell); //set TD to ROW

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
