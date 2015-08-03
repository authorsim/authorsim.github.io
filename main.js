// Initialize tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Declare variables

var save = {
	monkeys: {Total: 0, Available: 1, Multiplier: 1.0, Lifetime: 0},
	letters: {Total: 150.0, PerSecond: 0.0, Lifetime: 0},
	words: {Total:0, Multiplier:1, Cost:6, Lifetime:0},
	sentences: {Total:0, Multiplier:1, Cost:15, Lifetime:0},
	pages: {Total:0, Multiplier:1, Cost:17, Lifetime:0},
	chapters: {Total:0, Multiplier:1, Cost:20, Lifetime:0},
	books: {Total:0, Multiplier:1, Cost:25, Lifetime:0},
	series: {Total:0, Multiplier:1, Cost:3, Lifetime:0},
	writingLetters: {Timer: 0.6},
	writingWords: {Timer: 1.5},
	writingSentences: {Timer: 20},
	writingPages: {Timer: 300}
};

var writingLetters = {Now: false, Progress: 0};
var writingWords = {Now:false, Progress: 0};
var writingSentences = {Now:false, Progress: 0};
var writingPages = {Now:false, Progress: 0};

// Hide the initial popup to purchase a monkey

$("#firstMonkeyButton").click(function(){
	$("#firstMonkey").fadeOut();
	activeStaffMonkey();
});


// Functions to purchase staff

function buyMonkey(){
	if (save.monkeys.Available > 0){
		save.monkeys.Available -= 1
		save.monkeys.Total += 1
		save.monkeys.Lifetime += 1
		save.letters.PerSecond = save.monkeys.Total * save.monkeys.Multiplier
		document.getElementsByClassName("monkeys.Total")[0].innerHTML = save.monkeys.Total
		document.getElementsByClassName("monkeys.Available")[0].innerHTML = save.monkeys.Available
		document.getElementsByClassName("letters.PerSecond")[0].innerHTML = prettify(save.letters.PerSecond,",",0)
		document.getElementsByClassName("letters.PerSecond")[1].innerHTML = prettify(save.letters.PerSecond,",",0)
		if (save.monkeys.Available == 0){
			document.getElementById("buyMonkey").className += " disabled";
		};
	};
};


// Make certain staff active

function activeStaffMonkey(){
	document.getElementById("activeStaff").innerHTML = save.monkeys.Total + " Monkeys"
};

//                                  //
//   Functions to purchase units    //
//                                  //

// Purchasing words
function wordClick(num){
	if (num == 2) {
		while (save.letters.Total >= save.words.Cost) {
			save.words.Total += 1
			save.words.Lifetime += 1
			save.letters.Total = save.letters.Total - save.words.Cost
			document.getElementsByClassName("words.Total")[0].innerHTML = save.words.Total
			document.getElementsByClassName("letters.Total")[0].innerHTML = prettify(save.letters.Total,",",0)
			document.getElementsByClassName("letters.Total")[1].innerHTML = prettify(save.letters.Total,",",0)
		};
	};
};

// Purchasing sentences
function sentenceClick(num){
	if (num == 2) {
		while (save.words.Total >= save.sentences.Cost) {
			save.sentences.Total += 1
			save.sentences.Lifetime += 1
			save.words.Total -= save.sentences.Cost
			document.getElementsByClassName("sentences.Total")[0].innerHTML = save.sentences.Total
			document.getElementsByClassName("words.Total")[0].innerHTML = save.words.Total
		};
	};
};

// Purchasing pages
function pageClick(num){
	if (num == 2) {
		while (save.sentences.Total >= save.pages.Cost) {
			save.pages.Total += 1
			save.pages.Lifetime += 1
			save.sentences.Total -= save.pages.Cost
			document.getElementsByClassName("pages.Total")[0].innerHTML = save.pages.Total
			document.getElementsByClassName("sentences.Total")[0].innerHTML = save.sentences.Total
		};
	};
};

