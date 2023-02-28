let currentfloor = 0;
let currentposition =-1;
let guess="";
let required =5;
let usedwords= [];
let darkmode = false;
let inputs = document.getElementById("inputs");
let body = document.querySelector('body');
let cellelem = document.getElementsByClassName('cell');
let buttons = document.querySelectorAll('button');
let header = document.getElementById('header');
let dmtoggle= document.getElementById("dark-mode");
let currentanswers= fivew;
let win_lose_pane= document.getElementById('win_lose');
let answer= "";
let timer = document.getElementById('time');
let game_start_counter=0;
let start= 300000;
let timeint;
let newg = true;
let settings = document.getElementById("settings");
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
    // restart game with everything reset to current parameters
    restartgamehardmode();


}

// reveal settings to the user by hiding the keyboard and cells and revealing the settings
function revealsettinghm(){
    const validator = document.getElementById("settings-pane").hidden;
    if(validator){
        // if its on pause clear the timer
        clearInterval(timeint);
        timeint = null;
        // hide the contents and unhide settings
        timer.hidden=true;
        document.getElementById("settings-pane").hidden = false;
        document.getElementById("inputs").hidden=true; 
        document.getElementById("keyboard").hidden=true;
        //timer.hidden=true;
    }
    else{
        if(!newg){
            // if its a game paused or restarted 
            // if it was paused just continue the timer from the old parameters
        startstopwatch()}
        timer.hidden=false;
        document.getElementById("settings-pane").hidden=true;
        document.getElementById("inputs").hidden=false; 
        document.getElementById("keyboard").hidden=false;
    }
    
}
// cells: show the input of the user by accepting the letter in the button pressed by user
function input(callingelem){
    const letter= callingelem.textContent;
    for(let x =0; x< inputs.children[currentfloor].children.length;x++){
        /* go through the text box at the current level if the text box is
        empty inset the currently clicked letter*/
       if((inputs.children[currentfloor].children[x].value.trim() == "")){
        inputs.children[currentfloor].children[x].value = letter;
        currentposition =currentposition+1;
        // exit the loop when we reach the first empty boc
        break;
       } 
    }

}
// backspace: it deletes the text content of the last unempty cell
function deletebutt(){
    if(!(currentposition<0)){
    // the text input at the curr position gets deleted
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
    if(guess.length== required && !currentanswers.includes(guess)){
        alert("not a real word");
    }
    if(guess.length== required && currentanswers.includes(guess)){
    // when the user's guess is directly correct
        if(guess.length== required && answer==guess){
            console.log("correct");
            for(let x =0; x< guess.length;x++){
                let currentinputbox = inputs.children[currentfloor].children[x];
                currentinputbox.style.backgroundColor = "green";
                currentinputbox.style.transition="background-color 2s ease-out";

                }
            setTimeout(onwin,5000);
            }
        if(guess.length==required && answer!=guess && currentfloor==5){
            onlose();
        }
        // when the required length is reached but the users guess isn't directly correct
        if(guess.length==required && answer!=guess){
            //split the guess into an arr and the answer in another then compare each letter one by one  
            const guessarr = guess.split('');
            const ansarr = answer.split('');
            for(let x =0; x< guessarr.length;x++){
                //if a letter is in the answer 
                let currentinputbox = inputs.children[currentfloor].children[x];
                if(ansarr.includes(guessarr[x])){
                    letter_in_answer_pos= ansarr.indexOf(guessarr[x]);
                    ansarr[letter_in_answer_pos]='';
                    if(x==letter_in_answer_pos){
                        currentinputbox.style.backgroundColor = "green";
                        currentinputbox.style.transition="background-color 2s ease-out";
                    }
                    else{
                        currentinputbox.style.backgroundColor = "yellow";
                        currentinputbox.style.transition="background-color 2s ease-out";
                    }


                }
            }
        currentfloor++;
        currentposition=-1;
        }
    }
    guess ="";
}
// generate a new word
function genwords(){
    currentanswers= currentanswers.map(x=>x.toLowerCase());
    answer= currentanswers[Math.floor(Math.random() * currentanswers.length)];
    while(usedwords.includes(answer)){
        answer= currentanswers[Math.floor(Math.random() * currentanswers.length)];
    };
    usedwords.push(answer);
    console.log(answer);
}
// delete all the cells 
function deletecells(){
    win_lose_pane.style.display = "none";
    currentfloor = 0;
    currentposition =-1;
    guess="";
    inputs.innerHTML="";
}
// create new cells 
function createcells(){
        document.getElementById("inputs").hidden=false; 
        document.getElementById("keyboard").hidden=false;
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
        newcell.style.fontFamily="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        }
    }
    //check of darkmode is on
    darkmodeswitch();
       
}

