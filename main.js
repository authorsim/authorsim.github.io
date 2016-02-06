// Initialize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Declare variables

var save = {
	monkeys: {Total: 0, Available: 1, Multiplier: 1.0, Lifetime: 0},
	letters: {Total: 0.0, Unique: 0, PerSecond: 0.0, Using: 0, Lifetime: 0},
	words: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:6, Lifetime:0},
	sentences: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:15, Lifetime:0},
	pages: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:17, Lifetime:0},
	chapters: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:20, Lifetime:0},
	books: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:25, Lifetime:0},
	series: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:3, Lifetime:0},
	writingLetters: {Timer: 0.6},
	writingWords: {Timer: 1.5},
	writingSentences: {Timer: 20},
	writingPages: {Timer: 300},
	upgrade: {writewords: false, 2: false, 3: false, 4:false},
	office: {Space: 0, Counter: 1},
	staff: {}
};

var writingLetters = {Progress: 0};
var writingWords = {Progress: 0};
var writingSentences = {Progress: 0};
var writingPages = {Progress: 0};

staff = { // Exp and Eff values for all levels of staff
		MSG: {
			Exp1: 150,
			Exp2: 300,
			Exp3: 585,
			Exp4: 1151,
			Eff1: .05,
			Eff2: .1,
			Eff3: .15,
			Eff4: .2
		},
		HSD: {
			Exp1: 200,
			Exp2: 400,
			Exp3: 780,
			Exp4: 1534,
			Exp5: 3008,
			Eff1: .1,
			Eff2: .15,
			Eff3: .2,
			Eff4: .25,
			Eff5: .3
		},
		UG: {
			Exp1: 250,
			Exp2: 500,
			Exp3: 975,
			Exp4: 1918,
			Exp5: 3760,
			Exp6: 7381,
			Eff1: .15,
			Eff2: .2,
			Eff3: .25,
			Eff4: .3,
			Eff5: .35,
			Eff6: .4
		},
		GS: {
			Exp1: 300,
			Exp2: 600,
			Exp3: 1170,
			Exp4: 2301,
			Exp5: 4512,
			Exp6: 8857,
			Exp7: 17380,
			Exp8: 34109,
			Eff1: .2,
			Eff2: .25,
			Eff3: .3,
			Eff4: .35,
			Eff5: .4,
			Eff6: .45,
			Eff7: .5,
			Eff8: .55
		},
		PHD: {
			Exp1: 350,
			Exp2: 700,
			Exp3: 1365,
			Exp4: 2685,
			Exp5: 5264,
			Exp6: 10334,
			Exp7: 20277,
			Exp8: 39794,
			Exp9: 78092,
			Exp10: 153252,
			Eff1: .25,
			Eff2: .3,
			Eff3: .35,
			Eff4: .4,
			Eff5: .45,
			Eff6: .5,
			Eff7: .55,
			Eff8: .6,
			Eff9: .65,
			Eff10: .7
		}
	}


//
//  Writing pieces
//

$('#startWritingLetters').click(function(){
	startWriting("Letters");
});
$('#startWritingWords').click(function(){
	startWriting("Words");
});
$('#startWritingSentences').click(function(){
	startWriting("Sentences");
});
$('#startWritingPages').click(function(){
	startWriting("Pages");
});

function startWriting(unit) {
	var units = ["Letters", "Words", "Sentences", "Pages"];
	for (i = 0; i < units.length; i++) {
		if ($("#startWriting" + units[i]).hasClass("disabled")) {
			disengageWriting();
			if (units[i] == "Letters") { save.letters.PerSecond -= (1 / save.writingLetters.Timer) }
			if (units[i] == "Words") { save.words.PerSecond -= (1 / save.writingWords.Timer); save.letters.Using -= save.words.Cost }
			if (units[i] == "Sentences") { save.sentences.PerSecond -= (1 / save.writingSentences.Timer); save.words.Using -= save.sentences.Cost }
			if (units[i] == "Pages") { save.pages.PerSecond -= (1 / save.writingPages.Timer) }
		}
	}
	if (unit == "Letters") {
		save.letters.PerSecond += (1 / save.writingLetters.Timer)
	}
	if (unit == "Words") {
		save.words.PerSecond += (1 / save.writingWords.Timer)
		save.letters.Using += save.words.Cost
	}
	if (unit == "Sentences") {
		save.sentences.PerSecond += (1 / save.writingSentences.Timer)
		save.words.Using += save.sentences.Cost
	}
	$("#startWriting" + unit).addClass("disabled");
	$("#writing" + unit + "Progress").addClass("progress-bar-striped");
	$("#writing" + unit + "Progress").addClass("active");	
};

