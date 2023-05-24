// document.getElementById("app").innerHTML = ``;

var ball = document.getElementById("ball");
var scale1 = document.getElementById("Scale1");
var scale2 = document.getElementById("Scale2");
var rule = document.getElementById("rule");

//audio section start here
function sound(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    };
    this.stop = function() {
        this.sound.pause();
    };
}
//sound when open and start
var audio = new sound("background.mp3");
//sound when ball touch the scale
var touch = new sound("hit.wav");
//sound when ball fall ohh noo! sound
var no = new sound("no.wav");
//audio section ends here.

//game control section start here
const storeName = 'PPName';
const storeScore = 'PPMaxScore';
const scale1Name = 'scale 1';
const scale2Name = 'Scale 2';

let score,
maxscore,
movement,
scale,
ballSpeedX = 2,
ballSpeedY = 2;

let gameOn = false;

let windowWidth = window.innerHeight,
windowHeight = window.innerHeight;
(function() {
  scale = localStorage.getItem(storeName);
  maxscore = localStorage.getItem(storeScore);

  if(scale == null || maxscore == null) {
    alert("This is your first time you are playing this game. LET'S START");
    maxscore=0;
    scale = "Scale1";
  } else {
    alert(scale + " has maximum score of " + maxscore*100);
  }
  resetBoard(scale);
})();
//reset after loose the game
function resetBoard(scaleName) {
  scale1.style.left = (window.innerWidth - scale1.offsetWidth)/2 + "px";
  scale2.style.left = (window.innerWidth - scale2.offsetWidth)/2 + "px";
  ball.style.left = (windowWidth - ball.offsetWidth)/2 + "px";

  //if player losse and get the ball
  if(scaleName === scale2Name) {
    ball.style.top = scale1.offsetTop + scale1.offsetHeight + "px";
    ballSpeedY = 2;
  }
  else if(scaleName === scale1Name) {
    ball.style.top = scale2.offsetTop - scale2.offsetHeight + "px";
    ballSpeedY = -2;
  }
  score = 0;
  gameOn = false;
}
//store the winned player data
function storeWin(scale, score) {
    if(score > maxscore) {
        maxscore = score;
        localStorage.setItem(storeName, scale);
        localStorage.setItem(storeScore, maxscore);
    }
    //stop background sound
    audio.stop()
    clearInterval(movement);
    resetBoard(scale);
    no.play();

    alert(
        scale + " wins with a score of "
        + score*100 + ". Max score is: " + maxscore*100
    );
}
window.addEventListener("keypress", function(event) {
    let scaleSpeed = 20;
    let scaleRect = scale1.getBoundingClientRect();

    if(event.code ==="KeyD" && scaleRect.x + scaleRect.width < window.innerWidth) {
        scale1.style.left = scaleRect.x + scaleSpeed + "px"
        scale2.style.left = scale1.style.left;
    }
    else if(event.code ==="KeyA" && scaleRect.x > 0) {
        scale1.style.left = scaleRect.x - scaleSpeed + "px"
        scale2.style.left = scale1.style.left;
    }

    if(event.code === "Enter") {
        rule.style.visibility = "hidden";

        if(!gameOn) {
            gameOn = true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;
    
            let scale1Height = scale1.offsetHeight;
            let scale2Height = scale2.offsetHeight;
            let scale1Width = scale1.offsetWidth;
            let scale2Width = scale2.offsetWidth;
    
            movement = setInterval(function () {
                //move ball
                ballX += ballSpeedX;
                ballY += ballSpeedY;
    
                audio.play(); //start the background music
    
                var scale1x = scale1.getBoundingClientRect().x;
                var scale2x = scale2.getBoundingClientRect().x;
    
                ball.style.left = ballX + "px";
                ball.style.top = ballY + "px";
    
                if(ballX + ballDia > windowWidth || ballX < 0) {
                    ballSpeedX = -ballSpeedX; //reverse the ball direction when ball touch the scale in x measure
                }
    
                let ballpos = ballX + ballDia/2; //satisfies the ball position to the center
    
                //check the scale1
                if(ballY <= scale1Height) {
                    ballSpeedY = -ballSpeedY; //reverse the ball direction when ball touch the scale in y measure
                    score++;
                    touch.play();
                    //check if the game ends
                    if(ballpos < scale1x || ballpos > scale1x + scale1Width) {
                        storeWin(scale2Name, score);
                        rule.style.visibility = "visible";
                    }
                }
                //check the scale2
                else if(ballY + ballDia >= windowHeight - scale2Height) {
                    ballSpeedY = -ballSpeedY; //reverse the ball direction when ball touch the scale in y measure
                    score++;
                    touch.play();
                    //check if the game ends
                    if(ballpos < scale2x || ballpos > scale2x + scale2Width) {
                        storeWin(scale1Name, score);
                        rule.style.visibility = "visible";
                    }
                }
            }, 10);
        }
    }
});

