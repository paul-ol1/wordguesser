let currentfloor = 0;
let currentposition = -1;
let guess = "";
let required = 5;
let usedwords = [];
let darkmode = false;
let inputs = document.getElementById("inputs");
let body = document.querySelector("body");
let cellelem = document.getElementsByClassName("cell");
let buttons = document.querySelectorAll("button");
let header = document.getElementById("header");
let dmtoggle = document.getElementById("dark-mode");
let win_lose_pane = document.getElementById("win_lose");
let answer = "";
let timer = document.getElementById("time");
let game_start_counter = 0;
let start = 300000;
let timeint;
let newg = true;
let settings = document.getElementById("settings");

createcells();

//function to switch to darkmode
function darkmodeswitch() {
  // when the dark mode toggle is on
if (dmtoggle.checked == true) {
    body.style.backgroundColor = "#0f172a";
    body.style.color = "white";
    header.style.borderBottom = "solid white 0.1px";
    for (let i = 0; i < cellelem.length; i++) {
        cellelem[i].style.backgroundColor = "#475569";
        cellelem[i].style.color = "white";
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "#475569";
        buttons[i].style.color = "white";
    }
}
  //when darkmode toggle is not on
if (!dmtoggle.checked) {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    header.style.borderBottom = "solid black 0.1px";
    for (let i = 0; i < cellelem.length; i++) {
        cellelem[i].style.backgroundColor = "#e7ebf1";
        cellelem[i].style.color = "black";
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "#e7ebf1";
        buttons[i].style.color = "black";
    }
    }
}

// cells: show the input of the user by accepting the letter in the button pressed by user
function input(callingelem) {
    const letter = callingelem.textContent;
    for (let x = 0; x < inputs.children[currentfloor].children.length; x++) {
    /* go through the text box at the current level if the text box is
        empty inset the currently clicked letter*/
    if (inputs.children[currentfloor].children[x].value.trim() == "") {
        inputs.children[currentfloor].children[x].value = letter;
        currentposition = currentposition + 1;
      // exit the loop when we reach the first empty boc
        break;
    }
}
}
// backspace: it deletes the text content of the last unempty cell
function deletebutt() {
    if (!(currentposition < 0)) {
    // the text input at the curr position gets deleted
    inputs.children[currentfloor].children[currentposition--].value = "";
    console.log(currentposition);
    }
}
// it accepts the user entry
function enterbutt() {
    guess = "";
  // concat the letters to get a user answer
    for (let x = 0; x < required; x++) {
    guess += inputs.children[currentfloor].children[x].value;
    }

  // when the user enters less letters than the answer has
    if (guess.length < required) {
    alert("not enough words");
    } else {
    let mybody = {
        attempt: guess,
    };
    fetch("/wordleattempt", { method: "POST", headers: {
        "Content-Type": "application/json",}, // says that arguments are JSON formatted
     body: JSON.stringify(mybody), // POST puts arguments in the message body
    })
      .then((response) => response.json()) // we are expecting a text response
        .then((data) => {
            attempt(data);
            console.log(data);
        });
    }
}

// delete all the cells
function deletecells() {
    win_lose_pane.style.display = "none";
    currentfloor = 0;
    currentposition = -1;
    guess = "";
    inputs.innerHTML = "";
}
// create new cells
function createcells() {
    for (let x = 0; x < 6; x++) {
        let newdiv = document.createElement("div");
        newdiv.className = "row";
        inputs.appendChild(newdiv);
        for (let y = 0; y < required; y++) {
        let newcell = document.createElement("input");
        newcell.type = "text";
        newcell.className = "cell";
        newcell.readOnly = "readonly";
        newdiv.appendChild(newcell);
        newcell.style.width = "50px";
        newcell.style.height = "50px";
        newcell.style.marginRight = "6px";
        newcell.style.marginBottom = "10px";
        newcell.style.border = "none";
        newcell.style.backgroundColor = "#e7ebf1";
        newcell.style.textAlign = "center";
        newcell.style.color = "black";
        newcell.style.fontSize = "1.5rem";
        newcell.style.borderRadius = "7px";
        newcell.style.fontFamily = "font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    }
    }
  //check of darkmode is on
    darkmodeswitch();
}

function onwin() {}
function onlose() {}

function restartgame() {
    document.getElementById("settings-pane").hidden = true;
    deletecells();
    genwords();
    createcells();
}

function attempt(resp) {
    if (resp == "ni") {
    alert("this word is not in the dictionary");
    } 
    else {
        if (resp == "c") {
        for (let x = 0; x < 5; x++) {
            let currentinputbox = inputs.children[currentfloor].children[x];
            currentinputbox.style.backgroundColor = "green";
            currentinputbox.style.transition = "background-color 2s ease-out";
        }

        setTimeout(onwin, 5000);
        } else {
        for (let x = 0; x < resp.length; x++) {
            if (resp[x][1] == "g") {
            let currentinputbox = inputs.children[currentfloor].children[x];
            currentinputbox.style.backgroundColor = "green";
            currentinputbox.style.transition = "background-color 2s ease-out";
            }
            if (resp[x][1] == "y") {
            let currentinputbox = inputs.children[currentfloor].children[x];
            currentinputbox.style.backgroundColor = "yellow";
            currentinputbox.style.transition = "background-color 2s ease-out";
            }
        }
        currentfloor++;
        currentposition = -1;
        }
    }
}
