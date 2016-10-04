import { save, calcGenerating, errorAlert, units } from './game.js'

const staff = { // Exp and Eff values for all levels of staff
  prestige1: { maxLevel: 4, maxExp: 150 },
  prestige2: { maxLevel: 5, maxExp: 200 },
  prestige3: { maxLevel: 6, maxExp: 250 },
  prestige4: { maxLevel: 8, maxExp: 300 },
  prestige5: { maxLevel: 10, maxExp: 350 },
}

const staffNames = [
  'Miranda', 'Joey', 'Bob', 'Jonathan', 'Christopher', 'Krista', 'Cameron',
  'Frank', 'Alfonso', 'Kerry', 'Don', 'Clint', 'Janice', 'Phyllis', 'Andrew',
  'Todd', 'Clancy', 'Ronald', 'Zach', 'Bartholomew', 'Cindy', 'Nancy', 'Jan',
  'Will', 'Olivia', 'Sophie', 'Emily', 'Jake', 'Alex', 'James', 'Charles',
]

export const hireStaff = (slot) => {
  const name = staffNames[Math.floor(Math.random() * staffNames.length)]
  const cost = Math.pow(slot, 2.3) * 50
  if (save.words.total >= cost) {
    save.words.total -= cost
    save['staff']['s' + slot] = {
      active: true,
      writing: 'none',
      name: name,
      prestige: 1,
      level: 1,
      skillPoint: 0,
      maxLevel: 4,
      exp: 0,
      nextExp: staff.prestige1.maxExp,
      eff: 0.95,
      speed: 1.05,
      progress: 0,
    }
  } else {
    errorAlert('This is embarrassing...', 'You can\'t afford that staff member.')
  }
}

export const buyMonkey = () => {
  const words = save.words
  const monkeys = save.monkeys
  if (words['total'] >= monkeys['cost']) {
    words['total'] -= monkeys['cost']
    monkeys['total'] += 1
    monkeys['lifetime'] += 1
    monkeys['cost'] = Math.floor((monkeys['cost'] + 2) * 1.06)
    $('#monkeyCost').text(monkeys['cost'])
  } else {
    errorAlert('Whoops.', 'That monkey is too costly for you.')
  }
  calcGenerating('letters')
}

export const levelUp = (slot) => {
  const staff = save['staff']['s' + slot]
  if (staff['level'] === 10) {
    $('#staffExpBar' + slot).hide()
    return
  }
  if (staff['level'] >= staff['maxLevel']) {
    $('#staffExpBar' + slot).hide()
    $('#staffProgressArea' + slot).hide()
    $('#staffGraduate' + slot).show()
    return
  }
  staff['level'] += 1
  staff['exp'] = 0
  staff['eff'] += 0.05
  staff['speed'] += 0.30
  staff['nextExp'] *= 2.6

  calcGenerating(staff['writing'])
}

export const staffGraduate = (slot) => {
  const cur = save['staff']['s' + slot]
  const curPrestige = cur['prestige']
  const newPrestige = curPrestige + 1
  const newStats = staff['prestige' + newPrestige]

  // Update all stats
  cur['level'] = 1
  cur['maxLevel'] = newStats['maxLevel']
  cur['exp'] = 0
  cur['nextExp'] = newStats['maxExp']
  cur['progress'] = 0
  cur['prestige'] += 1
  cur['skillPoint'] += 1

  // Re-show/hide UI elements
  $('#staffExpBar' + slot).show()
  $('#staffProgressArea' + slot).show()
  $('#staffGraduate' + slot).hide()
}

export const chooseSkill = (slot) => {
  const cur = save['staff']['s' + slot]
  if (cur.skillPoint > 0) {
    $('#staffProgressArea' + slot).toggle()
    $('#staffGradBonusArea' + slot).toggle()

    // Perk of +50% speed
    $('#bonusPerk1_' + slot).text('+50% Speed').show().click(() => {
      if (cur.skillPoint > 0) {
        cur['speed'] += 0.50
        cur['skillPoint'] -= 1
        $('#staffProgressArea' + slot).toggle()
        $('#staffGradBonusArea' + slot).toggle()
      }
    })

    // Perk of +50% efficiency
    $('#bonusPerk2_' + slot).text('+50% Efficiency').show().click(() => {
      if (cur.skillPoint > 0) {
        cur['eff'] += 0.50
        cur['skillPoint'] -= 1
        $('#staffProgressArea' + slot).toggle()
        $('#staffGradBonusArea' + slot).toggle()
      }
    })
  }
}

const disengageStaff = (slot) => {
  units.forEach((cv, i, arr) => {
    // Update visually
    $('#staff' + cv + slot)
      .removeClass('active btn-success')
      .addClass('btn-primary')
    $('#staffprogress' + slot)
      .removeClass('progress-bar-striped active')
  })

  // Set the unit to nothing
  save['staff']['s' + slot]['writing'] = 'none'
  save['staff']['s' + slot]['progress'] = 0
}

export const startStaffWriting = (unit, slot) => {
  // If unit is already being worked on, it stops it
  if (unit === save['staff']['s' + slot]['writing']) {
    disengageStaff(slot)
    calcGenerating(unit)
    return
  }
  // Otherwise, stop everything then activate the clicked one
  disengageStaff(slot)
  save['staff']['s' + slot]['writing'] = unit
  calcGenerating('all')

  // Update the button
  $('#staff' + unit + slot)
    .removeClass('btn-primary')
    .addClass('active btn-success')

  // Update the progress bar
  $('#staffProgress' + slot)
    .addClass('progress-bar-striped active')
}

export const startResearching = (slot) => {
  console.log('research!')
}
