import React from 'react'
import {render} from 'react-dom'
import Tooltip from 'react-tooltip'
require('./bootstrap.min.js')

let AuthorSim = React.createClass({
  render: () => {
    return (
      <div className="container">
        <Tooltip />
        <Header />
        <GameMenu />
        <GameField />

        <ConfirmWindow />
        <AchievementWindow />
      </div>
    )
  }
})

let Header = React.createClass({
  render: () => {
    return (
      <div className="row" id="header">
      	<h1>Author Simulator</h1>
      	<p>version 0.4.1 -- Achievement system & more upgrades!</p>
      </div>
    )
  }
})

let GameMenu = React.createClass({
  render: () => {
    return (
      <ul className="nav nav-tabs" role="tablist">
        <li role="presentation" className="active">
          <a href="#home" aria-controls="home" role="tab" data-toggle="tab">
            Units
          </a>
        </li>
        <li role="presentation">
          <a href="#staff" aria-controls="staff" role="tab" data-toggle="tab">
            Staff
          </a>
        </li>
        <li role="presentation">
          <a href="#achievements" aria-controls="achievements" role="tab" data-toggle="tab">Achievements</a>
        </li>
        <li role="presentation" className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
            More <span className="caret"></span>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a href="#statistics" aria-controls="statistics" role="tab" data-toggle="tab">Statistics</a>
            </li>
            <li>
              <a href="#options" aria-controls="options" role="tab" data-toggle="tab">Options</a>
            </li>
          </ul>
        </li>
        <li role="presentation" className="navbar-right">
          <div id="error" className="menuAlert">
            <span className="glyphicon glyphicon-exclamation-sign menuAlertGlyphicon"></span>
            <span id="errorTitle" className="menuAlertTitle">Whoa!</span>
            <span id="errorDesc">Looks like you earned an achievement!</span>
          </div>
        </li>
      </ul>
    )
  }
})

let GameField = React.createClass({
  getInitialState: function() {
    return {
      save: save,
    }
  },
  updateSave: function() {
    this.setState({
      save: save
    })
  },
  componentDidMount: function() {
    setInterval(this.updateSave, 50)
  },
  render: function () {
    return (
      <div className="tab-content">
        <UnitPanel save={this.state.save}/>
        <StaffPanel save={this.state.save} />
        <AchievementPanel />
        <div role="tabpanel" className="tab-pane fade" id="statistics">

        </div>
        <OptionsPanel />
      </div>
    )
  }
})

let UnitPanel = React.createClass({
  write: function(unit) {
    startWriting(unit)
  },
  render: function() {
    return (
      <div role="tabpanel" className="tab-pane active fade in" id="home">
        <div className="row">
          <div className="tab-content col-sm-3">
            <ul className="nav nav-pills nav-stacked">
              <UnitMenuItem
                unit="Series"
                total={this.props.save.series.total}
              />
              <UnitMenuItem
                unit="Books"
                total={this.props.save.books.total}
              />
              <UnitMenuItem
                unit="Chapters"
                total={this.props.save.chapters.total}
              />
              <UnitMenuItem
                unit="Pages"
                total={this.props.save.pages.total}
              />
              <UnitMenuItem
                unit="Sentences"
                total={this.props.save.sentences.total}
              />
              <UnitMenuItem
                unit="Words"
                total={this.props.save.words.total}
              />
              <UnitMenuItem
                unit="Letters"
                total={this.props.save.letters.total}
              />
            </ul>
          </div>
          <div className="tab-content col-sm-9">
            <UnitDetailsPanel
              unit={this.props.save.letters}
              write={this.write.bind(null, this.props.save.letters.unit)}
            />
            <UnitDetailsPanel
              unit={this.props.save.words}
              write={this.write.bind(null, this.props.save.words.unit)}
            />
            <UnitDetailsPanel
              unit={this.props.save.sentences}
              write={this.write.bind(null, this.props.save.sentences.unit)}
            />
            <UnitDetailsPanel
              unit={this.props.save.pages}
              write={this.write.bind(null, this.props.save.pages.unit)}
            />
            <UnitDetailsPanel
              unit={this.props.save.chapters}
              write={this.write.bind(null, this.props.save.chapters.unit)}
            />
            <UnitDetailsPanel
              unit={this.props.save.books}
              write={this.write.bind(null, this.props.save.books.unit)}
            />
            <UnitDetailsPanel
              unit={this.props.save.series}
              write={this.write.bind(null, this.props.save.series.unit)}
            />
          </div>
        </div>
      </div>
    )
  }
})

