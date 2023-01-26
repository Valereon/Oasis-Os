
const validCommands = ["ls", "help", "cd", "cat", "clear", "whoami"];
var currentPath = ["Users"];
var mostRecentTexts = [];
var prevCommands = [];


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

var textCounter = 0;
var counter = 0;
var prevCommandsCounter = 0;

function onEnter(e){
    e.addEventListener("keydown", ({key}) => {
        if(key === "Enter"){
            prevCommandsCounter = 0;
            var command = e.value;
            var command = command.split(" ");
            if(validCommands.includes(command[0])){
                switch (validCommands.indexOf(command[0])) {
                    case 0:
                        ls();
                        break;
                    case 1:
                        help();
                        break;
                    case 2:
                        cd(command[1]);
                        break;
                    case 3:
                        cat(command[1]);
                        break;
                    case 4:
                        clear();
                        break;
                    case 5:
                        whoami();               
                        break;
                }
                prevCommands.push(e.value);
                moveDownInput();
            }
            else{
                wrong();
                moveDownInput();
            }
        }
        else if(key === "ArrowUp"){
            if(prevCommandsCounter < prevCommands.length){
                e.value = prevCommands[prevCommandsCounter - 1];
                prevCommandsCounter += 1;
                }
        }
        else if(key === "ArrowDown"){
            if(prevCommandsCounter > 0){
                e.value = prevCommands[prevCommandsCounter];
                prevCommandsCounter -= 1;
                }
        }   
    },{once: true});
}



function createNewText(text){
    
    var newLine = document.createElement("p");
    newLine.innerHTML = text;
    var term = document.getElementById("terminal");
    newLine.id = assignId();
    term.after(newLine);
    mostRecentTexts.push(textCounter);

}


function moveDownInput(){
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
}


function ls(){
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

function cd(cmd){
    var currentDir = fileSystem;
    if(cmd === "..")
    {
        currentPath.pop();
    }
    if(cmd in fileSystem){
        document.getElementById("directory").innerHTML = currentPath.join("\\");
        ls();
    }else{ 
        createNewText("No such file or directory");   
    }
    
    if(cmd !== ".." && cmd in fileSystem)
    {
        currentPath.push(cmd);
    }
    
    

    for (var i = 0; i < currentPath.length; i++) 
    {
        currentDir = currentDir[currentPath[i]];
        console.log(currentDir);
    }
    

   
}

function help(){
    createNewText("There is No one left to help you");
}


function wrong(){
    var listOfTexts = ["stop wasting time.", "theres no time for this.", "time is running out.", "whats wrong with you.", "time is of the essence.", "we have no time.", "idoit.", "get it right."]
    var text = listOfTexts[getRndInteger(0, listOfTexts.length - 1)];
    createNewText(text);
}

function whoami(){
    createNewText("We are one and seperate, this is what we still have to figure out.");
}




function assignId(){
    textCounter += 1;
    return textCounter;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}




