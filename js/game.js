'use strict'

/*
// Import other game JS files
require('./staff.js')
require('./achievements.js')
require('./upgrades.js')
*/

// Declare variables
const interval = 20

const staff = { // Exp and Eff values for all levels of staff
  prestige1: { maxLevel: 4, maxExp: 150, eff: 0.950, speed: 1.05 },
  prestige2: { maxLevel: 5, maxExp: 200, eff: 1.10, speed: 1.95 },
  prestige3: { maxLevel: 6, maxExp: 250, eff: 1.30, speed: 3.15 },
  prestige4: { maxLevel: 8, maxExp: 300, eff: 1.55, speed: 4.65 },
  prestige5: { maxLevel: 10, maxExp: 350, eff: 1.90, speed: 6.75 },
}

const units = ['letters', 'words', 'sentences',
                'pages', 'chapters', 'books', 'series']

let save
const init = () => {
  save = {
    monkeys: { total: 0,
                multiplier: 1.0,
                cost: 1,
                lifetime: 0,
    },
    active: 'letters',
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
                timer: 300,
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
                fasterLetters: false,
                efficientMonkeys: false,
                fasterWords: false,
                fasterSentences: false,
                efficientWords: false,
    },
    achievements: { findPongo: false,
    },
  }
}

// If the save object doesn't yet exist, create it.
if (typeof save === 'undefined') { init() }

//
// Writing calculation pieces
//

let calcUsing = (unit) => {
  let p = ''
  let c = save[unit]
  units.forEach( (cv, i, arr) => {
    if (cv === unit) {
      p = arr[i - 1]
    }
  })
  let prev = 0
  if (c['manual']) { // Check manual writing
    prev += c['cost'] / c['timer'] * c['multiplier']
  }
  for (let i = 1; i < 10; i++) { // Check staff writing
    let staff = save['staff']['s' + i]
    if (staff && staff['writing'] === unit) {
      prev += (1 / c['timer'] * c['cost']) / staff['eff'] * staff['speed'] / 2
    }
  }
  save[p]['using'] = prev
}

const calcGenerating = (unit) => {
  const c = save[unit]
  let g = 0
  if (c['manual']) { // Check manual writing
    g += 1 / c['timer'] * c['multiplier']
  }
  for (let i = 1; i < 10; i++) { // Check staff writing
    const staff = save['staff']['s' + i]
    if (staff && staff['writing'] === unit) {
      g += (1 / c['timer'] * c['multiplier']) * staff['speed'] / 2
    }
  }
  if (unit === 'letters') { // Do letters-specific things
    g += save.monkeys.total * save.monkeys.multiplier
  }
  if (unit !== 'letters') { // Do non-letters things
    calcUsing(unit)
  }
  c['generating'] = g
}

const getActiveUnit = () => {
  let active = ''
  units.reduce( (pv, cv, i, a) => { // Checks all manual to see if true
    let cur = save[cv]['manual']
    if (cur) { active = cv } // If a value is true, return it
  },0)
  return active
}

