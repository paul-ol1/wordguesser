let norm = document.getElementById('n_choices');
let hard = document.getElementById('h_choices');
let start= document.createElement('p');
let scores = document.createElement('p');
start.textContent="Start";
scores.textContent="Scores";
let startlink=document.createElement('a');
let scorelink=document.createElement('a');
scorelink.appendChild(scores);
startlink.appendChild(start);
start.className="innerbutt";
scores.className="innerbutt";
function normresp(){
norm.innerHTML="";
hard.innerHTML="";
startlink.href="normalmode.html";
norm.appendChild(startlink);
norm.appendChild(scorelink);



}
function hardresp(){
norm.innerHTML="";
hard.innerHTML="";
startlink.href="wordmania.html";
hard.appendChild(startlink);
hard.appendChild(scorelink);
}
