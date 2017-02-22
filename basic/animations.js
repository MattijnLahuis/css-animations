function startAnimation() {
  let container = document.createElement('div');

  container.className = 'animationContainer';

  let animation = document.createElement('div');

  animation.className = "animation";
  animation.style['animation-duration'] = '1s';

  container.appendChild(animation);
  document.querySelector('.mainDiv').appendChild(container);

  animation.addEventListener('animationend', function(event) {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  })
}

function loop() {
  let rand = Math.round(Math.random() * 1000);
  setTimeout(function() {
    startAnimation();
    loop();
  }, rand);
}