function onwin(){
    lower.innerHTML="";
    document.getElementById("inputs").hidden=true; 
    document.getElementById("keyboard").hidden=true;
    win_lose_pane.style.display = "flex";
    let yw = document.createElement('h2');
    yw.textContent = "You Win!!";
    yw.style.textAlign="center";
    yw.style.marginBottom= "100px"
    let buttdivs = document.createElement('div');
    buttdivs.id="aftergame";
    let nextw = document.createElement('button');
    let giveup = document.createElement('button');
    nextw.id="next";
    nextw.style.width="90px";
    nextw.style.height="30px";
    nextw.style.margin="10px"
    nextw.textContent="Next Word";
    giveup.id="give-up";
    giveup.textContent="Give Up"
    giveup.style.width="90px";
    giveup.style.height="30px";
    buttdivs.style.width= "200px";
    buttdivs.appendChild(nextw);
    buttdivs.appendChild(giveup);
    lower.appendChild(yw);
    lower.appendChild(buttdivs);
    nextw.addEventListener("click",restartgame);
    buttdivs.style.position="absolute";
    buttdivs.style.display="inline";
    buttdivs.style.right= "calc(50% - 100px)";
}
function onlose(){
    document.getElementById("inputs").hidden=true; 
    document.getElementById("keyboard").hidden=true;
    win_lose_pane.style.display = "flex";
    let yl = document.createElement('h2');
    yl.textContent = "You Lose...";
    yl.style.textAlign="center";
    yl.style.marginBottom= "100px"
    let buttdivs = document.createElement('div');
    buttdivs.id="aftergame";
    let trya = document.createElement('button');
    let giveup = document.createElement('button');
    trya.id="trya";
    trya.style.width="90px";
    trya.style.height="30px";
    trya.style.margin="10px"
    trya.textContent="restart";
    giveup.id="giveup";
    giveup.textContent="Give Up"
    giveup.style.width="90px";
    giveup.style.height="30px";
    buttdivs.style.width= "200px";
    buttdivs.appendChild(trya);
    buttdivs.appendChild(giveup);
    lower.appendChild(yl);
    lower.appendChild(buttdivs);
    buttdivs.style.position="absolute";
    buttdivs.style.display="inline";
    buttdivs.style.right= "calc(50% - 100px)";
}



function firstclick(){
newg=false;
game_start_counter++;
if(game_start_counter==1){
startstopwatch();
}

}
function startstopwatch(){
    timeint=setInterval(elapse,1000);
}
function elapse(){
    start=start-1000;
    convertmillisec(start);

}
function convertmillisec(elem){
    let minutes = Math.floor(elem / 60000);
    let seconds = ((elem % 60000) / 1000).toFixed(0);
    let time = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    timer.innerHTML="";
    timer.textContent =time;
}
function restartgamehardmode(){
    document.getElementById("settings-pane").hidden=true;
    deletecells();
    genwords();
    createcells();
    // clear current timer
    clearInterval(timeint);
    timeint = null;
    start= 300000;
    convertmillisec(start);
    newg=true;
    game_start_counter=0;
}


