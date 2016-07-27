// Animation for fading in and then out an alert box

function achieveAlert(id) {
	$("#achieve").fadeTo(500, 0.8)
	if(id == 1){
		$("#achieveTitle").text("Achievement Get!")
		$("#achieveDesc").text("Created a functioning achievement popup!")
	}

	window.setTimeout(function (){
	$("#achieve").fadeTo(500, 0)
	}, 7000);
};

function checkUpgrades() {
	if (save.letters.Upgrade != 0) {
		$("#lettersUpgrade").fadeIn();
	} if (save.words.Upgrade != 0) {
		$("#wordsUpgrade").fadeIn();
	}  if (save.sentences.Upgrade != 0) {
		$("#sentencesUpgrade").fadeIn();
	} if (save.pages.Upgrade != 0) {
		$("#pagesUpgrade").fadeIn();
	} if (save.letters.Upgrade == 0) {
		$('#lettersUpgrade').fadeOut();
	} if (save.words.Upgrade == 0) {
		$('#wordsUpgrade').fadeOut();
	} if (save.sentences.Upgrade == 0) {
		$('#sentencesUpgrade').fadeOut();
	} if (save.pages.Upgrade == 0) {
		$('#pagesUpgrade').fadeOut();
	}
}

// Check for achievements related to Letters
function letterAch(){
	if (save.letters.Total >= 150 && save.upgrade.writewords === false) {
		$("#upgrade1").fadeIn();
		save.letters.Upgrade += 1
	};
	checkUpgrades();
};

// Check for achievements related to Words
function wordAch(){
	if (save.words.Lifetime >= 15) {
		$("#sentenceSection").fadeIn();
	};
	if (save.words.Total >= 200 && save.upgrade.writesentences === false) {
		$("#upgrade2").fadeIn();
		save.words.Upgrade += 1
	};
	checkUpgrades();
};

// Check for achievements related to Sentences
function sentenceAch(){
	if (save.sentences.Lifetime >= 17) {
		$("#pageSection").fadeIn();
	};
	if (save.sentences.Total >= 200 && save.upgrade.writepages === false) {
		$("#upgrade3").fadeIn();
		save.sentences.Upgrade += 1
	};
	checkUpgrades();
};

// Check for achievements related to Pages
function pageAch(){
	if (save.pages.Lifetime >= 20) {
		$("#chapterSection").fadeIn();
	};
	if (save.pages.Total >= 200 && save.upgrade.writechapters === false) {
		$("#upgrade4").fadeIn();
		save.pages.Upgrade += 1
	};
	checkUpgrades();
};

// Check for achievements related to Chapters
function chapterAch(){
	if (save.chapters.Lifetime >= 25) {
		$("#bookSection").fadeIn();
	};
};

// Check for achievements related to Books
function bookAch(){
	if (save.books.Lifetime >= 3) {
		$("#seriesSection").fadeIn();
	};
};

// Check for achievements related to Series
function seriesAch(){

};