function disengageWriting(){ // Resets the visual appearance of all the "write" tabs
	$("#startWritingLetters").removeClass("disabled");
	$("#writingLettersProgress").removeClass("progress-bar-striped");
	$("#writingLettersProgress").removeClass("active");
	$('#writingLettersProgress').css('width', '0%').attr('aria-valuenow', 0);
	
	$("#startWritingWords").removeClass("disabled");
	$("#writingWordsProgress").removeClass("progress-bar-striped");
	$("#writingWordsProgress").removeClass("active");
	$('#writingWordsProgress').css('width', '0%').attr('aria-valuenow', 0);
	
	$("#startWritingSentences").removeClass("disabled");
	$("#writingSentencesProgress").removeClass("progress-bar-striped");
	$("#writingSentencesProgress").removeClass("active");
	$('#writingSentencesProgress').css('width', '0%').attr('aria-valuenow', 0);
	
	$("#startWritingPages").removeClass("disabled");
	$("#writingPagesProgress").removeClass("progress-bar-striped");
	$("#writingPagesProgress").removeClass("active");
	$('#writingPagesProgress').css('width', '0%').attr('aria-valuenow', 0);
};


//
// Game logic
//

function incrementLetters(num){
	save.letters.Total += ((save.monkeys.Total * save.monkeys.Multiplier) / (1000 / interval)) * num
	save.letters.Lifetime += ((save.monkeys.Total * save.monkeys.Multiplier) / interval) * num
};

function prettify(input,separator,forcedecimal) { //Credits to AlmostIdle.com
	var Before = String(input); //Turn the input into a string
	var SplitBefore = Before.split("."); //Split the input by "." to get the decimal
	var After = ""; //Reset the result
	var LastThree = ""; //Reset the last 3 characters
 
	while (SplitBefore[0].length > 0) { //While the left half of the number is still there
		LastThree = SplitBefore[0].slice(-3); //Take the last 3
		SplitBefore[0] = SplitBefore[0].slice(0,-3); //Remove the last 3
		if (After.length == 0) { After = LastThree; } else { After = LastThree + separator + After; } //Append the last 3
	}
 
	if (forcedecimal > 0) { //If the decimal number is enabled
		After += "."; //Add the decimal place
		var AddZeros = forcedecimal;
 
		if (SplitBefore[1]) { //If a decimal string already exists
			AddZeros -= SplitBefore[1].length; //Get the number of trailing zeros required
			if (AddZeros < 0) {AddZeros = 0;}
			After += SplitBefore[1].substring(0,forcedecimal - AddZeros); //Add the existing trailing digits
		}
 
		for (var zeros=0;zeros<AddZeros;zeros++) { //Add any trailing zeros
			After += "0";
		}
	}
 
	return After; //Return the number as a string
}


//
//  Statistics
//

function drawStatistics(){
	$('#lettersLifetimeStat').html(prettify(save.letters.Lifetime,",",0))
	$('#wordsLifetimeStat').html(prettify(save.words.Lifetime,",",0))
	$('#sentencesLifetimeStat').html(prettify(save.sentences.Lifetime,",",0))
	$('#pagesLifetimeStat').html(prettify(save.pages.Lifetime,",",0))
	$('#chaptersLifetimeStat').html(prettify(save.chapters.Lifetime,",",0))
	$('#booksLifetimeStat').html(prettify(save.books.Lifetime,",",0))
	$('#seriesLifetimeStat').html(prettify(save.series.Lifetime,",",0))
};

//
// Loop Functions
//

