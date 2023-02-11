let currentfloor = 0;
let currentposition =-1;
let guess="";
let required =5;
let darkmode = false;
let inputs = document.getElementById("inputs");
let body = document.querySelector('body');
let cellelem = document.getElementsByClassName('cell');
let buttons = document.querySelectorAll('button');
let header = document.getElementById('header');
let dmtoggle= document.getElementById("dark-mode");
let currentanswers= fivew;
let win_lose_pane= document.getElementById('win-lose');
let answer= "";
genwords();


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
    const wlength = parseInt(callingelem.textContent);

    switch(wlength){
        case 4:
            currentanswers= fourw;
            break;
        case 5:
            currentanswers= fivew;
            break;
        case 6:
            currentanswers= sixw;
            break;
        case 7:
            currentanswers= sevenw;
            break;
        case 8:
            currentanswers= eightw;
            break;
        case 9:
            currentanswers= ninew;
            break;
        case 10:
            currentanswers= tenw;
            break;
        
            default:
                console.log("base case");

    }

    required = wlength;
    deletecells();
    genwords();
    createcells();
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
    if(!(currentposition<0)){
    inputs.children[currentfloor].children[currentposition--].value="";
    console.log(currentposition)}
    
}
// it accepts the user entry
function enterbutt(){
    // concat the letters to get a user answer 
    for(let x =0; x<required; x++){
    guess+= inputs.children[currentfloor].children[x].value;
    }
    // convert the user answer to lowercase to compare to the predetermined answer 
    guess= guess.toLowerCase();
    // when the user enters less letters than the answer has
    if(guess.length<required){
        alert("not enough words");
    }
    // when the user's guess is correct
    if(guess.length== required && answer==guess){
        console.log("correct");
        for(let x =0; x< guess.length;x++){
                inputs.children[currentfloor].children[x].style.backgroundColor = "green";
                }
        onwin();
        
        
    }
    if(guess.length==required && answer!=guess){
        const guessarr = guess.split('');
        const ansarr = answer.split('');
        for(let x =0; x< guessarr.length;x++){
            //if a letter is in the answer 
            if(ansarr.includes(guessarr[x])){
                letter_in_answer_pos= ansarr.indexOf(guessarr[x]);
                ansarr[letter_in_answer_pos]='';
                if(x==letter_in_answer_pos){
                    inputs.children[currentfloor].children[x].style.backgroundColor = "green";
                }
                else{
                    inputs.children[currentfloor].children[x].style.backgroundColor = "yellow";
                }


            }
        }
        currentfloor++;
    }
    guess ="";
}

function genwords(){
    currentanswers= currentanswers.map(x=>x.toLowerCase());
    answer= currentanswers[Math.floor(Math.random() * currentanswers.length)];
    console.log(answer);
}

function deletecells(){
    currentfloor = 0;
    currentposition =-1;
    guess="";
    inputs.innerHTML="";
}
function createcells(){
        for(let x =0; x<6;x++){
        let newdiv = document.createElement('div');
        newdiv.className= 'row';
        inputs.appendChild(newdiv);
        for(let y =0; y<required;y++){
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
    darkmodeswitch();
       
}

function onwin(){
    document.getElementById("inputs").hidden=true; 
    document.getElementById("keyboard").hidden=true;
    win_lose_pane.hidden = false;
    let yw = document.createElement('h3');
    yw.textContent = "You win!!"
    let buttdivs = document.createElement('div');
    buttdivs.id="aftergame";
    let nextw = document.createElement('button');
    let giveup = document.createElement('button');
    nextw.id="next";
    nextw.textContent="Next Word";
    giveup.id="give-up";
    giveup.textContent="Give Up"
    buttdivs.appendChild(nextw);
    buttdivs.appendChild(giveup);
    win_lose_pane.appendChild(yw);
    win_lose_pane.appendChild(buttdivs);
    darkmodecheck();
    // whatever my way to calculate score is 
    /*
    deletecells();
    genwords();
    createcells();*/

}

