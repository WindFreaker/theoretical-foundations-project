/* 

NFA.js IS JUST A MODIFIED VERSION OF DFA.js
ALL COMMENTS EXISTING IN DFA.js HAVE BEEN REMOVED
NEW COMMENTS HAVE BEEN ADDED POINTING OUT THE CHANGES

*/

var alphabet, states, start, accepting, transitions, testString, map;

function runTest() {
    
    //main variables have been made global to work with the iterate function
    alphabet = document.getElementById("alphabet").value;
    states = document.getElementById("states").value;
    start = document.getElementById("start").value;
    accepting = document.getElementById("accepting").value;
    transitions = document.getElementById("transitions").value;
    testString = document.getElementById("testString").value;
	
	alphabet = parseList(alphabet);
    if (alphabet === false) {
        error("parse_alphabet");
        return;
    }
    
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
    
    for (var a = 0; a < accepting.length; a++) {
        for (var b = a + 1; b < accepting.length; b++) {
            
            if (accepting[a] === accepting[b]) {
                error("duplicate_accepting");
                return;
            }
            
        }
    }
    
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
	
	var regex = new RegExp('^[a-zA-Z0-9]+$');
	
	for (var a = 0; a < alphabet.length; a++) {
		if (!(regex.test(alphabet[a]))) {
			error("regex_alphabet");
			return;
		}
	}
    
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
	
	if (!(states.includes(start))) {
		error("missing_start");
		return;
    }

	for (var a = 0; a < accepting.length; a++) {
		
		if (!(states.includes(accepting[a]))) {
			error("missing_accepting");
			return;
		}
		
	}
    
    //variable has been made global to work with the iterate function
    //also, the parsing must allow for multiple transitions
    map = parseTransitions(states, alphabet, transitions, true);
    if (map === false) {
        error("parse_transitions");
        return;
    }
    
    //undefined transitions are acceptable for NFAs, code block has been removed
    
    var prospect = iterate(0, states.indexOf(start));
    
    if (prospect === false) {
        document.getElementById("path").style.color = "var(--error-color)";
        document.getElementById("path").innerHTML = "Test failed!";
        
        document.getElementById("pathText").innerHTML = "No single route.";
        
    } else {
        document.getElementById("path").style.color = "var(--success-color)";
        document.getElementById("path").innerHTML = "Test successful!";
        
        document.getElementById("pathText").innerHTML = prospect;
        
    }
    
    showOverlay();
	
}

//this is the biggest change from DFA to NFA
//NFAs can have no possible paths but also infinite possible paths
function iterate(stringPos, currentState) {
    
    if (stringPos === testString.length) {
        
        var finalPos = accepting.indexOf(states[currentState]);
        if (finalPos !== -1) {
            return "";
        } else {
            return false;
        }
        
    }
    
    var path = testString[stringPos] + ": (" + states[currentState] + "," + testString[stringPos];
    currentState = map[currentState][alphabet.indexOf(testString.charAt(stringPos))];
    
    //if the path is not possible then the NFA fails
    if (currentState === undefined) return false;
    
    if (currentState.toString().indexOf(",") !== -1) {
        
        var possibleStates = currentState.split(",");
        for (var a = 0; a < possibleStates.length; a++) {

            var returned = iterate(stringPos + 1, parseInt(possibleStates[a]));
            
            //if an acceptable branch has been found, return it
            if (returned !== false) {
                
                currentState = parseInt(possibleStates[a]);
                return path += ")->" + states[currentState] + "<br>" + returned;
                
            }
            
        }
        
        //if all iterations have been tested and all returned false, then the NFA fails
        return false;
        
    } else {
        
        path += ")->" + states[currentState] + "<br>";
        
    }
        
    var returned = iterate(stringPos + 1, currentState);
        
    if (returned === false) return false;
        
    return path += returned;
    
}