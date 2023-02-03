import * as ascii from "../../images/AsciiArt.js";



function elementsToClick(tag, className, text, baseText){
    
    console.log(text)
    text = text.split("\n")
    console.log(text)
    for(let i = 0; i < text.length; i++){
        text[i] = text[i].trimEnd();
        baseText.innerHTML = baseText.innerHTML.replace(text[i], `<${tag} class="${className}">${text[i]}</${tag}>`)

    }    

    return baseText;

};


window.onload = function(){
    
    let textFormattedEle = document.createElement("pre");
    let spanFix = document.createElement("span");
    textFormattedEle.className = "ascii centered";
    textFormattedEle.innerText = ascii.insideOfHouseAscii;
    let product = elementsToClick("span", "ascii", ascii.swordInHouse, textFormattedEle);
    document.body.append(product);
};





