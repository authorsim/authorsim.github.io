// Initialize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Declare variables

function init(){
	save = {
		monkeys: {Total: 0, Multiplier: 1.0, Cost: 1, Lifetime: 0},
		letters: {Total: 1000.0, Unique: 0, PerSecond: 0.0, Using: 0, Lifetime: 0, Timer: 0.6, Progress: 0, Upgrade: 0},
		words: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:6, Lifetime:0, Timer: 1.5, Progress: 0, Upgrade: 0},
		sentences: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:15, Lifetime:0, Timer: 20, Progress: 0, Upgrade: 0},
		pages: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:17, Lifetime:0, Timer: 300, Progress: 0, Upgrade: 0},
		chapters: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:20, Lifetime:0},
		books: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:25, Lifetime:0},
		series: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:3, Lifetime:0},
		upgrade: {writewords: false, 2: false, 3: false, 4:false},
		office: {Space: 0, Counter: 1},
		staff: {}
	};
};

if (typeof save === 'undefined') {
	init();
};

staff = { // Exp and Eff values for all levels of staff
		MS: { Exp1: 150, Eff1: .05},
		HS: { Exp1: 200, Eff1: .1},
		UG: { Exp1: 250, Eff1: .15},
		GS: { Exp1: 300, Eff1: .2},
		PHD: { Exp1: 350, Eff1: .25}
	}


//
//  Writing pieces
//

$('#startwritingletters').click(function(){startWriting("letters");});
$('#startwritingwords').click(function(){startWriting("words");});
$('#startwritingsentences').click(function(){startWriting("sentences");});
$('#startwritingpages').click(function(){startWriting("pages");});

function startWriting(unit) {
	disengageWriting();
	var units = ["letters", "words", "sentences", "pages", "chapters", "books", "series"];
	for (i = 0; i < units.length; i++) {
		if (units[i] != "letters" && units[i] == unit) {
			save[units[i]]["PerSecond"] += (1 / save[units[i]]["Timer"])
			save[units[i - 1]]["Using"] += ((1 / save[units[i]]["Timer"]) * save[units[i]]["Cost"])
		}else if (units[i] == "letters" && units[i] == unit) {
			save[units[i]]["PerSecond"] += (1 / save[units[i]]["Timer"])
		}
	}
	$("#startwriting" + unit).addClass("disabled");
	$("#writing" + unit + "progress").addClass("progress-bar-striped");
	$("#writing" + unit + "progress").addClass("active");
};

function disengageWriting(){
	var units = ["letters", "words", "sentences", "pages", "chapters", "books", "series"];
	for (i = 0; i < units.length; i++) {
		if ($("#startwriting" + units[i]).hasClass("disabled") && units[i] != "letters") {
			save[units[i]]["PerSecond"] -= (1 / save[units[i]]["Timer"])
			save[units[i - 1]]["Using"] -= ((1 / save[units[i]]["Timer"]) * save[units[i]]["Cost"])
		}
		if ($("#startwriting" + units[i]).hasClass("disabled") && units[i] == "letters") {
			save[units[i]]["PerSecond"] -= (1 / save[units[i]]["Timer"])
		}
		$("#startwriting" + units[i]).removeClass("disabled");
		$("#writing" + units[i] + "progress").removeClass("progress-bar-striped active").css('width', '0%').attr('aria-valuenow', 0);
	}
};


//
// Game logic
//

function incrementLetters(num){
	save.letters.Total += ((save.monkeys.Total * save.monkeys.Multiplier) / (1000 / interval)) * num
	save.letters.Lifetime += ((save.monkeys.Total * save.monkeys.Multiplier) / interval) * num
};

/* Number prettifier */
  var nLog = Math.log(10);
  var nArray = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "UnD", "DuD", "TrD", "QaD", "QiD", "SeD", "SpD", "OcD", "NoD", "Vi", "UnV"];

  var floor = function(n) {
    return (Math.abs(Math.abs(n) - Math.abs(Math.floor(n))) >= 0.999999991) ? ((n >= 0) ? Math.ceil(n) : Math.floor(n)) : ((n >= 0) ? Math.floor(n) : Math.ceil(n));
  };

  var prettify = function(n, d) {
    var l = (floor(Math.log(Math.abs(n)) / nLog) <= 0) ? 0 : floor(Math.log(Math.abs(n)) / nLog),
    p = (l % 3 === 0) ? 2 : (((l - 1) % 3 === 0) ? 1 : 0),
    r = (Math.abs(n) < 1000) ? ((typeof d === "number") ? n.toFixed(d) : floor(n)) : (floor(n / (Math.pow(10, floor(l / 3) * 3 - p))) / Math.pow(10, p));
    return (r + nArray[floor(l / 3)] + ((floor(r) === 42) ? "~" : "")) || "Infinite";
  };


