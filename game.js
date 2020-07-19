
var buttonColours = ["red", "blue", "green", "yellow"];
var newGame = true;
var gameLevel = 0;
var userPattern = [];
var gamePattern = [];

$(".btn").click(function(){
  userPattern.push(this.id);
  playSound(this.id);
  animateButton(this.id);
  checkAnswer(userPattern.length-1);
});

$(document).keypress(function(event){
  if(newGame===true) {
    nextSequence();
    newGame=false;
  }
});

function nextSequence() {
  $("h1").text("Level "+gameLevel);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChoosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColor);

  $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
  gameLevel++;
}

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animateButton(name) {
  $("#"+name).addClass("pressed");
  setTimeout(function() {
    $("#"+name).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel) {
  if(userPattern[currentLevel] === gamePattern[currentLevel]) {
    //
  }else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over, Press any key to restart");
    restartGame();
  }

  if(currentLevel=== gamePattern.length-1){
    setTimeout(function() {
      nextSequence();
      userPattern=[];
    }, 1000);
  }
}

function restartGame() {
  newGame=true;
  userPattern=[];
  gamePattern=[];
  gameLevel = 0;
}
