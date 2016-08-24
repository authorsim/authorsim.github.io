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
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.delSave = exports.prettify = exports.startWriting = exports.calcGenerating = exports.setUpgrade = exports.save = undefined;

	var _staff = __webpack_require__(2);

	var _unlocks = __webpack_require__(3);

	var _unlocks2 = _interopRequireDefault(_unlocks);

	var _upgrades = __webpack_require__(4);

	var _upgrades2 = _interopRequireDefault(_upgrades);

	var _achievements = __webpack_require__(5);

	var _achievements2 = _interopRequireDefault(_achievements);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Declare variables
	var interval = 20;

	var staff = { // Exp and Eff values for all levels of staff
	  prestige1: { maxLevel: 4, maxExp: 150 },
	  prestige2: { maxLevel: 5, maxExp: 200 },
	  prestige3: { maxLevel: 6, maxExp: 250 },
	  prestige4: { maxLevel: 8, maxExp: 300 },
	  prestige5: { maxLevel: 10, maxExp: 350 }
	};

	var units = ['letters', 'words', 'sentences', 'pages', 'chapters', 'books', 'series'];

	var save = exports.save = void 0;
	var init = function init() {
	  exports.save = save = {
	    monkeys: { total: 0,
	      multiplier: 1.0,
	      cost: 1,
	      lifetime: 0
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
	      timer: 60,
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
	      timer: 240,
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
	      timer: 600,
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
	      timer: 1200,
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
	    upgrades: { writeWords: false,
	      writeSentences: false,
	      writePages: false,
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
	      repeatingPatterns: false
	    },
	    achievements: { findPongo: false
	    }
	  };
	};

	var setUpgrade = exports.setUpgrade = function setUpgrade(upg) {
	  save.upgrades[upg] = true;
	};

	// If the save object doesn't yet exist, create it.
	if (typeof save === 'undefined') {
	  init();
	}

	//
	// Writing calculation pieces
	//

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
	    prev += c['cost'] / c['timer'] * c['multiplier'];
	  }
	  for (var i = 1; i < 10; i++) {
	    // Check staff writing
	    var s = save['staff']['s' + i];
	    if (s && s['writing'] === unit) {
	      prev += 1 / c['timer'] * c['cost'] / s['eff'] * s['speed'] / 2 * c['multiplier'];
	    }
	  }
	  save[p]['using'] = prev;
	};

	var calcGenerating = exports.calcGenerating = function calcGenerating(unit) {
	  if (unit === 'all') {
	    calcGenerating('letters');
	    calcGenerating('words');
	    calcGenerating('sentences');
	    calcGenerating('pages');
	    calcGenerating('chapters');
	    calcGenerating('books');
	    return;
	  }
	  var c = save[unit];
	  var g = 0;
	  if (c['manual']) {
	    // Check manual writing
	    g += 1 / c['timer'] * c['multiplier'];
	  }
	  for (var i = 1; i < 10; i++) {
	    // Check staff writing
	    var s = save['staff']['s' + i];
	    if (s && s['writing'] === unit) {
	      g += 1 / c['timer'] * c['multiplier'] * s['speed'] / 2;
	    }
	  }
	  if (unit === 'letters') {
	    // Do letters-specific things
	    g += save.monkeys.total * save.monkeys.multiplier * c['multiplier'];
	  }
	  if (unit !== 'letters') {
	    // Do non-letters things
	    calcUsing(unit);
	  }
	  c['generating'] = g;
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

	var disengageWriting = function disengageWriting() {
	  units.forEach(function (cur, i, arr) {
	    // Set all units to false
	    save[cur]['manual'] = false;
	    save[cur]['progress'] = 0;
	    calcGenerating(cur);

	    // Update progress bar
	    $('#write' + cur).css('width', '0%').attr('aria-valuenow', 0);
	  });
	};

	var startWriting = exports.startWriting = function startWriting(unit) {
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
	var prettify = exports.prettify = function prettify(n, d) {
	  var l = floor(Math.log(Math.abs(n)) / nLog) <= 0 ? 0 : floor(Math.log(Math.abs(n)) / nLog);
	  var p = l % 3 === 0 ? 2 : (l - 1) % 3 === 0 ? 1 : 0;
	  var r = Math.abs(n) < 1000 ? typeof d === 'number' ? n.toFixed(d) : floor(n) : floor(n / Math.pow(10, floor(l / 3) * 3 - p)) / Math.pow(10, p);
	  return r + nArray[floor(l / 3)] + (floor(r) === 42 ? '~' : '') || 'Infinite';
	};

	//
	// Loop Functions
	//

	var incrementLetters = function incrementLetters(num) {
	  var l = save.letters;
	  var m = save.monkeys;
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
	      curr['progress'] += 100 / (curr['timer'] * (1000 / interval)) * num;
	      while (curr['progress'] >= 100) {
	        // Increment unit and reset progress
	        curr['total'] += 1 * curr['multiplier'];
	        curr['lifetime'] += 1;
	        curr['progress'] -= 100;
	      }
	    } else if (curr['cost'] <= save[pv]['total'] && save[cv] === curr) {
	      curr['progress'] += 100 / (curr['timer'] * (1000 / interval)) * num;
	      while (curr['progress'] >= 100) {
	        // Increment unit and reset progress
	        curr['total'] += 1 * curr['multiplier'];
	        curr['lifetime'] += 1 * curr['multiplier'];
	        curr['progress'] -= 100;
	        // Deduct the cost from the previous unit
	        save[pv]['total'] -= curr['cost'] * curr['multiplier'];
	      }
	    }
	    return cv;
	  }, 'letters');
	};

	var staffWriting = function staffWriting(num) {
	  for (var i = 1; i < 10; i++) {
	    // Loops through all the staff slots
	    var s = save['staff']['s' + i];
	    if (s && s['writing'] !== 'none') {
	      // Checks if staff member exists and is writing
	      for (var j = 0; j < units.length; j++) {
	        // Loops all the units in the specified slot
	        if (units[j] === s['writing']) {
	          var unit = save[units[j]];
	          var pUnit = save[units[j - 1]];
	          if (pUnit['total'] >= unit['cost']) {
	            // Checks if you can afford to create a unit
	            // Increments the progress bar
	            s['progress'] += 100 / (unit['timer'] / s['speed'] * 2) / (1000 / interval) * num;
	            while (s['progress'] >= 100) {
	              // When the progress bar gets full, run calc
	              // Deduct cost from previous unit
	              pUnit['total'] -= unit['cost'] / s['eff'] * unit['multiplier'];

	              // Increment active unit
	              unit['total'] += 1 * unit['multiplier'];
	              unit['lifetime'] += 1 * unit['multiplier'];

	              // Reset progress bar and exp
	              s['progress'] -= 100;
	              s['exp'] += unit['timer'] / 2;

	              // Checks for staff level up
	              if (s['exp'] >= s['nextExp'] || s['level'] >= s['maxLevel']) {
	                (0, _staff.levelUp)(i);
	              }
	            }
	          }
	        }
	      }
	    }
	  }
	};

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

	function timeout() {
	  window.setTimeout(function () {
	    localStorage.setItem('save', JSON.stringify(save));
	    timeout();
	  }, 5000);
	}

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

	window.onload = function () {
	  units.forEach(function (cv, i, arr) {
	    calcGenerating(cv);
	  });
	  load();
	  timeout();
	  _unlocks2.default.setup();
	  _upgrades2.default.setup();
	  _achievements2.default.setup();
	};

	// Fires before the page unloads
	window.onbeforeunload = function (event) {
	  localStorage.setItem('save', JSON.stringify(save));
	};

	var delSave = exports.delSave = function delSave() {
	  $('#confirmpopMessage').text('Are you sure you want to delete your save?');
	  $('.pop').fadeIn();
	  $('.confirmpopopacity').fadeIn();
	  $('.confirm').off('click').click(function () {
	    localStorage.removeItem('save');
	    init();
	    location.reload();
	  });
	  $('.deny').off('click').click(function () {
	    $('.pop').fadeOut();
	    $('.confirmpopopacity').fadeOut();
	  });
	};

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
	  _unlocks2.default.check();
	  _upgrades2.default.check();
	  before = now;
	}, 1000 / interval);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.startStaffWriting = exports.chooseSkill = exports.staffGraduate = exports.levelUp = exports.buyMonkey = exports.hireStaff = undefined;

	var _game = __webpack_require__(1);

	var staffNames = ['Miranda', 'Joey', 'Bob', 'Jonathan', 'Christopher', 'Krista', 'Cameron', 'Frank', 'Alfonso', 'Kerry', 'Don', 'Clint', 'Janice', 'Phyllis', 'Andrew', 'Todd', 'Clancy', 'Ronald', 'Zach', 'Bartholomew', 'Cindy', 'Nancy', 'Jan', 'Will', 'Olivia', 'Sophie', 'Emily', 'Jake', 'Alex', 'James', 'Charles'];

	var hireStaff = exports.hireStaff = function hireStaff(slot) {
	  var name = staffNames[Math.floor(Math.random() * staffNames.length)];
	  var cost = Math.pow(slot, 2.3) * 50;
	  if (_game.save.words.total >= cost) {
	    _game.save.words.total -= cost;
	    _game.save['staff']['s' + slot] = {
	      active: true,
	      writing: 'none',
	      name: name,
	      prestige: 1,
	      level: 1,
	      skillPoint: 0,
	      maxLevel: 4,
	      exp: 0,
	      nextExp: staff.prestige1.maxExp,
	      eff: 0.95,
	      speed: 1.05,
	      progress: 0
	    };
	  } else {
	    errorAlert('This is embarrassing...', 'You can\'t afford that staff member.');
	  }
	};

	var buyMonkey = exports.buyMonkey = function buyMonkey() {
	  var words = _game.save.words;
	  var monkeys = _game.save.monkeys;
	  if (words['total'] >= monkeys['cost']) {
	    words['total'] -= monkeys['cost'];
	    monkeys['total'] += 1;
	    monkeys['lifetime'] += 1;
	    monkeys['cost'] = (monkeys['cost'] + 2) * 1.06;
	    $('#monkeyCost').text(monkeys['cost']);
	  } else {
	    errorAlert('Whoops.', 'That monkey is too costly for you.');
	  }
	  (0, _game.calcGenerating)('letters');
	};

	var levelUp = exports.levelUp = function levelUp(slot) {
	  var staff = _game.save['staff']['s' + slot];
	  if (staff['level'] === 10) {
	    $('#staffExpBar' + slot).hide();
	    return;
	  }
	  if (staff['level'] >= staff['maxLevel']) {
	    $('#staffExpBar' + slot).hide();
	    $('#staffProgressArea' + slot).hide();
	    $('#staffGraduate' + slot).show();
	    $('#staff' + staff['writing'] + slot).removeClass('btn-success active').addClass('btn-primary');
	    staff['writing'] = 'none';
	    return;
	  }
	  staff['level'] += 1;
	  staff['exp'] = 0;
	  staff['eff'] += 0.05;
	  staff['speed'] += 0.30;
	  staff['nextExp'] *= 2.6;

	  (0, _game.calcGenerating)(staff['writing']);
	};

	var staffGraduate = exports.staffGraduate = function staffGraduate(slot) {
	  var cur = _game.save['staff']['s' + slot];
	  var curPrestige = cur['prestige'];
	  var newPrestige = curPrestige + 1;
	  var newStats = staff['prestige' + newPrestige];

	  // Update all stats
	  cur['level'] = 1;
	  cur['maxLevel'] = newStats['maxLevel'];
	  cur['exp'] = 0;
	  cur['nextExp'] = newStats['maxExp'];
	  cur['progress'] = 0;
	  cur['prestige'] += 1;
	  cur['skillPoint'] += 1;

	  // Re-show/hide UI elements
	  $('#staffExpBar' + slot).show();
	  $('#staffProgressArea' + slot).show();
	  $('#staffGraduate' + slot).hide();
	};

	var chooseSkill = exports.chooseSkill = function chooseSkill(slot) {
	  var cur = _game.save['staff']['s' + slot];
	  if (cur.skillPoint > 0) {
	    $('#staffProgressArea' + slot).toggle();
	    $('#staffGradBonusArea' + slot).toggle();

	    // Perk of +50% speed
	    $('#bonusPerk1_' + slot).text('+50% Speed').show().click(function () {
	      if (cur.skillPoint > 0) {
	        cur['speed'] *= 1.50;
	        cur['skillPoint'] -= 1;
	        $('#staffProgressArea' + slot).toggle();
	        $('#staffGradBonusArea' + slot).toggle();
	      }
	    });

	    // Perk of +50% efficiency
	    $('#bonusPerk2_' + slot).text('+50% Efficiency').show().click(function () {
	      if (cur.skillPoint > 0) {
	        cur['eff'] *= 1.50;
	        cur['skillPoint'] -= 1;
	        $('#staffProgressArea' + slot).toggle();
	        $('#staffGradBonusArea' + slot).toggle();
	      }
	    });
	  }
	};

	var disengageStaff = function disengageStaff(slot) {
	  units.forEach(function (cv, i, arr) {
	    // Update visually
	    $('#staff' + cv + slot).removeClass('active btn-success').addClass('btn-primary');
	    $('#staffprogress' + slot).removeClass('progress-bar-striped active');
	  });

	  // Set the unit to nothing
	  _game.save['staff']['s' + slot]['writing'] = 'none';
	  _game.save['staff']['s' + slot]['progress'] = 0;
	};

	var startStaffWriting = exports.startStaffWriting = function startStaffWriting(unit, slot) {
	  // If unit is already being worked on, it stops it
	  if (unit === _game.save['staff']['s' + slot]['writing']) {
	    disengageStaff(slot);
	    (0, _game.calcGenerating)(unit);
	    return;
	  }
	  // Otherwise, stop everything then activate the clicked one
	  disengageStaff(slot);
	  _game.save['staff']['s' + slot]['writing'] = unit;
	  (0, _game.calcGenerating)('all');

	  // Update the button
	  $('#staff' + unit + slot).removeClass('btn-primary').addClass('active btn-success');

	  // Update the progress bar
	  $('#staffProgress' + slot).addClass('progress-bar-striped active');
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _game = __webpack_require__(1);

	var unlock = function () {
	  // Create callback object
	  var unlocks = $.Callbacks();

	  // Create shortcut variables to reduce typing
	  var u = void 0;
	  var m = void 0;
	  var l = void 0;
	  var w = void 0;
	  var s = void 0;
	  var p = void 0;
	  var c = void 0;
	  var b = void 0;
	  var setVar = function setVar() {
	    u = _game.save.upgrades;
	    m = _game.save.monkeys;
	    l = _game.save.letters;
	    w = _game.save.words;
	    s = _game.save.sentences;
	    p = _game.save.pages;
	    c = _game.save.chapters;
	    b = _game.save.books;
	  };

	  //
	  // Letter Unlocks
	  //

	  var seeWords = function seeWords() {
	    if (l['lifetime'] >= 10) {
	      $('#WordsMenu').fadeIn();
	      unlocks.remove(seeWords);
	    }
	  };

	  var writeWords = function writeWords() {
	    if (l['lifetime'] >= 34 && !u['writeWords']) {
	      $('#WriteWords').fadeIn();
	      l['availableUpgrades'] += 1;
	      unlocks.remove(writeWords);
	    } else if (u['writeWords']) {
	      unlocks.remove(writeWords);
	    }
	  };

	  var fasterLetters = function fasterLetters() {
	    if (l['lifetime'] >= 475 && !u['fasterLetters']) {
	      $('#FasterLetters').fadeIn();
	      l['availableUpgrades'] += 1;
	      unlocks.remove(fasterLetters);
	    } else if (u['fasterLetters']) {
	      unlocks.remove(fasterLetters);
	    }
	  };

	  var efficientMonkeys = function efficientMonkeys() {
	    if (l['lifetime'] >= 275 && m['total'] >= 3 && !u['efficientMonkeys']) {
	      $('#EfficientMonkeys').fadeIn();
	      l['availableUpgrades'] += 1;
	      unlocks.remove(efficientMonkeys);
	    } else if (u['efficientMonkeys']) {
	      unlocks.remove(efficientMonkeys);
	    }
	  };

	  var monkeyIntelligenceI = function monkeyIntelligenceI() {
	    if (l['lifetime'] >= 655 && m['total'] >= 7 && !u['monkeyIntelligenceI']) {
	      $('#MonkeyIntelligenceI').fadeIn();
	      l['availableUpgrades'] += 1;
	      unlocks.remove(monkeyIntelligenceI);
	    } else if (u['monkeyIntelligenceI']) {
	      unlocks.remove(monkeyIntelligenceI);
	    }
	  };

	  var smarterLetters = function smarterLetters() {
	    if (l['lifetime'] >= 1200 && !u['smarterLetters']) {
	      $('#SmarterLetters').fadeIn();
	      l['availableUpgrades'] += 1;
	      unlocks.remove(smarterLetters);
	    } else if (u['smarterLetters']) {
	      unlocks.remove(smarterLetters);
	    }
	  };

	  var monkeyIntelligenceII = function monkeyIntelligenceII() {
	    if (l['lifetime'] >= 1600 && m['total'] >= 13 && !u['monkeyIntelligenceII']) {
	      $('#MonkeyIntelligenceII').fadeIn();
	      l['availableUpgrades'] += 1;
	      unlocks.remove(monkeyIntelligenceII);
	    } else if (u['monkeyIntelligenceII']) {
	      unlocks.remove(monkeyIntelligenceII);
	    }
	  };

	  var efficientWords = function efficientWords() {
	    if (l['lifetime'] >= 2300 && !u['efficientWords']) {
	      $('#EfficientWords').fadeIn();
	      l['availableUpgrades'] += 1;
	      unlocks.remove(efficientWords);
	    } else if (u['efficientWords']) {
	      unlocks.remove(efficientWords);
	    }
	  };

	  var monkeyIntelligenceBreakthrough = function monkeyIntelligenceBreakthrough() {
	    if (l['lifetime'] >= 4000 && m['total'] >= 20 && !u['monkeyIntelligenceBreakthrough']) {
	      $('#MonkeyIntelligenceBreakthrough').fadeIn();
	      l['availableUpgrades'] += 1;
	      unlocks.remove(monkeyIntelligenceBreakthrough);
	    } else if (u['monkeyIntelligenceBreakthrough']) {
	      unlocks.remove(monkeyIntelligenceBreakthrough);
	    }
	  };

	  var tooManyLetters = function tooManyLetters() {
	    if (l['total'] >= 20000 && !u['tooManyLetters']) {
	      $('#TooManyLetters').fadeIn();
	      l['availableUpgrades'] += 1;
	      unlocks.remove(tooManyLetters);
	    } else if (u['tooManyLetters']) {
	      unlocks.remove(tooManyLetters);
	    }
	  };

	  var monkeyGlasses = function monkeyGlasses() {
	    if (l['lifetime'] >= 20000 && m['total'] >= 28 && !u['monkeyGlasses']) {
	      $('#MonkeyGlasses').fadeIn();
	      l['availableUpgrades'] += 1;
	      unlocks.remove(monkeyGlasses);
	    } else if (u['monkeyGlasses']) {
	      unlocks.remove(monkeyGlasses);
	    }
	  };

	  //
	  // Word Unlocks
	  //

	  var seeSentences = function seeSentences() {
	    if (w['lifetime'] >= 113) {
	      $('#SentencesMenu').fadeIn();
	      unlocks.remove(seeSentences);
	    }
	  };

	  var writeSentences = function writeSentences() {
	    if (w['lifetime'] >= 200 && !u[['writeSentences']]) {
	      $('#WriteSentences').fadeIn();
	      w['availableUpgrades'] += 1;
	      unlocks.remove(writeSentences);
	    } else if (u['writeSentences']) {
	      unlocks.remove(writeSentences);
	    }
	  };

	  var fasterWords = function fasterWords() {
	    if (w['lifetime'] >= 45 && !u['fasterWords']) {
	      $('#FasterWords').fadeIn();
	      w['availableUpgrades'] += 1;
	      unlocks.remove(fasterWords);
	    } else if (u['fasterWords']) {
	      unlocks.remove(fasterWords);
	    }
	  };

	  var wordWhiz = function wordWhiz() {
	    if (w['lifetime'] >= 450 && !u['wordWhiz']) {
	      $('#WordWhiz').fadeIn();
	      w['availableUpgrades'] += 1;
	      unlocks.remove(wordWhiz);
	    } else if (u['wordWhiz']) {
	      unlocks.remove(wordWhiz);
	    }
	  };

	  var wordOfWisdom = function wordOfWisdom() {
	    if (w['lifetime'] >= 950 && !u['wordOfWisdom']) {
	      $('#WordOfWisdom').fadeIn();
	      w['availableUpgrades'] += 1;
	      unlocks.remove(wordOfWisdom);
	    } else if (u['wordOfWisdom']) {
	      unlocks.remove(wordOfWisdom);
	    }
	  };

	  var gettingTheHangOfIt = function gettingTheHangOfIt() {
	    if (w['lifetime'] >= 600 && !u['gettingTheHangOfIt']) {
	      $('#GettingTheHangOfIt').fadeIn();
	      w['availableUpgrades'] += 1;
	      unlocks.remove(gettingTheHangOfIt);
	    } else if (u['gettingTheHangOfIt']) {
	      unlocks.remove(gettingTheHangOfIt);
	    }
	  };

	  var sticksAndStones = function sticksAndStones() {
	    if (w['lifetime'] >= 1600 && !u['sticksAndStones']) {
	      $('#SticksAndStones').fadeIn();
	      w['availableUpgrades'] += 1;
	      unlocks.remove(sticksAndStones);
	    } else if (u['sticksAndStones']) {
	      unlocks.remove(sticksAndStones);
	    }
	  };

	  //
	  // Sentence Unlocks
	  //

	  var seePages = function seePages() {
	    if (s['lifetime'] >= 113) {
	      $('#PagesMenu').fadeIn();
	      unlocks.remove(seePages);
	    }
	  };

	  var writePages = function writePages() {
	    if (s['lifetime'] >= 223 && !u['writePages']) {
	      $('#WritePages').fadeIn();
	      s['availableUpgrades'] += 1;
	      unlocks.remove(writePages);
	    } else if (u['writePages']) {
	      unlocks.remove(writePages);
	    }
	  };

	  var fasterSentences = function fasterSentences() {
	    if (s['lifetime'] >= 39 && !u['fasterSentences']) {
	      $('#FasterSentences').fadeIn();
	      s['availableUpgrades'] += 1;
	      unlocks.remove(fasterSentences);
	    } else if (u['fasterSentences']) {
	      unlocks.remove(fasterSentences);
	    }
	  };

	  var evenFasterSentences = function evenFasterSentences() {
	    if (s['lifetime'] >= 95 && !u['evenFasterSentences']) {
	      $('#EvenFasterSentences').fadeIn();
	      s['availableUpgrades'] += 1;
	      unlocks.remove(evenFasterSentences);
	    } else if (u['evenFasterSentences']) {
	      unlocks.remove(evenFasterSentences);
	    }
	  };

	  var higherLearning = function higherLearning() {
	    if (s['lifetime'] >= 9 && !u['higherLearning']) {
	      $('#HigherLearning').fadeIn();
	      s['availableUpgrades'] += 1;
	      unlocks.remove(higherLearning);
	    } else if (u['higherLearning']) {
	      unlocks.remove(higherLearning);
	    }
	  };

	  var longerSentences = function longerSentences() {
	    if (s['lifetime'] >= 265 && !u['longerSentences']) {
	      $('#LongerSentences').fadeIn();
	      s['availableUpgrades'] += 1;
	      unlocks.remove(longerSentences);
	    } else if (u['longerSentences']) {
	      unlocks.remove(longerSentences);
	    }
	  };

	  var letterTradeoff = function letterTradeoff() {
	    if (s['lifetime'] >= 325 && !u['letterTradeoff']) {
	      $('#LetterTradeoff').fadeIn();
	      s['availableUpgrades'] += 1;
	      unlocks.remove(letterTradeoff);
	    } else if (u['letterTradeoff']) {
	      unlocks.remove(letterTradeoff);
	    }
	  };

	  var commonKnowledge = function commonKnowledge() {
	    if (p['lifetime'] >= 1 && !u['commonKnowledge']) {
	      $('#CommonKnowledge').fadeIn();
	      s['availableUpgrades'] += 1;
	      unlocks.remove(commonKnowledge);
	    } else if (u['commonKnowledge']) {
	      unlocks.remove(commonKnowledge);
	    }
	  };

	  var repeatingPatterns = function repeatingPatterns() {
	    if (s['lifetime'] >= 785 && !u['repeatingPatterns']) {
	      $('#RepeatingPatterns').fadeIn();
	      s['availableUpgrades'] += 1;
	      unlocks.remove(repeatingPatterns);
	    } else if (u['repeatingPatterns']) {
	      unlocks.remove(repeatingPatterns);
	    }
	  };

	  //
	  // Page Unlocks
	  //

	  var seeChapters = function seeChapters() {
	    if (p['lifetime'] >= 200) {
	      $('#ChaptersMenu').fadeIn();
	      unlocks.remove(seeChapters);
	    }
	  };

	  //
	  // Chapter Unlocks
	  //

	  var seeBooks = function seeBooks() {
	    if (c['lifetime'] >= 143) {
	      $('#BooksMenu').fadeIn();
	      unlocks.remove(seeBooks);
	    }
	  };

	  // Create some public functions to fire callback objects
	  return {
	    // Initial setup of callback object with all functions
	    // Fires onLoad
	    setup: function setup() {
	      setVar();
	      // Includes functions in callback object
	      unlocks.add(setVar);
	      // Letter Unlocks
	      unlocks.add(seeWords);
	      unlocks.add(writeWords);
	      unlocks.add(fasterLetters);
	      unlocks.add(efficientMonkeys);
	      unlocks.add(monkeyIntelligenceI);
	      unlocks.add(monkeyIntelligenceII);
	      unlocks.add(monkeyIntelligenceBreakthrough);
	      unlocks.add(smarterLetters);
	      unlocks.add(tooManyLetters);
	      unlocks.add(monkeyGlasses);

	      // Word Unlocks
	      unlocks.add(seeSentences);
	      unlocks.add(writeSentences);
	      unlocks.add(fasterWords);
	      unlocks.add(wordWhiz);
	      unlocks.add(wordOfWisdom);
	      unlocks.add(gettingTheHangOfIt);
	      unlocks.add(sticksAndStones);

	      // Sentence Unlocks
	      unlocks.add(seePages);
	      unlocks.add(writePages);
	      unlocks.add(fasterSentences);
	      unlocks.add(evenFasterSentences);
	      unlocks.add(longerSentences);
	      unlocks.add(higherLearning);
	      unlocks.add(letterTradeoff);
	      unlocks.add(commonKnowledge);
	      unlocks.add(repeatingPatterns);

	      // Page Unlocks
	      unlocks.add(seeChapters);

	      // Chapter Unlocks
	      unlocks.add(seeBooks);

	      // Sets upgrade counting variables to 0
	      l['availableUpgrades'] = 0;
	      w['availableUpgrades'] = 0;
	      s['availableUpgrades'] = 0;
	      p['availableUpgrades'] = 0;
	      c['availableUpgrades'] = 0;
	      b['availableUpgrades'] = 0;

	      // Check if they've been unlocked already
	      unlocks.fire();
	    },

	    // Checks unlocks
	    check: function check() {
	      unlocks.fire();
	    }
	  };
	}();

	exports.default = unlock;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _game = __webpack_require__(1);

	var upgrade = function () {
	  // Create callback objects
	  var upgrades = $.Callbacks();

	  // Create shortcut variables to reduce typing
	  var u = void 0;
	  var m = void 0;
	  var l = void 0;
	  var w = void 0;
	  var s = void 0;
	  var p = void 0;
	  var c = void 0;
	  var b = void 0;
	  var setVar = function setVar() {
	    u = _game.save.upgrades;
	    m = _game.save.monkeys;
	    l = _game.save.letters;
	    w = _game.save.words;
	    s = _game.save.sentences;
	    p = _game.save.pages;
	    c = _game.save.chapters;
	    b = _game.save.books;
	  };

	  var upgradeError = function upgradeError() {
	    return errorAlert('Oh dear...', 'You are too poor to purchase this upgrade.');
	  };

	  return {
	    // Checks regularly to fade in icon if upgrades are purchaseable
	    check: function check() {
	      setVar();
	      // If there are any upgrades, fade in global icon
	      if (l['availableUpgrades'] + w['availableUpgrades'] + s['availableUpgrades'] + p['availableUpgrades'] + c['availableUpgrades'] + b['availableUpgrades'] !== 0) {
	        $('#upgradeAvailable').fadeIn();
	      } else {
	        $('#upgradeAvailable').fadeOut();
	      }
	      // If there are upgrades, fade in the icon
	      if (l['availableUpgrades'] !== 0) {
	        $('#LettersUpgradeAvailable').fadeIn();
	      }if (w['availableUpgrades'] !== 0) {
	        $('#WordsUpgradeAvailable').fadeIn();
	      }if (s['availableUpgrades'] !== 0) {
	        $('#SentencesUpgradeAvailable').fadeIn();
	      }if (p['availableUpgrades'] !== 0) {
	        $('#PagesUpgradeAvailable').fadeIn();
	      }if (c['availableUpgrades'] !== 0) {
	        $('#ChaptersUpgradeAvailable').fadeIn();
	      }if (b['availableUpgrades'] !== 0) {
	        $('#BooksUpgradeAvailable').fadeIn();
	      }
	      // If there are no upgrades, fade out the icon
	      if (l['availableUpgrades'] === 0) {
	        $('#LettersUpgradeAvailable').fadeOut();
	      }if (w['availableUpgrades'] === 0) {
	        $('#WordsUpgradeAvailable').fadeOut();
	      }if (s['availableUpgrades'] === 0) {
	        $('#SentencesUpgradeAvailable').fadeOut();
	      }if (p['availableUpgrades'] === 0) {
	        $('#PagesUpgradeAvailable').fadeOut();
	      }if (c['availableUpgrades'] === 0) {
	        $('#ChaptersUpgradeAvailable').fadeOut();
	      }if (b['availableUpgrades'] === 0) {
	        $('#BooksUpgradeAvailable').fadeOut();
	      }
	    },
	    setup: function setup() {
	      setVar();
	      if (u['writeWords']) {
	        $('#wordsManualSection').fadeIn();
	      }
	      if (u['writeSentences']) {
	        $('#sentencesManualSection').fadeIn();
	      }
	      if (u['writePages']) {
	        $('#pagesManualSection').fadeIn();
	      }
	    },

	    writeWords: function writeWords() {
	      setVar();
	      if (l['total'] >= 34 && !u['writeWords']) {
	        $('#WriteWords').fadeOut(); // Fade out button
	        (0, _game.setUpgrade)('writeWords'); // Set upgrade to purchased
	        l['total'] -= 34; // Deduct cost
	        l['availableUpgrades'] -= 1; // Deduct purchaseable upgrade
	        $('#wordsManualSection').fadeIn(); // Fade in purchased section
	      } else if (l['total'] < 34) {
	        upgradeError();
	      }
	    },

	    writeSentences: function writeSentences() {
	      setVar();
	      if (w['total'] >= 30 && !u['writeSentences']) {
	        $('#WriteSentences').fadeOut();
	        (0, _game.setUpgrade)('writeSentences');
	        w['total'] -= 30;
	        w['availableUpgrades'] -= 1;
	        $('#sentencesManualSection').fadeIn();
	      } else if (w['total'] < 30) {
	        upgradeError();
	      }
	    },

	    writePages: function writePages() {
	      setVar();
	      if (s['total'] >= 50 && !u['writePages']) {
	        $('#WritePages').fadeOut();
	        (0, _game.setUpgrade)('writePages');
	        s['total'] -= 50;
	        s['availableUpgrades'] -= 1;
	        $('#pagesManualSection').fadeIn();
	      } else if (w['total'] < 50) {
	        upgradeError();
	      }
	    },

	    fasterLetters: function fasterLetters() {
	      setVar();
	      if (l['total'] >= 175 && !u['fasterLetters']) {
	        $('#FasterLetters').fadeOut();
	        (0, _game.setUpgrade)('fasterLetters');
	        l['total'] -= 175;
	        l['availableUpgrades'] -= 1;
	        l['timer'] *= 0.5;
	        (0, _game.calcGenerating)('letters');
	      } else if (l['total'] < 175) {
	        upgradeError();
	      }
	    },

	    efficientMonkeys: function efficientMonkeys() {
	      setVar();
	      if (l['total'] >= 75 && !u['efficientMonkeys']) {
	        $('#EfficientMonkeys').fadeOut();
	        (0, _game.setUpgrade)('efficientMonkeys');
	        l['total'] -= 75;
	        l['availableUpgrades'] -= 1;
	        m['multiplier'] *= 1.1;
	        (0, _game.calcGenerating)('letters');
	      } else if (l['total'] < 75) {
	        upgradeError();
	      }
	    },

	    monkeyIntelligenceI: function monkeyIntelligenceI() {
	      setVar();
	      if (l['total'] >= 350 && !u['monkeyIntelligenceI']) {
	        $('#MonkeyIntelligenceI').fadeOut();
	        (0, _game.setUpgrade)('monkeyIntelligenceI');
	        l['total'] -= 350;
	        l['availableUpgrades'] -= 1;
	        m['multiplier'] *= 1.2;
	        (0, _game.calcGenerating)('letters');
	      } else if (l['total'] < 350) {
	        upgradeError();
	      }
	    },

	    monkeyIntelligenceII: function monkeyIntelligenceII() {
	      setVar();
	      if (l['total'] >= 775 && !u['monkeyIntelligenceII']) {
	        $('#MonkeyIntelligenceII').fadeOut();
	        (0, _game.setUpgrade)('monkeyIntelligenceII');
	        l['total'] -= 775;
	        l['availableUpgrades'] -= 1;
	        m['multiplier'] *= 1.25;
	        (0, _game.calcGenerating)('letters');
	      } else if (l['total'] < 775) {
	        upgradeError();
	      }
	    },

	    monkeyIntelligenceBreakthrough: function monkeyIntelligenceBreakthrough() {
	      setVar();
	      if (l['total'] >= 2200 && !u['monkeyIntelligenceBreakthrough']) {
	        $('#MonkeyIntelligenceBreakthrough').fadeOut();
	        (0, _game.setUpgrade)('monkeyIntelligenceBreakthrough');
	        l['total'] -= 2200;
	        l['availableUpgrades'] -= 1;
	        m['multiplier'] *= 2.00;
	        (0, _game.calcGenerating)('letters');
	      } else if (l['total'] < 2200) {
	        upgradeError();
	      }
	    },

	    fasterWords: function fasterWords() {
	      setVar();
	      if (w['total'] >= 25 && !u['fasterWords']) {
	        $('#FasterWords').fadeOut();
	        (0, _game.setUpgrade)('fasterWords');
	        w['total'] -= 25;
	        w['availableUpgrades'] -= 1;
	        w['timer'] *= 0.7;
	        (0, _game.calcGenerating)('words');
	      } else if (w['total'] < 25) {
	        upgradeError();
	      }
	    },

	    fasterSentences: function fasterSentences() {
	      setVar();
	      if (s['total'] >= 25 && !u['fasterSentences']) {
	        $('#FasterSentences').fadeOut();
	        (0, _game.setUpgrade)('fasterSentences');
	        s['total'] -= 25;
	        s['availableUpgrades'] -= 1;
	        s['timer'] *= 0.75;
	        (0, _game.calcGenerating)('sentences');
	      } else if (s['total'] < 25) {
	        upgradeError();
	      }
	    },

	    efficientWords: function efficientWords() {
	      setVar();
	      if (l['total'] >= 1450 && !u['efficientWords']) {
	        $('#EfficientWords').fadeOut();
	        (0, _game.setUpgrade)('efficientWords');
	        l['total'] -= 1450;
	        l['availableUpgrades'] -= 1;
	        w['cost'] *= 0.9;
	        (0, _game.calcGenerating)('words');
	      } else if (l['total'] < 1450) {
	        upgradeError();
	      }
	    },

	    wordWhiz: function wordWhiz() {
	      setVar();
	      if (w['total'] >= 100 && !u['wordWhiz']) {
	        $('#WordWhiz').fadeOut();
	        (0, _game.setUpgrade)('wordWhiz');
	        w['total'] -= 100;
	        w['availableUpgrades'] -= 1;
	        w['multiplier'] *= 1.15;
	        (0, _game.calcGenerating)('words');
	      } else if (w['total'] < 100) {
	        upgradeError();
	      }
	    },

	    smarterLetters: function smarterLetters() {
	      setVar();
	      if (l['total'] >= 500 && !u['smarterLetters']) {
	        $('#SmarterLetters').fadeOut();
	        (0, _game.setUpgrade)('smarterLetters');
	        l['total'] -= 500;
	        l['availableUpgrades'] -= 1;
	        l['multiplier'] *= 1.1;
	        (0, _game.calcGenerating)('letters');
	      } else if (l['total'] < 500) {
	        upgradeError();
	      }
	    },

	    higherLearning: function higherLearning() {
	      setVar();
	      if (s['total'] >= 105 && !u['higherLearning']) {
	        $('#HigherLearning').fadeOut();
	        (0, _game.setUpgrade)('higherLearning');
	        s['total'] -= 105;
	        s['availableUpgrades'] -= 1;
	        w['multiplier'] *= 1.15;
	        (0, _game.calcGenerating)('words');
	      } else if (s['total'] < 105) {
	        upgradeError();
	      }
	    },

	    wordOfWisdom: function wordOfWisdom() {
	      setVar();
	      if (w['total'] >= 550 && !u['wordOfWisdom']) {
	        $('#WordOfWisdom').fadeOut();
	        (0, _game.setUpgrade)('wordOfWisdom');
	        w['total'] -= 550;
	        w['availableUpgrades'] -= 1;
	        w['multiplier'] *= 1.50;
	        (0, _game.calcGenerating)('words');
	      } else if (w['total'] < 550) {
	        upgradeError();
	      }
	    },

	    tooManyLetters: function tooManyLetters() {
	      setVar();
	      if (l['total'] >= 5000 && !u['tooManyLetters']) {
	        $('#TooManyLetters').fadeOut();
	        (0, _game.setUpgrade)('tooManyLetters');
	        l['total'] -= 5000;
	        l['availableUpgrades'] -= 1;
	        w['multiplier'] *= 3.00;
	        (0, _game.calcGenerating)('words');
	      } else if (l['total'] < 5000) {
	        upgradeError();
	      }
	    },

	    longerSentences: function longerSentences() {
	      setVar();
	      if (s['total'] >= 150 && !u['longerSentences']) {
	        $('#LongerSentences').fadeOut();
	        (0, _game.setUpgrade)('longerSentences');
	        s['total'] -= 150;
	        s['availableUpgrades'] -= 1;
	        s['cost'] *= 1.10;
	        s['multiplier'] *= 1.50;
	        (0, _game.calcGenerating)('sentences');
	      } else if (s['total'] < 150) {
	        upgradeError();
	      }
	    },

	    gettingTheHangOfIt: function gettingTheHangOfIt() {
	      setVar();
	      if (w['total'] >= 300 && !u['gettingTheHangOfIt']) {
	        $('#GettingTheHangOfIt').fadeOut();
	        (0, _game.setUpgrade)('gettingTheHangOfIt');
	        w['total'] -= 300;
	        w['availableUpgrades'] -= 1;
	        w['timer'] *= 0.50;
	        (0, _game.calcGenerating)('words');
	      } else if (w['total'] < 300) {
	        upgradeError();
	      }
	    },

	    sticksAndStones: function sticksAndStones() {
	      setVar();
	      if (w['total'] >= 1100 && !u['sticksAndStones']) {
	        $('#SticksAndStones').fadeOut();
	        (0, _game.setUpgrade)('sticksAndStones');
	        w['total'] -= 1100;
	        w['availableUpgrades'] -= 1;
	        w['cost'] *= 1.20;
	        w['multiplier'] *= 1.50;
	        (0, _game.calcGenerating)('words');
	      } else if (w['total'] < 1100) {
	        upgradeError();
	      }
	    },

	    monkeyGlasses: function monkeyGlasses() {
	      setVar();
	      if (l['total'] >= 3400 && !u['monkeyGlasses']) {
	        $('#MonkeyGlasses').fadeOut();
	        (0, _game.setUpgrade)('monkeyGlasses');
	        l['total'] -= 3400;
	        l['availableUpgrades'] -= 1;
	        m['multiplier'] *= 2.50;
	        (0, _game.calcGenerating)('letters');
	      } else if (l['total'] < 3400) {
	        upgradeError();
	      }
	    },

	    evenFasterSentences: function evenFasterSentences() {
	      setVar();
	      if (s['total'] >= 85 && !u['evenFasterSentences']) {
	        $('#EvenFasterSentences').fadeOut();
	        (0, _game.setUpgrade)('evenFasterSentences');
	        s['total'] -= 85;
	        s['availableUpgrades'] -= 1;
	        s['timer'] *= 0.50;
	        (0, _game.calcGenerating)('sentences');
	      } else if (s['total'] < 85) {
	        upgradeError();
	      }
	    },

	    letterTradeoff: function letterTradeoff() {
	      setVar();
	      if (s['total'] >= 125 && !u['letterTradeoff']) {
	        $('#LetterTradeoff').fadeOut();
	        (0, _game.setUpgrade)('letterTradeoff');
	        s['total'] -= 125;
	        s['availableUpgrades'] -= 1;
	        l['multiplier'] *= 0.90;
	        s['multiplier'] *= 1.30;
	        (0, _game.calcGenerating)('sentences');
	        (0, _game.calcGenerating)('letters');
	      } else if (s['total'] < 125) {
	        upgradeError();
	      }
	    },

	    commonKnowledge: function commonKnowledge() {
	      setVar();
	      if (s['total'] >= 210 && !u['commonKnowledge']) {
	        $('#CommonKnowledge').fadeOut();
	        (0, _game.setUpgrade)('commonKnowledge');
	        s['total'] -= 210;
	        s['availableUpgrades'] -= 1;
	        p['timer'] *= 0.50;
	        (0, _game.calcGenerating)('pages');
	      } else if (s['total'] < 210) {
	        upgradeError();
	      }
	    },

	    repeatingPatterns: function repeatingPatterns() {
	      setVar();
	      if (s['total'] >= 500 && !u['repeatingPatterns']) {
	        $('#RepeatingPatterns').fadeOut();
	        (0, _game.setUpgrade)('repeatingPatterns');
	        s['total'] -= 500;
	        s['availableUpgrades'] -= 1;
	        s['multiplier'] *= 1.35;
	        s['timer'] *= 0.75;
	        (0, _game.calcGenerating)('sentences');
	      } else if (s['total'] < 500) {
	        upgradeError();
	      }
	    }
	  };
	}();
	exports.default = upgrade;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _game = __webpack_require__(1);

	var achieve = function () {
	  var _this = this;

	  //
	  // Drag and Drop
	  //

	  var setListeners = function setListeners() {
	    // Define droppable areas
	    var activePerks = document.querySelectorAll('.activePerk');
	    for (var i = 0; i < activePerks.length; i++) {
	      activePerks[i].addEventListener('dragover', function (e) {
	        e.preventDefault();
	        e.dataTransfer.effectAllowed = 'copy';
	      }, false);
	      activePerks[i].addEventListener('drop', function (e) {
	        e.preventDefault();
	        var counter = 0;
	        for (var _i = 0; _i < activePerks.length; _i++) {
	          if (e.dataTransfer.getData('text/html') !== activePerks[_i].innerHTML) {
	            counter += 1;
	          }if (counter === 3) {
	            _this.innerHTML = e.dataTransfer.getData('text/html');
	          }
	        }
	      }, false);
	    }

	    var perks = document.querySelectorAll('.achievement');
	    for (var _i2 = 0; _i2 < perks.length; _i2++) {
	      perks[_i2].addEventListener('dragstart', function (e) {
	        e.dataTransfer.effectAllowed = 'copy';
	        e.dataTransfer.setData('text/html', e.target.innerHTML);
	        e.dataTransfer.setDragImage(e.target, 50, 50);
	      }, false);
	      perks[_i2].addEventListener('dragenter', function (e) {
	        e.preventDefault();
	        return true;
	      }, false);
	    }
	  };

	  // Create callback object
	  var ach = $.Callbacks();

	  // Create variable shortcut
	  var a = void 0;
	  var setVar = function setVar() {
	    a = _game.save['achievements'];
	  };

	  /*
	    const findPongo = () => {
	      $('#monkeys').mouseover((event) => {
	        achieve.alert('You Found Pongo!', '+10% Speed to Monkeys')
	        a['findPongo'] = true
	        $(this).unbind(event)
	      })
	    }
	  */

	  return {
	    // Animation for fading in and then out an alert box
	    alert: function alert(title, desc) {
	      $('.achievementWindow').removeClass('achBehind').addClass('achInFront');
	      $('#achieve').fadeTo(500, 0.9);
	      $('#achieveTitle').text(title);
	      $('#achieveDesc').text('Perk: ' + desc);

	      // After 7 seconds, fades the window back out
	      window.setTimeout(function () {
	        $('#achieve').fadeTo(500, 0);
	        $('.achievementWindow').removeClass('achInFront').addClass('achBehind');
	      }, 7000);
	    },

	    setup: function setup() {
	      setVar();
	      // if (!a['findPongo']) { ach.add(findPongo) }
	      ach.add(setListeners);
	      ach.fire();
	    },

	    check: function check() {
	      ach.fire();
	    }
	  };
	}();

	exports.default = achieve;

/***/ }
/******/ ]);