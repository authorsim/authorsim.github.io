$('#buyStaff1').click(function(){buyStaff(1);});
$('#buyStaff2').click(function(){buyStaff(2);});
$('#buyStaff3').click(function(){buyStaff(3);});
$('#buyStaff4').click(function(){buyStaff(4);});
$('#buyStaff5').click(function(){buyStaff(5);});
$('#buyMonkey').click(function(){buyMonkey();});

function buyStaff(num){
	for (i = 1; i < 10; i++){ //Loop all open staff slots
		if ($('#staffSlot' + [i]).css('display') == 'none'){ //If a staff slot is open
			if (num === 1){ // Middle school girl
				if (save.words.Total >= 50) {
					save.words.Total -= 50
					save["staff"]["S" + i] = {
						Active: 1,
						Name: "Miranda",
						Type: 1,
						Level: 1,
						MaxLevel: 4,
						Exp: 0,
						NextExp: staff.MS.Exp1,
						Eff: staff.MS.Eff1,
						Progress: 0,
					};
					drawStaff(save["staff"]["S" + i], [i]);
				};
			} else if (num === 2){ // Highschool dropout
				save["staff"]["S" + i] = {
					Active: 1,
					Name: "John",
					Type: 2,
					Level: 1,
					MaxLevel: 6,
					Exp: 0,
					NextExp: staff.HS.Exp1,
					Eff: staff.HS.Eff1,
					Progress: 0,
			};
			drawStaff(save["staff"]["S" + i], [i]);
			} else if (num === 3){ // Undergraduate
				save["staff"]["S" + i] = {
					Active: 1,
					Name: "Renaldo",
					Type: 3,
					Level: 1,
					MaxLevel: 8,
					Exp: 0,
					NextExp: staff.UG.Exp1,
					Eff: staff.UG.Eff1,
					Progress: 0,
			};
			drawStaff(save["staff"]["S" + i], [i]);
			} else if (num === 4){ // Graduate student
				save["staff"]["S" + i] = {
					Active: 1,
					Name: "Alexandro",
					Type: 4,
					Level: 1,
					MaxLevel: 8,
					Exp: 0,
					NextExp: staff.GS.Exp1,
					Eff: staff.GS.Eff1,
					Progress: 0,
			};
			drawStaff(save["staff"]["S" + i], [i]);
			} else if (num === 5){ // PhD
				save["staff"]["S" + i] = {
					Active: 1,
					Name: "Mr. Incredible",
					Type: 5,
					Level: 1,
					MaxLevel: 10,
					Exp: 0,
					NextExp: staff.PHD.Exp1,
					Eff: staff.PHD.Eff1,
					Progress: 0,
			};
			}
			break;
		};
	};
};

function buyMonkey(){
	if (save.words.Total >= save.monkeys.Cost){
		save.words.Total -= save.monkeys.Cost
		save.monkeys.Total += 1
		save.monkeys.Lifetime += 1
		save.letters.PerSecond += 1 * save.monkeys.Multiplier
		save.monkeys.Cost = save.monkeys.Cost + 24
		$("#monkeyCost").text(save.monkeys.Cost)
	};
};

function levelUp(slot) {
	var units = ["letters", "words", "sentences", "pages", "chapters", "books"];
	for (j = 1; j < units.length; j++) { //Stops the staff member from writing and saves the unit
		if ($("#" + units[j] + slot).hasClass("active")) {
			var savedUnit = units[j]
			$("#" + units[j] + slot).removeClass("active btn-success").addClass("btn-primary");
			save[units[j]]["PerSecond"] -= (1 / (save[units[j]]["Timer"] * 2))
			save[units[j - 1]]["Using"] -= (1 / (save[units[j]]["Timer"] * 2)) * ((save[units[j]]["Cost"] - (save[units[j]]["Cost"] * save["staff"]["S" + slot]["Eff"])) / 2)
		}
	}
	save["staff"]["S" + slot]["Level"] += 1
	save["staff"]["S" + slot]["Exp"] = 0
	save["staff"]["S" + slot]["Eff"] += 0.05
	save["staff"]["S" + slot]["NextExp"] = ((save["staff"]["S" + slot]["NextExp"] * 2) * 1.3)
	if (save["staff"]["S" + slot]["Level"] === save["staff"]["S" + slot]["MaxLevel"]) {
		$("#staffExpbar" + slot).css("display", "none")
	}
	drawStaff(save["staff"]["S" + slot], slot);
	for (j = 1; j < units.length; j++) { //Activates the unit the staff member was working on before
		if (savedUnit === units[j]) {
			$("#" + units[j] + slot).removeClass("btn-primary").addClass("active btn-success");
			save[units[j]]["PerSecond"] += (1 / (save[units[j]]["Timer"] * 2))
			save[units[j - 1]]["Using"] += (1 / (save[units[j]]["Timer"] * 2)) * ((save[units[j]]["Cost"] - (save[units[j]]["Cost"] * save["staff"]["S" + slot]["Eff"])) / 2)
		}
	}
}

