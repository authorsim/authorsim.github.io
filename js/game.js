import { levelUp } from './staff.js'
import unlock from './unlocks.js'
import upgrade from './upgrades.js'
import achieve from './achievements.js'

// Declare variables
const interval = 20

export const units = ['letters', 'words', 'sentences',
                'pages', 'chapters', 'books', 'series']

export let save
const init = () => {
  save = {
    ver: '0.6.1',
    monkeys: { total: 0,
                multiplier: 1.0,
                cost: 1,
                lifetime: 0,
    },
    letters: { unit: 'letters',
                total: 0,
                manual: false,
                generating: 0,
                using: 0,
                multiplier: 1,
                lifetime: 0,
                timer: 0.6,
                progress: 0,
                availableUpgrades: 0,
    },
    words: { unit: 'words',
                total: 0,
                manual: false,
                generating: 0,
                using: 0,
                multiplier: 1,
                lifetime: 0,
                timer: 1.5,
                progress: 0,
                availableUpgrades: 0,
                cost: 6,
    },
    sentences: { unit: 'sentences',
                total: 0,
                manual: false,
                generating: 0,
                using: 0,
                multiplier: 1,
                lifetime: 0,
                timer: 20,
                progress: 0,
                availableUpgrades: 0,
                cost: 15,
    },
    pages: { unit: 'pages',
                total: 0,
                manual: false,
                generating: 0,
                using: 0,
                multiplier: 1,
                lifetime: 0,
                timer: 60,
                progress: 0,
                availableUpgrades: 0,
                cost: 17,
    },
    chapters: { unit: 'chapters',
                total: 0,
                manual: false,
                generating: 0,
                using: 0,
                multiplier: 1,
                lifetime: 0,
                timer: 240,
                progress: 0,
                availableUpgrades: 0,
                cost: 20,
    },
    books: { unit: 'books',
                total: 0,
                manual: false,
                generating: 0,
                using: 0,
                multiplier: 1,
                lifetime: 0,
                timer: 600,
                progress: 0,
                availableUpgrades: 0,
                cost: 25,
    },
    series: { unit: 'series',
                total: 0,
                manual: false,
                generating: 0,
                multiplier: 1,
                lifetime: 0,
                timer: 1200,
                proress: 0,
                availableUpgrades: 0,
                cost: 3,
    },
    office: { space: 0, counter: 1 },
    staff: { s1: {},
                s2: {},
                s3: {},
                s4: {},
                s5: {},
                s6: {},
                s7: {},
                s8: {},
                s9: {},

    },
    upgrades: { writeWords: false,
                writeSentences: false,
                writePages: false,
                writeChapters: false,
                fasterLetters: false,
                efficientMonkeys: false,
                fasterWords: false,
                fasterSentences: false,
                efficientWords: false,
                monkeyIntelligenceI: false,
                monkeyIntelligenceII: false,
                monkeyIntelligenceBreakthrough: false,
                wordWhiz: false,
                smarterLetters: false,
                higherLearning: false,
                wordOfWisdom: false,
                tooManyLetters: false,
                longerSentences: false,
                gettingTheHangOfIt: false,
                sticksAndStones: false,
                monkeyGlasses: false,
                evenFasterSentences: false,
                letterTradeoff: false,
                commonKnowledge: false,
                repeatingPatterns: false,
                jumpOffThePage: false,
                fasterPages: false,
                dimeADozen: false,
                anotherFinger: false,
                smallerMargins: false,
                trickleEffect: false,
                biggerFontSize: false,
                tripleSpacing: false,
                shareTheLove: false,
                fasterChapters: false,
                thirdArm: false,
    },
    achievements: { findPongo: false,
    },
  }
}

//
// Functions to manipulate the save variable
//

export const getUpgrade = (upg) => {
  save.upgrades[upg] = true
}

export const getAch = (ach) => {
  save.achievements[ach] = true
}

const setGenerating = (unit, value) => {
  save[unit].generating = value
}

const setUsing = (unit, value) => {
  save[unit].using = value
}

export const setAvailUpgrades = (unit, operator) => {
  if (operator === '+') {
    save[unit].availableUpgrades += 1
  } else if (operator === '-') {
    save[unit].availableUpgrades -= 1
  }
}

export const subtractTotal = (unit, num) => {
  save[unit].total -= num
}

export const setBonus = (unit, perk, value) => {
  save[unit][perk] *= value
}

// If the save object doesn't yet exist, create it.
if (typeof save === 'undefined') { init() }

//
// Writing calculation pieces
//

