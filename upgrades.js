var buyUpgrade1 = true

function buyUpgrade(num){
	if (num == 1){ // Write Words
		if (save.sentences.Total >= 5 && buyUpgrade1 == true){
			save.sentences.Total -= 5
			document.getElementsByClassName("sentences.Total")[0].innerHTML = save.sentences.Total
			$("#buyUpgrade1").fadeOut();
			$("#wordsProgressDiv").fadeIn();
			$("#startWritingWords").fadeIn();
			buyUpgrade1 = false
		};
	};
};