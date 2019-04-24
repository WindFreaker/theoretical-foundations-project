//function for running a DFA test on the given inputs
function runTest() {
    
	//captures all the form data at the beginning of the test
    var alphabet = document.getElementById("alphabet").value;
    var states = document.getElementById("states").value;
    var start = document.getElementById("start").value;
    var accepting = document.getElementById("accepting").value;
    var transitions = document.getElementById("transitions").value;
    var testString = document.getElementById("testString").value;
	
	alphabet = parseList(alphabet);
    if (alphabet === false) {
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
    
	states = parseList(states);
    if (states === false) {
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
    
	accepting = parseList(accepting);
    if (accepting === false) { 
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
    
    // ! ! ! TEMPORARY FIX TO THE MULTIPLE DIGITS ISSUE ! ! !
    // NEEDS A WAY TO ALLOW FOR MULTIPLE CHARACTER VALUES IN THE ALPHABET WITHOUT BREAKING TEST STRING
    for (var a = 0; a < alphabet.length; a++) {
		if (alphabet[a].length !== 1) {
            error("temp_alphabet_length");
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
    
    map = parseTransitions(states, alphabet, transitions, false);
    if (map === false) {
        error("parse_transitions");
        return;
    }
    
    //makes sure no transitions are undefined for DFA
    for (var a = 0; a < map.length; a++) {
        for (var b = 0; b < map[a].length; b++) {
            
            if (map[a][b] === undefined) {
                error("transition_undefined");
                return;
            }
            
        }
    }
    
    document.getElementById("pathText").innerHTML = "";
    var pos = states.indexOf(start);
    
    for (var a = 0; a < testString.length; a++) {
        
        document.getElementById("pathText").innerHTML += testString[a] + ": (" + states[pos] + ",";
        pos = map[pos][alphabet.indexOf(testString.charAt(a))];
        document.getElementById("pathText").innerHTML += testString[a] + ")->" + states[pos] + "<br>";
        
    }
    
    var finalPos = states[pos];
    finalPos = accepting.indexOf(finalPos);
    
    if (finalPos === -1) {
        document.getElementById("path").style.color = "var(--error-color)";
        document.getElementById("path").innerHTML = "Test failed!";
    } else {
        document.getElementById("path").style.color = "var(--success-color)";
        document.getElementById("path").innerHTML = "Test successful!";
    }
    
    showOverlay();
	
}