// global variables from the input form
var alphabet, states, starting, accepting, transitions, testString, map;

// all tests begin with this function
function submitHandler() {
    
    // assigns values to global variables
    alphabet = document.getElementById("alphabet").value;
    states = document.getElementById("states").value;
    starting = document.getElementById("starting").value;
    accepting = document.getElementById("accepting").value;
    transitions = document.getElementById("transitions").value;
    testString = document.getElementById("testString").value;
    
    try { 
        setup();  
    } catch (err) {
        console.log(err);
        errorHandler(err);
        return;
    }
    
    if ( runTest() ) {
        document.getElementById("path").style.color = "var(--success-color)";
        document.getElementById("path").innerHTML = "Test successful!";
    } else {
        document.getElementById("path").style.color = "var(--error-color)";
        document.getElementById("path").innerHTML = "Test failed!";
    }
    
    showOverlay();
    
}

// parses any list between two brackets
function parseList(string, name) {
    
    // formatting check
    if (string.charAt(0) !== '{') throw [ "formatting", name ];
    if (string.charAt(string.length - 1) !== '}') throw [ "formatting", name ];
    
    var output = string.slice(1, string.length - 1).split(',');
    
    // checks for duplicates in the list
    for (var a = 0; a < output.length; a++) {
        for (var b = a + 1; b < output.length; b++) {
            if (output[a] === output[b]) throw [ "duplicates", name, a, b, output[a] ];
        }
    }
    
    // runs a regex test
	var regex = new RegExp('^[a-zA-Z0-9]+$');
	for (var a = 0; a < output.length; a++) {
		if (!(regex.test(output[a])) ) throw [ "regex", name, a ];
	}
    
    return output;
    
}

function parseTransitions(list1, list2, string, multiple) {
    
    // creates mapping for all the transitions
    var map = new Array(list1.length);
    for (var a = 0; a < map.length; a++) {
        map[a] = new Array(list2.length);
    }
    
    string = string.split("\n");
    
    for (var a = 0; a < string.length; a++) {
        
        // formatting check
        if (string[a].charAt(0) !== '(') throw [ "formatting", "transitions" ];
        if (string[a].indexOf(',') === -1) throw [ "formatting", "transitions" ];
            
        //finds the state corresponding to the transition's starting state
        var list1Pos = list1.indexOf(string[a].slice(1, string[a].indexOf(',')));
        if (list1Pos === -1) throw [ "transition_state", a, string[a].slice(1, string[a].indexOf(',')) ];
        
        // formatting check
        if (string[a].indexOf(')') === -1) throw [ "general_parsing", "transitions" ];
        
        //finds the alphabet position for this specific transition
        var list2Pos = list2.indexOf(string[a].slice(string[a].indexOf(',') + 1, string[a].indexOf(')')));
        if (list2Pos === -1) throw [ "transition_alphabet", a, string[a].slice(string[a].indexOf(',') + 1, string[a].indexOf(')')) ];
        
        // formatting check
        if (string[a].indexOf('-') !== string[a].indexOf(')') + 1) throw [ "general_parsing", "transitions" ];
        if (string[a].indexOf('>') !== string[a].indexOf(')') + 2) throw [ "general_parsing", "transitions" ];
        
        //finds the state corresponding to the transition's ending state
        var returningPos = list1.indexOf(string[a].slice(string[a].indexOf('>') + 1, string[a].length));
        if (returningPos === -1) throw [ "transition_state", a, string[a].slice(string[a].indexOf('>') + 1, string[a].length) ];
        
        if (map[list1Pos][list2Pos] !== undefined) {
            
            if (multiple) {
                map[list1Pos][list2Pos] += ("," + returningPos); // creates a pseudo-list for NFAs
            } else {
                throw [ "transition_exists", a ];
            }
            
        } else {
            map[list1Pos][list2Pos] = returningPos;
        }
        
    }
    
    return map;
    
}

// outputs all possible errors and displays them to the user
function errorHandler(report) {
	
	var msg;
	switch (report[0]) {
		
		case "formatting":
			msg = "There was a formatting error when parsing the " + report[1] + ".";
			break;
            
        case "duplicates":
            msg = "There are duplicate entries for the " + report[1] + ".";
            break;
            
        case "regex":
            msg = "The " + report[1] + " can only be made up of A-Z, a-z, and 0-9 characters.";
            break;
            
        case "minimum_alphabet":
            msg = "The alphabet must at least allow {0,1} to continue.";
            break;
            
        case "temp_alphabet_length":
            msg = "The alphabet's entries can only be one character long.";
            break;
			
		case "missing_starting":
			msg = "The given starting state is not found in the list of all possible states.";
			break;
		
		case "missing_accepting":
			msg = "The accepting state at position " + (report[1] + 1) + " is not found in the list of possible states.";
			break;
            
        case "transition_state":
            msg = "Transition #" + (report[1] + 1) + " lists a state \"" + report[2] + "\" which doesn't exist.";
            break;
            
        case "transition_alphabet":
            msg = "Transition #" + (report[1] + 1) + " lists a alphabet position \"" + report[2] + "\" which doesn't exist.";
            break;
            
        case "transition_exists":
            msg = "Transition #" + (report[1] + 1) + " is trying to overwrite an already defined transition.";
            break;
            
        case "transition_undefined":
            msg = "One or more transitions are undefined.";
            break;
            
        case "upload_unsupported":
            msg = "The uploaded file is not supported.";
            break;
			
		default:
			msg = "You have stumbled upon an error called \"" + report[0] + "\" but it is undefined. Congrats?";
		
	}
    
    consolePopup(msg, "var(--error-color)");
    
}

// creates a message pop-up to display for a short time
function consolePopup(message, color) {
    
    document.getElementById("console").innerHTML = message;
    
    document.getElementById("popup").style.backgroundColor = color;
    document.getElementById("popup").style.animation = "growPopup .3s";
    document.getElementById("popup").style.transform = "scale(1)";
    
    setTimeout(function() {
        document.getElementById("popup").style.animation = "shrinkPopup .2s";
        document.getElementById("popup").style.transform = "scale(0)";
    }, 4000);
    
}

// toggles the overlay on
function showOverlay() {
    document.getElementById("overlay").style.display = "inherit";
}

// toggles the overlay off
function hideOverlay() {
    document.getElementById("overlay").style.display = "none";
}

// makes sure all the inputs have atleast some information
function checkForm() {

	var canSubmit = true;
	
	var inputs = document.getElementsByTagName("input");
	for (var a = 0; a < inputs.length; a++) {
        if (inputs[a].id === "clickToUpload") continue;
		if (inputs[a].value.length === 0) canSubmit = false;
	}
	
	if (document.getElementById("transitions").value.length === 0) {
		canSubmit = false;
	}
	
	document.getElementById("runTest").disabled = !canSubmit;
	
}