// Purchasing chapters
function chapterClick(num){
	if (num == 2) {
		while (save.pages.Total >= save.chapters.Cost) {
			save.chapters.Total += 1
			save.chapters.Lifetime += 1
			save.pages.Total -= save.chapters.Cost
			document.getElementsByClassName("chapters.Total")[0].innerHTML = save.chapters.Total
			document.getElementsByClassName("pages.Total")[0].innerHTML = save.pages.Total
		};
	};
};

// Purchasing books
function bookClick(num){
	if (num == 2) {
		while (save.chapters.Total >= save.books.Cost) {
			save.books.Total += 1
			save.books.Lifetime += 1
			save.chapters.Total -= save.books.Cost
			document.getElementsByClassName("books.Total")[0].innerHTML = save.books.Total
			document.getElementsByClassName("chapters.Total")[0].innerHTML = save.chapters.Total
		};
	};
};

// Purchasing series
function seriesClick(num){
	if (num == 2) {
		while (save.books.Total >= save.series.Cost) {
			save.series.Total += 1
			save.series.Lifetime += 1
			save.books.Total -= save.series.Cost
			document.getElementsByClassName("series.Total")[0].innerHTML = save.series.Total
			document.getElementsByClassName("books.Total")[0].innerHTML = save.books.Total
		};
	};
};

// Purchasing MAX
function maxClick(){
	wordClick(2);
	wordAch();
	sentenceClick(2);
	sentenceAch();
	pageClick(2);
	pageAch();
	chapterClick(2);
	chapterAch();
	bookClick(2);
	bookAch();
	seriesClick(2);
	seriesAch();
};


//
//  Writing pieces
//

function startWriting(unit){ // Engages the writing function for each unit
	disengage(); // Disengages all graphics before engaging for a specific unit
	if (unit == 0) { // Letters
		$("#startWritingLetters").addClass("disabled");
		$("#writingLettersProgress").addClass("progress-bar-striped");
		$("#writingLettersProgress").addClass("active");
		writingLetters.Now = true
	};if (unit == 1) { // Words
		$("#startWritingWords").addClass("disabled");
		$("#writingWordsProgress").addClass("progress-bar-striped");
		$("#writingWordsProgress").addClass("active");
		writingWords.Now = true
	};
	if (unit == 2) { // Sentences
		$("#startWritingSentences").addClass("disabled");
		$("#writingSentencesProgress").addClass("progress-bar-striped");
		$("#writingSentencesProgress").addClass("active");
		writingSentences.Now = true
	};
	if (unit == 3) { // Pages
		$("#startWritingPages").addClass("disabled");
		$("#writingPagesProgress").addClass("progress-bar-striped");
		$("#writingPagesProgress").addClass("active");
		writingPages.Now = true
	};
};

function disengage(){ // Resets the visual appearance of all the "write" tabs
	writingLetters.Now = false
	$("#startWritingLetters").removeClass("disabled");
	$("#writingLettersProgress").removeClass("progress-bar-striped");
	$("#writingLettersProgress").removeClass("active");
	$('#writingLettersProgress').css('width', '0%').attr('aria-valuenow', 0);
	
	writingWords.Now = false
	$("#startWritingWords").removeClass("disabled");
	$("#writingWordsProgress").removeClass("progress-bar-striped");
	$("#writingWordsProgress").removeClass("active");
	$('#writingWordsProgress').css('width', '0%').attr('aria-valuenow', 0);
	
	writingSentences.Now = false
	$("#startWritingSentences").removeClass("disabled");
	$("#writingSentencesProgress").removeClass("progress-bar-striped");
	$("#writingSentencesProgress").removeClass("active");
	$('#writingSentencesProgress').css('width', '0%').attr('aria-valuenow', 0);
	
	writingPages.Now = false
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
	document.getElementsByClassName("letters.Total")[0].innerHTML = prettify(save.letters.Total,",",0)
	document.getElementsByClassName("letters.Total")[1].innerHTML = prettify(save.letters.Total,",",0)
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
	$('#wordsLifetimeStat').html(save.words.Lifetime)
	$('#sentencesLifetimeStat').html(save.sentences.Lifetime)
	$('#pagesLifetimeStat').html(save.pages.Lifetime)
	$('#chaptersLifetimeStat').html(save.chapters.Lifetime)
	$('#booksLifetimeStat').html(save.books.Lifetime)
	$('#seriesLifetimeStat').html(save.series.Lifetime)
};