let UnitMenuItem = React.createClass({
  render: function() {
    return (
      <li id={this.props.unit + "Menu"} role="presentation">
        <a href={'#' + this.props.unit.toLowerCase()} role="tab" data-toggle="tab" onClick={this.props.update}>
          <div className="row">
            <div className="col-sm-2">
              <span id={this.props.unit + 'UpgradeAvailable'} className="upgrade glyphicon glyphicon-circle-arrow-up">
              </span>
            </div>
            <div className="col-sm-4">{this.props.unit}</div>
            <div className="col-sm-5 text-right">{prettify(this.props.total)}</div>
          </div>
        </a>
      </li>
    )
  }
})

let UnitDetailsPanel = React.createClass({
  render: function() {
    return (
      <div id={this.props.unit.unit} role="tabpanel" className="tab-pane fade">
        <div className="row">
          <div className="col-sm-7">
            <p>You have {prettify(this.props.unit.total)} {this.props.unit.unit}.</p>
            <p>You are generating {prettify(this.props.unit.generating, 2)} total {this.props.unit.unit} per second.</p>
            <p>You are using {prettify(this.props.unit.using, 2)} {this.props.unit.unit} per second.</p>
            {this.props.unit.unit !== 'letters' ?
              <p>Writing {this.props.unit.unit} costs {prettify(this.props.unit.cost, 1)} of the previous unit.</p> :
              null
            }
          </div>
          {this.props.unit.unit === 'letters' ?
            <UnitPanelLettersUpgrade /> : null
          }
          {this.props.unit.unit === 'words' ?
            <UnitPanelWordsUpgrade /> : null
          }
          {this.props.unit.unit === 'sentences' ?
            <UnitPanelSentencesUpgrade /> : null
          }
          {this.props.unit.unit === 'pages' ?
            <UnitPanelPagesUpgrade /> : null
          }
          {this.props.unit.unit === 'chapters' ?
            <UnitPanelChaptersUpgrade /> : null
          }
          {this.props.unit.unit === 'books' ?
            <UnitPanelBooksUpgrade /> : null
          }
        </div>
        <div id={this.props.unit.unit + "ManualSection"} className="row">
        <hr />
          <div className="col-sm-12">
            <p>Writing {this.props.unit.unit} by hand takes {prettify(this.props.unit.timer / this.props.unit.multiplier, 2)} seconds.
            </p>
          </div>
          <div className="col-sm-8 col-sm-offset-2">
          <div className="progress">
            <div className="progress-bar progress-bar-info progress-bar-striped active"
                id={"write" + this.props.unit.unit}
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100">
            </div>
          </div>
            <button className="btn btn-lg btn-info center-block" onClick={this.props.write}>
              Write {this.props.unit.unit}
            </button>
          </div>
        </div>
      </div>
    )
  }
})

let UnitPanelUpgradeItem = React.createClass({
  render: function() {
    return (
      <button
        id={this.props.upgradeName.replace(/\s+/g, '')}
        className="btn btn-success btn-sm upgrade"
        onClick={this.props.func}
        data-tip={this.props.desc}
      >
        <p>{this.props.upgradeName}</p>
        <small>Cost: {this.props.cost}</small>
      </button>
    )
  }
})

