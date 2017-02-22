const FRUITS = ['apple', 'orange', 'lemon', 'pear', 'watermelon'];

const PIECE_COLORS = ['#ffffff', '#a7e8bd', '#e440f9', '#ff0000', '#01dfa5'];

function startAnimation() {
  let container = document.createElement('div');

  container.className = 'animationContainer';

  let animation = document.createElement('div');

  let item = FRUITS[Math.floor(Math.random() * FRUITS.length)];

  animation.className = item;

  container.appendChild(animation);
  document.querySelector('.mainDiv').appendChild(container);

  return animation;
}

function initializeGame() {
  let mouseDown = false;
  let score = 20;
  updateScore();
  let gameIsRunning = true;

  document.querySelector('.youlost').innerHTML = "";

  document.addEventListener('mousedown', function() {
    mouseDown = true;
  });

  document.addEventListener('mouseup', function() {
    mouseDown = false;
  });

  (function loop() {
      let rand = Math.round(Math.random() * 3000);

      setTimeout(function() {
        if(!gameIsRunning) {
          return;
        }
        trackAnimation(startAnimation());
        loop();

      }, rand);
    }
  )();

  function trackAnimation(animation) {
    animation.addEventListener('animationend', function(event) {
      event.target.parentNode.parentNode.removeChild(event.target.parentNode);

      score--;
      updateScore();
    });

    animation.addEventListener('mouseleave', function(event) {
      if(mouseDown) {
        const { left, top } = animation.getBoundingClientRect();

        event.target.parentNode.parentNode.removeChild(event.target.parentNode);

        let halfFruitDown = document.createElement('div');
        halfFruitDown.className = 'halfFruitDown';

        halfFruitDown.style.left = left + "px";
        halfFruitDown.style.top = top + "px";

        let color = PIECE_COLORS[Math.floor(Math.random() * PIECE_COLORS.length)];
        halfFruitDown.style['background-color'] = color;

        halfFruitDown.style['animation-duration'] = Math.round(Math.random() * 5) + "s";

        halfFruitDown.addEventListener('animationend', function(event) {
          event.target.parentNode.removeChild(event.target);
        });

        document.querySelector('.mainDiv').appendChild(halfFruitDown);

        let halfFruitUp = document.createElement('div');
        halfFruitUp.className = 'halfFruitUp';

        halfFruitUp.style.left = left + "px";
        halfFruitUp.style.top = top + "px";
        halfFruitUp.style['animation-duration'] = Math.round(Math.random() * 5) + "s";

        color = PIECE_COLORS[Math.floor(Math.random() * PIECE_COLORS.length)];
        halfFruitUp.style['background-color'] = color;


        halfFruitUp.addEventListener('animationend', function(event) {
          event.target.parentNode.removeChild(event.target);
        });

        document.querySelector('.mainDiv').appendChild(halfFruitUp);

        score++;
        updateScore();
      }
    });
  }

  function updateScore() {
    document.querySelector('.score').innerHTML = `Score: ${score}`;

    if(score < 0) {
      gameIsRunning = false;

      let node = document.querySelector('.mainDiv');

      while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
      }

      document.querySelector('.youlost').innerHTML = '<div class="gameOver">Game over.</div>'
    }

  }
}
