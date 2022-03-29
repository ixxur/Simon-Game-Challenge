
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$("body").keydown(function() {
    if (started === false) {
        
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
    
    
$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
   
    checkAnswer(userClickedPattern.length-1);
    // console.log(userClickedPattern);

});

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("succes");
       

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000)
            userClickedPattern = [];
        }
    } else {
        wrongAnswer();
        
    }
}

function wrongAnswer() {
    console.log("wrong");
    var sound = new Audio ("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },500);
    $("#level-title").text("Game over! Press Any Key to Restart");
    startOver();
    
}
function startOver() {
    started = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}
function nextSequence() {

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    
}

function playSound(name) {

    var sound = new Audio ("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress (currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100);
}