const calcUsing = (unit) => {
  let p = ''
  const c = save[unit]
  units.forEach((cv, i, arr) => {
    if (cv === unit) {
      p = arr[i - 1]
    }
  })
  let prev = 0
  if (c['manual']) { // Check manual writing
    prev += c['cost'] / c['timer'] * c['multiplier']
  }
  for (let i = 1; i < 10; i++) { // Check staff writing
    const s = save['staff']['s' + i]
    if (s && s['writing'] === unit) {
      prev += ((1 / c['timer'] * c['cost']) / s['eff'] * s['speed'] / 2) * c['multiplier']
    }
  }
  setUsing(p, prev)
}

export const calcGenerating = (unit) => {
  if (unit === 'all') {
    calcGenerating('letters')
    calcGenerating('words')
    calcGenerating('sentences')
    calcGenerating('pages')
    calcGenerating('chapters')
    calcGenerating('books')
    return
  }
  const c = save[unit]
  let g = 0
  if (c['manual']) { // Check manual writing
    g += 1 / c['timer'] * c['multiplier']
  }
  for (let i = 1; i < 10; i++) { // Check staff writing
    const s = save['staff']['s' + i]
    if (s && s['writing'] === unit) {
      g += (1 / c['timer'] * c['multiplier']) * s['speed'] / 2
    }
  }
  if (unit === 'letters') { // Do letters-specific things
    g += save.monkeys.total * save.monkeys.multiplier * c['multiplier']
  }
  if (unit !== 'letters') { // Do non-letters things
    calcUsing(unit)
  }
  setGenerating(unit, g)
}

const getActiveUnit = () => {
  let active = ''
  units.reduce((pv, cv, i, a) => { // Checks all manual to see if true
    const cur = save[cv]['manual']
    if (cur) { active = cv } // If a value is true, return it
  }, 0)
  return active
}

const disengageWriting = () => {
  units.forEach((cur, i, arr) => {
    // Set all units to false
    save[cur]['manual'] = false
    save[cur]['progress'] = 0
    calcGenerating(cur)

    // Update progress bar
    $('#write' + cur)
      .css('width', '0%')
      .attr('aria-valuenow', 0)
  })
}

export const startWriting = (unit) => {
  // If an already active unit is clicked, it disengages and stops
  if (unit === getActiveUnit()) {
    disengageWriting()
    return
  }
  // Otherwise it disengages everything and then activates the clicked one
  disengageWriting()

  // Set current to true and recalculate
  save[unit]['manual'] = true
  calcGenerating(unit)

  // Visually update the progress bar
  $('#write' + unit)
    .addClass('progress-bar-striped active')
}

//
// Number prettifier for displaying
//

const nLog = Math.log(10)
const nArray = ['', 'k', 'M', 'B', 'T', 'Qa',
              'Qi', 'Sx', 'Sp', 'Oc', 'No',
              'Dc', 'UnD', 'DuD', 'TrD', 'QaD',
              'QiD', 'SeD', 'SpD', 'OcD', 'NoD',
              'Vi', 'UnV']

// If the number is greater than x.9991, ceil it, otherwise floor it
// Deals with some floating point weirdness in JS
const floor = (n) => {
  return (Math.abs(Math.abs(n) - Math.abs(Math.floor(n))) >= 0.999999999991) ?
            ((n >= 0) ? Math.ceil(n) : Math.floor(n)) :
              ((n >= 0) ? Math.floor(n) : Math.ceil(n))
}

// Function borrowed from /r/incrementalgames
export const prettify = (n, d) => {
  // l is the number of decimal places
  const l = (floor(Math.log(Math.abs(n)) / nLog) <= 0) ?
            0 :
              floor(Math.log(Math.abs(n)) / nLog)
  const p = (l % 3 === 0) ?
              2 :
                (((l - 1) % 3 === 0) ? 1 : 0)
  const r = (Math.abs(n) < 1000) ?
            ((typeof d === 'number') ? n.toFixed(d) : floor(n)) :
              (floor(n / (Math.pow(10, floor(l / 3) * 3 - p))) / Math.pow(10, p))
  return (r + nArray[floor(l / 3)]) || 'Infinite'
}

//
// Loop Functions
//

const incrementLetters = (num) => {
  const l = save.letters
  const m = save.monkeys
  const equation = ((m['total'] * m['multiplier']) / (1000 / interval)) * num
  l['total'] += equation
  l['lifetime'] += equation
}

