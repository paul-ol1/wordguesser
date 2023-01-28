let currentfloor = 0;
let currentposition =-1;
function revealsetting(){
    const validator = document.getElementById("settings-pane").hidden
    if(validator){
        document.getElementById("settings-pane").hidden = false;
        document.getElementById("inputs").hidden=true; 
        document.getElementById("keyboard").hidden=true;
    }
    else{
        document.getElementById("settings-pane").hidden=true;
        document.getElementById("inputs").hidden=false; 
        document.getElementById("keyboard").hidden=false;
    }
    
}

function input(callingelem){
    const letter= callingelem.textContent;
    const inputs = document.getElementById("inputs");
    for(let x =0; x< inputs.children[currentfloor].children.length;x++){
       if((inputs.children[currentfloor].children[x].value.trim() == "")){
        inputs.children[currentfloor].children[x].value = letter;
        currentposition =currentposition+1;
        console.log(currentposition)
        break;
        
       } 
    }

}

function deletebutt(){
    const inputs = document.getElementById("inputs");
    if(!(currentposition<0)){
    inputs.children[currentfloor].children[currentposition--].value="";
    console.log(currentposition)}
    
}

function enterbutt(){
    currentfloor++;
    
}