import { save, calcGenerating, getUpgrade, setAvailUpgrades,
  setBonus, subtractTotal } from './game.js'

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
      if (l.availableUpgrades +
          w.availableUpgrades +
          s.availableUpgrades +
          p.availableUpgrades +
          c.availableUpgrades +
          b.availableUpgrades !== 0) {
        $('#upgradeAvailable').fadeIn()
      } else {
        $('#upgradeAvailable').fadeOut()
      }
      // If there are upgrades, fade in the icon
      if (l.availableUpgrades !== 0) {
        $('#LettersUpgradeAvailable').fadeIn()
      } if (w.availableUpgrades !== 0) {
        $('#WordsUpgradeAvailable').fadeIn()
      } if (s.availableUpgrades !== 0) {
        $('#SentencesUpgradeAvailable').fadeIn()
      } if (p.availableUpgrades !== 0) {
        $('#PagesUpgradeAvailable').fadeIn()
      } if (c.availableUpgrades !== 0) {
        $('#ChaptersUpgradeAvailable').fadeIn()
      } if (b.availableUpgrades !== 0) {
        $('#BooksUpgradeAvailable').fadeIn()
      }
      // If there are no upgrades, fade out the icon
      if (l.availableUpgrades === 0) {
        $('#LettersUpgradeAvailable').fadeOut()
      } if (w.availableUpgrades === 0) {
        $('#WordsUpgradeAvailable').fadeOut()
      } if (s.availableUpgrades === 0) {
        $('#SentencesUpgradeAvailable').fadeOut()
      } if (p.availableUpgrades === 0) {
        $('#PagesUpgradeAvailable').fadeOut()
      } if (c.availableUpgrades === 0) {
        $('#ChaptersUpgradeAvailable').fadeOut()
      } if (b.availableUpgrades === 0) {
        $('#BooksUpgradeAvailable').fadeOut()
      }
    },
    setup: () => {
      setVar()
      if (u.writeWords) { $('#wordsManualSection').fadeIn() }
      if (u.writeSentences) { $('#sentencesManualSection').fadeIn() }
      if (u.writePages) { $('#pagesManualSection').fadeIn() }
    },

    writeWords: () => {
      setVar()
      if (l.total >= 34 && !u.writeWords) {
        $('#WriteWords').fadeOut()        // Fade out button
        getUpgrade('writeWords')          // Set upgrade to purchased
        subtractTotal('letters', 34)      // Deduct cost
        setAvailUpgrades('letters', '-')     // Deduct purchaseable upgrade
        $('#wordsManualSection').fadeIn() // Fade in purchased section
      } else if (l.total < 34) {
        upgradeError()
      }
    },

    writeSentences: () => {
      setVar()
      if (w.total >= 30 && !u.writeSentences) {
        $('#WriteSentences').fadeOut()
        getUpgrade('writeSentences')
        subtractTotal('words', 30)
        setAvailUpgrades('words', '-')
        $('#sentencesManualSection').fadeIn()
      } else if (w.total < 30) {
        upgradeError()
      }
    },

    writePages: () => {
      setVar()
      if (s.total >= 50 && !u.writePages) {
        $('#WritePages').fadeOut()
        getUpgrade('writePages')
        subtractTotal('sentences', 50)
        setAvailUpgrades('sentences', '-')
        $('#pagesManualSection').fadeIn()
      } else if (w.total < 50) {
        upgradeError()
      }
    },

    fasterLetters: () => {
      setVar()
      if (l.total >= 175 && !u.fasterLetters) {
        $('#FasterLetters').fadeOut()
        getUpgrade('fasterLetters')
        subtractTotal('letters', 175)
        setAvailUpgrades('letters', '-')
        setBonus('letters', 'timer', 0.5)
        calcGenerating('letters')
      } else if (l.total < 175) {
        upgradeError()
      }
    },

    efficientMonkeys: () => {
      setVar()
      if (l.total >= 75 && !u.efficientMonkeys) {
        $('#EfficientMonkeys').fadeOut()
        getUpgrade('efficientMonkeys')
        subtractTotal('letters', 75)
        setAvailUpgrades('letters', '-')
        setBonus('monkeys', 'multiplier', 1.1)
        calcGenerating('letters')
      } else if (l.total < 75) {
        upgradeError()
      }
    },

    monkeyIntelligenceI: () => {
      setVar()
      if (l.total >= 350 && !u.monkeyIntelligenceI) {
        $('#MonkeyIntelligenceI').fadeOut()
        getUpgrade('monkeyIntelligenceI')
        subtractTotal('letters', 350)
        setAvailUpgrades('letters', '-')
        setBonus('monkeys', 'multiplier', 1.2)
        calcGenerating('letters')
      } else if (l.total < 350) {
        upgradeError()
      }
    },

    monkeyIntelligenceII: () => {
      setVar()
      if (l.total >= 775 && !u.monkeyIntelligenceII) {
        $('#MonkeyIntelligenceII').fadeOut()
        getUpgrade('monkeyIntelligenceII')
        subtractTotal('letters', 775)
        setAvailUpgrades('letters', '-')
        setBonus('monkeys', 'multiplier', 1.25)
        calcGenerating('letters')
      } else if (l.total < 775) {
        upgradeError()
      }
    },

    monkeyIntelligenceBreakthrough: () => {
      setVar()
      if (l.total >= 2200 && !u.monkeyIntelligenceBreakthrough) {
        $('#MonkeyIntelligenceBreakthrough').fadeOut()
        getUpgrade('monkeyIntelligenceBreakthrough')
        subtractTotal('letters', 2200)
        setAvailUpgrades('letters', '-')
        setBonus('monkeys', 'multiplier', 2.0)
        calcGenerating('letters')
      } else if (l.total < 2200) {
        upgradeError()
      }
    },

    fasterWords: () => {
      setVar()
      if (w.total >= 25 && !u.fasterWords) {
        $('#FasterWords').fadeOut()
        getUpgrade('fasterWords')
        subtractTotal('words', 25)
        setAvailUpgrades('words', '-')
        setBonus('words', 'timer', 0.7)
        calcGenerating('words')
      } else if (w.total < 25) {
        upgradeError()
      }
    },

    fasterSentences: () => {
      setVar()
      if (s.total >= 25 && !u.fasterSentences) {
        $('#FasterSentences').fadeOut()
        getUpgrade('fasterSentences')
        subtractTotal('sentences', 25)
        setAvailUpgrades('sentences', '-')
        setBonus('sentences', 'timer', 0.75)
        calcGenerating('sentences')
      } else if (s.total < 25) {
        upgradeError()
      }
    },

    efficientWords: () => {
      setVar()
      if (l.total >= 1450 && !u.efficientWords) {
        $('#EfficientWords').fadeOut()
        getUpgrade('efficientWords')
        subtractTotal('letters', 1450)
        setAvailUpgrades('letters', '-')
        setBonus('words', 'cost', 0.9)
        calcGenerating('words')
      } else if (l.total < 1450) {
        upgradeError()
      }
    },

    wordWhiz: () => {
      setVar()
      if (w.total >= 100 && !u.wordWhiz) {
        $('#WordWhiz').fadeOut()
        getUpgrade('wordWhiz')
        subtractTotal('words', 100)
        setAvailUpgrades('words', '-')
        setBonus('words', 'multiplier', 1.15)
        calcGenerating('words')
      } else if (w.total < 100) {
        upgradeError()
      }
    },

    smarterLetters: () => {
      setVar()
      if (l.total >= 500 && !u.smarterLetters) {
        $('#SmarterLetters').fadeOut()
        getUpgrade('smarterLetters')
        subtractTotal('letters', 500)
        setAvailUpgrades('letters', '-')
        setBonus('letters', 'multiplier', 1.1)
        calcGenerating('letters')
      } else if (l.total < 500) {
        upgradeError()
      }
    },

    higherLearning: () => {
      setVar()
      if (s.total >= 105 && !u.higherLearning) {
        $('#HigherLearning').fadeOut()
        getUpgrade('higherLearning')
        subtractTotal('sentences', 105)
        setAvailUpgrades('sentences', '-')
        setBonus('words', 'multiplier', 1.15)
        calcGenerating('words')
      } else if (s.total < 105) {
        upgradeError()
      }
    },

    wordOfWisdom: () => {
      setVar()
      if (w.total >= 550 && !u.wordOfWisdom) {
        $('#WordOfWisdom').fadeOut()
        getUpgrade('wordOfWisdom')
        subtractTotal('words', 550)
        setAvailUpgrades('words', '-')
        setBonus('words', 'multiplier', 1.5)
        calcGenerating('words')
      } else if (w.total < 550) {
        upgradeError()
      }
    },

    tooManyLetters: () => {
      setVar()
      if (l.total >= 5000 && !u.tooManyLetters) {
        $('#TooManyLetters').fadeOut()
        getUpgrade('tooManyLetters')
        subtractTotal('letters', 5000)
        setAvailUpgrades('letters', '-')
        setBonus('words', 'multiplier', 3.0)
        calcGenerating('words')
      } else if (l.total < 5000) {
        upgradeError()
      }
    },

    longerSentences: () => {
      setVar()
      if (s.total >= 150 && !u.longerSentences) {
        $('#LongerSentences').fadeOut()
        getUpgrade('longerSentences')
        subtractTotal('sentences', 150)
        setAvailUpgrades('sentences', '-')
        setBonus('sentences', 'cost', 1.1)
        setBonus('sentences', 'multiplier', 1.5)
        calcGenerating('sentences')
      } else if (s.total < 150) {
        upgradeError()
      }
    },

    gettingTheHangOfIt: () => {
      setVar()
      if (w.total >= 300 && !u.gettingTheHangOfIt) {
        $('#GettingTheHangOfIt').fadeOut()
        getUpgrade('gettingTheHangOfIt')
        subtractTotal('words', 300)
        setAvailUpgrades('words', '-')
        setBonus('words', 'timer', 0.5)
        calcGenerating('words')
      } else if (w.total < 300) {
        upgradeError()
      }
    },

    sticksAndStones: () => {
      setVar()
      if (w.total >= 1100 && !u.sticksAndStones) {
        $('#SticksAndStones').fadeOut()
        getUpgrade('sticksAndStones')
        subtractTotal('words', 1100)
        setAvailUpgrades('words', '-')
        setBonus('words', 'cost', 1.2)
        setBonus('words', 'multiplier', 1.5)
        calcGenerating('words')
      } else if (w.total < 1100) {
        upgradeError()
      }
    },

    monkeyGlasses: () => {
      setVar()
      if (l.total >= 3400 && !u.monkeyGlasses) {
        $('#MonkeyGlasses').fadeOut()
        getUpgrade('monkeyGlasses')
        subtractTotal('letters', 3400)
        setAvailUpgrades('letters', '-')
        setBonus('monkeys', 'multiplier', 2.5)
        calcGenerating('letters')
      } else if (l.total < 3400) {
        upgradeError()
      }
    },

    evenFasterSentences: () => {
      setVar()
      if (s.total >= 85 && !u.evenFasterSentences) {
        $('#EvenFasterSentences').fadeOut()
        getUpgrade('evenFasterSentences')
        subtractTotal('sentences', 85)
        setAvailUpgrades('sentences', '-')
        setBonus('sentences', 'timer', 0.5)
        calcGenerating('sentences')
      } else if (s.total < 85) {
        upgradeError()
      }
    },

    letterTradeoff: () => {
      setVar()
      if (s.total >= 125 && !u.letterTradeoff) {
        $('#LetterTradeoff').fadeOut()
        getUpgrade('letterTradeoff')
        subtractTotal('sentences', 125)
        setAvailUpgrades('sentences', '-')
        setBonus('letters', 'multiplier', 0.9)
        setBonus('sentences', 'multiplier', 1.3)
        calcGenerating('sentences')
        calcGenerating('letters')
      } else if (s.total < 125) {
        upgradeError()
      }
    },

    commonKnowledge: () => {
      setVar()
      if (s.total >= 210 && !u.commonKnowledge) {
        $('#CommonKnowledge').fadeOut()
        getUpgrade('commonKnowledge')
        subtractTotal('sentences', 210)
        setAvailUpgrades('sentences', '-')
        setBonus('pages', 'timer', 0.5)
        calcGenerating('pages')
      } else if (s.total < 210) {
        upgradeError()
      }
    },

    repeatingPatterns: () => {
      setVar()
      if (s.total >= 500 && !u.repeatingPatterns) {
        $('#RepeatingPatterns').fadeOut()
        getUpgrade('repeatingPatterns')
        subtractTotal('sentences', 500)
        setAvailUpgrades('sentences', '-')
        setBonus('sentences', 'multiplier', 1.35)
        setBonus('sentences', 'timer', 0.75)
        calcGenerating('sentences')
      } else if (s.total < 500) {
        upgradeError()
      }
    },
  }
})()
export default upgrade