let UnitPanelLettersUpgrade = React.createClass({
  render: function() {
    return (
      <div className="col-sm-5">
        <UnitPanelUpgradeItem
          upgradeName="Write Words"
          desc="Allows you to write words manually."
          func={upgrade.writeWords}
          cost="34 Letters"
        />
        <UnitPanelUpgradeItem
          upgradeName="Faster Letters"
          desc="Write letters 50% faster when manually writing."
          func={upgrade.fasterLetters}
          cost="175 Letters"
        />
        <UnitPanelUpgradeItem
          upgradeName="Efficient Monkeys"
          desc="Monkeys write 10% more letters."
          func={upgrade.efficientMonkeys}
          cost="75 Letters"
        />
        <UnitPanelUpgradeItem
          upgradeName="Efficient Words"
          desc="Words are 10% cheaper across the board."
          func={upgrade.efficientWords}
          cost="1,450 Letters"
        />
      </div>
    )
  }
})

let UnitPanelWordsUpgrade = React.createClass({
  render: function() {
    return (
      <div className="col-sm-5">
        <UnitPanelUpgradeItem
          upgradeName="Write Sentences"
          desc="Allows you to write sentences manually."
          func={upgrade.writeSentences}
          cost="30 Words"
        />
        <UnitPanelUpgradeItem
          upgradeName="Faster Words"
          desc="Write words 30% faster when manually writing."
          func={upgrade.fasterWords}
          cost="25 Words"
        />
      </div>
    )
  }
})

let UnitPanelSentencesUpgrade = React.createClass({
  render: function() {
    return (
      <div className="col-sm-5">
        <UnitPanelUpgradeItem
          upgradeName="Faster Sentences"
          desc="Write sentences 25% faster when manually writing."
          func={upgrade.fasterSentences}
          cost="25 Sentences"
        />
      </div>
    )
  }
})

let UnitPanelPagesUpgrade = React.createClass({
  render: function() {
    return (
      <div className="col-sm-5">

      </div>
    )
  }
})

let UnitPanelChaptersUpgrade = React.createClass({
  render: function() {
    return (
      <div className="col-sm-5">

      </div>
    )
  }
})

let UnitPanelBooksUpgrade = React.createClass({
  render: function() {
    return (
      <div className="col-sm-5">

      </div>
    )
  }
})

let StaffPanel = React.createClass({
  hire: function(slot) {
    hireStaff(slot)
  },
  buyMonkey: function() {
    buyMonkey()
  },
  render: function() {
    return (
      <div role="tabpanel" className="tab-pane fade in" id="staff">
  			<div className="row">
          <div className="col-sm-3">
            <button className="btn btn-primary"
              onClick={this.buyMonkey}
              data-tip="Writes 1 letter per second">
                Buy Monkey for {prettify(this.props.save.monkeys.cost)} Words
            </button>
          </div>
  				<div className="col-sm-3">
  					<h4 id="monkeys" data-tip="<img src='./images/monkey.png'>" data-html={true}>
              Monkeys : {this.props.save.monkeys.total}
            </h4>
  				</div>
        </div>
        <hr />
        <div className="row">
          {this.props.save.staff.s1.active ?
            <StaffSlot staff={this.props.save.staff.s1} slot='1' /> :
            <PurchaseStaffSlot hire={this.hire.bind(null, '1')} slot='1' />
          }
          {this.props.save.staff.s2.active ?
            <StaffSlot staff={this.props.save.staff.s2} slot='2' /> :
            <PurchaseStaffSlot hire={this.hire.bind(null, '2')} slot='2' />
          }
          {this.props.save.staff.s3.active ?
            <StaffSlot staff={this.props.save.staff.s3} slot='3' /> :
            <PurchaseStaffSlot hire={this.hire.bind(null, '3')} slot='3' />
          }
          {this.props.save.staff.s4.active ?
            <StaffSlot staff={this.props.save.staff.s4} slot='4' /> :
            <PurchaseStaffSlot hire={this.hire.bind(null, '4')} slot='4' />
          }
          {this.props.save.staff.s5.active ?
            <StaffSlot staff={this.props.save.staff.s5} slot='5' /> :
            <PurchaseStaffSlot hire={this.hire.bind(null, '5')} slot='5' />
          }
          {this.props.save.staff.s6.active ?
            <StaffSlot  staff={this.props.save.staff.s6} slot='6' /> :
            <PurchaseStaffSlot hire={this.hire.bind(null, '6')} slot='6' />
          }
          {this.props.save.staff.s7.active ?
            <StaffSlot staff={this.props.save.staff.s7} slot='7' /> :
            <PurchaseStaffSlot hire={this.hire.bind(null, '7')} slot='7' />
          }
          {this.props.save.staff.s8.active ?
            <StaffSlot staff={this.props.save.staff.s8} slot='8' /> :
            <PurchaseStaffSlot hire={this.hire.bind(null, '8')} slot='8' />
          }
          {this.props.save.staff.s9.active ?
            <StaffSlot staff={this.props.save.staff.s9} slot='9' /> :
            <PurchaseStaffSlot hire={this.hire.bind(null, '9')} slot='9' />
          }
        </div>
      </div>
    )
  }
})

