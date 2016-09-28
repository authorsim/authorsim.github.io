import { save, setAvailUpgrades } from './game.js'

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
      setAvailUpgrades('letters', '+')
      unlocks.remove(writeWords)
    } else if (u['writeWords']) {
      unlocks.remove(writeWords)
    }
  }

  const fasterLetters = () => {
    if (l['lifetime'] >= 475 && !u['fasterLetters']) {
      $('#FasterLetters').fadeIn()
      setAvailUpgrades('letters', '+')
      unlocks.remove(fasterLetters)
    } else if (u['fasterLetters']) {
      unlocks.remove(fasterLetters)
    }
  }

  const efficientMonkeys = () => {
    if (l['lifetime'] >= 275 && m['total'] >= 3 && !u['efficientMonkeys']) {
      $('#EfficientMonkeys').fadeIn()
      setAvailUpgrades('letters', '+')
      unlocks.remove(efficientMonkeys)
    } else if (u['efficientMonkeys']) {
      unlocks.remove(efficientMonkeys)
    }
  }

  const monkeyIntelligenceI = () => {
    if (l['lifetime'] >= 655 && m['total'] >= 7 && !u['monkeyIntelligenceI']) {
      $('#MonkeyIntelligenceI').fadeIn()
      setAvailUpgrades('letters', '+')
      unlocks.remove(monkeyIntelligenceI)
    } else if (u['monkeyIntelligenceI']) {
      unlocks.remove(monkeyIntelligenceI)
    }
  }

  const smarterLetters = () => {
    if (l['lifetime'] >= 1200 && !u['smarterLetters']) {
      $('#SmarterLetters').fadeIn()
      setAvailUpgrades('letters', '+')
      unlocks.remove(smarterLetters)
    } else if (u['smarterLetters']) {
      unlocks.remove(smarterLetters)
    }
  }

  const monkeyIntelligenceII = () => {
    if (l['lifetime'] >= 1600 && m['total'] >= 13 && !u['monkeyIntelligenceII']) {
      $('#MonkeyIntelligenceII').fadeIn()
      setAvailUpgrades('letters', '+')
      unlocks.remove(monkeyIntelligenceII)
    } else if (u['monkeyIntelligenceII']) {
      unlocks.remove(monkeyIntelligenceII)
    }
  }

  const efficientWords = () => {
    if (l['lifetime'] >= 2300 && !u['efficientWords']) {
      $('#EfficientWords').fadeIn()
      setAvailUpgrades('letters', '+')
      unlocks.remove(efficientWords)
    } else if (u['efficientWords']) {
      unlocks.remove(efficientWords)
    }
  }

  const monkeyIntelligenceBreakthrough = () => {
    if (l['lifetime'] >= 4000 && m['total'] >= 20 && !u['monkeyIntelligenceBreakthrough']) {
      $('#MonkeyIntelligenceBreakthrough').fadeIn()
      setAvailUpgrades('letters', '+')
      unlocks.remove(monkeyIntelligenceBreakthrough)
    } else if (u['monkeyIntelligenceBreakthrough']) {
      unlocks.remove(monkeyIntelligenceBreakthrough)
    }
  }

  const tooManyLetters = () => {
    if (l['total'] >= 20000 && !u['tooManyLetters']) {
      $('#TooManyLetters').fadeIn()
      setAvailUpgrades('letters', '+')
      unlocks.remove(tooManyLetters)
    } else if (u['tooManyLetters']) {
      unlocks.remove(tooManyLetters)
    }
  }

  const monkeyGlasses = () => {
    if (l['lifetime'] >= 20000 && m['total'] >= 28 && !u['monkeyGlasses']) {
      $('#MonkeyGlasses').fadeIn()
      setAvailUpgrades('letters', '+')
      unlocks.remove(monkeyGlasses)
    } else if (u['monkeyGlasses']) {
      unlocks.remove(monkeyGlasses)
    }
  }

  const anotherFinger = () => {
    if (l['lifetime'] >= 40000 && m['total'] >= 64 && !u['anotherFinger']) {
      $('#AnotherFinger').fadeIn()
      setAvailUpgrades('letters', '+')
      unlocks.remove(anotherFinger)
    } else if (u['anotherFinger']) {
      unlocks.remove(anotherFinger)
    }
  }

  const thirdArm = () => {
    if (l['lifetime'] >= 70000 && m['total'] >= 100 && !u['thirdArm']) {
      $('#ThirdArm').fadeIn()
      setAvailUpgrades('letters', '+')
      unlocks.remove(thirdArm)
    } else if (u['thirdArm']) {
      unlocks.remove(thirdArm)
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
      setAvailUpgrades('words', '+')
      unlocks.remove(writeSentences)
    } else if (u['writeSentences']) {
      unlocks.remove(writeSentences)
    }
  }

  const fasterWords = () => {
    if (w['lifetime'] >= 45 && !u['fasterWords']) {
      $('#FasterWords').fadeIn()
      setAvailUpgrades('words', '+')
      unlocks.remove(fasterWords)
    } else if (u['fasterWords']) {
      unlocks.remove(fasterWords)
    }
  }

  const wordWhiz = () => {
    if (w['lifetime'] >= 450 && !u['wordWhiz']) {
      $('#WordWhiz').fadeIn()
      setAvailUpgrades('words', '+')
      unlocks.remove(wordWhiz)
    } else if (u['wordWhiz']) {
      unlocks.remove(wordWhiz)
    }
  }

  const wordOfWisdom = () => {
    if (w['lifetime'] >= 950 && !u['wordOfWisdom']) {
      $('#WordOfWisdom').fadeIn()
      setAvailUpgrades('words', '+')
      unlocks.remove(wordOfWisdom)
    } else if (u['wordOfWisdom']) {
      unlocks.remove(wordOfWisdom)
    }
  }

  const gettingTheHangOfIt = () => {
    if (w['lifetime'] >= 600 && !u['gettingTheHangOfIt']) {
      $('#GettingTheHangOfIt').fadeIn()
      setAvailUpgrades('words', '+')
      unlocks.remove(gettingTheHangOfIt)
    } else if (u['gettingTheHangOfIt']) {
      unlocks.remove(gettingTheHangOfIt)
    }
  }

  const sticksAndStones = () => {
    if (w['lifetime'] >= 1600 && !u['sticksAndStones']) {
      $('#SticksAndStones').fadeIn()
      setAvailUpgrades('words', '+')
      unlocks.remove(sticksAndStones)
    } else if (u['sticksAndStones']) {
      unlocks.remove(sticksAndStones)
    }
  }

  const dimeADozen = () => {
    if (w['lifetime'] >= 7600 && !u['dimeADozen']) {
      $('#DimeADozen').fadeIn()
      setAvailUpgrades('words', '+')
      unlocks.remove(dimeADozen)
    } else if (u['dimeADozen']) {
      unlocks.remove(dimeADozen)
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

  const writePages = () => {
    if (s['lifetime'] >= 223 && !u['writePages']) {
      $('#WritePages').fadeIn()
      setAvailUpgrades('sentences', '+')
      unlocks.remove(writePages)
    } else if (u['writePages']) {
      unlocks.remove(writePages)
    }
  }

  const fasterSentences = () => {
    if (s['lifetime'] >= 39 && !u['fasterSentences']) {
      $('#FasterSentences').fadeIn()
      setAvailUpgrades('sentences', '+')
      unlocks.remove(fasterSentences)
    } else if (u['fasterSentences']) {
      unlocks.remove(fasterSentences)
    }
  }

  const evenFasterSentences = () => {
    if (s['lifetime'] >= 95 && !u['evenFasterSentences']) {
      $('#EvenFasterSentences').fadeIn()
      setAvailUpgrades('sentences', '+')
      unlocks.remove(evenFasterSentences)
    } else if (u['evenFasterSentences']) {
      unlocks.remove(evenFasterSentences)
    }
  }

  const higherLearning = () => {
    if (s['lifetime'] >= 9 && !u['higherLearning']) {
      $('#HigherLearning').fadeIn()
      setAvailUpgrades('sentences', '+')
      unlocks.remove(higherLearning)
    } else if (u['higherLearning']) {
      unlocks.remove(higherLearning)
    }
  }

  const longerSentences = () => {
    if (s['lifetime'] >= 265 && !u['longerSentences']) {
      $('#LongerSentences').fadeIn()
      setAvailUpgrades('sentences', '+')
      unlocks.remove(longerSentences)
    } else if (u['longerSentences']) {
      unlocks.remove(longerSentences)
    }
  }

  const letterTradeoff = () => {
    if (s['lifetime'] >= 325 && !u['letterTradeoff']) {
      $('#LetterTradeoff').fadeIn()
      setAvailUpgrades('sentences', '+')
      unlocks.remove(letterTradeoff)
    } else if (u['letterTradeoff']) {
      unlocks.remove(letterTradeoff)
    }
  }

  const commonKnowledge = () => {
    if (p['lifetime'] >= 1 && !u['commonKnowledge']) {
      $('#CommonKnowledge').fadeIn()
      setAvailUpgrades('sentences', '+')
      unlocks.remove(commonKnowledge)
    } else if (u['commonKnowledge']) {
      unlocks.remove(commonKnowledge)
    }
  }

  const repeatingPatterns = () => {
    if (s['lifetime'] >= 785 && !u['repeatingPatterns']) {
      $('#RepeatingPatterns').fadeIn()
      setAvailUpgrades('sentences', '+')
      unlocks.remove(repeatingPatterns)
    } else if (u['repeatingPatterns']) {
      unlocks.remove(repeatingPatterns)
    }
  }

  const biggerFontSize = () => {
    if (s['lifetime'] >= 2100 && !u['biggerFontSize']) {
      $('#BiggerFontSize').fadeIn()
      setAvailUpgrades('sentences', '+')
      unlocks.remove(biggerFontSize)
    } else if (u['biggerFontSize']) {
      unlocks.remove(biggerFontSize)
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

  const writeChapters = () => {
    if (p['lifetime'] >= 425 && !u['writeChapters']) {
      $('#WriteChapters').fadeIn()
      setAvailUpgrades('pages', '+')
      unlocks.remove(writeChapters)
    } else if (u['writeChapters']) {
      unlocks.remove(writeChapters)
    }
  }

  const jumpOffThePage = () => {
    if (p['lifetime'] >= 15 && !u['jumpOffThePage']) {
      $('#JumpOffThePage').fadeIn()
      setAvailUpgrades('pages', '+')
      unlocks.remove(jumpOffThePage)
    } else if (u['jumpOffThePage']) {
      unlocks.remove(jumpOffThePage)
    }
  }

  const fasterPages = () => {
    if (p['lifetime'] >= 47 && !u['fasterPages']) {
      $('#FasterPages').fadeIn()
      setAvailUpgrades('pages', '+')
      unlocks.remove(fasterPages)
    } else if (u['fasterPages']) {
      unlocks.remove(fasterPages)
    }
  }

  const smallerMargins = () => {
    if (p['lifetime'] >= 180 && !u['smallerMargins']) {
      $('#SmallerMargins').fadeIn()
      setAvailUpgrades('pages', '+')
      unlocks.remove(smallerMargins)
    } else if (u['smallerMargins']) {
      unlocks.remove(smallerMargins)
    }
  }

  const trickleEffect = () => {
    if (p['lifetime'] >= 350 && !u['trickleEffect']) {
      $('#TrickleEffect').fadeIn()
      setAvailUpgrades('pages', '+')
      unlocks.remove(trickleEffect)
    } else if (u['trickleEffect']) {
      unlocks.remove(trickleEffect)
    }
  }

  const tripleSpacing = () => {
    if (p['lifetime'] >= 550 && !u['tripleSpacing']) {
      $('#TripleSpacing').fadeIn()
      setAvailUpgrades('pages', '+')
      unlocks.remove(tripleSpacing)
    } else if (u['tripleSpacing']) {
      unlocks.remove(tripleSpacing)
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

  const writeBooks = () => {
    if (c['lifetime'] >= 15 && !u['writeBooks']) {
      $('#WriteBooks').fadeIn()
      setAvailUpgrades('chapters', '+')
      unlocks.remove(writeBooks)
    } else if (u['writeBooks']) {
      unlocks.remove(writeBooks)
    }
  }

  const fasterChapters = () => {
    if (c['lifetime'] >= 1 && !u['fasterChapters']) {
      $('#FasterChapters').fadeIn()
      setAvailUpgrades('chapters', '+')
      unlocks.remove(fasterChapters)
    } else if (u['fasterChapters']) {
      unlocks.remove(fasterChapters)
    }
  }

  const shareTheLove = () => {
    if (c['lifetime'] >= 5 && !u['shareTheLove']) {
      $('#ShareTheLove').fadeIn()
      setAvailUpgrades('chapters', '+')
      unlocks.remove(shareTheLove)
    } else if (u['shareTheLove']) {
      unlocks.remove(shareTheLove)
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
      // Letter Unlocks
      unlocks.add(seeWords)
      unlocks.add(writeWords)
      unlocks.add(fasterLetters)
      unlocks.add(efficientMonkeys)
      unlocks.add(monkeyIntelligenceI)
      unlocks.add(monkeyIntelligenceII)
      unlocks.add(monkeyIntelligenceBreakthrough)
      unlocks.add(smarterLetters)
      unlocks.add(tooManyLetters)
      unlocks.add(monkeyGlasses)
      unlocks.add(anotherFinger)
      unlocks.add(thirdArm)

      // Word Unlocks
      unlocks.add(seeSentences)
      unlocks.add(writeSentences)
      unlocks.add(fasterWords)
      unlocks.add(wordWhiz)
      unlocks.add(wordOfWisdom)
      unlocks.add(gettingTheHangOfIt)
      unlocks.add(sticksAndStones)
      unlocks.add(dimeADozen)

      // Sentence Unlocks
      unlocks.add(seePages)
      unlocks.add(writePages)
      unlocks.add(fasterSentences)
      unlocks.add(evenFasterSentences)
      unlocks.add(longerSentences)
      unlocks.add(higherLearning)
      unlocks.add(letterTradeoff)
      unlocks.add(commonKnowledge)
      unlocks.add(repeatingPatterns)
      unlocks.add(biggerFontSize)

      // Page Unlocks
      unlocks.add(seeChapters)
      unlocks.add(writeChapters)
      unlocks.add(jumpOffThePage)
      unlocks.add(fasterPages)
      unlocks.add(smallerMargins)
      unlocks.add(trickleEffect)
      unlocks.add(tripleSpacing)

      // Chapter Unlocks
      unlocks.add(seeBooks)
      unlocks.add(writeBooks)
      unlocks.add(fasterChapters)
      unlocks.add(shareTheLove)

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

export default unlock
