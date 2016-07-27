'use strict'

/*
// Import other game JS files
require('./staff.js')
require('./achievements.js')
require('./upgrades.js')
*/

// Declare variables
const interval = 20
let save
let init = () => {
	save = {
		monkeys: {  total: 0,
                multiplier: 1.0,
                cost: 1,
                lifetime: 0
              },
    active: 'letters',
		letters: {  unit: 'letters',
                total: 1000,
                manual: false,
                generating: 0,
                using: 0,
                multiplier: 1,
                lifetime: 0,
                timer: 0.6,
                progress: 0,
                upgrade: 0
              },
		words: {    unit: 'words',
                total: 1000,
                manual: false,
                generating: 0,
                using: 0,
                multiplier: 1,
                lifetime: 0,
                timer: 1.5,
                progress: 0,
                upgrade: 0,
                cost:6
            },
		sentences: {unit: 'sentences',
                total:1000,
                manual: false,
                generating: 0,
                using: 0,
                multiplier:1,
                lifetime:0,
                timer: 20,
                progress: 0,
                upgrade: 0,
                cost:15
              },
		pages: {    unit: 'pages',
                total:0,
                manual: false,
                generating: 0,
                using: 0,
                multiplier: 1,
                lifetime: 0,
                timer: 300,
                progress: 0,
                upgrade: 0,
                cost:17
            },
		chapters: { unit: 'chapters',
                total:0,
                manual: false,
                generating: 0,
                using: 0,
                multiplier:1,
                lifetime: 0,
                progress: 0,
                upgrade: 0,
                cost:20
              },
		books: {    unit: 'books',
                total:0,
                manual: false,
                generating: 0,
                using: 0,
                multiplier: 1,
                lifetime: 0,
                progress: 0,
                upgrade: 0,
                cost: 25
            },
		series: {   unit: 'series',
                total: 0,
                manual: false,
                generating: 0,
                multiplier: 1,
                lifetime: 0,
                proress: 0,
                upgrade: 0,
                cost: 3
            },
		office: {   space: 0, counter: 1},
		staff: {    s1: {},
                s2: {},
                s3: {},
                s4: {},
                s5: {},
                s6: {},
                s7: {},
                s8: {},
                s9: {}

    }
	}
}

// If the save object doesn't yet exist, create it.
if (typeof save === 'undefined'){ init() }

const staff = { // Exp and Eff values for all levels of staff
		prestige1: { exp: 150, eff: .95, speed: 1.05},
		HS: { Exp1: 200, Eff1: .1},
		UG: { Exp1: 250, Eff1: .15},
		GS: { Exp1: 300, Eff1: .2},
		PHD: { Exp1: 350, Eff1: .25}
	}

const units = ['letters', 'words', 'sentences',
                'pages', 'chapters', 'books', 'series']

//
// Writing calculation pieces
//

let calcGenerating = (unit) => {
  let c = save[unit]
  let g = 0
  if (c['manual']) { // Check manual writing
    g += 1 / c['timer'] * c['multiplier']
  }
  for (let i = 1; i < 10; i++) { // Check staff writing
    let staff = save['staff']['s' + i]
    if (staff && staff['writing'] === unit) {
      g += (1 / c['timer'] * c['multiplier']) * staff['speed'] / 2
    }
  }
  if (unit === 'letters') { // Do letters-specific things
    g += save['monkeys']['total'] * save['monkeys']['multiplier']
  }
  if (unit !== 'letters') { // Do non-letters things
    calcUsing(unit)
  }
  c['generating'] = g
}

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
    prev += 1 / c['timer'] * c['cost']
  }
  for (let i = 1; i < 10; i++) { // Check staff writing
    let staff = save['staff']['s' + i]
    if (staff && staff['writing'] === unit) {
      prev += (1 / c['timer'] * c['cost']) * staff['eff'] / 2
    }
  }
  save[p]['using'] = prev
}

let getActiveUnit = () => {
  let active = ''
  units.reduce( (pv, cv, i, a) => { // Checks all manual to see if true
    let cur = save[cv]['manual']
    if (cur) { active = cv } // If a value is true, return it
  },0)
  return active
}

let startWriting = (unit) => {
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

  // Visually update the clicked button and progress bar
	$('#writing' + unit + 'progress')
    .addClass('progress-bar-striped active')
}

let disengageWriting = () => {
  units.forEach( (cur, i, arr) => {
    // Set all units to false
    save[cur]['manual'] = false
    calcGenerating(cur)

    // Visually update all buttons and progress bars
    $('#writing' + cur + 'progress')
      .removeClass('progress-bar-striped active')
      .css('width', '0%')
      .attr('aria-valuenow', 0)
  })
}

//
// Number prettifier
//    for displaying
//

const nLog = Math.log(10);
const nArray = ['', 'k', 'M', 'B', 'T', 'Qa',
              'Qi', 'Sx', 'Sp', 'Oc', 'No',
              'Dc', 'UnD', 'DuD', 'TrD', 'QaD',
              'QiD', 'SeD', 'SpD', 'OcD', 'NoD',
              'Vi', 'UnV']

// If the number is greater than x.999, ceil it, otherwise floor it
// Deals with some floating point weirdness in JS
let floor = (n) => {
  return (Math.abs(Math.abs(n) - Math.abs(Math.floor(n))) >= 0.999999991) ?
            ((n >= 0) ? Math.ceil(n) : Math.floor(n)) :
              ((n >= 0) ? Math.floor(n) : Math.ceil(n))
}

