function startAnimation() {
  /* js stuff goes here */


  let container = document.querySelector('.animationContainer');

  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }

  let animation = document.createElement('div');

  animation.className = "animation";
  animation.style['animation-duration'] = '1s';

  document.querySelector('.animationContainer').appendChild(animation);
}
