
let currentfloor = 0;
let currentposition =-1;
let guess="";
let required =5;
let darkmode = false;
let body = document.querySelector('body');
let cellelem = document.getElementsByClassName('cell');
let buttons = document.querySelectorAll('button');
let header = document.getElementById('header');
let dmtoggle= document.getElementById("dark-mode");

//function to switch to darkmode
function darkmodeswitch(){
    // when the dark mode toggle is on
    if(dmtoggle.checked==true){
        body.style.backgroundColor="#0f172a";
        body.style.color = "white";
        header.style.borderBottom= "solid white 0.1px";
        for (let i = 0; i < cellelem.length; i++) {
	        cellelem[i].style.backgroundColor = "#475569";
            cellelem[i].style.color = "white";}
            
        for (let i = 0; i < buttons.length; i++) {
	        buttons[i].style.backgroundColor = "#475569";
            buttons[i].style.color = "white";}    

    }
        //when darkmode toggle is not on
            if(!dmtoggle.checked){
        body.style.backgroundColor="white";
        body.style.color = "black";
        header.style.borderBottom= "solid black 0.1px";
        for (let i = 0; i < cellelem.length; i++) {
	        cellelem[i].style.backgroundColor = "#e7ebf1";
            cellelem[i].style.color = "black";}
            
        for (let i = 0; i < buttons.length; i++) {
	        buttons[i].style.backgroundColor = "#e7ebf1";
            buttons[i].style.color = "black";} }
}

// function to modify amount of letter in words according to user 
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
        newcell.style.width= "50px";
        newcell.style.height= "50px";
        newcell.style.marginright= "3px";
        newcell.style.marginbottom= "10px";
        newcell.style.border= "none";
        newcell.style.backgroundcolor= "#e7ebf1";
        newcell.style.textalign= "center";
        newcell.style.color= "black";
        newcell.style.fontsize= "1.5rem";
        newcell.style.borderradius= "7px";
        }
    }
    /* when the user modifies the amount lf word they want the css does not apply
     to the newly inserted or removed cells so this helps control that */
    //if darkmode was switched on
        if(dmtoggle.checked){
        body.style.backgroundColor="#0f172a";
        body.style.color = "white";
        header.style.borderBottom= "solid white 0.1px";
        for (let i = 0; i < cellelem.length; i++) {
	        cellelem[i].style.backgroundColor = "#475569";
            cellelem[i].style.color = "white";}
            
        for (let i = 0; i < buttons.length; i++) {
	        buttons[i].style.backgroundColor = "#475569";
            buttons[i].style.color = "white";}        
    }
    //if it was on light mode
            if(!dmtoggle.checked){
        body.style.backgroundColor="white";
        body.style.color = "black";
        header.style.borderBottom= "solid black 0.1px";
        for (let i = 0; i < cellelem.length; i++) {
	        cellelem[i].style.backgroundColor = "#e7ebf1";
            cellelem[i].style.color = "black";}
            
        for (let i = 0; i < buttons.length; i++) {
	        buttons[i].style.backgroundColor = "#e7ebf1";
            buttons[i].style.color = "black";}        
    }

    
}

// reveal settings to the user by hiding the keyboard and cells and revealing the settings
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
// cells: show the input of the user by accepting the letter in the button pressed by user
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
// backspace: it deletes the text content of the last unempty cell
function deletebutt(){
    const inputs = document.getElementById("inputs");
    if(!(currentposition<0)){
    inputs.children[currentfloor].children[currentposition--].value="";
    console.log(currentposition)}
    
}
// it accepts the user entry
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
    currentposition=-1;
    }
    guess="";
   // currentfloor++;
}
