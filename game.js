var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var gameStarted = false;

var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);

}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    //console.log("Success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    //console.log("Wrong");
    var audio = new Audio("sounds/wrong.mp3");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

$(".btn").on("click",function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  // console.log(userClickedPattern);

  animatePress(userChosenColour);
  playSound(userChosenColour);
});

// ANOTHER METHOD
// //1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
// $(".btn").click(function() {
//
//   //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
//   var userChosenColour = $(this).attr("id");
//
//   //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
//   userClickedPattern.push(userChosenColour);
//
//   //console.log(userClickedPattern);
//
// });

function playSound(name){

  var audioSrc = "./sounds/" + name;
  var audio = new Audio(audioSrc + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed").delay(100).queue(function(next){
    $(this).removeClass("pressed");
    next();
  })

  // ANOTHER METHOD
  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  // $("#" + currentColor).addClass("pressed");
  //
  // //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  // setTimeout(function () {
  //   $("#" + currentColor).removeClass("pressed");
  // }, 100);

}

$(document).on("keypress",function(event){
  if(gameStarted === false){
    gameStarted = true;
    nextSequence();
  }
});
