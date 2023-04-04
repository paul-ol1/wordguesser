//variables
let inputs = document.getElementById("inputs");
let base="";
let end="";
let guess="";
let att= false;
let indict;
let previoustxt="";
let allwordsentered=[];
// read the array of word into a personal array

let previous= inputs.children[1];
let currentfloor= inputs.children[2];
let currentposition =-1;

function validator(word, check) {
  if (
    word[0] != check[0] &&
    word[1] == check[1] &&
    word[2] == check[2] &&
    word[3] == check[3]
  ) {
    return true;
  }
  if (
    word[0] == check[0] &&
    word[1] != check[1] &&
    word[2] == check[2] &&
    word[3] == check[3]
  ) {
    return true;
  }
  if (
    word[0] == check[0] &&
    word[1] == check[1] &&
    word[2] != check[2] &&
    word[3] == check[3]
  ) {
    return true;
  }
  if (
    word[0] == check[0] &&
    word[1] == check[1] &&
    word[2] == check[2] &&
    word[3] != check[3]
  ) {
    return true;
  } else {
    return false;
  }
}

    function insertcontents(){
        fetch("/wordhuntwords")
          .then((response) => response.json()) // we are expecting a text response
            .then((data) => {
                base = ""+ data[0];
                previoustxt= base;
                end = ""+ data[1];
                for (let i = 0; i < 4; i++) {
                    inputs.children[0].children[i].value = base[i];
                    inputs.children[inputs.children.length-1].children[i].value = end[i];
                }
          });
          
    }

function input(callingelem){
    const letter= callingelem.textContent;
    for(let x =0; x< currentfloor.children.length;x++){
        /* go through the text box at the current level if the text box is
        empty inset the currently clicked letter*/
       if((currentfloor.children[x].value.trim() == "")){
        currentfloor.children[x].value = letter;
        currentposition =currentposition+1;
        // exit the loop when we reach the first empty boc
        break;
       } 
    }
}
    function deletebutt(){
    if(!(currentposition<0)){
    // the text input at the curr position gets deleted
    currentfloor.children[currentposition--].value="";
    }
}
function enterbutt(){
  guess = "";
  // concat the letters to get a user answer
  for (let x = 0; x < 4; x++) {
    guess += currentfloor.children[x].value;
  }
  // when the user enters less letters than the answer has
  if (guess.length < 4) {
    alert("not enough words");
  };
  if(guess==end){
    onwin();
  }
  if(guess!= end){
  let mybody = {
    attempt: guess,
  };
  fetch("/wordhuntattempt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }, // says that arguments are JSON formatted
    body: JSON.stringify(mybody), // POST puts arguments in the message body
  })
    .then((response) => response.json()) // we are expecting a text response
    .then((data) => {
         if ( !data) {
    alert("this word isn't in the dictionary");
  }
    if (data && !validator(guess, previoustxt)) {
      alert("you can't change more than a letter");
    }
      if (data && validator(guess, previoustxt)) {
    att = true;
    previous.hidden = false;
    allwordsentered.push(guess);
    for (let x = 0; x < 4; x++) {
      previous.children[x].value = guess[x];
      currentfloor.children[x].value = "";
    }
    currentposition = -1;
    previoustxt = guess;
  }
}

    );}}



    
function checkdict(){
   
}
    insertcontents();
    let first = inputs.children[0];
    let last = inputs.children[inputs.children.length - 1];
