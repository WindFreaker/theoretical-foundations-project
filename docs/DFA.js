//function for running a DFA test on the given inputs
function runTest() {
    
	//captures all the form data at the beginning of the test
    var alphabet = document.getElementById("alphabet").value;
    var states = document.getElementById("states").value;
    var start = document.getElementById("start").value;
    var accepting = document.getElementById("accepting").value;
    var transitions = document.getElementById("transitions").value;
    var testString = document.getElementById("testString").value;
	
	//converts the string for the alphabet into a array 
    if ((alphabet.charAt(0) === '{') && (alphabet.charAt(alphabet.length - 1) === '}')) {
        alphabet = alphabet.slice(1, alphabet.length - 1).split(",");
    } else {
        error("parse_alphabet");
		return;
    }
    
    //makes sure there are no duplicates in the parsed alphabet
    for (var a = 0; a < alphabet.length; a++) {
        for (var b = a + 1; b < alphabet.length; b++) {
            
            if (alphabet[a] === alphabet[b]) {
                error("duplicate_alphabet");
                return;
            }
            
        }
    }
    
	//converts the string for the possible states into a array
    if ((states.charAt(0) === '{') && (states.charAt(states.length - 1) === '}')) {
        states = states.slice(1, states.length - 1).split(",");
    } else {
        error("parse_states");
		return;
    }
    
    //makes sure there are no duplicates in the parsed possible states
    for (var a = 0; a < states.length; a++) {
        for (var b = a + 1; b < states.length; b++) {
            
            if (states[a] === states[b]) {
                error("duplicate_states");
                return;
            }
            
        }
    }
    
	//converts the string for the accepting states into a array
    if ((accepting.charAt(0) === '{') && (accepting.charAt(accepting.length - 1) === '}')) {
        accepting = accepting.slice(1, accepting.length - 1).split(",");
    } else {
        error("parse_accepting");
		return;
		
    }
    
    //makes sure there are no duplicates in the parsed accepting states
    for (var a = 0; a < accepting.length; a++) {
        for (var b = a + 1; b < accepting.length; b++) {
            
            if (accepting[a] === accepting[b]) {
                error("duplicate_accepting");
                return;
            }
            
        }
    }
    
    //checks for {0,1} in the alphabet, the assignment has listed them as required 
    var checker = 0;
    for (var a = 0; a < alphabet.length; a++) {
        
        if (alphabet[a] === '0') {
            checker++;
        }
        
        if (alphabet[a] === '1') {
            checker++;
        }
        
    }
    
    if (checker !== 2) {
        error("minimum_alphabet");
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
	
    //creates mapping for all the transitions
    var map = new Array(states.length);
    for (var a = 0; a < map.length; a++) {
        map[a] = new Array(alphabet.length);
    }
    
    //breaks up the transitions string
    transitions = transitions.split("\n");
    for (var a = 0; a < transitions.length; a++) {
        if ((transitions[a].charAt(0) === '(') && (transitions[a].charAt(4) === ')')) {
            
        }
    }
    
	var currentState = start;
    
    document.getElementById("console").innerHTML = transitions;
	
}