var currentSeq = [];
var correctSeq = [];
var totalScore = 0;
var gameSpeed = 70;
var score = document.querySelector('.score-label');
    
correctSeqAddBtn();
playSeqAnim();

function correctSeqAddBtn() {
    randNum = Math.ceil(Math.random() * 8);
    correctSeq = [...correctSeq, `btn${randNum}`];
}

function currentSeqAddBtn(btnID) {
    newSeq = [...currentSeq, btnID];
    currentSeq = newSeq;
}

function playSeqAnim() {
    correctSeq.forEach(function(btnID, index) {
        setTimeout(async function(){
            let button = document.getElementById(btnID);
            button.classList.add('grid-btn-anim');
            await sleep(gameSpeed*10);
            button.classList.remove('grid-btn-anim');
            await sleep(100);
        }, index * ((gameSpeed*10)+100));
    });
}

function nextSeq() {
    currentSeq = [];
    correctSeqAddBtn();
    playSeqAnim();
}

function btnClick(btnID) {
    let button = document.getElementById(btnID);
    if(button.id.includes('btn')) {
        currentSeqAddBtn(button.id);
        checkSequence();
    } else if (button.id.match('replay-seq')){
        playSeqAnim();
    } else {
        newGame();
    }
    
}

function newGame() {
    currentSeq = [];
    correctSeq = [];
    totalScore = 0;
    score.textContent = `Score: ${totalScore}`
    correctSeqAddBtn();
    playSeqAnim();
    enableDisableButtons(true);
}

function gameLost() {
    enableDisableButtons(false);
    confirm(`Sorry, you lost!\nYour total score was: ${totalScore}\nClick 'New Game' to play again!`)
}

function enableDisableButtons(val) { // true for enabled; false for disabled
    if(val){
        document.querySelectorAll('.grid-btn').forEach(btn => {
            btn.removeAttribute('disabled');
        });
    } else {
        document.querySelectorAll('.grid-btn').forEach(btn => {
            btn.setAttribute('disabled', 'disabled');
        });
    }
}

function checkSequence() {
    currentSeq.forEach((btnID, index) => {
        if(!btnID.match(correctSeq[index])){
            gameLost();
            return;
        } else if(currentSeq.length == correctSeq.length && index == currentSeq.length-1) {
            totalScore++;
            score.textContent = `Score: ${totalScore}`
            nextSeq();
            return;
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
