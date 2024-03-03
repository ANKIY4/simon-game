const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [],
  userClickedPattern = [],
  started = !1,
  level = 0;
function nextSequence() {
  var e = buttonColors[Math.floor(4 * Math.random())];
  gamePattern.push(e),
    $("#" + e)
      .fadeOut(100)
      .fadeIn(100),
    playSound(e),
    level++,
    $("h1").text("level " + level),
    (userClickedPattern = []);
}
function playSound(e) {
  new Audio("./sounds/" + e + ".mp3").play();
}
function animatePress(e) {
  $("#" + e).addClass("pressed"),
    setTimeout(() => {
      $("#" + e).removeClass("pressed");
    }, 100);
}
function checkAnswer(e) {
  gamePattern[e] === userClickedPattern[e]
    ? userClickedPattern.length === gamePattern.length &&
      setTimeout(() => {
        nextSequence();
      }, 1e3)
    : (playSound("wrong"),
      $("body").addClass("game-over"),
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200),
      $("h1").text("Game Over, Press Any Key to Restart"),
      startOver());
}
function startOver() {
  (gamePattern = []), (started = !1), (level = 0);
}
$(".btn").on("click", function () {
  var e = this.getAttribute("id");
  userClickedPattern.push(e),
    playSound(e),
    animatePress(e),
    checkAnswer(userClickedPattern.length - 1);
}),
  $(document).on("keydown", function () {
    started || (nextSequence(), $("h1").text("Level" + level), (started = !0));
  });