//
//  Statistics
//

function drawStatistics(){
	$('#lettersLifetimeStat').html(prettify(save.letters.Lifetime,0))
	$('#wordsLifetimeStat').html(prettify(save.words.Lifetime,0))
	$('#sentencesLifetimeStat').html(prettify(save.sentences.Lifetime,0))
	$('#pagesLifetimeStat').html(prettify(save.pages.Lifetime,0))
	$('#chaptersLifetimeStat').html(prettify(save.chapters.Lifetime,0))
	$('#booksLifetimeStat').html(prettify(save.books.Lifetime,0))
	$('#seriesLifetimeStat').html(prettify(save.series.Lifetime,0))
};

//
// Loop Functions
//

function writing(num){
	var units = ["letters", "words", "sentences", "pages", "chapters", "books", "series"];
	for (i = 0; i < units.length; i++) {
		if ($("#startwriting" + units[i]).hasClass("disabled")) {
			save[units[i]]["Progress"] += (100 / (save[units[i]]["Timer"] * (1000 / interval)) * num)
			$("#writing" + units[i] + "progress").css('width', save[units[i]]["Progress"] + '%').attr("aria-valuenow", save[units[i]]["Progress"]);
			if (save[units[i]]["Progress"] >= 100 && units[i] != "letters") {
				save[units[i - 1]]["Total"] -= save[units[i]]["Cost"]
				save[units[i]]["Total"] += 1
				save[units[i]]["Lifetime"] += 1
				save[units[i]]["Progress"] = 0
			} if (save[units[i]]["Progress"] >= 100 && units[i] == "letters") {
				save[units[i]]["Total"] += 1
				save[units[i]]["Lifetime"] += 1
				save[units[i]]["Progress"] = 0
			}
		}
	}
};

function staffWriting(num) {
	var units = ["letters", "words", "sentences", "pages", "chapters", "books"];
	for (i = 1; i < 10; i++) { //Loops through all the staff slots
		for (j = 0; j < units.length; j++) { // Loops all the units in the specified slot
			if ($("#" + units[j] + i).hasClass("active")) { //Checks if a specific button is active on a staff member
				if (save[units[j - 1]]["Total"] >= save[units[j]]["Cost"]) { //Checks if you can afford to create a unit
					save["staff"]["S" + i]["Progress"] += (100 / ((save[units[j]]["Timer"] * (1 - save["staff"]["S" + i]["Eff"])) * (1000 / interval)) * num)
					$('#staffProgressBar' + i).css('width', save["staff"]["S" + i]["Progress"] + '%').attr('aria-valuenow', save["staff"]["S" + i]["Progress"]);
					if (save["staff"]["S" + i]["Progress"] >= 100) {
						save[units[j - 1]]["Total"] -= (save[units[j]]["Cost"] - (save[units[j]]["Cost"] * save["staff"]["S" + i]["Eff"]))
						save[units[j]]["Total"] += 1
						save[units[j]]["Lifetime"] += 1
						save["staff"]["S" + i]["Progress"] = 0
						save["staff"]["S" + i]["Exp"] += save[units[j]]["Timer"] / 2
						$("#staffExpBar" + i).css('width', ((save["staff"]["S" + i]["Exp"] / save["staff"]["S" + i]["NextExp"]) * 100) + '%');
						$("#staffExpValue" + i).text(prettify(save["staff"]["S" + i]["Exp"],2));
						if (save["staff"]["S" + i]["Exp"] >= save["staff"]["S" + i]["NextExp"]) {
              if (save["staff"]["S" + i]["Level"] < save["staff"]["S" + i]["MaxLevel"]) {
							  levelUp(i);
              };
						};
					};
				};
			};
		};
	};
};

var before = new Date();
var interval = 20

//
// Functions on page load (timeout, save)
//

window.onload = function WindowLoad(event){
	load();
	timeout();
};

function timeout(){
	window.setTimeout(function(){
		localStorage.setItem("save",JSON.stringify(save));
    letterAch();
    wordAch();
    sentenceAch();
    pageAch();
    bookAch();
    seriesAch();
		timeout();
	}, 10000);
};

// Fires before the page unloads
window.onbeforeunload = function(event){
  localStorage.setItem("save",JSON.stringify(save));
  disengageStaff();
	disengageWriting();
	localStorage.setItem("save",JSON.stringify(save));
};

