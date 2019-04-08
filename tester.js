function runTest() {
    
    var alphabet = document.getElementById("alphabet").value;
    var states = document.getElementById("states").value;
    var start = document.getElementById("start").value;
    var accepting = document.getElementById("accepting").value;
    
    if ((alphabet.charAt(0) === '{') && (alphabet.charAt(alphabet.length - 1) === '}')) {
        alphabet = alphabet.slice(1, alphabet.length - 1).split(",");
    } else {
        inputError();
    }
    
    if ((states.charAt(0) === '{') && (states.charAt(states.length - 1) === '}')) {
        states = states.slice(1, states.length - 1).split(",");
    } else {
        inputError();
    }
    
    if ((accepting.charAt(0) === '{') && (accepting.charAt(accepting.length - 1) === '}')) {
        accepting = accepting.slice(1, accepting.length - 1).split(",");
    } else {
        inputError();
    }
    
}

function inputError() {
    document.getElementById("title").innerHTML = "error";
}