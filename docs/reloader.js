//reloads self when needed to test without reloading entire webpage
function reloadScripts() {
    reloadTester("DFA.js");
    reloadHandlers();
}

function changeTester(number) {
    
    var name = "";
    switch (number) {
        case 0:
            name += "DFA";
            reloadTester("DFA.js");
            break;
            
        case 1:
            name += "NFA";
            reloadTester("NFA.js");
            break;
            
        case 2:
            name += "TM";
            reloadTester("TuringMachine.js");
            break;
            
        default:
            name += "DFA";
            reloadTester("DFA.js");
            console.log("changeTester(number) returned invalid number, setting default DFA.js");
            break;
    }
    
    document.getElementById("modeChanger").innerHTML = "Mode: " + name + " ▼";
}

function reloadTester(name) {

	var location = document.getElementById("tester");
	if (location !== null) {
		document.body.removeChild(location);
	}
	
	location = document.createElement("script");
	location.id = "tester";
	location.src = name;
	document.body.appendChild(location);
	
}

function reloadHandlers() {
    
    var location = document.getElementById("handler");
    if (location !== null) {
        document.body.removeChild(location);
    }
    
    location = document.createElement("script");
    location.id = "handler";
    location.src = "handler.js";
    document.body.appendChild(location);
    
    /* Above Reloads handler.js | Below Reloads fileDrop.js */
    
    var location = document.getElementById("fileDrop");
    if (location !== null) {
        document.body.removeChild(location);
    }
    
    location = document.createElement("script");
    location.id = "fileDrop";
    location.src = "fileDrop.js";
    document.body.appendChild(location);
    
}