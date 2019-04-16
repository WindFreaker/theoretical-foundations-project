//reloads self when needed to test without reloading entire webpage
function reloadScripts() {
    reloadTester("DFA.js");
    reloadHandler();
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

function reloadHandler() {
    
    var location = document.getElementById("handler");
    if (location !== null) {
        document.body.removeChild(location);
    }
    
    location = document.createElement("script");
    location.id = "handler";
    location.src = "handler.js";
    document.body.appendChild(location);
    
}