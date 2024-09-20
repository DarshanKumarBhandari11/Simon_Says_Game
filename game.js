let gameSeq = [];
let userSeq = [];
let score = [];
let started = false;
let level = 0;

let body = document.querySelector("body");
let info = document.querySelector("h2");
let highestScore = document.querySelector("h3");
let btns = ["red", "yellow", "green", "purple"];
let allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
let startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", function(){
    if(started == false){
        started = true;
        levelUp();
    }
    startBtn.innerText = "Ongoing...";
    startBtn.style.backgroundColor = "rgb(148, 144, 255)";
    startBtn.style.color = "white";
});

function levelUp(){
    userSeq = [];
    level++;
    info.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 500);
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkSeq(userSeq.length - 1);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 150);
}

function checkSeq(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 500);
        }
    }
    else{
        info.innerHTML = `Game Over !<br>Your score is ${level}.<br>Press "START" to start the game.`;
        score.push(level);
        let highscore = Math.max(...score);
        highestScore.innerHTML = `Highest score: ${highscore}`;
        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "rgb(203, 225, 245)";
        }, 150);
        reset();
        startBtn.innerText = "START";
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}