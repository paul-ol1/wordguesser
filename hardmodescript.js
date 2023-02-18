let game_start_counter=0;
let curtime = document.getElementById('time');
let start;
function firstclick(){
game_start_counter++;
if(game_start_counter==1){
startstopwatch();
}

}
function startstopwatch(){
    start= 300000;
    let x;
    x=setInterval(elapse,1000);
}
function elapse(){
    start=start-1000;
    convertmillisec(start);

}
function convertmillisec(elem){
    let minutes = Math.floor(elem / 60000);
    let seconds = ((elem % 60000) / 1000).toFixed(0);
    let time = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    curtime.innerHTML="";
    curtime.textContent =time;
}
