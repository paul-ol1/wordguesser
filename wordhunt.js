//variables
let inputs = document.getElementById("inputs");
let base;
let end;
// read the array of word into a personal array
let words = fourw;
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
function selectwords(){
base= Math.floor(Math.random()*words.length);
base= words[base];
let allpossibilities = [];
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
    
    selectwords();
    insertcontents();