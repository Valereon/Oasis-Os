export const validCommands = ["ls", "help", "cd", "cat", "clear", "whoami"];
var currentPath = ["Users"];
var mostRecentTexts = [];

var Welcome = "Welcome to Oasis Os the os where dreams come true :)";


var fileSystem = {
    "Users": {
        "Guest": {
            "Desktop": {
                "Welcome.txt": Welcome,
                "file2.txt": "This is another file",
                "Update.exe": "File is corrupted"
            },
        },
        "Admin": {
            "Desktop": {
                "file1.txt": "This is a file",
                "file2.txt": "This is another file"
            },
        }
    }
};

export var textCounter = 0;
export var counter = 0;


export function createNewText(text){
    
    var newLine = document.createElement("p");
    newLine.innerHTML = text;
    var term = document.getElementById("terminal");
    newLine.id = assignId();
    term.after(newLine);
    mostRecentTexts.push(textCounter);

}



export function moveDownInput(){
    var term = document.getElementById("terminal");
    var termInp = document.getElementById("terminal-input");
    var min = Math.min(...mostRecentTexts);
    var lastText = document.getElementById(min);
    var oldDir = document.getElementById("directory");
    lastText.after(term.cloneNode(true));
    termInp.setAttribute("id", "oldTermInput" + String(assignId()));
    termInp.setAttribute("readonly", "true");
    var newTermInp = document.getElementById("terminal-input");
    

    term.blur();
    newTermInp.focus();
    newTermInp.value = "";
    term.id = "oldTermInput" + String(assignId());
    oldDir.id = "oldDir" + String(assignId());
    mostRecentTexts = [];
    return newTermInp;
}


export function ls(){
    var currentDir = fileSystem;
    for (var i = 0; i < currentPath.length; i++) {
        currentDir = currentDir[currentPath[i]];
    }
    for (var key in currentDir) {
        if (currentDir.hasOwnProperty(key)) {
            createNewText(key);
        }
    }
}

export function cd(cmd){
    var currentDir = fileSystem;
    if(cmd === ".."){
        currentPath.pop();
    }
    else{
        for (var i = 0; i < currentPath.length; i++) {
            currentDir = currentDir[currentPath[i]];
        }
        if(currentDir.hasOwnProperty(cmd)){
            currentPath.push(cmd);
        }
        else{
            createNewText("Directory does not exist");
        }
    }   
    ls();
}

export function help(){
    createNewText("There is No one left to help you");
}


export function wrong(){
    var listOfTexts = ["stop wasting time.", "theres no time for this.", "time is running out.", "whats wrong with you.", "time is of the essence.", "we have no time.", "idoit.", "get it right."]
    var text = listOfTexts[getRndInteger(0, listOfTexts.length - 1)];
    createNewText(text);
}

export function whoami(){
    createNewText("We are one and seperate, this is what we still have to figure out.");
}




export function assignId(){
    textCounter += 1;
    return textCounter;
}

export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}