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
