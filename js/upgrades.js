const upgrade = (function() {
  // Create callback objects
  let upgrades = $.Callbacks()

  // Create shortcut variables to reduce typing
  let u
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

  const upgradeError = () => {
    return errorAlert('Oh dear...', 'You are too poor to purchase this upgrade.')
  }

  return {
    // Checks regularly to fade in icon if upgrades are purchaseable
    check: () => {
      setVar()
      // If there are any upgrades, fade in global icon
      if (l['availableUpgrades'] +
          w['availableUpgrades'] +
          s['availableUpgrades'] +
          p['availableUpgrades'] +
          c['availableUpgrades'] +
          b['availableUpgrades'] !== 0) {
            $('#upgradeAvailable').fadeIn()
          } else {
            $('#upgradeAvailable').fadeOut()
          }
      // If there are upgrades, fade in the icon
      if (l['availableUpgrades'] !== 0) {
        $('#LettersUpgradeAvailable').fadeIn()
      } if (w['availableUpgrades'] !== 0) {
        $('#WordsUpgradeAvailable').fadeIn()
      } if (s['availableUpgrades'] !== 0) {
        $('#SentencesUpgradeAvailable').fadeIn()
      } if (p['availableUpgrades'] !== 0) {
        $('#PagesUpgradeAvailable').fadeIn()
      } if (c['availableUpgrades'] !== 0) {
        $('#ChaptersUpgradeAvailable').fadeIn()
      } if (b['availableUpgrades'] !== 0) {
        $('#BooksUpgradeAvailable').fadeIn()
      }
      // If there are no upgrades, fade out the icon
      if (l['availableUpgrades'] === 0) {
        $('#LettersUpgradeAvailable').fadeOut()
      } if (w['availableUpgrades'] === 0) {
        $('#WordsUpgradeAvailable').fadeOut()
      } if (s['availableUpgrades'] === 0) {
        $('#SentencesUpgradeAvailable').fadeOut()
      } if (p['availableUpgrades'] === 0) {
        $('#PagesUpgradeAvailable').fadeOut()
      } if (c['availableUpgrades'] === 0) {
        $('#ChaptersUpgradeAvailable').fadeOut()
      } if (b['availableUpgrades'] === 0) {
        $('#BooksUpgradeAvailable').fadeOut()
      }
    },
    setup: () => {
      setVar()
      if (u['writeWords']) { $('#wordsManualSection').fadeIn() }
      if (u['writeSentences']) { $('#sentencesManualSection').fadeIn() }
    },

    writeWords: () => {
      setVar()
      if (l['total'] >= 34 && !u['writeWords']) {
        $('#WriteWords').fadeOut()        // Fade out button
        u['writeWords'] = true            // Set upgrade to purchased
        l['total'] -= 34                 // Deduct cost
        l['availableUpgrades'] -= 1       // Deduct purchaseable upgrade
        $('#wordsManualSection').fadeIn() // Fade in purchased section
      } else if (l['total'] < 34) {
        upgradeError()
      }
    },

    writeSentences: () => {
      setVar()
      if (w['total'] >= 30 && !u['writeSentences']) {
        $('#WriteSentences').fadeOut()
        u['writeSentences'] = true
        w['total'] -= 30
        w['availableUpgrades'] -= 1
        $('#sentencesManualSection').fadeIn()
      } else if (w['total'] < 30) {
        upgradeError()
      }
    },

    fasterLetters: () => {
      setVar()
      if (l['total'] >= 175 && !u['fasterLetters']) {
        $('#FasterLetters').fadeOut()
        u['fasterLetters'] = true
        l['total'] -= 175
        l['availableUpgrades'] -= 1
        l['timer'] = l['timer'] * 0.5
        calcGenerating('letters')
      } else if (l['total'] < 175) {
        upgradeError()
      }
    },

    efficientMonkeys: () => {
      setVar()
      if (l['total'] >= 75 && !u['efficientMonkeys']) {
        $('#EfficientMonkeys').fadeOut()
        u['efficientMonkeys'] = true
        l['total'] -= 75
        l['availableUpgrades'] -= 1
        m['multiplier'] += 0.1
        calcGenerating('letters')
      } else if (l['total'] < 75) {
        upgradeError()
      }
    },

    monkeyIntelligenceI: () => {
      setVar()
      if (l['total'] >= 350 && !u['monkeyIntelligenceI']) {
        $('#MonkeyIntelligenceI').fadeOut()
        u['monkeyIntelligenceI'] = true
        l['total'] -= 350
        l['availableUpgrades'] -= 1
        m['multiplier'] += 0.2
        calcGenerating('letters')
      } else if (l['total'] < 350) {
        upgradeError()
      }
    },

    monkeyIntelligenceII: () => {
      setVar()
      if (l['total'] >= 775 && !u['monkeyIntelligenceII']) {
        $('#MonkeyIntelligenceII').fadeOut()
        u['monkeyIntelligenceII'] = true
        l['total'] -= 775
        l['availableUpgrades'] -= 1
        m['multiplier'] += 0.25
        calcGenerating('letters')
      } else if (l['total'] < 775) {
        upgradeError()
      }
    },

    monkeyIntelligenceBreakthrough: () => {
      setVar()
      if (l['total'] >= 2200 && !u['monkeyIntelligenceBreakthrough']) {
        $('#MonkeyIntelligenceBreakthrough').fadeOut()
        u['monkeyIntelligenceBreakthrough'] = true
        l['total'] -= 2200
        l['availableUpgrades'] -= 1
        m['multiplier'] += 1.00
        calcGenerating('letters')
      } else if (l['total'] < 2200) {
        upgradeError()
      }
    },

    fasterWords: () => {
      setVar()
      if (w['total'] >= 25 && !u['fasterWords']) {
        $('#FasterWords').fadeOut()
        u['fasterWords'] = true
        w['total'] -= 25
        w['availableUpgrades'] -= 1
        w['timer'] = w['timer'] * 0.7
        calcGenerating('words')
      } else if (w['total'] < 25) {
        upgradeError()
      }
    },

    fasterSentences: () => {
      setVar()
      if (s['total'] >= 25 && !u['fasterSentences']) {
        $('#FasterSentences').fadeOut()
        u['fasterSentences'] = true
        s['total'] -= 25
        s['availableUpgrades'] -= 1
        s['timer'] = s['timer'] * 0.75
        calcGenerating('sentences')
      } else if (s['total'] < 25) {
        upgradeError()
      }
    },

    efficientWords: () => {
      setVar()
      if (l['total'] >= 1450 && !u['efficientWords']) {
        $('#EfficientWords').fadeOut()
        u['efficientWords'] = true
        l['total'] -= 1450
        l['availableUpgrades'] -= 1
        w['cost'] = w['cost'] * 0.9
        calcGenerating('words')
      } else if (l['total'] < 1450) {
        upgradeError()
      }
    },

    wordWhiz: () => {
      setVar()
      if (w['total'] >= 100 && !u['wordWhiz']) {
        $('#WordWhiz').fadeOut()
        u['wordWhiz'] = true
        w['total'] -= 100
        w['availableUpgrades'] -= 1
        w['multiplier'] += 0.15
        calcGenerating('words')
      } else if (w['total'] < 100) {
        upgradeError()
      }
    },

    smarterLetters: () => {
      setVar()
      if (l['total'] >= 500 && !u['smarterLetters']) {
        $('#SmarterLetters').fadeOut()
        u['smarterLetters'] = true
        l['total'] -= 500
        l['availableUpgrades'] -= 1
        l['multiplier'] += 0.1
        calcGenerating('words')
      } else if (l['total'] < 500) {
        upgradeError()
      }
    },
  }
}())
