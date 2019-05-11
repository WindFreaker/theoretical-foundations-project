// function for running all error tests and setting up all the values needed to run a test
function setup() {
	
    // parses the three lists
	alphabet = parseList(alphabet, "alphabet");
	states = parseList(states, "possible states");
	accepting = parseList(accepting, "accepting states");
    
    // checks for {0,1} in the alphabet (assignment has listed them as required?) 
    for (var a = 0; a < alphabet.length; a++) {
        if (alphabet[a] === '0') break;
        if (a === alphabet.length - 1) throw [ "minimum_alphabet" ];
    }
        
    for (var a = 0; a < alphabet.length; a++) {
        if (alphabet[a] === '1') break;
        if (a === alphabet.length - 1) throw [ "minimum_alphabet" ];
    }
    
    // ! ! ! TEMPORARY FIX TO THE MULTIPLE DIGITS ISSUE ! ! !
    // NEEDS A WAY TO ALLOW FOR MULTIPLE CHARACTER VALUES IN THE ALPHABET WITHOUT BREAKING TEST STRING
    for (var a = 0; a < alphabet.length; a++) {
		if (alphabet[a].length !== 1) throw [ "temp_alphabet_length" ];
	}
	
	// makes sure the starting state can be found in the list of possible states
	if (!(states.includes(starting))) throw [ "missing_starting" ];

	// makes sure the accepting states can be found in the list of possible states
	for (var a = 0; a < accepting.length; a++) {
		if (!(states.includes(accepting[a]))) throw [ "missing_accpeting", a ];
    }
    
    //parses the list of transitions
    map = parseTransitions(states, alphabet, transitions, false);
    
    // makes sure no transitions are undefined for DFA
    for (var a = 0; a < map.length; a++) {
        for (var b = 0; b < map[a].length; b++) {
            if (map[a][b] === undefined) throw [ "transition_undefined" ];
        }
    }
	
}

function runTest() {
    
    document.getElementById("pathText").innerHTML = "";
    var pos = states.indexOf(starting);
    
    for (var a = 0; a < testString.length; a++) {
        
        document.getElementById("pathText").innerHTML += testString[a] + ": (" + states[pos] + ",";
        pos = map[pos][alphabet.indexOf(testString.charAt(a))];
        document.getElementById("pathText").innerHTML += testString[a] + ")->" + states[pos] + "<br>";
        
    }
    
    var finalPos = accepting.indexOf(states[pos]);
    if (finalPos === -1) {
        return false;
    } else {
        return true;
    }
    
}