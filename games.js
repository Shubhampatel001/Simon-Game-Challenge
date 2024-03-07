alert("Simon is a memory game \nwhere some buttons shows a sequence of lights and sounds.\nYou repeat the sequence by pressing corresponding buttons.\nThe game gets harder as the sequence lengthens,\ntesting your memory and coordination.\n");
var buttonsColor = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];


var started = false;
var level = 0; 
$(document).keydown(function(){
    if(!started){
    //$("h1").text("Level "+level);
    nextSequence();
    started = true;
    }
});



function nextSequence(){
    userClickedPattern=[];
    $("h1").text("Level "+level);
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonsColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/"+randomChosenColor+".mp3");
    audio.play();   
};




$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    $(this).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio1 = new Audio("./sounds/"+$(this).attr("id")+".mp3");
    audio1.play();
    checkAnswer(userClickedPattern.length-1);
} );




function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {   
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("wrong");
        var audio3 = new Audio("./sounds/wrong.mp3");
            audio3.play();
        $("document").ready(function () {
        $("body").addClass("game-over");
        setTimeout(function() {
        $("body").removeClass("game-over");
        }, 300);
        });
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
        gamePattern=[];
        started = false;
        level = 0;
}