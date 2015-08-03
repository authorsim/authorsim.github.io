// Event Listeners are COOL
document.getElementById("buyMaxWords").addEventListener("click", wordAch);
document.getElementById("buyMaxSentences").addEventListener("click", sentenceAch);
document.getElementById("buyMaxPages").addEventListener("click", pageAch);
document.getElementById("buyMaxChapters").addEventListener("click", chapterAch);
document.getElementById("buyMaxBooks").addEventListener("click", bookAch);
document.getElementById("buyMaxSeries").addEventListener("click", seriesAch);


// Check for achievements related to Words
function wordAch(){
	if (save.words.Total >= 15) {
		$("#sentenceSection").fadeIn();
	};
};

// Check for achievements related to Sentences
function sentenceAch(){
	if (save.sentences.Lifetime >= 2 && buyUpgrade1 == true) {
		$("#buyUpgrade1").fadeIn();
	};
	if (save.sentences.Total >= 17) {
		$("#pageSection").fadeIn();
	};
};

// Check for achievements related to Pages
function pageAch(){
	if (save.pages.Total >= 20) {
		$("#chapterSection").fadeIn();
	};
};

// Check for achievements related to Chapters
function chapterAch(){
	if (save.chapters.Total >= 25) {
		$("#bookSection").fadeIn();
	};
};

// Check for achievements related to Books
function bookAch(){
	if (save.books.Total >= 3) {
		$("#seriesSection").fadeIn();
	};
};

// Check for achievements related to Series
function seriesAch(){
	
};