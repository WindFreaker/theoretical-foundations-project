//parses any list between two brackets
function parseList(string) {
            
    if ((string.charAt(0) === '{') && (string.charAt(string.length - 1) === '}')) {
        return string.slice(1, string.length - 1).split(',');
    } else {
        return false;
    }
    
}

function parseTransitions(list1, list2, string) {
    
    //creates mapping for all the transitions
    var map = new Array(list1.length);
    for (var a = 0; a < map.length; a++) {
        map[a] = new Array(list2.length);
    }
    
    string = string.split("\n");
    
    for (var a = 0; a < string.length; a++) {
        
        if (string[a].charAt(0) !== '(') return false;
        if (string[a].indexOf(',') === -1) return false;
            
        var list1Pos = list1.indexOf(string[a].slice(1, string[a].indexOf(',')));
        if (list1Pos === -1) return false;
        
        if (string[a].indexOf(')') === -1) return false;
        
        var list2Pos = list2.indexOf(string[a].slice(string[a].indexOf(',') + 1, string[a].indexOf(')')));
        if (list2Pos === -1) return false;
        
        if (string[a].indexOf('-') !== string[a].indexOf(')') + 1) return false;
        if (string[a].indexOf('>') !== string[a].indexOf(')') + 2) return false;
        
        var returningPos = list1.indexOf(string[a].slice(string[a].indexOf('>') + 1, string[a].length));
        if (returningPos === -1) return false;
        
        map[list1Pos][list2Pos] = returningPos;
        
    }
    
    return map;
    
}

//outputs all possible errors and displays them to the user
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
            
        case "parse_transitions":
			output += "There was an error parsing the transitions.";
			break;
            
        case "transition_undefined":
            output += "One or more transitions are undefined.";
            break;
			
		default:
			output += "You have stumbled upon an error called \"" + msg + "\" but it is undefined. Congrats?";
		
	}
    
    //sets the message to display in the popup
    document.getElementById("console").innerHTML = output;
    
    document.getElementById("errorHolder").style.animation = "growPopup .3s";
    document.getElementById("errorHolder").style.transform = "scale(1)";
    
    setTimeout(function() {
        document.getElementById("errorHolder").style.animation = "shrinkPopup .2s";
        document.getElementById("errorHolder").style.transform = "scale(0)";
    }, 4000);
    
}

//ouputs the results of a successful test for the user
function success() {
    
    document.getElementById("overlay").style.display = "inherit";
    
}

function closePopup() {
    document.getElementById("overlay").style.display = "none";
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

function fillForm() {
    
    document.getElementById("alphabet").value = "{0,1}";
    document.getElementById("states").value = "{a,b,c,d}";
    document.getElementById("start").value = "a";
    document.getElementById("accepting").value = "{d}";
    document.getElementById("transitions").value = "(a,0)->b\n(a,1)->a\n(b,0)->c\n(b,1)->a\n(c,0)->c\n(c,1)->d\n(d,0)->d\n(d,1)->d";
    document.getElementById("testString").value = "001";
    
    checkForm();
    
}