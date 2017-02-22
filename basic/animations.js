function startAnimation() {
  // let container = document.querySelector('.animationContainer');
  // while (container.hasChildNodes()) {
  //   container.removeChild(container.lastChild);
  // }

  let container = document.createElement('div');

  container.className = 'animationContainer';

  let animation = document.createElement('div');

  animation.className = "animation";
  animation.style['animation-duration'] = '1s';

  container.appendChild(animation);
  document.querySelector('body').appendChild(container);

  container.addEventListener('animationend', function(event) {
    event.target.parentNode.removeChild(event.target);
  })
}
