var mouseIsDown = false;

const LIVES_AT_START = 5;

var score = 0;
var lives = LIVES_AT_START;

var activeGame = true;

function trackMouse() {
  document.addEventListener('mousedown', function() {
    mouseIsDown = true;
  });

  document.addEventListener('mouseup', function() {
    mouseIsDown = false;
  });
}

trackMouse();

function startAnimation(className) {
  var element = document.createElement('div');

  element.className = className;
  document.querySelector('#mainDiv').appendChild(element);

  trackAnimation(element);
}

function destroyAnimation(element) {
  var { left, top } = element.getBoundingClientRect();

  var slice1 = document.createElement('div');
  slice1.className = 'slicedFruit';

  slice1.style.left = left + "px";
  slice1.style.top = top + "px";

  slice1.style['animation-name'] = 'slicedFruitDown';
  slice1.style['animation-duration'] = '2s';
  slice1.style['animation-timing-function'] = 'ease-out';

  document.querySelector('#mainDiv').appendChild(slice1);

  slice1.addEventListener('animationend', function(event) {
    slice1.parentNode.removeChild(slice1);
  });

  var slice2 = document.createElement('div');
  slice2.className = 'slicedFruit';

  slice2.style.left = left + "px";
  slice2.style.top = top + "px";

  slice2.style['animation-name'] = 'slicedFruitUp';
  slice2.style['animation-duration'] = '2s';
  slice2.style['animation-timing-function'] = 'ease-out';

  document.querySelector('#mainDiv').appendChild(slice2);

  slice2.addEventListener('animationend', function(event) {
    slice2.parentNode.removeChild(slice2);
  });
}

function trackAnimation(element) {
  element.addEventListener('animationend', function(event) {
      lives--;

      if(lives < 0) {
        lives = 0;
        activeGame = false;
      }
      updateScore();

    element.parentNode.removeChild(element);
  });

  element.addEventListener('mouseenter', function(event) {
    if(mouseIsDown) {
      score++;
      updateScore();
      destroyAnimation(element);
      document.querySelector('#mainDiv').removeChild(element);
    }
  });
}

function updateScore() {
  if(!activeGame && document.querySelector('.gameOver') == null) {
    var gameOver = document.createElement('div');

    gameOver.className = 'gameOver';

    if(score > 10) {
      gameOver.innerHTML = 'You may try again, Game over. <br /> You scored: ' + score;
    } else {
      gameOver.innerHTML = 'You are very bad, Game over. <br /> You scored: ' + score;
    }

    document.querySelector('#mainDiv').appendChild(gameOver);
  }

  document.querySelector('.scoreBox').innerHTML = 'score: ' + score + " lives: " + lives;
}

function loop() {
  let rand = Math.round(Math.random() * 1000);

  setTimeout(function() {
    startAnimation('circle');
    if(activeGame) {
      loop();
    } else {
      var newGame = document.createElement('div');

      newGame.innerHTML = '<button onclick="resetGame();">Start again</button>';

      document.querySelector('.gameOver').appendChild(newGame);
    }
  }, rand);
};

function resetGame() {
  activeGame = true;
  lives = LIVES_AT_START;
  score = 0;
  updateScore();
  var gameOver = document.querySelector('.gameOver');

  gameOver.parentNode.removeChild(gameOver);

  loop();
}

document.addEventListener("DOMContentLoaded", function(event) {
  updateScore();
  loop();
});
