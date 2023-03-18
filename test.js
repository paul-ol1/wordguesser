
let x = fourw;
let newwords=[];
for(let i =0;i<x.length;i++){
    newwords[i]={
        word:x[i],
        next:[]
    }
    let currword= newwords[i].word;
    for(let y=0;y<x.length;y++){
        if(currword[0]!=x[y][0]&& currword[1]==x[y][1] && currword[2]==x[y][2]&& currword[3]==x[y][3]){
            newwords[i].next.push(x[y]);
        }
        if(currword[0]==x[y][0]&& currword[1]!=x[y][1] && currword[2]==x[y][2]&& currword[3]==x[y][3]){
            newwords[i].next.push(x[y]);
        }
        if(currword[0]==x[y][0]&& currword[1]==x[y][1] && currword[2]!=x[y][2]&& currword[3]==x[y][3]){
            newwords[i].next.push(x[y]);
        }
        if(currword[0]==x[y][0]&& currword[1]==x[y][1] && currword[2]==x[y][2]&& currword[3]!=x[y][3]){
            newwords[i].next.push(x[y]);
        }
    }
}

let allpossibilities = [];
for(let i =0;i<x.length;i++){
    let currentword = x[i];
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
    console.log(allpossibilities);