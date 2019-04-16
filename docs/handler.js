//outputs all errors and displays them to the user
function error(msg) {
	
	var output = "";
	switch (msg) {
		
		case "parse_alphabet":
			output += "There was an error parsing the alphabet.";
			break;
            
        case "duplicate_alphabet":
            output += "There are duplicate entries for the alphabet.";
            break;
			
		case "parse_states":
			output += "There was an error parsing the possible states.";
			break;
            
        case "duplicate_states":
            output += "There are duplicate entries for the possible states.";
            break;
			
		case "parse_accepting":
			output += "There was an error parsing the accepting states.";
			break;
            
        case "duplicate_accepting":
            output += "There are duplicate entries for the accepting states.";
            break;
            
        case "minimum_alphabet":
            output += "The alphabet must at least allow {0,1} to continue.";
            break;
			
		case "regex_alphabet":
			output += "The alphabet can only be made up of letters and numbers.";
			break;
			
		case "regex_states":
			output += "All possible states can only be made up of letters and numbers.";
			break;
			
		case "missing_start":
			output += "The given starting state is not found in the list of all possible states.";
			break;
		
		case "missing_accepting":
			output += "One or more of the accepting states is not found in the list of all possible states.";
			break;
			
		default:
			output += "You have stumbled upon an error called \"" + msg + "\" but it is undefined. Congrats?";
		
	}	
	
    document.getElementById("text").innerHTML = output;
}

//makes sure all the inputs have atleast some information
function checkForm() {

	var canSubmit = true;
	
	var inputs = document.getElementsByTagName("input");
	for (var a = 0; a < inputs.length; a++) {
		if (inputs[a].value.length === 0) canSubmit = false;
	}
	
	if (document.getElementById("transitions").value.length === 0) {
		canSubmit = false;
	}
	
	document.getElementById("runTest").disabled = !canSubmit;
	
}