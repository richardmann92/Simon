// Variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var pressCount = 0;
var i = 0;
var patternAnimate;

// Functions
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  patternAnimate = setInterval(highlighted, 750);

  gamePattern.push(randomChosenColour);

  level === level++
  $('#level-title').text('Level ' + level);
}

function highlighted() {
  if(i < gamePattern.length) {
    $("#" + gamePattern[i]).fadeOut().fadeIn();
    playSound(gamePattern[i]);
    i=== i++;
  } else {
    clearInterval(patternAnimate);
    i=0;
  }
}

function animatePress(currentColour) {
  var userAnimation = $('.' + currentColour);
  userAnimation[0].classList.add('pressed')
  setTimeout(function() {
    userAnimation[0].classList.remove('pressed')
  }, 100);
}

function nextLevel(){
  setTimeout(nextSequence, 750);
  pressCount = 0;
  userClickedPattern = [];
}

function gameOver(){
  $('#level-title').text('Game Over! Try Again!');
  $('body').addClass('game-over');


  setTimeout(function(){
    $('body').removeClass('game-over');
	}, 100);

  setTimeout(function(){
		$('#level-title').text('Press Any Letter To Start')
	}, 1200);

	pressCount = 0;
	level = 0;
	gamePattern = [];
	userClickedPattern = [];
}

// Actions
$('body').keydown(function() {
  if (level === 0){
    nextSequence();
  }
})

$('.btn').click(function(){
  var userChosenColour = this.id;

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  if (gamePattern[pressCount] === userClickedPattern[pressCount]){
	   pressCount === pressCount++;
     if (pressCount === gamePattern.length){
       nextLevel();
    }
  } else{
    gameOver();
  }
})
