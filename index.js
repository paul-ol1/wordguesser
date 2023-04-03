const express = require("express"); //Set up the express module
const app = express();
const port = 8000;

const path = require('path') // bring in the path module to help locate files
let allwords=[];
let wordlew="";
let wordhuntw="";
let wordmaniaw="";
// Read the word list into memory
const fs = require('fs');
let wordlist = [];
fs.readFile(path.join(__dirname, '5l_words.txt'), 'utf8', function (err, data) {
    wordlist = data.toUpperCase().split('\n');
});



// Return Homepage
app.get('/', function (req, res) {
    pickwords();
    res.sendFile(path.join(__dirname, 'homepage.html'));  // res.sendFile sends the contents of a file
});
app.get("/wordle", function (req, res) {
  res.sendFile(path.join(__dirname, "wordle.html")); // res.sendFile sends the contents of a file
});
app.get("/wordhunt", function (req, res) {
  res.sendFile(path.join(__dirname, "wordhunt.html")); // res.sendFile sends the contents of a file
});
app.get("/wordmania", function (req, res) {
  res.sendFile(path.join(__dirname, "wordmania.html")); // res.sendFile sends the contents of a file
});

const bodyParser = require('body-parser'); // this pulls in body-parser
app.use(bodyParser.json());  // this tells the server to look for JSON requests

app.post("/wordleattempt", function (req, res) {
    let guess = req.body.attempt; 
    res.json(validator(wordlew,guess));
});
// return jpg images, html, css, and js files
app.get(
  ["/*.jpg", "/*.png", "/*.css", "/*.html", "/*.js", "/*.jpeg"],
  function (req, res) {
    res.sendFile(path.join(__dirname, req.path));
  }
);



function pickwords(){
wordlew= wordlist[Math.floor(Math.random()* wordlist.length)];
allwords.push(wordlew);
wordhuntw = wordlist[Math.floor(Math.random() * wordlist.length)];
wordmaniaw = wordlist[Math.floor(Math.random() * wordlist.length)];
while((allwords.includes(wordhuntw))){
    wordhuntw = wordlist[Math.floor(Math.random() * wordlist.length)];
}
while (allwords.includes(wordmaniaw)) {
  wordmaniaw = wordlist[Math.floor(Math.random() * wordlist.length)];
}
}
function validator(answer,guess){
    if(!wordlist.includes(guess)){
        return "ni";
    }
    else{
        if(answer==guess){
            return "c";
        }
        else{
        const guessarr = guess.split("");
        const ansarr = answer.split("");
        let resp = [];
        let letter_pos=0;
        for (let x = 0; x < guessarr.length; x++) {
            
          //if a letter is in the answer
            if (ansarr.includes(guessarr[x])) {
                letter_pos = ansarr.indexOf(guessarr[x]);
                ansarr[letter_pos] = "";
                if (x == letter_pos) {
                    resp.push([guessarr[x],"g"]);
            }   
                else {
                    resp.push([guessarr[x], "y"]);
            }
          }
          else{
            resp.push([guessarr[x], "n"]);
          }
        }

        return resp;
        }
        
    }
    

}
// Start listening for requests on the designated port
app.listen(port, function () {
    console.log("App server is running on port", port);
    console.log("to end press Ctrl + C");
});