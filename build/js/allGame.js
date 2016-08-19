/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	/*
	// Import other game JS files
	require('./staff.js')
	require('./achievements.js')
	require('./upgrades.js')
	*/

	// Declare variables

	var interval = 20;

	var staff = { // Exp and Eff values for all levels of staff
	  prestige1: { maxLevel: 4, baseExp: 150, eff: .950, speed: 1.05 },
	  prestige2: { maxLevel: 5, baseExp: 200, eff: 1.10, speed: 1.45 },
	  prestige3: { maxLevel: 6, baseExp: 250, eff: 1.30, speed: 1.95 },
	  prestige4: { maxLevel: 8, baseExp: 300, eff: 1.55, speed: 2.55 },
	  prestige5: { maxLevel: 10, baseExp: 350, eff: 1.90, speed: 3.35 }
	};

	var units = ['letters', 'words', 'sentences', 'pages', 'chapters', 'books', 'series'];

	var save = void 0;
	var init = function init() {
	  save = {
	    monkeys: { total: 0,
	      multiplier: 1.0,
	      cost: 1,
	      lifetime: 0
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
	      availableUpgrades: 0
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
	      cost: 6
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
	      cost: 15
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
	      cost: 17
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
	      cost: 20
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
	      cost: 25
	    },
	    series: { unit: 'series',
	      total: 0,
	      manual: false,
	      generating: 0,
	      multiplier: 1,
	      lifetime: 0,
	      proress: 0,
	      availableUpgrades: 0,
	      cost: 3
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
	      s9: {}

	    },
	    upgrades: {
	      writeWords: false,
	      writeSentences: false,
	      fasterLetters: false,
	      efficientMonkeys: false
	    },
	    achievements: {
	      findPongo: false
	    }
	  };
	};

	// If the save object doesn't yet exist, create it.
	if (typeof save === 'undefined') {
	  init();
	}

	//
	// Writing calculation pieces
	//

	var calcGenerating = function calcGenerating(unit) {
	  var c = save[unit];
	  var g = 0;
	  if (c['manual']) {
	    // Check manual writing
	    g += 1 / c['timer'] * c['multiplier'];
	  }
	  for (var i = 1; i < 10; i++) {
	    // Check staff writing
	    var _staff = save['staff']['s' + i];
	    if (_staff && _staff['writing'] === unit) {
	      g += 1 / c['timer'] * c['multiplier'] * _staff['speed'] / 2;
	    }
	  }
	  if (unit === 'letters') {
	    // Do letters-specific things
	    g += save['monkeys']['total'] * save['monkeys']['multiplier'];
	  }
	  if (unit !== 'letters') {
	    // Do non-letters things
	    calcUsing(unit);
	  }
	  c['generating'] = g;
	};

	var calcUsing = function calcUsing(unit) {
	  var p = '';
	  var c = save[unit];
	  units.forEach(function (cv, i, arr) {
	    if (cv === unit) {
	      p = arr[i - 1];
	    }
	  });
	  var prev = 0;
	  if (c['manual']) {
	    // Check manual writing
	    prev += c['cost'] / c['timer'];
	  }
	  for (var i = 1; i < 10; i++) {
	    // Check staff writing
	    var _staff2 = save['staff']['s' + i];
	    if (_staff2 && _staff2['writing'] === unit) {
	      prev += 1 / c['timer'] * c['cost'] / _staff2['eff'] * _staff2['speed'] / 2;
	    }
	  }
	  save[p]['using'] = prev;
	};

	var getActiveUnit = function getActiveUnit() {
	  var active = '';
	  units.reduce(function (pv, cv, i, a) {
	    // Checks all manual to see if true
	    var cur = save[cv]['manual'];
	    if (cur) {
	      active = cv;
	    } // If a value is true, return it
	  }, 0);
	  return active;
	};

	var startWriting = function startWriting(unit) {
	  // If an already active unit is clicked, it disengages and stops
	  if (unit === getActiveUnit()) {
	    disengageWriting();
	    return;
	  }
	  // Otherwise it disengages everything and then activates the clicked one
	  disengageWriting();

	  // Set current to true and recalculate
	  save[unit]['manual'] = true;
	  calcGenerating(unit);

	  // Visually update the progress bar
	  $('#write' + unit).addClass('progress-bar-striped active');
	};

	var disengageWriting = function disengageWriting() {
	  units.forEach(function (cur, i, arr) {
	    // Set all units to false
	    save[cur]['manual'] = false;
	    calcGenerating(cur);

	    // Update progress bar
	    $('#write' + cur).css('width', '0%').attr('aria-valuenow', 0);
	  });
	};

	//
	// Number prettifier for displaying
	//

	var nLog = Math.log(10);
	var nArray = ['', 'k', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UnD', 'DuD', 'TrD', 'QaD', 'QiD', 'SeD', 'SpD', 'OcD', 'NoD', 'Vi', 'UnV'];

	// If the number is greater than x.999, ceil it, otherwise floor it
	// Deals with some floating point weirdness in JS
	var floor = function floor(n) {
	  return Math.abs(Math.abs(n) - Math.abs(Math.floor(n))) >= 0.999999991 ? n >= 0 ? Math.ceil(n) : Math.floor(n) : n >= 0 ? Math.floor(n) : Math.ceil(n);
	};

	// Function borrowed from /r/incrementalgames
	var prettify = function prettify(n, d) {
	  var l = floor(Math.log(Math.abs(n)) / nLog) <= 0 ? 0 : floor(Math.log(Math.abs(n)) / nLog);
	  var p = l % 3 === 0 ? 2 : (l - 1) % 3 === 0 ? 1 : 0;
	  var r = Math.abs(n) < 1000 ? typeof d === 'number' ? n.toFixed(d) : floor(n) : floor(n / Math.pow(10, floor(l / 3) * 3 - p)) / Math.pow(10, p);
	  return r + nArray[floor(l / 3)] + (floor(r) === 42 ? '~' : '') || 'Infinite';
	};

	//
	// Loop Functions
	//

	var incrementLetters = function incrementLetters(num) {
	  var l = save['letters'];
	  var m = save['monkeys'];
	  var equation = m['total'] * m['multiplier'] / (1000 / interval) * num;
	  l['total'] += equation;
	  l['lifetime'] += equation;
	};

	var writing = function writing(num) {
	  // Manual writing
	  // Returns only when deactivating an already-active writing process
	  if (!getActiveUnit()) {
	    return;
	  }
	  var curr = save[getActiveUnit()];
	  // Increment progress bar
	  $('#write' + getActiveUnit()).css('width', curr['progress'] + '%').attr('aria-valuenow', curr['progress']);
	  units.reduce(function (pv, cv, i, arr) {
	    if (cv === 'letters' && save[cv] === curr) {
	      curr['progress'] += 100 / (curr['timer'] / curr['multiplier'] * (1000 / interval)) * num;
	      while (curr['progress'] >= 100) {
	        // Increment unit and reset progress
	        curr['total'] += 1;
	        curr['lifetime'] += 1;
	        curr['progress'] -= 100;
	      }
	    } else if (curr['cost'] <= save[pv]['total'] && save[cv] === curr) {
	      curr['progress'] += 100 / (curr['timer'] * (1000 / interval)) * num;
	      while (curr['progress'] >= 100) {
	        // Increment unit and reset progress
	        curr['total'] += 1;
	        curr['lifetime'] += 1;
	        curr['progress'] -= 100;

	        // Deduct the cost from the previous unit
	        save[pv]['total'] -= curr['cost'];
	      }
	    }
	    return cv;
	  }, 'letters');
	};

	function staffWriting(num) {
	  for (var i = 1; i < 10; i++) {
	    // Loops through all the staff slots
	    var _staff3 = save['staff']['s' + i];
	    if (_staff3 && _staff3['writing'] !== 'none') {
	      // Checks if staff member exists and is writing
	      for (var j = 0; j < units.length; j++) {
	        // Loops all the units in the specified slot
	        if (units[j] === _staff3['writing']) {
	          var unit = save[units[j]];
	          var pUnit = save[units[j - 1]];
	          if (pUnit['total'] >= unit['cost']) {
	            // Checks if you can afford to create a unit
	            // Increments the progress bar
	            _staff3['progress'] += 100 / (unit['timer'] / _staff3['speed'] * 2) / (1000 / interval) * num;
	            if (_staff3['progress'] >= 100) {
	              // When the progress bar gets full, run calc
	              // Deduct cost from previous unit
	              pUnit['total'] -= unit['cost'] / _staff3['eff'];

	              // Increment active unit
	              unit['total'] += 1;
	              unit['lifetime'] += 1;

	              // Reset progress bar and exp
	              _staff3['progress'] -= 100;
	              _staff3['exp'] += unit['timer'] / 2;

	              // Checks for staff level up
	              if (_staff3['exp'] >= _staff3['nextExp'] && _staff3['level'] < _staff3['maxLevel']) {
	                levelUp(i);
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
	var errorAlert = function errorAlert(title, desc) {
	  $('#error').fadeTo(500, 0.8);
	  $('#errorTitle').text(title);
	  $('#errorDesc').text(desc);

	  // After 7 seconds, fades the window back out
	  window.setTimeout(function () {
	    $('#error').fadeTo(500, 0);
	  }, 7000);
	};

	//
	// Functions on page load (timeout, save)
	//

	window.onload = function () {
	  units.forEach(function (cv, i, arr) {
	    calcGenerating(cv);
	  });
	  load();
	  timeout();
	  unlock.setup();
	  upgrade.setup();
	  achieve.setup();
	};

	function timeout() {
	  window.setTimeout(function () {
	    localStorage.setItem('save', JSON.stringify(save));
	    timeout();
	  }, 5000);
	}

	// Fires before the page unloads
	window.onbeforeunload = function (event) {
	  localStorage.setItem('save', JSON.stringify(save));
	};

	var load = function load() {
	  if (localStorage.getItem('save') !== null) {
	    var savegame = JSON.parse(localStorage.getItem('save'));
	    save.monkeys = savegame.monkeys;
	    save.letters = savegame.letters;
	    save.words = savegame.words;
	    save.sentences = savegame.sentences;
	    save.pages = savegame.pages;
	    save.chapters = savegame.chapters;
	    save.books = savegame.books;
	    save.series = savegame.series;
	    save.upgrades = savegame.upgrades;
	    save.staff = savegame.staff;
	    save.achievements = savegame.achievements;
	  }
	};

	function delSave() {
	  $('#confirmpopMessage').text('Are you sure you want to delete your save?');
	  $('.pop').fadeIn();
	  $('.confirmpopopacity').fadeIn();
	  $('.confirm').off('click').click(function () {
	    localStorage.removeItem('save');
	    disengageWriting();
	    for (var i = 1; i < 10; i++) {
	      disengageStaff(i);
	    }
	    init();
	    location.reload();
	  });
	  $('.deny').off('click').click(function () {
	    $('.pop').fadeOut();
	    $('.confirmpopopacity').fadeOut();
	  });
	}

	//
	// The loop
	//
	var before = Date.now();

	window.setInterval(function () {
	  var now = Date.now();
	  var elapsedTime = now - before;
	  var elapsedValue = elapsedTime / interval;
	  incrementLetters(elapsedValue);
	  writing(elapsedValue);
	  staffWriting(elapsedValue);
	  unlock.check();
	  upgrade.check();
	  before = now;
	}, 1000 / interval);

/***/ }
/******/ ]);