const upgrade = (function() {
  // Create callback objects
  let upgrades = $.Callbacks()

  // Create shortcut variables to reduce typing
  let u, l, w, s, p, c, b
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

  return {
    // Checks regularly to fade in icon if upgrades are purchaseable
    check: function() {
      setVar()
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
    setup: function() {
      setVar()
      if (u['writeWords']) { $('#wordsManualSection').fadeIn() }
      if (u['writeSentences']) { $('#sentencesManualSection').fadeIn() }
    },

    writeWords: function() {
      setVar()
      if (l['total'] >= 34 && !u['writeWords']) {
        $('#WriteWords').fadeOut()        // Fade out button
        u['writeWords'] = true            // Set upgrade to purchased
        l['total'] -= 34                 // Deduct cost
        l['availableUpgrades'] -= 1       // Deduct purchaseable upgrade
        $('#wordsManualSection').fadeIn() // Fade in purchased section
      } else if (l['total'] < 34) {
        errorAlert('Oh dear...','You are too poor to purchase this upgrade.')
      }
    },

    writeSentences: function() {
      setVar()
      if (w['total'] >= 30 && !u['writeSentences']) {
        $('#WriteSentences').fadeOut()
        u['writeSentences'] = true
        w['total'] -= 30
        w['availableUpgrades'] -= 1
        $('#sentencesManualSection').fadeIn()
      } else if (w['total'] < 30) {
        errorAlert('Oh dear...','You are too poor to purchase this upgrade.')
      }
    },

    fasterLetters: function() {
      setVar()
      if (l['total'] >= 250 && !u['fasterLetters']) {
        $('#FasterLetters').fadeOut()
        u['fasterLetters'] = true
        l['total'] -= 250
        l['availableUpgrades'] -= 1
        l['multiplier'] += 0.1
        calcGenerating('letters')
      } else if (l['total'] < 250) {
        errorAlert('Oh dear...','You are too poor to purchase this upgrade.')
      }
    },

    efficientMonkeys: function() {
      setVar()
      if (l['total'] >= 75 && !u['efficientMonkeys']) {
        $('#EfficientMonkeys').fadeOut()
        u['efficientMonkeys'] = true
        l['total'] -= 75
        l['availableUpgrades'] -= 1
        m['multiplier'] += 0.5
        calcGenerating('letters')
      } else if (l['total'] < 75) {
        errorAlert('Oh dear...','You are too poor to purchase this upgrade.')
      }
    }
  }
}())
