function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function resizeCanvas() {
    const elContainer = document.querySelector('.canva-container')
    console.log(elContainer.offsetWidth);
    gCanvas.width = (elContainer.offsetWidth - 50)
    gCanvas.height = elContainer.offsetHeight
}