function writing(num){
	if ($("#startWritingLetters").hasClass("disabled")) {
		writingLetters.Progress += (100 / (save.writingLetters.Timer * (1000 / interval)) * num)
		$('#writingLettersProgress').css('width', writingLetters.Progress + '%').attr('aria-valuenow', writingLetters.Progress);
		if (writingLetters.Progress >= 100) {
			save.letters.Total += 1
			save.letters.Lifetime += 1
			writingLetters.Progress = 0
		};
		letterAch();
	};
	if ($("#startWritingWords").hasClass("disabled")) {
		if (save.letters.Total >= 6) {
			writingWords.Progress += (100 / (save.writingWords.Timer * (1000 / interval)) * num)
			$('#writingWordsProgress').css('width', writingWords.Progress + '%').attr('aria-valuenow', writingWords.Progress);
			if (writingWords.Progress >= 100) {
				save.letters.Total -= 6
				save.words.Total += 1
				save.words.Lifetime += 1
				writingWords.Progress -= 100
			};
		};
		wordAch();
	};
	if ($("#startWritingSentences").hasClass("disabled")) {
		if (save.words.Total >= 15) {
			writingSentences.Progress += (100 / (save.writingSentences.Timer * (1000 / interval)) * num)
			$('#writingSentencesProgress').css('width', writingSentences.Progress + '%').attr('aria-valuenow', writingSentences.Progress);
			if (writingSentences.Progress >= 100) {
				save.words.Total -= 15
				save.sentences.Total += 1
				save.sentences.Lifetime += 1
				writingSentences.Progress -= 100
			};
		};
		sentenceAch();
	};
	if ($("#startWritingPages").hasClass("disabled")) {
		if (save.sentences.Total >= 17) {
			writingPages.Progress += (100 / (save.writingPages.Timer * (1000 / interval)) * num)
			$('#writingPagesProgress').css('width', writingPages.Progress + '%').attr('aria-valuenow', writingPages.Progress);
			if (writingPages.Progress >= 100) {
				save.sentences.Total -= 17
				save.pages.Total += 1
				save.pages.Lifetime += 1
				writingPages.Progress -= 100
			};		
		};
	};
};

