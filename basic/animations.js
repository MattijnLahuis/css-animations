function startAnimation() {
  let container = document.createElement('div');

  container.className = 'animationContainer';

  let animation = document.createElement('div');

  animation.className = "animation";
  // animation.style['animation-duration'] = '1s';

  container.appendChild(animation);
  document.querySelector('.mainDiv').appendChild(container);

  animation.addEventListener('animationend', function(event) {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  });

  return animation;
}

function initializeGame() {
  let mouseDown = false;

  document.addEventListener('mousedown', function() {
    mouseDown = true;
  });

  document.addEventListener('mouseup', function() {
    mouseDown = false;
  });

  (function loop() {
      let rand = Math.round(Math.random() * 3000);
      setTimeout(function() {
        trackAnimation(startAnimation());
        loop();
      }, rand);
    }
  )();

  function trackAnimation(animation) {
    animation.addEventListener('mouseleave', function(event) {
      if(mouseDown) {
        const { left, top } = animation.getBoundingClientRect();

        event.target.parentNode.parentNode.removeChild(event.target.parentNode);

        let halfFruitDown = document.createElement('div');
        halfFruitDown.className = 'halfFruitDown';

        halfFruitDown.style.left = left + "px";
        halfFruitDown.style.top = top + "px";

        halfFruitDown.addEventListener('animationend', function(event) {
          event.target.parentNode.removeChild(event.target);
        });

        document.querySelector('.mainDiv').appendChild(halfFruitDown);

        let halfFruitUp = document.createElement('div');
        halfFruitUp.className = 'halfFruitUp';

        halfFruitUp.style.left = left + "px";
        halfFruitUp.style.top = top + "px";

        halfFruitUp.addEventListener('animationend', function(event) {
          event.target.parentNode.removeChild(event.target);
        });

        document.querySelector('.mainDiv').appendChild(halfFruitUp);

      }
    });
  }
}
