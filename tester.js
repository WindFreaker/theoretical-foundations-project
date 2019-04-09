//function for running a DFA test on the given inputs
function runTest() {
    
	//captures all the form data at the beginning of the test
    var alphabet = document.getElementById("alphabet").value;
    var states = document.getElementById("states").value;
    var start = document.getElementById("start").value;
    var accepting = document.getElementById("accepting").value;
	
	//converts the string for the alphabet into a array 
    if ((alphabet.charAt(0) === '{') && (alphabet.charAt(alphabet.length - 1) === '}')) {
        alphabet = alphabet.slice(1, alphabet.length - 1).split(",");
    } else {
        error("parse_alphabet");
		return;
    }
    
	//converts the string for the possible states into a array
    if ((states.charAt(0) === '{') && (states.charAt(states.length - 1) === '}')) {
        states = states.slice(1, states.length - 1).split(",");
    } else {
        error("parse_states");
		return;
    }
    
	//converts the string for the accepting states into a array
    if ((accepting.charAt(0) === '{') && (accepting.charAt(accepting.length - 1) === '}')) {
        accepting = accepting.slice(1, accepting.length - 1).split(",");
    } else {
        error("parse_accepting");
		return;
		
    }
	
	//runs a regex test on both the alphabet and possible states
	var regex = new RegExp('^[a-zA-Z0-9]+$');
	
	for (var a = 0; a < alphabet.length; a++) {
		if (!(regex.test(alphabet[a]))) {
			error("regex_alphabet");
			return;
		}
	}
	
	for (var a = 0; a < states.length; a++) {
		if (!(regex.test(states[a]))) {
			error("regex_states");
			return;
		}
	}
	
	//makes sure the start state can be found in the list of possible states
	if (!(states.includes(start))) {
		error("missing_start");
		return;
    }

	//makes sure the accepting states can be found in the list of possible states
	for (var a = 0; a < accepting.length; a++) {
		
		if (!(states.includes(accepting[a]))) {
			error("missing_accepting");
			return;
		}
		
	}
	
	//runs after everything else to prove no returns were run
	document.getElementById("text").innerHTML = "Success?";
	
}

//outputs all errors and displays them to the user
function error(msg) {
	
	var output = "";
	switch (msg) {
		
		case "parse_alphabet":
			output += "There was an error parsing the input for the alphabet.";
			break;
			
		case "parse_states":
			output += "There was an error parsing the input for the possible states.";
			break;
			
		case "parse_accepting":
			output += "There was an error parsing the input for the accepting states.";
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

//reloads self when needed to test without reloading entire webpage
function reloadScript() {

	var location = document.getElementById("script");
	if (location !== null) {
		document.body.removeChild(location);
	}
	
	location = document.createElement("script");
	location.id = "script";
	location.src = "tester.js";
	document.body.appendChild(location);
	
}