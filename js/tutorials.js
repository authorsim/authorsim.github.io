const tutorial = (function () {
  // Sets the text and location of the tutorial window
  const setWindow = (title, desc, y, x) => {
    $('#tutorialTitle').text(title)
    $('#tutorialDesc').text(desc)
    $('#tutorialWindow').css({ 'top': y }).css({ 'left': x })
  }

  let curTutorial = []
  let index
  const firstTutorial = []

  return {
    first: () => {
      setWindow('Get Writing!', 'Click "letters" and start writing some letters manually', '30%', '15%')
      curTutorial = firstTutorial
      index = 0
    },
    setup: () => {
      document.getElementById('tutorialNext').addEventListener('click', (e) => {
        index++
      })
    },
  }
}())

export default tutorial
