const tutorial = (function () {
  let curTutorial = []
  let index
  const firstTutorial = [
    ['Your First Word',
    'Words will unlock after a while. Then an upgrade to write them manually. Write your first word!',
    '#lettersManualSection'],
    ['Infinite Monkeys...',
    'Using your words, you can hire monkeys to type letters for you automagically. Don\'t let logic trip you up!',
    '.dropdown'],
    ['Goals',
    'Once you\'ve stabilized your letter income a bit, you\'ll want to hire a staff member to help! Then you know what to do.',
    '.dropdown'],
  ]

  // Sets the text and location of the tutorial window
  const setWindow = (title, desc, element) => {
    $('#tutorialTitle').text(title)
    $('#tutorialDesc').text(desc)
    let top = $(element).offset().top
    top += $(element).height()
    const left = $(element).offset().left
    $('#tutorialWindow').css({ top: top + 'px', left: left + 'px' })
  }

  const resetTutorial = () => {
    $('#tutorialWindow').css({ left: '-200%' })
    $('#tutorialNext').removeClass('btn-info').addClass('btn-success').text('Next')
    curTutorial = []
  }

  return {
    first: () => {
      setWindow(
        'Get Writing!',
        'Click "letters" and start writing some letters manually.',
        '#LettersMenu'
      )
      curTutorial = firstTutorial
      index = 0
    },
    setup: () => {
      document.getElementById('tutorialNext').addEventListener('click', (e) => {
        if (index === curTutorial.length) {
          resetTutorial()
          return
        }
        if (index === (curTutorial.length - 1)) {
          $('#tutorialNext').removeClass('btn-success').addClass('btn-info').text('Finish')
        }
        setWindow(curTutorial[index][0], curTutorial[index][1], curTutorial[index][2])
        index++
      })
    },
  }
}())

export default tutorial