function staffWriting(num) {
	var units = ["letters", "words", "sentences", "pages", "chapters", "books"];
	for (i = 1; i < 10; i++) { //Loops through all the staff slots
		for (j = 0; j < units.length; j++) { // Loops all the units in the specified slot
			if ($("#" + units[j] + i).hasClass("active")) { //Checks if a specific button is active on a staff member
				console.log("Unit + 1 = " + units[j + 1]); //USE THIS TO AUTOMATE IT ALL INTO ONE FUNCTION
				if (units[j] == "words") {
					//if (save.letters.Total >= 6) {
						//save["staff"][i]["Progress"] += (100 / (save["staff"][i]["Total"] * (1000 / interval)) * num) //WORK ON THIS
						save["staff"][i]["Progress"] += 10
						$('#staffProgressBar' + i).css('width', save["staff"][i]["Progress"] + '%').attr('aria-valuenow', save["staff"][i]["Progress"]);
						if (save["staff"][i]["Progress"] >= 100) {
							save.letters.Total -= (save.words.Cost - (save.words.Cost * save["staff"][i]["Eff"]))
							save.words.Total += 1
							save.words.Lifetime += 1
							save["staff"][i]["Progress"] -= 100
							save["staff"][i]["Exp"] += 1
							$("#staffExpBar" + i).css('width', save["staff"][i]["Exp"] + '%').attr('aria-valuenow', save["staff"][i]["Exp"]);
							$("#staffExpValue" + i).text(save["staff"][i]["Exp"]);
							if (save["staff"][i]["Exp"] >= save["staff"][i]["NextExp"]) {
								levelUp(i);
							};
						};
					//};
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
		console.log("Saved!");
		timeout();
	}, 10000);
};

// Fires before the page unloads
window.onbeforeunload = function(event){
    disengageStaff();
	var units = ["Letters", "Words", "Sentences", "Pages"];
	for (i = 0; i < units.length; i++) {
		if ($("#startWriting" + units[i]).hasClass("disabled")) {
			if (units[i] == "Letters") { save.letters.PerSecond -= (1 / save.writingLetters.Timer) }
			if (units[i] == "Words") { save.words.PerSecond -= (1 / save.writingWords.Timer); save.letters.Using -= save.words.Cost }
			if (units[i] == "Sentences") { save.sentences.PerSecond -= (1 / save.writingSentences.Timer); save.words.Using -= save.sentences.Cost }
			if (units[i] == "Pages") { save.pages.PerSecond -= (1 / save.writingPages.Timer) }
		}
	}
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
	save.writingLetters = savegame.writingLetters;
	save.writingWords = savegame.writingWords;
	save.writingSentences = savegame.writingSentences;
	save.writingPages = savegame.writingPages;
	save.upgrade = savegame.upgrade;
	
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
	document.getElementsByClassName("monkeys.Available")[0].innerHTML = save.monkeys.Available
	document.getElementsByClassName("letters.Total")[0].innerHTML = prettify(save.letters.Total,",",0)
	document.getElementsByClassName("letters.Total")[1].innerHTML = prettify(save.letters.Total,",",0)
	document.getElementsByClassName("letters.Total")[2].innerHTML = prettify(save.letters.Total,",",0)
	document.getElementsByClassName("letters.Using")[0].innerHTML = prettify(save.letters.Using,",",0)
	document.getElementsByClassName("letters.PerSecond")[0].innerHTML = prettify(save.letters.PerSecond,",",2)
	document.getElementsByClassName("letters.PerSecond")[1].innerHTML = prettify(save.letters.PerSecond,",",2)
	document.getElementsByClassName("writingLetters.Timer")[0].innerHTML = prettify(save.writingLetters.Timer,",",2)
	document.getElementsByClassName("words.Cost")[0].innerHTML = prettify(save.words.Cost,",",0)
	document.getElementsByClassName("words.Total")[0].innerHTML = prettify(save.words.Total,",",0)
	document.getElementsByClassName("words.Total")[1].innerHTML = prettify(save.words.Total,",",0)
	document.getElementsByClassName("words.Using")[0].innerHTML = prettify(save.words.Using,",",2)
	document.getElementsByClassName("words.PerSecond")[0].innerHTML = prettify(save.words.PerSecond,",",2)
	document.getElementsByClassName("writingWords.Timer")[0].innerHTML = prettify(save.writingWords.Timer,",",2)
	document.getElementsByClassName("sentences.Cost")[0].innerHTML = prettify(save.sentences.Cost,",",0)
	document.getElementsByClassName("sentences.Total")[0].innerHTML = prettify(save.sentences.Total,",",0)
	document.getElementsByClassName("sentences.Total")[1].innerHTML = prettify(save.sentences.Total,",",0)
	document.getElementsByClassName("sentences.PerSecond")[0].innerHTML = prettify(save.sentences.PerSecond,",",2)
	document.getElementsByClassName("writingSentences.Timer")[0].innerHTML = prettify(save.writingSentences.Timer,",",2)
	document.getElementsByClassName("pages.Total")[0].innerHTML = prettify(save.pages.Total,",",0)
	document.getElementsByClassName("pages.Total")[1].innerHTML = prettify(save.pages.Total,",",0)
	document.getElementsByClassName("pages.PerSecond")[0].innerHTML = prettify(save.pages.PerSecond,",",2)
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
		save = {
			monkeys: {Total: 0, Available: 1, Multiplier: 1.0, Lifetime: 0},
			letters: {Total: 1000.0, Unique: 0, PerSecond: 0.0, Using: 0, Lifetime: 0},
			words: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:6, Lifetime:0},
			sentences: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:15, Lifetime:0},
			pages: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:17, Lifetime:0},
			chapters: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:20, Lifetime:0},
			books: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:25, Lifetime:0},
			series: {Total:0, Unique: 0, PerSecond: 0.0, Using: 0, Multiplier:1, Cost:3, Lifetime:0},
			writingLetters: {Timer: 0.6},
			writingWords: {Timer: 1.5},
			writingSentences: {Timer: 20},
			writingPages: {Timer: 300},
			upgrade: {writewords: false, 2: false, 3: false, 4:false},
			office: {Space: 0, Counter: 1},
			staff: {}
		};
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