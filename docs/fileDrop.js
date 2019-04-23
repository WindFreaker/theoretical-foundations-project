function dropHandler(event) {
    
    event.preventDefault();
    
    if (event.dataTransfer.types[0] === "Files") {
        var file = event.dataTransfer.items[0].getAsFile();
        processFile(file);
    }

}

function dragOverHandler(event) {
    
    event.preventDefault();
    //TODO: add animation or indication that a file is accepted

}

function clickHandler(event) {
    var file = document.getElementById("clickToUpload").files[0];
    processFile(file);
    
    //resets the value so identical sequential uploads won't be ignored
    document.getElementById("clickToUpload").value = "";
    
}

function processFile(file) {
    
    var textType = /text.*/;
    if (file.type.match(textType)) {
        
        var reader = new FileReader();
        reader.onload = function(e) {
        
            var input = reader.result;
            input = input.split("\n");
        
            //sets all the values for the form to values from the uploaded file
            document.getElementById("alphabet").value = input[0];
            document.getElementById("states").value = input[1];
            document.getElementById("start").value = input[2];
            document.getElementById("accepting").value = input[3];
        
            document.getElementById("transitions").value = ""; //clears the value before writing to it
            for (var a = 4; a < input.length; a++) {
                document.getElementById("transitions").value += input[a];
            }
            
            /* THIS IS A HIJACKING METHOD OF MAKING THINGS WORK AND IT SUCKS, FIX IF TIME ALLOWS */
            
            document.getElementById("console").innerHTML = "The file " + file.name + " has been successfully uploaded.";
    
            document.getElementById("errorHolder").style.backgroundColor = "var(--upload-color)";
            document.getElementById("errorHolder").style.animation = "growPopup .3s";
            document.getElementById("errorHolder").style.transform = "scale(1)";
    
            setTimeout(function() {
                document.getElementById("errorHolder").style.animation = "shrinkPopup .2s";
                document.getElementById("errorHolder").style.transform = "scale(0)";
            }, 4000);
            
            /* THIS IS A HIJACKING METHOD OF MAKING THINGS WORK AND IT SUCKS, FIX IF TIME ALLOWS */
        
        }
    
        reader.readAsText(file); //this comes after(?)
        
    } else {
        error("upload_unsupported");
        return;
    }
    
}

function clickRedirect() {
    document.getElementById("clickToUpload").click();
}