let StaffSlot = React.createClass({
  getEducation: function() {
    let edu = ''
    switch (this.props.staff.prestige) {
      case 1:
        edu = 'Middle School'
        break
      case 2:
        edu = 'High School Dropout'
        break
      case 3:
        edu = 'Undergraduate'
        break
      case 4:
        edu = 'Graduate Student'
        break
      case 5:
        edu = 'PhD'
        break
    }
    return edu
  },
  startWriting: function(unit) {
    startStaffWriting(unit, this.props.slot)
  },
  graduate: function() {
    staffGraduate(this.props.slot)
  },
  componentDidMount: function() {
    for (let i = 1; i < 10; i++) {
      let staff = save['staff']['s' + i]
      if (staff['active'] && staff['writing'] !== 'none') {
        // Update button visuals
        $('#staff' + staff['writing'] + i)
          .removeClass('btn-primary')
          .addClass('active btn-success')
      }
  	}
  },
  render: function() {
    let expBar = {
      width: (this.props.staff.exp / this.props.staff.nextExp * 100) + '%'
    }

    let progressBar = {
      width: this.props.staff.progress + '%'
    }

    return (
      <div className="col-sm-4 staff-stat">
          <div className="col-sm-9">
            <h4>{this.props.staff.name}</h4>
          </div>
          <div className="col-sm-3">

          </div>
          <div className="col-sm-12">
            <strong>Education:</strong> {this.getEducation()}
          </div>
          <div className="col-sm-6" data-tip="Higher number uses fewer resources">
            <strong>Efficiency:</strong> {prettify(this.props.staff.eff * 100) + '%'}
          </div>
          <div className="col-sm-6" data-tip="Higher number writes faster">
            <strong>Speed:</strong> {prettify(this.props.staff.speed * 100) + '%'}
          </div>
          <div className="col-sm-3">
            <strong>Level:</strong> {this.props.staff.level}
          </div>
          <div className="col-sm-9">
            {this.props.staff.level === 10 ?
              null :
              <div id={'staffExpBar' + this.props.slot} className="progress">
                <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="50" aria-valuemin="10" aria-valuemax="100" style={expBar}>
                  <span>{prettify(this.props.staff.exp,2)} / {this.props.staff.nextExp}</span>
                </div>
              </div>
            }

          </div>
        <div className="col-sm-12">
          <div id={'staffGraduate' + this.props.slot} className="graduate">
            <button onClick={this.graduate} type="button" className="btn btn-success btn-lg">
              Graduate
            </button>
          </div>
          <div id={"staffProgressArea" + this.props.slot}>
            <div className="col-sm-8 col-sm-offset-2 col-centered">
              <button onClick={this.startWriting.bind(null, 'words')} id={'staffwords' + this.props.slot} type="button" className="btn btn-primary btn-sm" data-tip="Write Words">W</button>
              <button onClick={this.startWriting.bind(null, 'sentences')} id={'staffsentences' + this.props.slot} type="button" className="btn btn-primary btn-sm" data-tip="Write Sentences">S</button>

              {this.props.staff.prestige >= 2 ?
                <button onClick={this.startWriting.bind(null, 'pages')} id={'staffpages' + this.props.slot} type="button" className="btn btn-primary btn-sm" data-tip="Write Pages">P</button> :
                null
              }
              {this.props.staff.prestige >= 3 ?
                <button onClick={this.startWriting.bind(null, 'chapters')} id={'staffchapters' + this.props.slot} type="button" className="btn btn-primary btn-sm" data-tip="Write Chapters">C</button> :
                null
              }
              {this.props.staff.prestige >= 4 ?
                <button onClick={this.startWriting.bind(null, 'books')} id={'staffbooks' + this.props.slot} type="button" className="btn btn-primary btn-sm" data-tip="Write Books">B</button> :
                null
              }
              {this.props.staff.prestige >= 5 ?
                <button onClick={this.startWriting.bind(null, 'series')} id={'staffseries' + this.props.slot} type="button" className="btn btn-info btn-sm" data-tip="Research">R</button> :
                null
              }
            </div>
            <div className="col-sm-10 col-sm-offset-1">
              <div className="progress">
                <div id={'staffProgress' + this.props.slot} className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="50" aria-valuemin="10" aria-valuemax="100" style={progressBar}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

let PurchaseStaffSlot = React.createClass({
  render: function() {
    return (
      <div className="col-sm-4 staff-stat">
        <div className="row">
          <button onClick={this.props.hire} type="button" className="btn btn-primary btn-lg centered">
            <p>Hire Staff Member</p>
            <p>{prettify(Math.pow(this.props.slot, 2.3) * 50)} Words</p>
          </button>
        </div>
      </div>
    )
  }
})

let AchievementPanel = React.createClass({
  getInitialState: function() {
    return { ach: save['achievements'] }
  },
  update: function() {
    this.setState({
      ach: save['achievements']
    })
    achieve.check()
  },
  componentDidMount: function() {
    setInterval(this.update, 500)
  },
  render: function() {
    return (
      <div role="tabpanel" className="tab-pane fade" id="achievements">
        <div className="row">
          <div className="col-sm-4 activePerk">
            Active Perk #1
          </div>
          <div className="col-sm-4 activePerk">
            Active Perk #2
          </div>
          <div className="col-sm-4 activePerk">
            Active Perk #3
          </div>
        </div>
        <div className="row">
          {save.achievements.findPongo ?
            <AchievementItem
              achName="You Found Pongo"
              achPerk="+10% speed to monkeys." /> :
            <FadedAchievementItem />}
        </div>
      </div>
    )
  }
})

let AchievementItem = React.createClass({
  render: function() {
    return (
      <div
        id={this.props.achName.replace(/\s+/g, '')}
        className="col-sm-3 achievement" draggable="true"
      >
        <h4>{this.props.achName}!</h4>
        <small>{this.props.achPerk}</small>
      </div>
    )
  }
})

let FadedAchievementItem = React.createClass({
  render: function() {
    return (
      <div className="col-sm-3 achPlaceholder">
        <h4>Achievement!</h4>
        <small>Perks!</small>
      </div>
    )
  }
})

let OptionsPanel = React.createClass({
  delSave: function() {
    delSave()
  },
  render: function() {
    return (
      <div role="tabpanel" className="tab-pane fade" id="options">
        <div className="row">
          <button onClick={this.delSave} className="btn btn-lg btn-danger">Delete Save</button>
        </div>
      </div>
    )
  }
})

let ConfirmWindow = React.createClass({
  render: function() {
    return (
      <div>
      <div className="confirmpopopacity"></div>
    	<div className="confirmpop pop">
    		<p id="confirmpopMessage">Are you sure you want to do that?</p>
    		<p>
          <button className="btn btn-lg btn-success confirm">Yes</button>
          <button className="btn btn-lg btn-danger deny">No</button>
        </p>
    	</div>
      </div>
    )
  }
})

let AchievementWindow = React.createClass({
  render: function() {
    return (
      <div className="row achievementWindow achBehind">
    	<div className="col-sm-12">
    		<div id="achieve" className="alert alert-dismissible alert-success fade" role="alert">
    			<button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    			<span className="achieveicon glyphicon glyphicon-ok"></span>
    			<h3 id="achieveTitle">Whoa!</h3>
    			<p id="achieveDesc">Looks like you earned an achievement!</p>
    		</div>
    	</div>
    	</div>
    )
  }
})

render(<AuthorSim />, document.getElementById('container'));
