//reloads self when needed to test without reloading entire webpage
function reloadScript(name) {

	var location = document.getElementById("tester");
	if (location !== null) {
		document.body.removeChild(location);
	}
	
	location = document.createElement("script");
	location.id = "tester";
	location.src = name;
	document.body.appendChild(location);
	
}