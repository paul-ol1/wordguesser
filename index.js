const express = require("express"); //Set up the express module
const app = express();
const port = 8000;

const path = require("path"); // bring in the path module to help locate files
let allwordlist = [];
let allpossibilities = [];
let wordlibrary = [];
let wordlew = "";
let wordhuntw = "";
let wordhuntwords= [];
let wordmaniaw = "";
// Read the word list into memory
const fs = require("fs");
let fivelwordlist = [];
fs.readFile(path.join(__dirname, "5l_words.txt"), "utf8", function (err, data) {
    fivelwordlist = data.toUpperCase().split("\n");
});
let fourlwordlist = [];
fs.readFile(path.join(__dirname, "4l_words.txt"), "utf8", function (err, data) {
    fourlwordlist = data.toUpperCase().split("\n");
});

// Return Homepage
app.get("/", function (req, res) {
    pickwords();
  res.sendFile(path.join(__dirname, "homepage.html")); // res.sendFile sends the contents of a file
});
app.get("/wordle", function (req, res) {
  res.sendFile(path.join(__dirname, "wordle.html")); // res.sendFile sends the contents of a file
});
app.get("/wordhunt", function (req, res) {
  res.sendFile(path.join(__dirname, "wordhunt.html")); // res.sendFile sends the contents of a file
});

app.get("/wordhuntwords", function (req, res) {
    findallnextwords();
    endword();
    res.send(wordhuntwords);
})

app.get("/wordmania", function (req, res) {
  res.sendFile(path.join(__dirname, "wordmania.html")); // res.sendFile sends the contents of a file
});

const bodyParser = require("body-parser"); // this pulls in body-parser
const { all } = require("proxy-addr");
app.use(bodyParser.json()); // this tells the server to look for JSON requests

app.post("/wordleattempt", function (req, res) {
  let guess = req.body.attempt;
  res.json(validator(wordlew, guess));
});
app.post("/wordhuntattempt", function (req, res) {
  let guess = req.body.attempt;
  res.json(fourlwordlist.includes(guess));
});

// return jpg images, html, css, and js files
app.get(
  ["/*.jpg", "/*.png", "/*.css", "/*.html", "/*.js", "/*.jpeg"],
  function (req, res) {
    res.sendFile(path.join(__dirname, req.path));
  }
);

function pickwords() {
    if(allwordlist.length<3){
  wordlew = fivelwordlist[Math.floor(Math.random() * fivelwordlist.length)];
  allwordlist.push(wordlew);
  wordhuntw = fourlwordlist[Math.floor(Math.random() * fourlwordlist.length)];
  allwordlist.push(wordhuntw);
  wordhuntwords.push(wordhuntw);
  wordmaniaw = fivelwordlist[Math.floor(Math.random() * fivelwordlist.length)];
  while (allwordlist.includes(wordmaniaw)) {
    wordmaniaw =
      fivelwordlist[Math.floor(Math.random() * fivelwordlist.length)];
  }
  allwordlist.push(wordmaniaw);}
}
function validator(answer, guess) {
  if (!fivelwordlist.includes(guess)) {
    return "ni";
  } else {
    if (answer == guess) {
      return "c";
    } else {
      const guessarr = guess.split("");
      const ansarr = answer.split("");
      let resp = [];
      let letter_pos = 0;
      for (let x = 0; x < guessarr.length; x++) {
        //if a letter is in the answer
        if (ansarr.includes(guessarr[x])) {
          letter_pos = ansarr.indexOf(guessarr[x]);
          ansarr[letter_pos] = "";
          if (x == letter_pos) {
            resp.push([guessarr[x], "g"]);
          } else {
            resp.push([guessarr[x], "y"]);
          }
        } else {
          resp.push([guessarr[x], "n"]);
        }
      }

      return resp;
    }
  }
}

function endword() {
  allpossibilities.push(wordhuntw);
  for (let x = 0; x < allpossibilities.length; x++) {
    wordlibrary.map((z) => {
      if (allpossibilities[x] == z.word) {
        z.next.map((w) => {
          if (!allpossibilities.includes(w)) {
            allpossibilities.push(w);
          }
        });
      }
    });
  }
  let end = allpossibilities[Math.floor(Math.random()* allpossibilities.length)];
  while(oneLettercheck(wordhuntw,end)){
    end = allpossibilities[Math.floor(Math.random() * allpossibilities.length)];
  }
  while(end == wordhuntw){
    end = allpossibilities[Math.floor(Math.random() * allpossibilities.length)];
  }
  if(wordhuntwords.length<2){
  wordhuntwords.push(end);}
}

function findallnextwords() {
  for (let i = 0; i < fourlwordlist.length; i++) {
    wordlibrary[i] = {
      word: fourlwordlist[i],
      next: [],
    };

    let currword = wordlibrary[i].word;
    for (let y = 0; y < fourlwordlist.length; y++) {
      if (
        currword[0] != fourlwordlist[y][0] &&
        currword[1] == fourlwordlist[y][1] &&
        currword[2] == fourlwordlist[y][2] &&
        currword[3] == fourlwordlist[y][3]
      ) {
        wordlibrary[i].next.push(fourlwordlist[y]);
      }
      if (
        currword[0] == fourlwordlist[y][0] &&
        currword[1] != fourlwordlist[y][1] &&
        currword[2] == fourlwordlist[y][2] &&
        currword[3] == fourlwordlist[y][3]
      ) {
        wordlibrary[i].next.push(fourlwordlist[y]);
      }
      if (
        currword[0] == fourlwordlist[y][0] &&
        currword[1] == fourlwordlist[y][1] &&
        currword[2] != fourlwordlist[y][2] &&
        currword[3] == fourlwordlist[y][3]
      ) {
        wordlibrary[i].next.push(fourlwordlist[y]);
      }
      if (
        currword[0] == fourlwordlist[y][0] &&
        currword[1] == fourlwordlist[y][1] &&
        currword[2] == fourlwordlist[y][2] &&
        currword[3] != fourlwordlist[y][3]
      )
         {
          wordlibrary[i].next.push(fourlwordlist[y]);
        }
    }
  }
}

function oneLettercheck(ref, word){
    if(ref[0]!=word[0] && ref[1]==word[1] && ref[2]==word[2] && ref[3]==word[3]){
        return true;
    }
    else if(ref[0]==word[0] && ref[1]!=word[1] && ref[2]==word[2] && ref[3]==word[3]){
        return true;
    }
    else if(ref[0]==word[0] && ref[1]==word[1] && ref[2]!=word[2] && ref[3]==word[3]){
        return true;
    }
    else if(ref[0]==word[0] && ref[1]==word[1] && ref[2]==word[2] && ref[3]!=word[3]){
        return true;
    }
    else{
        return false;
    }
}
// Start listening for requests on the designated port
app.listen(port, function () {
  console.log("App server is running on port", port);
  console.log("to end press Ctrl + C");
});
