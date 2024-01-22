var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

$(document).on("keydown", function() {
    if (!gameStarted) { 
        $("h1").text("Level " + level);
        nextSequence(level);
        gameStarted = true;
    };
})

$(".btn").on("click", function() {        
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkanswer(userClickedPattern.length - 1);
});

function nextSequence(level) {
    userClickedPattern = [];
    level ++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

// To animate a flash using vanilla javascript - Thanks to stackoverflow!
    $("#" + randomChosenColour).fadeTo(100, 0.3, function() { 
        $(this).fadeTo(500, 1.0);
    });
    playSound(randomChosenColour);
};

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed")
    }, 100);
}

function checkanswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence(currentLevel + 1)
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press A Key to Start");
        startOver();
    }
}

function startOver(){
    gameStarted = false;
    gamePattern = [];
    level = 0;
}