const achieve = (function() {
  //
  // Drag and Drop
  //

  let setListeners = () => {
    // Define droppable areas
    let activePerks = document.querySelectorAll('.activePerk')
    for (let i = 0; i < activePerks.length; i++) {
      activePerks[i].addEventListener('dragover', function(e){
        e.preventDefault()
        e.dataTransfer.effectAllowed = 'copy'
      }, false)
      activePerks[i].addEventListener('drop', function(e){
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

    let perks = document.querySelectorAll('.achievement')
    for (let i = 0; i < perks.length; i++) {
      perks[i].addEventListener('dragstart', function(e) {
        e.dataTransfer.effectAllowed = 'copy'
        e.dataTransfer.setData('text/html', e.target.innerHTML)
        e.dataTransfer.setDragImage(e.target,50,50)
      }, false)
      perks[i].addEventListener('dragenter', function(e) {
        e.preventDefault()
        return true
      }, false)
    }
	}

  // Create callback object
  let ach = $.Callbacks()

  // Create variable shortcut
  let a
  let setVar = () => {
    a = save['achievements']
  }

  let findPongo = () => {
    $('#monkeys').mouseover((event) => {
      achieve.alert('You Found Pongo!','+10% Speed to Monkeys')
      a['findPongo'] = true
      $(this).unbind(event)
    })
  }

  return {
    // Animation for fading in and then out an alert box
    alert: (title, desc) => {
    	$('#achieve').fadeTo(500, 0.8)
    	$('#achieveTitle').text(title)
    	$('#achieveDesc').text('Perk: ' + desc)

      // After 7 seconds, fades the window back out
    	window.setTimeout(() => {
    	   $('#achieve').fadeTo(500, 0)
    	}, 7000)
    },

    setup: () => {
      setVar()
      if (!a['findPongo']) { ach.add(findPongo) }
      ach.add(setListeners)
      ach.fire()
    },

    check: () => { ach.fire() }
  }
}())
