function buyStaff(num){
	save.office.Space += 1
	for (i = 1; i < 10; i++){ //Loop all open staff slots
		if ($('#staffSlot' + [i]).css('display') == 'none'){ //If a staff slot is open
			if (save.office.Space > 0){ //If you have space in your office for a staff member
				if (num === 1){ // Middle school girl
					save.office.Space -= 1
					document.getElementById("officeSpace").innerHTML = save.office.Space
					save["staff"][i] = {
						Name: "Miranda",
						Type: 1,
						WorkingOn: 0,
						Level: 1,
						Exp: 0,
						NextExp: staff.MSG.Exp1,
						Eff: staff.MSG.Eff1,
						UChance: 0,
						Progress: 0,
					};
					drawStaff(save["staff"][i], [i]);
					save.office.Counter += 1
					break
				} else if (num === 2){ // Highschool dropout
			
				} else if (num === 3){ // Undergraduate
			
				} else if (num === 4){ // Graduate student
			
				} else if (num === 5){ // PhD
			
				}
			};
		};
	};
};

function buyMonkey(){
	if (save.monkeys.Available > 0){
		save.monkeys.Available -= 1
		save.monkeys.Total += 1
		save.monkeys.Lifetime += 1
		save.letters.PerSecond += save.monkeys.Total * save.monkeys.Multiplier
		if (save.monkeys.Available === 0){
			document.getElementById("buyMonkey").className += " disabled";
		};
	};
};

function drawStaff(staff, slot) {
	$("#staffSlot" + slot).css("display", "");
	$("#staffName" + slot).text(staff.Name);
		if (staff.Type == 1){
			$("#staffEducation" + slot).text("Middle School Girl");
		} else if (staff.Type == 2) {
			$("#staffEducation" + slot).text("High School Dropout");
		} else if (staff.Type == 3) {
			$("#staffEducation" + slot).text("Undergraduate");
		} else if (staff.Type == 4) {
			$("#staffEducation" + slot).text("Graduate Student");
		} else if (staff.Type == 5) {
			$("#staffEducation" + slot).text("PhD");
		}
	$("#staffEff" + slot).text((staff.Eff * 100) + "%");
	$("#staffLevel" + slot).text(staff.Level);
	$("#staffExpValue" + slot).text(staff.Exp);
	$("#staffExpTotal" + slot).text(staff.NextExp);
};

$('#words1').click(function(){
	startStaffWriting("words", "1");
});
$('#sentences1').click(function(){
	startStaffWriting("sentences", "1");
});
$('#pages1').click(function(){
	startStaffWriting("pages", "1");
});
$('#chapters1').click(function(){
	startStaffWriting("chapters", "1");
});
$('#books1').click(function(){
	startStaffWriting("books", "1");
});

function disengageStaff() {
	var units = ["letters", "words", "sentences", "pages", "chapters", "books"];
	for (i = 1; i < 10; i++) { //Loops through all the staff slots
		for (j = 1; j < units.length; j++) { // Loops all the units in the specified slot
			if ($("#" + units[j] + i).hasClass("active")) {
			}
		}
	}
}

function startStaffWriting (type, slot) {
	var units = ["letters", "words", "sentences", "pages", "chapters", "books"];
	for (j = 1; j < units.length; j++) { // Loops all the units in the specified slot
		if ($("#" + units[j] + slot).hasClass("active")) { // Checks if the unit in the slot is active
			$("#" + units[j] + slot).removeClass("active btn-success"); //Deactivates the active unit
			$("#" + units[j] + slot).addClass("btn-primary");
			$("#staffProgressBar" + slot).removeClass("progress-bar-striped");
			$("#staffProgressBar" + slot).removeClass("active");
			save["staff"][slot]["WorkingOn"] = 0
			save[units[j]]["PerSecond"] -= (save[units[j]]["Timer"] * 2)
		}
	}
	$("#staffProgressBar" + slot).addClass("progress-bar-striped");
	$("#staffProgressBar" + slot).addClass("active");	
	$("#" + type + slot).removeClass("btn-primary");
	$("#" + type + slot).addClass("active btn-success"); //Activates the requested unit
	save["staff"][slot]["WorkingOn"] = type
	save[type]["PerSecond"] += (save[type]["Timer"] * 2)
}

function fireStaff(slot) {
	$('#confirmpopMessage').text("Are you sure you want to fire " + $('#staffName' + slot).text() + "?");
	$('.confirmpopopacity').fadeIn();
	$('.pop').fadeIn();
	$('.confirm').off('click').click(function() {
		$('#staffSlot' + slot).css("display", "none")
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