function drawStaff(staff, slot) {
	$("#staffSlot" + slot).css("display", "");
	$("#sentences" + slot).css("display", "")
	$("#pages" + slot).css("display", "")
	$("#chapters" + slot).css("display", "")
	$("#books" + slot).css("display", "")
	$("#research" + slot).css("display", "none")
	$("#staffName" + slot).text(staff.Name);
		if (staff.Type == 1){
			$("#staffEducation" + slot).text("Middle School");
			$("#sentences" + slot).css("display", "none")
			$("#pages" + slot).css("display", "none")
			$("#chapters" + slot).css("display", "none")
			$("#books" + slot).css("display", "none")
		} else if (staff.Type == 2) {
			$("#staffEducation" + slot).text("High School");
			$("#pages" + slot).css("display", "none")
			$("#chapters" + slot).css("display", "none")
			$("#books" + slot).css("display", "none")
		} else if (staff.Type == 3) {
			$("#staffEducation" + slot).text("Undergraduate");
			$("#chapters" + slot).css("display", "none")
			$("#books" + slot).css("display", "none")
		} else if (staff.Type == 4) {
			$("#staffEducation" + slot).text("Graduate");
			$("#books" + slot).css("display", "none")
		} else if (staff.Type == 5) {
			$("#staffEducation" + slot).text("PhD");
		}
	$("#staffEff" + slot).text(prettify((staff.Eff * 100),0) + "%");
	$("#staffLevel" + slot).text(staff.Level);
	$("#staffExpValue" + slot).text(prettify(staff.Exp,0));
	$("#staffExpTotal" + slot).text(prettify(staff.NextExp,0));
};


// Tie elements to the staff writing functions
$('#words1').click(function(){startStaffWriting("words", "1");});
$('#sentences1').click(function(){startStaffWriting("sentences", "1");});
$('#pages1').click(function(){startStaffWriting("pages", "1");});
$('#chapters1').click(function(){startStaffWriting("chapters", "1");});
$('#books1').click(function(){startStaffWriting("books", "1");});
$('#words2').click(function(){startStaffWriting("words", "2");});
$('#sentences2').click(function(){startStaffWriting("sentences", "2");});
$('#pages2').click(function(){startStaffWriting("pages", "2");});
$('#chapters2').click(function(){startStaffWriting("chapters", "2");});
$('#books2').click(function(){startStaffWriting("books", "2");});
$('#words3').click(function(){startStaffWriting("words", "3");});
$('#sentences3').click(function(){startStaffWriting("sentences", "3");});
$('#pages3').click(function(){startStaffWriting("pages", "3");});
$('#chapters3').click(function(){startStaffWriting("chapters", "3");});
$('#books3').click(function(){startStaffWriting("books", "3");});
$('#words4').click(function(){startStaffWriting("words", "4");});
$('#sentences4').click(function(){startStaffWriting("sentences", "4");});
$('#pages4').click(function(){startStaffWriting("pages", "4");});
$('#chapters4').click(function(){startStaffWriting("chapters", "4");});
$('#books4').click(function(){startStaffWriting("books", "4");});
$('#words5').click(function(){startStaffWriting("words", "5");});
$('#sentences5').click(function(){startStaffWriting("sentences", "5");});
$('#pages5').click(function(){startStaffWriting("pages", "5");});
$('#chapters5').click(function(){startStaffWriting("chapters", "5");});
$('#books5').click(function(){startStaffWriting("books", "5");});
$('#words6').click(function(){startStaffWriting("words", "6");});
$('#sentences6').click(function(){startStaffWriting("sentences", "6");});
$('#pages6').click(function(){startStaffWriting("pages", "6");});
$('#chapters6').click(function(){startStaffWriting("chapters", "6");});
$('#books6').click(function(){startStaffWriting("books", "6");});
$('#words7').click(function(){startStaffWriting("words", "7");});
$('#sentences7').click(function(){startStaffWriting("sentences", "7");});
$('#pages7').click(function(){startStaffWriting("pages", "7");});
$('#chapters7').click(function(){startStaffWriting("chapters", "7");});
$('#books7').click(function(){startStaffWriting("books", "7");});
$('#words8').click(function(){startStaffWriting("words", "8");});
$('#sentences8').click(function(){startStaffWriting("sentences", "8");});
$('#pages8').click(function(){startStaffWriting("pages", "8");});
$('#chapters8').click(function(){startStaffWriting("chapters", "8");});
$('#books8').click(function(){startStaffWriting("books", "8");});
$('#words9').click(function(){startStaffWriting("words", "9");});
$('#sentences9').click(function(){startStaffWriting("sentences", "9");});
$('#pages9').click(function(){startStaffWriting("pages", "9");});
$('#chapters9').click(function(){startStaffWriting("chapters", "9");});
$('#books9').click(function(){startStaffWriting("books", "9");});

