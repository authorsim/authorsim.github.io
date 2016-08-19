const unlock = (function() {
  // Create callback object
  let unlocks = $.Callbacks()

  // Create shortcut variables to reduce typing
  let u, m, l, w, s, p, c, b
  let setVar = () => {
    u = save['upgrades']
    m = save['monkeys']
    l = save['letters']
    w = save['words']
    s = save['sentences']
    p = save['pages']
    c = save['chapters']
    b = save['books']
  }

  //
  // Letter Unlocks
  //

  let seeWords = () => {
    if (l['lifetime'] >= 10) {
  		$('#WordsMenu').fadeIn()
      unlocks.remove(seeWords)
  	}
  }

  let writeWords = () => {
    if (l['lifetime'] >= 34 && !u['writeWords']) {
      $('#WriteWords').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(writeWords)
    } else if (u['writeWords']) {
      unlocks.remove(writeWords)
    }
  }

  let fasterLetters = () => {
    if (l['lifetime'] >= 475 && !u['fasterLetters']) {
      $('#FasterLetters').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(fasterLetters)
    } else if (u['fasterLetters']) {
      unlocks.remove(fasterLetters)
    }
  }

  let fasterLetters2 = () => {
    if (l['lifetime'] >= 693 && !u['fasterLetters2']) {
      $('#FasterLetters2').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(fasterLetters2)
    } else if (u['fasterLetters2']) {
      unlocks.remove(fasterLetters2)
    }
  }

  let efficientMonkeys = () => {
    if (l['lifetime'] >= 275 && m['total'] >= 3 && !u['efficientMonkeys']) {
      $('#EfficientMonkeys').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(efficientMonkeys)
    } else if (u['efficientMonkeys']) {
      unlocks.remove(efficientMonkeys)
    }
  }

  let efficientWords = () => {
    if (l['lifetime'] >= 2300 && !u['efficientWords']) {
      $('#EfficientWords').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(efficientWords)
    } else if (u['efficientWords']) {
      unlocks.remove(efficientWords)
    }
  }

  //
  // Word Unlocks
  //

  let seeSentences = () => {
    if (w['lifetime'] >= 113) {
  		$('#SentencesMenu').fadeIn()
      unlocks.remove(seeSentences)
  	}
  }

  let writeSentences = () => {
    if (w['lifetime'] >= 200 && !u[['writeSentences']]) {
      $('#WriteSentences').fadeIn()
      w['availableUpgrades'] += 1
      unlocks.remove(writeSentences)
    } else if (u['writeSentences']) {
      unlocks.remove(writeSentences)
    }
  }

  let fasterWords = () => {
    if (w['lifetime'] >= 45 && !u['fasterWords']) {
      $('#FasterWords').fadeIn()
      w['availableUpgrades'] += 1
      unlocks.remove(fasterWords)
    } else if (u['fasterWords']) {
      unlocks.remove(fasterWords)
    }
  }

  //
  // Sentence Unlocks
  //

  let seePages = () => {
    if (s['lifetime'] >= 113) {
      $('#PagesMenu').fadeIn()
      unlocks.remove(seePages)
    }
  }

  let fasterSentences = () => {
    if (s['lifetime'] >= 35 && !u['fasterSentences']) {
      $('#FasterSentences').fadeIn()
      s['availableUpgrades'] += 1
      unlocks.remove(fasterSentences)
    } else if (u['fasterSentences']) {
      unlocks.remove(fasterSentences)
    }
  }

  //
  // Page Unlocks
  //

  let seeChapters = () => {
    if (p['lifetime'] >= 200) {
      $('#ChaptersMenu').fadeIn()
      unlocks.remove(seeChapters)
    }
  }

  //
  // Chapter Unlocks
  //

  let seeBooks = () => {
    if (c['lifetime'] >= 143) {
      $('#BooksMenu').fadeIn()
      unlocks.remove(seeBooks)
    }
  }

  // Create some public functions to fire callback objects
  return {
    // Initial setup of callback object with all functions
    // Fires onLoad
    setup: function() {
      setVar()
      // Includes functions in callback object
      unlocks.add(setVar)
      unlocks.add(seeWords)
      unlocks.add(seeSentences)
      unlocks.add(seePages)
      unlocks.add(seeChapters)
      unlocks.add(seeBooks)
      unlocks.add(writeWords)
      unlocks.add(writeSentences)

      unlocks.add(fasterLetters)
      unlocks.add(fasterLetters2)
      unlocks.add(efficientMonkeys)

      // Sets upgrade counting variables to 0
      l['availableUpgrades'] = 0
      w['availableUpgrades'] = 0
      s['availableUpgrades'] = 0
      p['availableUpgrades'] = 0
      c['availableUpgrades'] = 0
      b['availableUpgrades'] = 0

      // Check if they've been unlocked already
      unlocks.fire()
    },

    // Checks unlocks
    check: () => { unlocks.fire() },
  }
}())
