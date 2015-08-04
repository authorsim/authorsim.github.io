function buyUpgrade(num){
	if (num == 1){ // Write Words
		if (save.sentences.Total >= 5 && save.upgrade.writewords === false){
			save.sentences.Total -= 5
			document.getElementsByClassName("sentences.Total")[0].innerHTML = save.sentences.Total
			$("#upgrade1").fadeOut();
			$("#wordsProgressDiv").fadeIn();
			$("#startWritingWords").fadeIn();
			save.upgrade.writewords = false
		};
	};
};