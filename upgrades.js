function buyUpgrade(num){
	if (num == 1){ // Write Words
		if (save.letters.Total >= 200 && save.upgrade.writewords === false){
			save.letters.Total -= 200
			$("#upgrade1").fadeOut();
			$("#writingWords").fadeIn();
			save.upgrade.writewords = true
		};
	};
};