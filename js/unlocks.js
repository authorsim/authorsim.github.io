const unlock = (function () {
  // Create callback object
  const unlocks = $.Callbacks()

  // Create shortcut variables to reduce typing
  let u
  let m
  let l
  let w
  let s
  let p
  let c
  let b
  const setVar = () => {
    u = save.upgrades
    m = save.monkeys
    l = save.letters
    w = save.words
    s = save.sentences
    p = save.pages
    c = save.chapters
    b = save.books
  }

  //
  // Letter Unlocks
  //

  const seeWords = () => {
    if (l['lifetime'] >= 10) {
      $('#WordsMenu').fadeIn()
      unlocks.remove(seeWords)
    }
  }

  const writeWords = () => {
    if (l['lifetime'] >= 34 && !u['writeWords']) {
      $('#WriteWords').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(writeWords)
    } else if (u['writeWords']) {
      unlocks.remove(writeWords)
    }
  }

  const fasterLetters = () => {
    if (l['lifetime'] >= 475 && !u['fasterLetters']) {
      $('#FasterLetters').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(fasterLetters)
    } else if (u['fasterLetters']) {
      unlocks.remove(fasterLetters)
    }
  }

  const efficientMonkeys = () => {
    if (l['lifetime'] >= 275 && m['total'] >= 3 && !u['efficientMonkeys']) {
      $('#EfficientMonkeys').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(efficientMonkeys)
    } else if (u['efficientMonkeys']) {
      unlocks.remove(efficientMonkeys)
    }
  }

  const monkeyIntelligenceI = () => {
    if (l['lifetime'] >= 655 && m['total'] >= 7 && !u['monkeyIntelligenceI']) {
      $('#MonkeyIntelligenceI').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(monkeyIntelligenceI)
    } else if (u['monkeyIntelligenceI']) {
      unlocks.remove(monkeyIntelligenceI)
    }
  }

  const smarterLetters = () => {
    if (l['lifetime'] >= 1200 && !u['smarterLetters']) {
      $('#SmarterLetters').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(smarterLetters)
    } else if (u['smarterLetters']) {
      unlocks.remove(smarterLetters)
    }
  }

  const monkeyIntelligenceII = () => {
    if (l['lifetime'] >= 1600 && m['total'] >= 13 && !u['monkeyIntelligenceII']) {
      $('#MonkeyIntelligenceII').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(monkeyIntelligenceII)
    } else if (u['monkeyIntelligenceII']) {
      unlocks.remove(monkeyIntelligenceII)
    }
  }

  const efficientWords = () => {
    if (l['lifetime'] >= 2300 && !u['efficientWords']) {
      $('#EfficientWords').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(efficientWords)
    } else if (u['efficientWords']) {
      unlocks.remove(efficientWords)
    }
  }

  const monkeyIntelligenceBreakthrough = () => {
    if (l['lifetime'] >= 4000 && m['total'] >= 20 && !u['monkeyIntelligenceBreakthrough']) {
      $('#MonkeyIntelligenceBreakthrough').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(monkeyIntelligenceBreakthrough)
    } else if (u['monkeyIntelligenceBreakthrough']) {
      unlocks.remove(monkeyIntelligenceBreakthrough)
    }
  }

  const tooManyLetters = () => {
    if (l['lifetime'] >= 20000 && !u['tooManyLetters']) {
      $('#TooManyLetters').fadeIn()
      l['availableUpgrades'] += 1
      unlocks.remove(tooManyLetters)
    } else if (u['tooManyLetters']) {
      unlocks.remove(tooManyLetters)
    }
  }

  //
  // Word Unlocks
  //

  const seeSentences = () => {
    if (w['lifetime'] >= 113) {
      $('#SentencesMenu').fadeIn()
      unlocks.remove(seeSentences)
    }
  }

  const writeSentences = () => {
    if (w['lifetime'] >= 200 && !u[['writeSentences']]) {
      $('#WriteSentences').fadeIn()
      w['availableUpgrades'] += 1
      unlocks.remove(writeSentences)
    } else if (u['writeSentences']) {
      unlocks.remove(writeSentences)
    }
  }

  const fasterWords = () => {
    if (w['lifetime'] >= 45 && !u['fasterWords']) {
      $('#FasterWords').fadeIn()
      w['availableUpgrades'] += 1
      unlocks.remove(fasterWords)
    } else if (u['fasterWords']) {
      unlocks.remove(fasterWords)
    }
  }

  const wordWhiz = () => {
    if (w['lifetime'] >= 450 && !u['wordWhiz']) {
      $('#WordWhiz').fadeIn()
      w['availableUpgrades'] += 1
      unlocks.remove(wordWhiz)
    } else if (u['wordWhiz']) {
      unlocks.remove(wordWhiz)
    }
  }

  const wordOfWisdom = () => {
    if (w['lifetime'] >= 950 && !u['wordOfWisdom']) {
      $('#WordOfWisdom').fadeIn()
      w['availableUpgrades'] += 1
      unlocks.remove(wordOfWisdom)
    } else if (u['wordOfWisdom']) {
      unlocks.remove(wordOfWisdom)
    }
  }

  const gettingTheHangOfIt = () => {
    if (w['lifetime'] >= 600 && !u['gettingTheHangOfIt']) {
      $('#GettingTheHangOfIt').fadeIn()
      w['availableUpgrades'] += 1
      unlocks.remove(gettingTheHangOfIt)
    } else if (u['gettingTheHangOfIt']) {
      unlocks.remove(gettingTheHangOfIt)
    }
  }

  //
  // Sentence Unlocks
  //

  const seePages = () => {
    if (s['lifetime'] >= 113) {
      $('#PagesMenu').fadeIn()
      unlocks.remove(seePages)
    }
  }

  const fasterSentences = () => {
    if (s['lifetime'] >= 39 && !u['fasterSentences']) {
      $('#FasterSentences').fadeIn()
      s['availableUpgrades'] += 1
      unlocks.remove(fasterSentences)
    } else if (u['fasterSentences']) {
      unlocks.remove(fasterSentences)
    }
  }

  const higherLearning = () => {
    if (s['lifetime'] >= 9 && !u['higherLearning']) {
      $('#HigherLearning').fadeIn()
      s['availableUpgrades'] += 1
      unlocks.remove(higherLearning)
    } else if (u['higherLearning']) {
      unlocks.remove(higherLearning)
    }
  }

  const longerSentences = () => {
    if (s['lifetime'] >= 300 && !u['longerSentences']) {
      $('#LongerSentences').fadeIn()
      s['availableUpgrades'] += 1
      unlocks.remove(longerSentences)
    } else if (u['longerSentences']) {
      unlocks.remove(longerSentences)
    }
  }

  //
  // Page Unlocks
  //

  const seeChapters = () => {
    if (p['lifetime'] >= 200) {
      $('#ChaptersMenu').fadeIn()
      unlocks.remove(seeChapters)
    }
  }

  //
  // Chapter Unlocks
  //

  const seeBooks = () => {
    if (c['lifetime'] >= 143) {
      $('#BooksMenu').fadeIn()
      unlocks.remove(seeBooks)
    }
  }

  // Create some public functions to fire callback objects
  return {
    // Initial setup of callback object with all functions
    // Fires onLoad
    setup: () => {
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
      unlocks.add(fasterWords)
      unlocks.add(efficientMonkeys)
      unlocks.add(monkeyIntelligenceI)
      unlocks.add(monkeyIntelligenceII)
      unlocks.add(monkeyIntelligenceBreakthrough)
      unlocks.add(smarterLetters)
      unlocks.add(wordWhiz)
      unlocks.add(higherLearning)
      unlocks.add(wordOfWisdom)
      unlocks.add(tooManyLetters)
      unlocks.add(gettingTheHangOfIt)

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
