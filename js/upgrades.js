import { save, calcGenerating, setUpgrade } from './game.js'

const upgrade = (() => {
  // Create callback objects
  const upgrades = $.Callbacks()

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
      if (u['writePages']) { $('#pagesManualSection').fadeIn() }
    },

    writeWords: () => {
      setVar()
      if (l['total'] >= 34 && !u['writeWords']) {
        $('#WriteWords').fadeOut()        // Fade out button
        setUpgrade('writeWords')          // Set upgrade to purchased
        l['total'] -= 34                  // Deduct cost
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
        setUpgrade('writeSentences')
        w['total'] -= 30
        w['availableUpgrades'] -= 1
        $('#sentencesManualSection').fadeIn()
      } else if (w['total'] < 30) {
        upgradeError()
      }
    },

    writePages: () => {
      setVar()
      if (s['total'] >= 50 && !u['writePages']) {
        $('#WritePages').fadeOut()
        setUpgrade('writePages')
        s['total'] -= 50
        s['availableUpgrades'] -= 1
        $('#pagesManualSection').fadeIn()
      } else if (w['total'] < 50) {
        upgradeError()
      }
    },

    fasterLetters: () => {
      setVar()
      if (l['total'] >= 175 && !u['fasterLetters']) {
        $('#FasterLetters').fadeOut()
        setUpgrade('fasterLetters')
        l['total'] -= 175
        l['availableUpgrades'] -= 1
        l['timer'] *= 0.5
        calcGenerating('letters')
      } else if (l['total'] < 175) {
        upgradeError()
      }
    },

    efficientMonkeys: () => {
      setVar()
      if (l['total'] >= 75 && !u['efficientMonkeys']) {
        $('#EfficientMonkeys').fadeOut()
        setUpgrade('efficientMonkeys')
        l['total'] -= 75
        l['availableUpgrades'] -= 1
        m['multiplier'] *= 1.1
        calcGenerating('letters')
      } else if (l['total'] < 75) {
        upgradeError()
      }
    },

    monkeyIntelligenceI: () => {
      setVar()
      if (l['total'] >= 350 && !u['monkeyIntelligenceI']) {
        $('#MonkeyIntelligenceI').fadeOut()
        setUpgrade('monkeyIntelligenceI')
        l['total'] -= 350
        l['availableUpgrades'] -= 1
        m['multiplier'] *= 1.2
        calcGenerating('letters')
      } else if (l['total'] < 350) {
        upgradeError()
      }
    },

    monkeyIntelligenceII: () => {
      setVar()
      if (l['total'] >= 775 && !u['monkeyIntelligenceII']) {
        $('#MonkeyIntelligenceII').fadeOut()
        setUpgrade('monkeyIntelligenceII')
        l['total'] -= 775
        l['availableUpgrades'] -= 1
        m['multiplier'] *= 1.25
        calcGenerating('letters')
      } else if (l['total'] < 775) {
        upgradeError()
      }
    },

    monkeyIntelligenceBreakthrough: () => {
      setVar()
      if (l['total'] >= 2200 && !u['monkeyIntelligenceBreakthrough']) {
        $('#MonkeyIntelligenceBreakthrough').fadeOut()
        setUpgrade('monkeyIntelligenceBreakthrough')
        l['total'] -= 2200
        l['availableUpgrades'] -= 1
        m['multiplier'] *= 2.00
        calcGenerating('letters')
      } else if (l['total'] < 2200) {
        upgradeError()
      }
    },

    fasterWords: () => {
      setVar()
      if (w['total'] >= 25 && !u['fasterWords']) {
        $('#FasterWords').fadeOut()
        setUpgrade('fasterWords')
        w['total'] -= 25
        w['availableUpgrades'] -= 1
        w['timer'] *= 0.7
        calcGenerating('words')
      } else if (w['total'] < 25) {
        upgradeError()
      }
    },

    fasterSentences: () => {
      setVar()
      if (s['total'] >= 25 && !u['fasterSentences']) {
        $('#FasterSentences').fadeOut()
        setUpgrade('fasterSentences')
        s['total'] -= 25
        s['availableUpgrades'] -= 1
        s['timer'] *= 0.75
        calcGenerating('sentences')
      } else if (s['total'] < 25) {
        upgradeError()
      }
    },

    efficientWords: () => {
      setVar()
      if (l['total'] >= 1450 && !u['efficientWords']) {
        $('#EfficientWords').fadeOut()
        setUpgrade('efficientWords')
        l['total'] -= 1450
        l['availableUpgrades'] -= 1
        w['cost'] *= 0.9
        calcGenerating('words')
      } else if (l['total'] < 1450) {
        upgradeError()
      }
    },

    wordWhiz: () => {
      setVar()
      if (w['total'] >= 100 && !u['wordWhiz']) {
        $('#WordWhiz').fadeOut()
        setUpgrade('wordWhiz')
        w['total'] -= 100
        w['availableUpgrades'] -= 1
        w['multiplier'] *= 1.15
        calcGenerating('words')
      } else if (w['total'] < 100) {
        upgradeError()
      }
    },

    smarterLetters: () => {
      setVar()
      if (l['total'] >= 500 && !u['smarterLetters']) {
        $('#SmarterLetters').fadeOut()
        setUpgrade('smarterLetters')
        l['total'] -= 500
        l['availableUpgrades'] -= 1
        l['multiplier'] *= 1.1
        calcGenerating('letters')
      } else if (l['total'] < 500) {
        upgradeError()
      }
    },

    higherLearning: () => {
      setVar()
      if (s['total'] >= 105 && !u['higherLearning']) {
        $('#HigherLearning').fadeOut()
        setUpgrade('higherLearning')
        s['total'] -= 105
        s['availableUpgrades'] -= 1
        w['multiplier'] *= 1.15
        calcGenerating('words')
      } else if (s['total'] < 105) {
        upgradeError()
      }
    },

    wordOfWisdom: () => {
      setVar()
      if (w['total'] >= 550 && !u['wordOfWisdom']) {
        $('#WordOfWisdom').fadeOut()
        setUpgrade('wordOfWisdom')
        w['total'] -= 550
        w['availableUpgrades'] -= 1
        w['multiplier'] *= 1.50
        calcGenerating('words')
      } else if (w['total'] < 550) {
        upgradeError()
      }
    },

    tooManyLetters: () => {
      setVar()
      if (l['total'] >= 5000 && !u['tooManyLetters']) {
        $('#TooManyLetters').fadeOut()
        setUpgrade('tooManyLetters')
        l['total'] -= 5000
        l['availableUpgrades'] -= 1
        w['multiplier'] *= 3.00
        calcGenerating('words')
      } else if (l['total'] < 5000) {
        upgradeError()
      }
    },

    longerSentences: () => {
      setVar()
      if (s['total'] >= 150 && !u['longerSentences']) {
        $('#LongerSentences').fadeOut()
        setUpgrade('longerSentences')
        s['total'] -= 150
        s['availableUpgrades'] -= 1
        s['cost'] *= 1.10
        s['multiplier'] *= 1.50
        calcGenerating('sentences')
      } else if (s['total'] < 150) {
        upgradeError()
      }
    },

    gettingTheHangOfIt: () => {
      setVar()
      if (w['total'] >= 300 && !u['gettingTheHangOfIt']) {
        $('#GettingTheHangOfIt').fadeOut()
        setUpgrade('gettingTheHangOfIt')
        w['total'] -= 300
        w['availableUpgrades'] -= 1
        w['timer'] *= 0.50
        calcGenerating('words')
      } else if (w['total'] < 300) {
        upgradeError()
      }
    },

    sticksAndStones: () => {
      setVar()
      if (w['total'] >= 1100 && !u['sticksAndStones']) {
        $('#SticksAndStones').fadeOut()
        setUpgrade('sticksAndStones')
        w['total'] -= 1100
        w['availableUpgrades'] -= 1
        w['cost'] *= 1.20
        w['multiplier'] *= 1.50
        calcGenerating('words')
      } else if (w['total'] < 1100) {
        upgradeError()
      }
    },

    monkeyGlasses: () => {
      setVar()
      if (l['total'] >= 3400 && !u['monkeyGlasses']) {
        $('#MonkeyGlasses').fadeOut()
        setUpgrade('monkeyGlasses')
        l['total'] -= 3400
        l['availableUpgrades'] -= 1
        m['multiplier'] *= 2.50
        calcGenerating('letters')
      } else if (l['total'] < 3400) {
        upgradeError()
      }
    },

    evenFasterSentences: () => {
      setVar()
      if (s['total'] >= 85 && !u['evenFasterSentences']) {
        $('#EvenFasterSentences').fadeOut()
        setUpgrade('evenFasterSentences')
        s['total'] -= 85
        s['availableUpgrades'] -= 1
        s['timer'] *= 0.50
        calcGenerating('sentences')
      } else if (s['total'] < 85) {
        upgradeError()
      }
    },

    letterTradeoff: () => {
      setVar()
      if (s['total'] >= 125 && !u['letterTradeoff']) {
        $('#LetterTradeoff').fadeOut()
        setUpgrade('letterTradeoff')
        s['total'] -= 125
        s['availableUpgrades'] -= 1
        l['multiplier'] *= 0.90
        s['multiplier'] *= 1.30
        calcGenerating('sentences')
        calcGenerating('letters')
      } else if (s['total'] < 125) {
        upgradeError()
      }
    },

    commonKnowledge: () => {
      setVar()
      if (s['total'] >= 210 && !u['commonKnowledge']) {
        $('#CommonKnowledge').fadeOut()
        setUpgrade('commonKnowledge')
        s['total'] -= 210
        s['availableUpgrades'] -= 1
        p['timer'] *= 0.50
        calcGenerating('pages')
      } else if (s['total'] < 210) {
        upgradeError()
      }
    },

    repeatingPatterns: () => {
      setVar()
      if (s['total'] >= 500 && !u['repeatingPatterns']) {
        $('#RepeatingPatterns').fadeOut()
        setUpgrade('repeatingPatterns')
        s['total'] -= 500
        s['availableUpgrades'] -= 1
        s['multiplier'] *= 1.35
        s['timer'] *= 0.75
        calcGenerating('sentences')
      } else if (s['total'] < 500) {
        upgradeError()
      }
    },
  }
})()
export default upgrade
