//variables
let inputs = document.getElementById("inputs");
let base="";
let end="";
let guess="";
let attempt= false;
let previoustxt="";
// read the array of word into a personal array
let words = fourw;
let previous= inputs.children[1];
let currentfloor= inputs.children[2];
let currentposition =-1;
let allpossibilities = [];
// convert each word to uppercase
words.map(x=> {

    let y=words.indexOf(x);
    words[y]=x.toUpperCase();
})

/*
create an array of words 
*/
let newwords=[];
for(let i =0;i<words.length;i++){
    newwords[i]={
        word:words[i],
        next:[]
    }
    
    let currword= newwords[i].word;
    for(let y=0;y<words.length;y++){
        if(currword[0]!=words[y][0]&& currword[1]==words[y][1] && currword[2]==words[y][2]&& currword[3]==words[y][3]){
            newwords[i].next.push(words[y]);
        }
        if(currword[0]==words[y][0]&& currword[1]!=words[y][1] && currword[2]==words[y][2]&& currword[3]==words[y][3]){
            newwords[i].next.push(words[y]);
        }
        if(currword[0]==words[y][0]&& currword[1]==words[y][1] && currword[2]!=words[y][2]&& currword[3]==words[y][3]){
            newwords[i].next.push(words[y]);
        }
        if(currword[0]==words[y][0]&& currword[1]==words[y][1] && currword[2]==words[y][2]&& currword[3]!=words[y][3]){
            newwords[i].next.push(words[y]);
        }
    }
}
function validator(word,check){
    if(word[0]!=check[0] && word[1]==check[1] && word[2]==check[2] && word[3]==check[3]){
        return true;
    }
    if(word[0]==check[0] && word[1]!=check[1] && word[2]==check[2] && word[3]==check[3]){
        return true;
    }
    if(word[0]==check[0] && word[1]==check[1] && word[2]!=check[2] && word[3]==check[3]){
        return true;
    }
    if(word[0]==check[0] && word[1]==check[1] && word[2]==check[2] && word[3]!=check[3]){
        return true;
    }
    else{
        return false;
    }
}
function selectwords(){
base= Math.floor(Math.random()*words.length);
base= words[base];

for(let x =0; x< newwords.length;x++){
    if(newwords[x].word==base){
        allpossibilities.push(newwords[x].word);
        newwords[x].next.map(y=>allpossibilities.push(y));
    }
}

/*allpossibilities.map(y=>{
        newwords.map(z=>{
            if(y==z.word){
                z.next.map(w=>{
                    if(!allpossibilities.includes(w)){
                        allpossibilities.push(w)
                    }
                })
            }
        })
    })

*/
for(let x=0;x< allpossibilities.length;x++){
        newwords.map(z=>{
            if(allpossibilities[x]==z.word){
                z.next.map(w=>{
                    if(!allpossibilities.includes(w)){
                        allpossibilities.push(w)
                    }
                })
            }
        })
    
}

end = allpossibilities[Math.floor(Math.random()*allpossibilities.length)];
previoustxt=base;

/* for(let y=0;y<newwords[words].next.length;y++){
            allpossibilities.push()
        }

//for(let words =0;words<allpossibilities.length;words++)
/*
let allpossibilities = [];
for(let i =0;i<words.length;i++){
    let currentword = words[i];
    let arr = [];
    arr.push(currentword);
    for(let z =0; z<newwords.length;z++){
        if(newwords[z].word== currentword){
            arr= arr.concat(newwords[z].next);
            break;
        }
    }
    allpossibilities.push(arr);
    
}
for(let i=0;i<allpossibilities.length;i++){
    for(let a =1;a<allpossibilities[i].length;a++){
        for(let y =0; y<newwords.length;y++){
            if(newwords[y].word== allpossibilities[i][a]){
                for(let b =0;b<newwords[y].next.length;b++){
                    if(!allpossibilities[i].includes(newwords[y].next[b])){
                        allpossibilities[i].push(newwords[y].next[b]);
                    }
                }
            break;
        }
    }
    }}
console.log(allpossibilities);*/}

    function insertcontents(){
    let first = inputs.children[0];
    let last=inputs.children[inputs.children.length-1];
    for(let x =0;x<base.length;x++){
        first.children[x].value= base[x];
    } 
    for(let x =0;x<end.length;x++){
        last.children[x].value= end[x];
    }
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
    
    guess="";
    // concat the letters to get a user answer 
    for(let x =0; x<4; x++){
    guess+= currentfloor.children[x].value;
    }
    console.log(guess);
    // when the user enters less letters than the answer has
    if(guess.length<4){
        alert("not enough words");
    }
    if(!words.includes(guess)){
        alert("this word isn't in the dictionary")
    }
    if(words.includes(guess) && !validator(guess,previoustxt)){
        alert("you can't change more than a letter")}
        
    if(words.includes(guess) && validator(guess,previoustxt)){
        attempt=true;
        previous.sn=false;
        for(let x =0;x<4;x++){
            previous.children[x].value=guess[x];
            currentfloor.children[x].value="";
        }
        currentposition=-1;
        previoustxt=guess;
    }
    }

    
    selectwords();
    insertcontents();