import * as commands from "./commands.js";

var prevCommandsCounter = 0;
var prevCommands = [];
console.log("₮ɄⱤ₦ ฿₳₵₭ ₩ⱧłⱠɆ ɎØɄ ₵₳₦")

function addEnterListener(element){
    element.addEventListener("keydown", execute(element));
}

var e = document.getElementById("terminal-input");
function execute(e){
    e.addEventListener("keydown", ({key}) => {
        console.log("started listening")
        if(key === "Enter"){
            prevCommandsCounter = 0;
            var command = e.value;
            var command = command.split(" ");
            if(commands.validCommands.includes(command[0])){
                switch (commands.validCommands.indexOf(command[0])) {
                    case 0:
                        commands.ls();
                        break;
                    case 1:
                        commands.help();
                        break;
                    case 2:
                        commands.cd(command[1]);
                        break;
                    case 3:
                        commands.cat(command[1]);
                        break;
                    case 4:
                        commands.clear();
                        break;
                    case 5:
                        commands.whoami();               
                        break;
                }
                prevCommands.push(e.value);
                addEnterListener(commands.moveDownInput());
            }
            else{
                commands.wrong();
                addEnterListener(commands.moveDownInput());
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
    });
}
execute(document.getElementById("terminal-input"));








