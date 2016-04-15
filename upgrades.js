function buyUpgrade(num){
	if (num == 1){ // Write Words
		if (save.letters.Total >= 200 && save.upgrade.writewords === false){
			save.letters.Total -= 200
			$("#upgrade1").fadeOut();
			$("#writingWords").fadeIn();
			save.upgrade.writewords = true;
			save.letters.Upgrade -= 1;
		};
	};
	if (num == 2){ // Upgrade Name
		if (save.letters.Total >= 200 && save.upgrade.writewords === false){
			save.letters.Total -= 200
			$("#upgrade2").fadeOut();
			save.letters.Upgrade -= 1;
		};
	};
	if (save.letters.Upgrade == 0) {
		$('#lettersUpgrade').fadeOut();
	}
	if (save.words.Upgrade == 0) {
		$('#wordsUpgrade').fadeOut();
	}
	if (save.sentences.Upgrade == 0) {
		$('#sentencesUpgrade').fadeOut();
	}
	if (save.pages.Upgrade == 0) {
		$('#pagesUpgrade').fadeOut();
	}
};