const startWriting = (unit) => {
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

let disengageWriting = () => {
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

//
// Number prettifier for displaying
//

const nLog = Math.log(10);
const nArray = ['', 'k', 'M', 'B', 'T', 'Qa',
              'Qi', 'Sx', 'Sp', 'Oc', 'No',
              'Dc', 'UnD', 'DuD', 'TrD', 'QaD',
              'QiD', 'SeD', 'SpD', 'OcD', 'NoD',
              'Vi', 'UnV']

// If the number is greater than x.999, ceil it, otherwise floor it
// Deals with some floating point weirdness in JS
const floor = (n) => {
  return (Math.abs(Math.abs(n) - Math.abs(Math.floor(n))) >= 0.999999991) ?
            ((n >= 0) ? Math.ceil(n) : Math.floor(n)) :
              ((n >= 0) ? Math.floor(n) : Math.ceil(n))
}

// Function borrowed from /r/incrementalgames
const prettify = (n, d) => {
  const l = (floor(Math.log(Math.abs(n)) / nLog) <= 0) ?
            0 :
              floor(Math.log(Math.abs(n)) / nLog)
  const p = (l % 3 === 0) ?
              2 :
                (((l - 1) % 3 === 0) ? 1 : 0)
  const r = (Math.abs(n) < 1000) ?
            ((typeof d === 'number') ? n.toFixed(d) : floor(n)) :
              (floor(n / (Math.pow(10, floor(l / 3) * 3 - p))) / Math.pow(10, p))
  return (r + nArray[floor(l / 3)] + ((floor(r) === 42) ? '~' : '')) || 'Infinite'
}

//
// Loop Functions
//

const incrementLetters = (num) => {
  let l = save.letters
  let m = save.monkeys
  let equation = ((m['total'] * m['multiplier']) / (1000 / interval)) * num
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
  units.reduce( (pv, cv, i, arr) => {
    if (cv === 'letters' && save[cv] === curr) {
      curr['progress'] += (100 / ((curr['timer'] / curr['multiplier']) * (1000 / interval)) * num)
      while (curr['progress'] >= 100) {
        // Increment unit and reset progress
        curr['total'] += 1
        curr['lifetime'] += 1
        curr['progress'] -= 100
      }
    } else if (curr['cost'] <= save[pv]['total'] && save[cv] === curr) {
      curr['progress'] += (100 / (curr['timer'] * (1000 / interval)) * num)
      while (curr['progress'] >= 100) {
        // Increment unit and reset progress
        curr['total'] += 1
        curr['lifetime'] += 1
        curr['progress'] -= 100
        // Deduct the cost from the previous unit
        save[pv]['total'] -= curr['cost']
      }
    }
    return cv
  }, 'letters')
}

const staffWriting = (num) => {
  for (let i = 1; i < 10; i++) { // Loops through all the staff slots
    const staff = save['staff']['s' + i]
    if (staff && staff['writing'] !== 'none') { // Checks if staff member exists and is writing
      for (let j = 0; j < units.length; j++) { // Loops all the units in the specified slot
        if (units[j] === staff['writing']) {
          let unit = save[units[j]]
          let pUnit = save[units[j - 1]]
          if (pUnit['total'] >= unit['cost']) { // Checks if you can afford to create a unit
            // Increments the progress bar
            staff['progress'] += 100 / (unit['timer'] / staff['speed'] * 2) / (1000 / interval) * num
            if (staff['progress'] >= 100) { // When the progress bar gets full, run calc
              // Deduct cost from previous unit
              pUnit['total'] -= unit['cost'] / staff['eff']

              // Increment active unit
              unit['total'] += 1
              unit['lifetime'] += 1

              // Reset progress bar and exp
              staff['progress'] -= 100
              staff['exp'] += unit['timer'] / 2

              // Checks for staff level up
              if (staff['exp'] >= staff['nextExp'] && staff['level'] < staff['maxLevel']) {
                levelUp(i)
              }
            }
          }
        }
      }
    }
  }
}

//
// Configurable error popup
//
let errorAlert = (title, desc) => {
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

window.onload = function() {
  units.forEach( (cv, i, arr) => {
    calcGenerating(cv)
  })
  load()
	timeout()
  unlock.setup()
  upgrade.setup()
  achieve.setup()
}

function timeout() {
	window.setTimeout(function(){
		localStorage.setItem('save',JSON.stringify(save))
		timeout()
	}, 5000)
}

// Fires before the page unloads
window.onbeforeunload = function(event) {
  localStorage.setItem('save',JSON.stringify(save))
}

const load = () => {
  if (localStorage.getItem('save') !== null) {
    const savegame = JSON.parse(localStorage.getItem('save'))
    save.monkeys = savegame.monkeys
    save.letters = savegame.letters
    save.words = savegame.words
    save.sentences = savegame.sentences
    save.pages = savegame.pages
    save.chapters = savegame.chapters
    save.books = savegame.books
    save.series = savegame.series
    save.upgrades = savegame.upgrades
    save.staff = savegame.staff
    save.achievements = savegame.achievements
  }
}

const delSave = () => {
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
