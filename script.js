
let currentfloor = 0;
let currentposition =-1;
let guess="";
let required =5;

function modwords(callingelem){
    let inputs = document.getElementById("inputs");
    const wlength = parseInt(callingelem.textContent);
    required = wlength;
    currentfloor = 0;
    currentposition =-1;
    guess="";
    inputs.innerHTML="";
    for(let x =0; x<6;x++){
        let newdiv = document.createElement('div');
        newdiv.className= 'row';
        inputs.appendChild(newdiv);
        for(let y =0; y<wlength;y++){
        let newcell = document.createElement('input')
        newcell.type = "text";
        newcell.className="cell";
        newcell.readOnly = "readonly";
        newdiv.appendChild(newcell);
        }
    }
}

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
    const inputs = document.getElementById("inputs");
    for(let x =0; x<required; x++){
    guess+= inputs.children[currentfloor].children[x].value;
    console.log(guess)
    }
    if(guess.length<required){
        alert("not enough words");
    }
    else{
    currentfloor++;
    }
    guess="";
   // currentfloor++;
}
