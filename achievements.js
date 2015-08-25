// Event Listeners are COOL
document.getElementById("buyMaxWords").addEventListener("click", wordAch);
document.getElementById("buyMaxSentences").addEventListener("click", sentenceAch);
document.getElementById("buyMaxPages").addEventListener("click", pageAch);
document.getElementById("buyMaxChapters").addEventListener("click", chapterAch);
document.getElementById("buyMaxBooks").addEventListener("click", bookAch);
document.getElementById("buyMaxSeries").addEventListener("click", seriesAch);

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

// Check for achievements related to Words
function wordAch(){
	if (save.words.Lifetime >= 15) {
		$("#sentenceSection").fadeIn();
	};
};

// Check for achievements related to Sentences
function sentenceAch(){
	if (save.sentences.Lifetime >= 2 && save.upgrade.writewords === false) {
		$("#upgrade1").fadeIn();
	};
	if (save.sentences.Lifetime >= 17) {
		$("#pageSection").fadeIn();
	};
};

// Check for achievements related to Pages
function pageAch(){
	if (save.pages.Lifetime >= 20) {
		$("#chapterSection").fadeIn();
	};
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