function startStaffWriting (type, slot) {
	var units = ["letters", "words", "sentences", "pages", "chapters", "books"];
	save["staff"]["S" + slot]["Progress"] = 0
	for (j = 1; j < units.length; j++) { // Loops all the units in the specified slot
		if ($("#" + units[j] + slot).hasClass("active")) { // Checks if the unit in the slot is active
			$("#" + units[j] + slot).removeClass("active btn-success").addClass("btn-primary"); //Deactivates the active unit
			save[units[j]]["PerSecond"] -= (1 / (save[units[j]]["Timer"] * (1 - save["staff"]["S" + slot]["Eff"])))
			save[units[j - 1]]["Using"] -= ((1 / (save[units[j]]["Timer"] * (1 - save["staff"]["S" + slot]["Eff"]))) * (save[units[j]]["Cost"] * (1 - save["staff"]["S" + slot]["Eff"])))
		}
		if (type === units[j]) {
			$("#" + units[j] + slot).removeClass("btn-primary").addClass("active btn-success"); //Activates the unit
			save[units[j]]["PerSecond"] += (1 / (save[units[j]]["Timer"] * (1 - save["staff"]["S" + slot]["Eff"])))
			save[units[j - 1]]["Using"] += ((1 / (save[units[j]]["Timer"] * (1 - save["staff"]["S" + slot]["Eff"]))) * (save[units[j]]["Cost"] * (1 - save["staff"]["S" + slot]["Eff"])))
		}
	}
	document.getElementsByClassName("letters.Using")[0].innerHTML = save.letters.Using
	document.getElementsByClassName("words.Using")[0].innerHTML = save.words.Using
}

function disengageStaff() {
	var units = ["letters", "words", "sentences", "pages", "chapters", "books"];
	for (i = 1; i < 10; i++) { //Loops through all the staff slots
		for (j = 1; j < units.length; j++) { // Loops all the units in the specified slot
			if ($("#" + units[j] + i).hasClass("active")) {
				save[units[j]]["PerSecond"] -= (1 / (save[units[j]]["Timer"] * (1 - save["staff"]["S" + i]["Eff"])))
				save[units[j - 1]]["Using"] -= ((1 / (save[units[j]]["Timer"] * (1 - save["staff"]["S" + i]["Eff"]))) * (save[units[j]]["Cost"] * (1 - save["staff"]["S" + i]["Eff"])))
			}
		}
	}
	document.getElementsByClassName("letters.Using")[0].innerHTML = save.letters.Using
	document.getElementsByClassName("words.Using")[0].innerHTML = save.words.Using
}

function fireStaff(slot) {
	$('#confirmpopMessage').text("Are you sure you want to fire " + $('#staffName' + slot).text() + "?");
	$('.confirmpopopacity').fadeIn();
	$('.pop').fadeIn();
	$('.confirm').off('click').click(function() {
		var units = ["letters", "words", "sentences", "pages", "chapters", "books"];
		for (j = 1; j < units.length; j++) { // Loops all the units in the specified slot
			if ($("#" + units[j] + slot).hasClass("active")) {
				save[units[j]]["PerSecond"] -= (1 / (save[units[j]]["Timer"] * (1 - save["staff"]["S" + slot]["Eff"])))
				save[units[j - 1]]["Using"] -= ((1 / (save[units[j]]["Timer"] * (1 - save["staff"]["S" + slot]["Eff"]))) * (save[units[j]]["Cost"] * (1 - save["staff"]["S" + slot]["Eff"])))
				$("#" + units[j] + slot).removeClass("active btn-success");
				$("#" + units[j] + slot).addClass("btn-primary");
			}
		}
		$('#staffSlot' + slot).css("display", "none")
		save["staff"]["S" + slot]["Active"] = 0
		document.getElementsByClassName("letters.Using")[0].innerHTML = save.letters.Using
		document.getElementsByClassName("words.Using")[0].innerHTML = save.words.Using
		$('.pop').fadeOut();
		$('.confirmpopopacity').fadeOut();
	});
	$('.deny').off('click').click(function() {
		$('.pop').fadeOut();
		$('.confirmpopopacity').fadeOut();
	});
};

$('#fireStaff1').click(function(){ fireStaff(1); });
$('#fireStaff2').click(function(){ fireStaff(2); });
$('#fireStaff3').click(function(){ fireStaff(3); });
$('#fireStaff4').click(function(){ fireStaff(4); });
$('#fireStaff5').click(function(){ fireStaff(5); });
$('#fireStaff6').click(function(){ fireStaff(6); });
$('#fireStaff7').click(function(){ fireStaff(7); });
$('#fireStaff8').click(function(){ fireStaff(8); });
$('#fireStaff9').click(function(){ fireStaff(9); });
