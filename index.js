var buttonColors=["green", "red", "yellow", "blue"];
var gameColorPattern=[];
var userClickedPattern=[];
var sound=["green", "red", "yellow", "blue"];
var randomNo, randomChoosen, i, k=0, level=0, flag=0;


//functions
//genrating a random number
function nextSequence()
{
    var x;
    level++;
    $("h1").text("level "+level);
    x=Math.floor(4*Math.random());
    return x;
}
//playing sounds
function playSound(name)
{
    var playOn= new Audio("sounds/"+name+".mp3");
    playOn.play();
}
//adding styles dynamically
function onPress(idOfElement)
{
    $("#"+idOfElement).addClass("pressed");
    setTimeout(function() {
        $("#"+idOfElement).removeClass("pressed");
      }, 100);
}
//levels
function round()
{
    k=0;
    flag=0;
    userClickedPattern=[];
    randomNo= nextSequence();
    randomChoosen= buttonColors[randomNo];
    gameColorPattern.push(randomChoosen);
    $("#"+randomChoosen).fadeOut(150).fadeIn(150);
    playSound(sound[randomNo]);
}
//restart
function startOver()
{
    k=0;
    console.log("start over");
    userClickedPattern=[];
    gameColorPattern=[];
    level=0;
}


//start the game on pressing a key
$("body").keypress(function(){
    flag=0;
    randomNo= nextSequence();
    randomChoosen= buttonColors[randomNo];
    gameColorPattern.push(randomChoosen);
    $("#"+randomChoosen).fadeOut(150).fadeIn(150);
    playSound(sound[randomNo]);
});


//adding event listners to each of the 4 color grids
for(i=0;i<4;i++)
    document.getElementById(buttonColors[i]).addEventListener("click", function()
    {
        userClickedPattern.push(this.id);
        playSound(this.id);
        onPress(this.id);
            if(userClickedPattern[k]!=gameColorPattern[k])
            {
                $("body").addClass("game-over");
                playSound("wrong");
                startOver();
                flag=1;
                $("h1").text("Game Over, Press A Key to Restart");
                setTimeout(function() {
                    $("body").removeClass("game-over");
                  }, 800);
            }
            if(flag==0)
            k++;
            if(flag==0){
            if(k==level){
                setTimeout(function() {
                    round();
                  }, 500);
            }}
    });