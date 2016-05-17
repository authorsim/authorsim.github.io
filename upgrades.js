function buyUpgrade(num){
switch(num) {
	case 1: // Write Words
		if (save.letters.Total >= 200 && save.upgrade.writewords === false){
			save.letters.Total -= 200
			$("#upgrade1").fadeOut();
			$("#writingWords").fadeIn();
			save.upgrade.writewords = true;
			save.letters.Upgrade -= 1;
		};
	case 2: // Write Sentences
		if (save.words.Total >= 200 && save.upgrade.writesentences === false){
			save.words.Total -= 200
			$("#upgrade2").fadeOut();
			$("#writingSentences").fadeIn();
			save.upgrade.writesentences = true;
			save.words.Upgrade -= 1;
		};
	case 3: // Write Pages
		if (save.sentences.Total >= 200 && save.upgrade.writepages === false){
			save.sentences.Total -= 200
			$("#upgrade3").fadeOut();
			$("#writingPages").fadeIn();
			save.upgrade.writepages = true;
			save.sentences.Upgrade -= 1;
		};
	case 4: // Write Chapters
		if (save.pages.Total >= 200 && save.upgrade.writechapters === false){
			save.pages.Total -= 200
			$("#upgrade4").fadeOut();
			$("#writingChapters").fadeIn();
			save.upgrade.writechapters = true;
			save.pages.Upgrade -= 1;
		};
}
checkUpgrades();
};
