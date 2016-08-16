const unlock = (function() {
  // Create callback objects
  let unlocks = $.Callbacks()

  // Create shortcut variables to reduce typing
  let u, l, w, s, p, c, b
  let setVar = () => {
    u = save['upgrades']
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
    if (l['lifetime'] >= 50 && !u['writeWords']) {
      $('#WriteWords').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(writeWords)
    }
  }

  let fasterLetters = () => {
    if (l['lifetime'] >= 475 && !u['fasterLetters']) {
      $('#FasterLetters').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(fasterLetters)
    }
  }

  //
  // Word Unlocks
  //

  let seeSentences = () => {
    if (w['lifetime'] >= 12) {
  		$('#SentencesMenu').fadeIn()
      unlocks.remove(seeSentences)
  	}
  }

  let writeSentences = () => {
    if (w['lifetime'] >= 50 && !u[['writeSentences']]) {
      $('#WriteSentences').fadeIn()
      w['availableUpgrades'] += 1
      unlocks.remove(writeSentences)
    }
  }

  //
  // Sentence Unlocks
  //

  let seePages = () => {
    if (s['lifetime'] >= 30) {
      $('#PagesMenu').fadeIn()
      unlocks.remove(seePages)
    }
  }

  //
  // Page Unlocks
  //

  let seeChapters = () => {
    if (p['lifetime'] >= 34) {
      $('#ChaptersMenu').fadeIn()
      unlocks.remove(seeChapters)
    }
  }

  //
  // Chapter Unlocks
  //

  let seeBooks = () => {
    if (c['lifetime'] >= 40) {
      $('#BooksMenu').fadeIn()
      unlocks.remove(seeBooks)
    }
  }

  // Create some public functions to fire callback objects
  return {
    // Initial setup of callback object with all functions
    // Fires onLoad
    setup: function() {
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

      // Sets upgrade counting variables to 0
      setVar()
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