// Function borrowed from /r/incrementalgames
let prettify = (n, d) => {
  let l = (floor(Math.log(Math.abs(n)) / nLog) <= 0) ?
            0 :
              floor(Math.log(Math.abs(n)) / nLog)
  let p = (l % 3 === 0) ?
              2 :
                (((l - 1) % 3 === 0) ? 1 : 0)
  let r = (Math.abs(n) < 1000) ?
            ((typeof d === 'number') ? n.toFixed(d) : floor(n)) :
              (floor(n / (Math.pow(10, floor(l / 3) * 3 - p))) / Math.pow(10, p))
  return (r + nArray[floor(l / 3)] + ((floor(r) === 42) ? '~' : '')) || 'Infinite'
}

//
// Loop Functions
//

let incrementLetters = (num) => {
  let l = save['letters']
  let m = save['monkeys']
  let equation = ((m['total'] * m['multiplier']) / (1000 / interval)) * num
  l['total'] += equation
  l['lifetime'] += equation
}

let writing = (num) => {
  // Returns only when deactivating an already-active writing process
  if (!getActiveUnit()) { return }
  let curr = save[getActiveUnit()]
  // Increment progress bar
  curr['progress'] += (100 / (curr['timer'] * (1000 / interval)) * num)
  $('#writing' + getActiveUnit() + 'progress')
    .css('width', curr['progress'] + '%')
    .attr('aria-valuenow', curr['progress'])
  if (curr['progress'] >= 100) {
    units.reduce( (pv, cv, i, arr) => {
      let c = save[cv] // Current unit
      if (cv === 'letters') {
        c['total'] += 1
        c['lifetime'] += 1
        c['progress'] -= 100
      } else if (c['cost'] <= save[pv]['total'] && c === curr) {
        c['total'] += 1
        c['lifetime'] += 1
        c['progress'] -= 100
        save[pv]['total'] -= c['cost']
      }
      return cv
    }, 'letters')
  }
}

function staffWriting(num) {
  for (let i = 1; i < 10; i++) { // Loops through all the staff slots
    let staff = save['staff']['s' + i]
    if (staff && staff['writing'] !== 'none') { // Checks if staff member exists and is writing
      for (let j = 0; j < units.length; j++) { // Loops all the units in the specified slot
        if (units[j] === staff['writing']) {
          let unit = save[units[j]]
          let pUnit = save[units[j - 1]]
          if (pUnit['total'] >= unit['cost']) { // Checks if you can afford to create a unit
              // Increments the progress bar
              staff['progress'] += (100 / (unit['timer'] * staff['eff'] * (1000 / interval)) * num)
              $('#staffProgressBar' + i) // Update progress bar
                .css('width', staff['progress'] + '%')
                .attr('aria-valuenow', staff['progress'])
            if (staff['progress'] >= 100) { // When the progress bar gets full, run calc
                pUnit['total'] -= unit['cost'] * staff['eff']
                unit['total'] += 1
                unit['lifetime'] += 1
                staff['progress'] -= 100
                staff['exp'] += unit['timer'] / 2
                $('#staffExpBar' + i)
                  .css('width', ((staff['exp'] / staff['nextExp']) * 100) + '%')
                $('#staffExpValue' + i).text(prettify(staff['exp'],2))
                if (staff['exp'] >= staff['nextExp'] &&
                    staff['level'] < staff['maxLevel']) { // Ready to level up?
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
// Functions on page load (timeout, save)
//

window.onload = function WindowLoad(event){
  units.forEach( (cv, i, arr) => {
    calcGenerating(cv)
  })
  load()
	timeout()
}

function timeout(){
	window.setTimeout(function(){
		localStorage.setItem('save',JSON.stringify(save))
		timeout()
	}, 5000)
}

// Fires before the page unloads
window.onbeforeunload = function(event){
  localStorage.setItem('save',JSON.stringify(save))
  //disengageStaff()
	disengageWriting()
	localStorage.setItem('save',JSON.stringify(save))
}

let load = () => {
	if (localStorage.getItem('save') !== null){
  	let savegame = JSON.parse(localStorage.getItem('save'))
  	save.monkeys = savegame.monkeys
  	save.letters = savegame.letters
  	save.words = savegame.words
  	save.sentences = savegame.sentences
  	save.pages = savegame.pages
  	save.chapters = savegame.chapters
  	save.books = savegame.books
  	save.series = savegame.series
  	save.upgrade = savegame.upgrade
  	save.staff = savegame.staff

  	for (let i = 1; i < 10; i++) {
      let staff = save['staff']['s' + i]
  		if (staff && staff['active']) {
  			drawStaff(staff, i)
  		}
  	}
	}
}

function delSave(){
	$('#confirmpopMessage').text('Are you sure you want to delete your save?')
	$('.pop').fadeIn()
	$('.confirmpopopacity').fadeIn()
	$('.confirm').off('click').click(function() {
		localStorage.removeItem('save')
		disengageWriting()
		disengageStaff()
		init()
		location.reload()
		$('.pop').fadeOut()
		$('.confirmpopopacity').fadeOut()
	})
	$('.deny').off('click').click(function() {
		$('.pop').fadeOut()
		$('.confirmpopopacity').fadeOut()
	})
}

//
// The loop
//
let before = Date.now()

window.setInterval(function(){
	let now = Date.now()
	let elapsedTime = (now - before)
	let elapsedValue = (elapsedTime / interval)
  incrementLetters(elapsedValue)
	writing(elapsedValue)
	staffWriting(elapsedValue)

	before = now
}, 1000 / interval)