function load(){
	if (localStorage.getItem("save") !== null){
	var savegame = JSON.parse(localStorage.getItem("save"));
	save.monkeys = savegame.monkeys;
	save.letters = savegame.letters;
	save.words = savegame.words;
	save.sentences = savegame.sentences;
	save.pages = savegame.pages;
	save.chapters = savegame.chapters;
	save.books = savegame.books;
	save.series = savegame.series;
	save.upgrade = savegame.upgrade;
	save.staff = savegame.staff;

	for (i = 1; i < 10; i++) {
		if (typeof save["staff"]["S" + i] !== 'undefined' && save["staff"]["S" + i]["Active"] == 1) {
			drawStaff(save["staff"]["S" + i], [i]);
		}
	}

	wordAch();
	sentenceAch();
	pageAch();
	chapterAch();
	bookAch();
	seriesAch();

	if (savegame.upgrade.writewords === true){
		$("#writingWords").show();
	}
	}
};

function drawGame(){
	document.getElementsByClassName("monkeys.Total")[0].innerHTML = save.monkeys.Total
	document.getElementsByClassName("letters.Total")[0].innerHTML = prettify(save.letters.Total,0)
	document.getElementsByClassName("letters.Total")[1].innerHTML = prettify(save.letters.Total,0)
	document.getElementsByClassName("letters.Total")[2].innerHTML = prettify(save.letters.Total,0)
  document.getElementsByClassName("letters.PerSecond")[0].innerHTML = prettify(save.letters.PerSecond,2)
  document.getElementsByClassName("letters.PerSecond")[1].innerHTML = prettify(save.letters.PerSecond,2)
  document.getElementsByClassName("letters.Using")[0].innerHTML = prettify(save.letters.Using,2)
	document.getElementsByClassName("writingLetters.Timer")[0].innerHTML = prettify(save.letters.Timer,2)
	document.getElementsByClassName("words.Cost")[0].innerHTML = prettify(save.words.Cost,0)
	document.getElementsByClassName("words.Total")[0].innerHTML = prettify(save.words.Total,0)
	document.getElementsByClassName("words.Total")[1].innerHTML = prettify(save.words.Total,0)
	document.getElementsByClassName("words.PerSecond")[0].innerHTML = prettify(save.words.PerSecond,2)
  document.getElementsByClassName("words.Using")[0].innerHTML = prettify(save.words.Using,2)
	document.getElementsByClassName("writingWords.Timer")[0].innerHTML = prettify(save.words.Timer,2)
	document.getElementsByClassName("sentences.Cost")[0].innerHTML = prettify(save.sentences.Cost,0)
	document.getElementsByClassName("sentences.Total")[0].innerHTML = prettify(save.sentences.Total,0)
	document.getElementsByClassName("sentences.Total")[1].innerHTML = prettify(save.sentences.Total,0)
	document.getElementsByClassName("sentences.PerSecond")[0].innerHTML = prettify(save.sentences.PerSecond,2)
	document.getElementsByClassName("writingSentences.Timer")[0].innerHTML = prettify(save.sentences.Timer,2)
	document.getElementsByClassName("pages.Total")[0].innerHTML = prettify(save.pages.Total,0)
	document.getElementsByClassName("pages.Total")[1].innerHTML = prettify(save.pages.Total,0)
	document.getElementsByClassName("pages.PerSecond")[0].innerHTML = prettify(save.pages.PerSecond,2)
	document.getElementsByClassName("chapters.Total")[0].innerHTML = save.chapters.Total
	document.getElementsByClassName("chapters.Total")[1].innerHTML = save.chapters.Total
	document.getElementsByClassName("books.Total")[0].innerHTML = save.books.Total
	document.getElementsByClassName("books.Total")[1].innerHTML = save.books.Total
	document.getElementsByClassName("series.Total")[0].innerHTML = save.series.Total
	document.getElementsByClassName("series.Total")[1].innerHTML = save.series.Total
};

function delSave(){
	$('#confirmpopMessage').text("Are you sure you want to delete your save?");
	$('.pop').fadeIn();
	$('.confirmpopopacity').fadeIn();
	$('.confirm').off('click').click(function() {
		localStorage.removeItem("save");
		disengageWriting();
		disengageStaff();
		init();
		location.reload();
		$('.pop').fadeOut();
		$('.confirmpopopacity').fadeOut();
	});
	$('.deny').off('click').click(function() {
		$('.pop').fadeOut();
		$('.confirmpopopacity').fadeOut();
	});
};

//
// The loop
//

window.setInterval(function(){
	drawGame();

	now = new Date();
	elapsedTime = (now.getTime() - before.getTime());
	elapsedValue = (elapsedTime / interval);

	incrementLetters(elapsedValue);
	writing(elapsedValue);
	staffWriting(elapsedValue);

	before = now
}, 1000 / interval);
