var required_json=[];

// var ontologyLists = [{"_id": "Adaptor1", "name": "Experimental Factor Ontology"},
//     {"_id": "Adaptor2", "name": "National Cancer Institute Thesaurus"}];

function loadOntologies(){   
    alert("print 1afasfasf");
    var ontologyList = new Array();
            var request = new XMLHttpRequest();
            alert("print 1");
            request.open('GET', 'http://localhost:3000/annotatorapp/getontologylist', true);
            alert("print 2");
            request.onload = function () {
                alert("print 3");
            // Begin accessing JSON data here
            var data = this.response;

            alert(this.response);

            if (request.status >= 200 && request.status < 400) {
            data.forEach(ontology => {
            ontologyList.push(ontology.name);
            });
          } else {
            alert('some error occured');
          }
          
        }

        request.send();

        $( "#ontologies" ).autocomplete({
              source: ontologyList
        });
            
};

function generateResult(){
        
    var annotateText=document.getElementById("annotorText").value;
    console.log(annotateText);

    var selectedOntologies = ["Adaptor1", "Adaptor2"];
    //var selectedOntologies=document.getElementById("ontologies").value; //get the correct ID array from UI
    
    var jsonStringOfSelectedOntologies = JSON.stringify(selectedOntologies);

	console.log(annotateText+" "+jsonStringOfSelectedOntologies);
    
        var request = new XMLHttpRequest();

        request.open('GET', 'http://localhost:3000/annotatorapp/getdefinition/:'+ annotateText +'/:'+jsonStringOfSelectedOntologies, true);
        request.onload = function () {

        // Begin accessing JSON data here
        var data = this.response;
        if (request.status >= 200 && request.status < 400) {
            populateResult(data);
        } else {
            alert('some error occured');
        }

        }

        request.send();        
};



function populateResult(responseJsonString){
required_json = JSON.parse(responseJsonString);

//console.log(required_json);

for(var i in required_json){

    var row_content=required_json[i];

    var items=Object.keys(required_json[i]);

	//get table with id annotation_result
    var table=document.getElementById("annotation_result");
	//creates a tbody tag
	var tbody=document.createElement("tbody");
	//creates a tr tag
	var row=document.createElement("tr");

    // var new_tbody = document.createElement('tbody');
    // //populate_with_new_rows(new_tbody);
    // tbody.parentNode.replaceChild(new_tbody, tbody);

	for(var i in items){
		//creates a td tag
		var cell=document.createElement("td");
		if(row_content[items[i]].name!=undefined)
			cell.innerHTML="<a href='"+row_content[items[i]].link+"'>"+row_content[items[i]].name+"</a>";
		else
		if(row_content[items[i]]!=undefined)
			cell.innerHTML=	row_content[items[i]];
		//appends td tag to tr tag like <tr><td></td><td></td>....</tr>
		row.appendChild(cell);
	}

    //appends entire row(tr) to the table body (tbody)
    tbody.innerHTML = "";
	tbody.appendChild(row);

	//appends tbody to the table
	table.appendChild(tbody);
}
};


//generateResult();  //Direct function calling for testing purposes
//loadOntologies();  //Direct function calling for testing purposes