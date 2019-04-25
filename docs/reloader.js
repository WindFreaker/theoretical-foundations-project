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