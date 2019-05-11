/* 

NFA.js IS JUST A MODIFIED VERSION OF DFA.js
ALL COMMENTS EXISTING IN DFA.js HAVE BEEN REMOVED
NEW COMMENTS HAVE BEEN ADDED POINTING OUT THE CHANGES

*/

function setup() {
	
	alphabet = parseList(alphabet, "alphabet");
	states = parseList(states, "possible states");
	accepting = parseList(accepting, "accepting states");
    
    for (var a = 0; a < alphabet.length; a++) {
        if (alphabet[a] === '0') break;
        if (a === alphabet.length - 1) throw [ "minimum_alphabet" ];
    }
        
    for (var a = 0; a < alphabet.length; a++) {
        if (alphabet[a] === '1') break;
        if (a === alphabet.length - 1) throw [ "minimum_alphabet" ];
    }
    
    for (var a = 0; a < alphabet.length; a++) {
		if (alphabet[a].length !== 1) throw [ "temp_alphabet_length" ];
	}
	
	if (!(states.includes(starting))) throw [ "missing_starting" ];

	for (var a = 0; a < accepting.length; a++) {
		if (!(states.includes(accepting[a]))) throw [ "missing_accpeting", a ];
    }
    
    // the parsing of the transitions must allow for multiple paths
    map = parseTransitions(states, alphabet, transitions, true);
    
    // undefined transitions are acceptable for NFAs, code block has been removed
    
}

//completely different from DFA (see iterate)
function runTest() {
    
    var iterateResults = iterate(0, states.indexOf(starting));
    if (iterateResults === false) {
        
        document.getElementById("pathText").innerHTML = "No single route.";
        return false;
        
    } else {
        
        document.getElementById("pathText").innerHTML = iterateResults;
        return true;
        
    }
    
}

// this is the biggest change from DFA to NFA
// NFAs can have no possible paths but also infinite possible paths
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
    
    // if the path is not possible then the NFA fails
    if (currentState === undefined) return false;
    
    if (currentState.toString().indexOf(",") !== -1) {
        
        var possibleStates = currentState.split(",");
        for (var a = 0; a < possibleStates.length; a++) {

            var returned = iterate(stringPos + 1, parseInt(possibleStates[a]));
            
            // if an acceptable branch has been found, return it
            if (returned !== false) {
                
                currentState = parseInt(possibleStates[a]);
                return path += ")->" + states[currentState] + "<br>" + returned;
                
            }
            
        }
        
        // if all iterations have been tested and all returned false, then the NFA fails
        return false;
        
    } else {
        
        path += ")->" + states[currentState] + "<br>";
        
    }
        
    var returned = iterate(stringPos + 1, currentState);
        
    if (returned === false) return false;
        
    return path += returned;
    
}