//
//  Testing ground
//

function testClick(){
	$('#testModal').modal('show')
};


//
// Loop Functions
//


function drawWindow(){
	var maxWords = Math.floor(save.letters.Total / save.words.Cost)
	document.getElementById("maxWords").innerHTML = maxWords
	
	var maxSentences = Math.floor(save.words.Total / save.sentences.Cost)
	document.getElementById("maxSentences").innerHTML = maxSentences	
	
	var maxPages = Math.floor(save.sentences.Total / save.pages.Cost)
	document.getElementById("maxPages").innerHTML = maxPages

	var maxChapters = Math.floor(save.pages.Total / save.chapters.Cost)
	document.getElementById("maxChapters").innerHTML = maxChapters
	
	var maxBooks = Math.floor(save.chapters.Total / save.books.Cost)
	document.getElementById("maxBooks").innerHTML = maxBooks

	var maxSeries = Math.floor(save.books.Total / save.series.Cost)
	document.getElementById("maxSeries").innerHTML = maxSeries	
};

function writing(num){
	if (writingLetters.Now == true) {
		writingLetters.Progress += (100 / (save.writingLetters.Timer * (1000 / interval)) * num)
		$('#writingLettersProgress').css('width', writingLetters.Progress + '%').attr('aria-valuenow', writingLetters.Progress);
		if (writingLetters.Progress >= 100) {
			save.letters.Total += 1
			save.letters.Lifetime += 1
			writingLetters.Progress -= 100
			document.getElementsByClassName("letters.Total")[0].innerHTML = prettify(save.letters.Total, ",", 0)
			document.getElementsByClassName("letters.Total")[1].innerHTML = prettify(save.letters.Total, ",", 0)
		};
	};
	if (writingWords.Now == true) {
		writingWords.Progress += (100 / (save.writingWords.Timer * (1000 / interval)) * num)
		$('#writingWordsProgress').css('width', writingWords.Progress + '%').attr('aria-valuenow', writingWords.Progress);
		if (writingWords.Progress >= 100) {
			save.words.Total += 1
			save.words.Lifetime += 1
			writingWords.Progress -= 100
			document.getElementsByClassName("words.Total")[0].innerHTML = save.words.Total
		};
		wordAch();
	};
	if (writingSentences.Now == true) {
		writingSentences.Progress += (100 / (save.writingSentences.Timer * (1000 / interval)) * num)
		$('#writingSentencesProgress').css('width', writingSentences.Progress + '%').attr('aria-valuenow', writingSentences.Progress);
		if (writingSentences.Progress >= 100) {
			save.sentences.Total += 1
			save.sentences.Lifetime += 1
			writingSentences.Progress -= 100
			document.getElementsByClassName("sentences.Total")[0].innerHTML = save.sentences.Total
		};
		sentenceAch();
	};
	if (writingPages.Now == true) {
		writingPages.Progress += (100 / (save.writingPages.Timer * (1000 / interval)) * num)
		$('#writingPagesProgress').css('width', writingPages.Progress + '%').attr('aria-valuenow', writingPages.Progress);
		if (writingPages.Progress >= 100) {
			save.pages.Total += 1
			save.pages.Lifetime += 1
			writingPages.Progress -= 100
			document.getElementsByClassName("pages.Total")[0].innerHTML = save.pages.Total
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

var savegame = JSON.parse(localStorage.getItem("save"));

function load(){
	console.log(savegame);
	for (i = 0; i < savegame.length; i++){
		console.log(savegame[i]);
	}
};

//
// The loop
//

window.setInterval(function(){
	drawWindow();
	
	now = new Date();
	elapsedTime = (now.getTime() - before.getTime());
	elapsedValue = (elapsedTime / interval);
	
	incrementLetters(elapsedValue);
	writing(elapsedValue);

	before = now
}, 1000 / interval);