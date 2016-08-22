const achieve = (function () {
  //
  // Drag and Drop
  //

  const setListeners = () => {
    // Define droppable areas
    const activePerks = document.querySelectorAll('.activePerk')
    for (let i = 0; i < activePerks.length; i++) {
      activePerks[i].addEventListener('dragover', (e) => {
        e.preventDefault()
        e.dataTransfer.effectAllowed = 'copy'
      }, false)
      activePerks[i].addEventListener('drop', (e) => {
        e.preventDefault()
        let counter = 0
        for (let i = 0; i < activePerks.length; i++) {
          if (e.dataTransfer.getData('text/html') !== activePerks[i].innerHTML) {
            counter += 1
          } if (counter === 3) {
            this.innerHTML = e.dataTransfer.getData('text/html')
          }
        }
      }, false)
    }

    const perks = document.querySelectorAll('.achievement')
    for (let i = 0; i < perks.length; i++) {
      perks[i].addEventListener('dragstart', (e) => {
        e.dataTransfer.effectAllowed = 'copy'
        e.dataTransfer.setData('text/html', e.target.innerHTML)
        e.dataTransfer.setDragImage(e.target, 50, 50)
      }, false)
      perks[i].addEventListener('dragenter', (e) => {
        e.preventDefault()
        return true
      }, false)
    }
  }

  // Create callback object
  const ach = $.Callbacks()

  // Create variable shortcut
  let a
  const setVar = () => {
    a = save['achievements']
  }

  const findPongo = () => {
    $('#monkeys').mouseover((event) => {
      achieve.alert('You Found Pongo!', '+10% Speed to Monkeys')
      a['findPongo'] = true
      $(this).unbind(event)
    })
  }

  return {
    // Animation for fading in and then out an alert box
    alert: (title, desc) => {
      $('.achievementWindow').removeClass('achBehind').addClass('achInFront')
      $('#achieve').fadeTo(500, 0.9)
      $('#achieveTitle').text(title)
      $('#achieveDesc').text('Perk: ' + desc)

      // After 7 seconds, fades the window back out
      window.setTimeout(() => {
        $('#achieve').fadeTo(500, 0)
        $('.achievementWindow').removeClass('achInFront').addClass('achBehind')
      }, 7000)
    },

    setup: () => {
      setVar()
      if (!a['findPongo']) { ach.add(findPongo) }
      ach.add(setListeners)
      ach.fire()
    },

    check: () => { ach.fire() },
  }
}())
