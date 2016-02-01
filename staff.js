function buyStaff(num){
	save.office.Space += 1
	if (save.office.Space > 0){
		if (num === 1){ // Middle school girl
			save.office.Space -= 1
			document.getElementById("officeSpace").innerHTML = save.office.Space
			save["staff"]["MSG" + save.office.Counter] = {
				ID: save.office.Counter,
				Name: "Miranda",
				Type: 1,
				WorkingOn: 0,
				Level: 1,
				Exp: 0,
				NextExp: staff.MSG.Exp1,
				Eff: staff.MSG.Eff1,
				UChance: 0,
			};
			firstDrawStaff(save["staff"]["MSG" + save.office.Counter]);
			save.office.Counter += 1
		} else if (num === 2){ // Highschool dropout
			
		} else if (num === 3){ // Undergraduate
			
		} else if (num === 4){ // Graduate student
			
		} else if (num === 5){ // PhD
			
		}
	};
};

function buyMonkey(){
	if (save.monkeys.Available > 0){
		save.monkeys.Available -= 1
		save.monkeys.Total += 1
		save.monkeys.Lifetime += 1
		save.letters.PerSecond = save.monkeys.Total * save.monkeys.Multiplier
		document.getElementsByClassName("monkeys.Total")[0].innerHTML = save.monkeys.Total
		document.getElementsByClassName("monkeys.Available")[0].innerHTML = save.monkeys.Available
		document.getElementsByClassName("letters.PerSecond")[0].innerHTML = prettify(save.letters.PerSecond,",",0)
		document.getElementsByClassName("letters.PerSecond")[1].innerHTML = prettify(save.letters.PerSecond,",",0)
		if (save.monkeys.Available === 0){
			document.getElementById("buyMonkey").className += " disabled";
		};
	};
};

function firstDrawStaff(staff){
	for (i = 1; i < 10; i++){
		if ($('#staffSlot' + [i]).css('display') == 'none'){
		firstDrawStaffMeat(staff, [i]);
		break;
		};
	};
};

function firstDrawStaffMeat(staff, slot) {
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

$('#fireStaff1').click(function(){
	fireStaff(1);
});
$('#fireStaff2').click(function(){
	fireStaff(2);
});
$('#fireStaff3').click(function(){
	fireStaff(3);
});
$('#fireStaff4').click(function(){
	fireStaff(4);
});
$('#fireStaff5').click(function(){
	fireStaff(5);
});
$('#fireStaff6').click(function(){
	fireStaff(6);
});
$('#fireStaff7').click(function(){
	fireStaff(7);
});
$('#fireStaff8').click(function(){
	fireStaff(8);
});
$('#fireStaff9').click(function(){
	fireStaff(9);
});