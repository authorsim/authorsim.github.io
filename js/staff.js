let hireStaff = (slot) => {
	if (save.words.total >= 50) {
		save.words.total -= 50
		save['staff']['s' + slot] = {
			active: true,
      writing: 'none',
			name: 'Miranda',
			prestige: 1,
			level: 1,
			maxLevel: 4,
			exp: 0,
			nextExp: staff.prestige1.exp,
			eff: staff.prestige1.eff,
      speed: staff.prestige1.speed,
			progress: 0
		}
	}
}

let buyMonkey = () => {
  let words = save['words']
  let monkeys = save['monkeys']
	if (words['total'] >= monkeys['cost']){
		words['total'] -= monkeys['cost']
		monkeys['total'] += 1
	  monkeys['lifetime'] += 1
		monkeys['cost'] = monkeys['cost'] + 24
		$('#monkeyCost').text(monkeys['cost'])
	}
}

let levelUp = (slot) => {
  let staff = save['staff']['s' + slot]
	staff['level'] += 1
	staff['exp'] = 0
	staff['eff'] += 0.05
	staff['nextExp'] = ((staff['nextExp'] * 2) * 1.3)
	if (staff['level'] === staff['maxLevel']) {
    // This needs to be updated
		$('#staffExpbar' + slot).css('display', 'none')
	}
  calcGenerating(staff['writing'])
}

//! Need a cleaner way to do this.
function drawStaff(staff, slot) {
	$('#staffSlot' + slot).css('display', '');
	$('#sentences' + slot).css('display', '')
	$('#pages' + slot).css('display', '')
	$('#chapters' + slot).css('display', '')
	$('#books' + slot).css('display', '')
	$('#research' + slot).css('display', 'none')
	$('#staffName' + slot).text(staff.Name);
		if (staff.Type == 1){
			$('#staffEducation' + slot).text('Middle School');
			$('#sentences' + slot).css('display', 'none')
			$('#pages' + slot).css('display', 'none')
			$('#chapters' + slot).css('display', 'none')
			$('#books' + slot).css('display', 'none')
		} else if (staff.Type == 2) {
			$('#staffEducation' + slot).text('High School');
			$('#pages' + slot).css('display', 'none')
			$('#chapters' + slot).css('display', 'none')
			$('#books' + slot).css('display', 'none')
		} else if (staff.Type == 3) {
			$('#staffEducation' + slot).text('Undergraduate');
			$('#chapters' + slot).css('display', 'none')
			$('#books' + slot).css('display', 'none')
		} else if (staff.Type == 4) {
			$('#staffEducation' + slot).text('Graduate');
			$('#books' + slot).css('display', 'none')
		} else if (staff.Type == 5) {
			$('#staffEducation' + slot).text('PhD');
		}
	$('#staffEff' + slot).text(prettify((staff.Eff * 100),0) + '%')
	$('#staffLevel' + slot).text(staff.Level)
	$('#staffExpValue' + slot).text(prettify(staff.Exp,0))
	$('#staffExpTotal' + slot).text(prettify(staff.NextExp,0))
}

let startStaffWriting = (unit, slot) => {
  // If unit is already being worked on, it stops it
  if (unit === save['staff']['s' + slot]['writing']) {
    disengageStaff()
    return
  }
  // Otherwise, stop everything then activate the clicked one
  disengageStaff(slot)
  save['staff']['s' + slot]['writing'] = unit
  calcGenerating(unit)

  // Update the button
  $('#staff' + unit + slot)
    .removeClass('btn-primary')
    .addClass('active btn-success')
}

let disengageStaff = (slot) => {
  units.forEach( (cv, i, arr) => {
    // Update visually
    $('#staff' + cv + slot)
      .removeClass('active btn-success')
      .addClass('btn-primary')
  })

  // Set the unit to nothing
  save['staff']['s' + slot]['writing'] = 'none'
}

function fireStaff(slot) {
  let staff = save['staff']['s' + slot]
	$('#confirmpopMessage').text('Are you sure you want to fire ' + $('#staffName' + slot).text() + '?')
	$('.pop, .confirmpopopacity').fadeIn()
	$('.confirm').off('click').click(function() {
		staff['active'] = false
    staff['writing'] = 'none'
    $('#staffSlot' + slot).hide()
		$('.pop, .confirmpopopacity').fadeOut()
	})
	$('.deny').off('click').click(function() {
		$('.pop, .confirmpopopacity').fadeOut()
	})
}