const writing = (num) => { // Manual writing
  // Returns only when deactivating an already-active writing process
  if (!getActiveUnit()) { return }
  const curr = save[getActiveUnit()]
  // Increment progress bar
  $('#write' + getActiveUnit())
    .css('width', curr['progress'] + '%')
    .attr('aria-valuenow', curr['progress'])
  units.reduce((pv, cv, i, arr) => {
    if (cv === 'letters' && save[cv] === curr) {
      curr['progress'] += (100 / ((curr['timer']) * (1000 / interval)) * num)
      while (curr['progress'] >= 100) {
        // Increment unit and reset progress
        curr['total'] += 1 * curr['multiplier']
        curr['lifetime'] += 1
        curr['progress'] -= 100
      }
    } else if (curr['cost'] <= save[pv]['total'] && save[cv] === curr) {
      curr['progress'] += (100 / (curr['timer'] * (1000 / interval)) * num)
      while (curr['progress'] >= 100) {
        // Increment unit and reset progress
        curr['total'] += 1 * curr['multiplier']
        curr['lifetime'] += 1 * curr['multiplier']
        curr['progress'] -= 100
        // Deduct the cost from the previous unit
        save[pv]['total'] -= curr['cost'] * curr['multiplier']
      }
    }
    return cv
  }, 'letters')
}

const staffWriting = (num) => {
  for (let i = 1; i < 10; i++) { // Loops through all the staff slots
    const s = save['staff']['s' + i]
    if (s && s['writing'] !== 'none') { // Checks if staff member exists and is writing
      for (let j = 0; j < units.length; j++) { // Loops all the units in the specified slot
        if (units[j] === s['writing']) {
          const unit = save[units[j]]
          const pUnit = save[units[j - 1]]
          if (pUnit['total'] >= unit['cost']) { // Checks if you can afford to create a unit
            // Increments the progress bar
            s['progress'] += 100 / (unit['timer'] / s['speed'] * 2) / (1000 / interval) * num
            while (s['progress'] >= 100) { // When the progress bar gets full, run calc
              // Deduct cost from previous unit
              pUnit['total'] -= unit['cost'] / s['eff'] * unit['multiplier']

              // Increment active unit
              unit['total'] += 1 * unit['multiplier']
              unit['lifetime'] += 1 * unit['multiplier']

              // Reset progress bar and exp
              s['progress'] -= 100
              s['exp'] += unit['timer'] * (unit['multiplier'] / 10) / 3

              // Checks for staff level up
              if (s['exp'] >= s['nextExp'] || s['level'] >= s['maxLevel']) {
                levelUp(i)
              }
            }
          }
        }
      }
    }
  }
}

// Error popup in menu bar
export const errorAlert = (title, desc) => {
  $('#error').fadeTo(500, 0.8)
  $('#errorTitle').text(title)
  $('#errorDesc').text(desc)

  // After 7 seconds, fades the window back out
  window.setTimeout(() => {
    $('#error').fadeTo(500, 0)
  }, 7000)
}

//
// Functions on page load (timeout, save)
//

function saveGame() {
  localStorage.setItem('save', JSON.stringify(save))
}

function timeout() {
  window.setTimeout(() => {
    saveGame()
    timeout()
  }, 5000)
}

export const delSave = () => {
  $('#confirmpopMessage').text('Are you sure you want to delete your save?')
  $('.pop').fadeIn()
  $('.confirmpopopacity').fadeIn()
  $('.confirm').off('click').click(() => {
    localStorage.removeItem('save')
    init()
    location.reload()
  })
  $('.deny').off('click').click(() => {
    $('.pop').fadeOut()
    $('.confirmpopopacity').fadeOut()
  })
}

const loadGame = () => {
  if (localStorage.getItem('save') !== null) {
    const load = JSON.parse(localStorage.getItem('save'))
    // Version control system
    /*
    if (savegame.ver <= '1.0.0') {
      localStorage.removeItem('save')
      init()
      saveGame()
    }
    */
    save.ver = load.ver
    save.monkeys = load.monkeys
    save.letters = load.letters
    save.words = load.words
    save.sentences = load.sentences
    save.pages = load.pages
    save.chapters = load.chapters
    save.books = load.books
    save.series = load.series
    save.upgrades = load.upgrades
    save.staff = load.staff
    save.achievements = load.achievements
  }
}

window.onload = () => {
  units.forEach((cv, i, arr) => {
    calcGenerating(cv)
  })
  loadGame()
  timeout()
  unlock.setup()
  upgrade.setup()
  achieve.setup()
}

// Fires before the page unloads
window.onbeforeunload = (e) => { saveGame() }

//
// The loop
//
let before = Date.now()

window.setInterval(() => {
  const now = Date.now()
  const elapsedTime = (now - before)
  const elapsedValue = (elapsedTime / interval)
  incrementLetters(elapsedValue)
  writing(elapsedValue)
  staffWriting(elapsedValue)
  unlock.check()
  upgrade.check()
  before = now
}, 1000 / interval)
