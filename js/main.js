import React from 'react'
import {render} from 'react-dom'

let AuthorSim = React.createClass({
  render: () => {
    return (
      <div className="container">
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
      	<p>version 0.2.0</p>
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
            <span className="letters.Total"></span> Letters
          </a>
        </li>
        <li role="presentation">
          <a href="#staff" aria-controls="staff" role="tab" data-toggle="tab">Staff</a>
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
      </ul>
    )
  }
})

let GameField = React.createClass({
  render: function () {
    return (
      <div className="tab-content">
        <UnitPanel />
        <StaffPanel />
        <div role="tabpanel" className="tab-pane fade" id="achievements">

        </div>
        <div role="tabpanel" className="tab-pane fade" id="statistics">

        </div>
        <div role="tabpanel" className="tab-pane fade" id="options">

        </div>
      </div>
    )
  }
})

let UnitPanel = React.createClass({
  getInitialState: function() {
    return {
      save: save,
      activeUnit: save['letters']
    }
  },
  updateSave: function() {
    this.setState({
      save: save
    })
  },
  updateActive: function(unit) {
    this.setState({
      activeUnit: save[unit]
    })
  },
  write: function(unit) {
    startWriting(unit)
  },
  componentDidMount: function() {
    setInterval(this.updateSave, 100)
  },
  render: function() {
    return (
      <div role="tabpanel" className="tab-pane active fade in" id="home">
        <div className="row">
          <div className="tab-content col-sm-3">
            <ul className="nav nav-pills nav-stacked">
              <UnitMenuItem
                unit="Series"
                total={this.state.save.series.total}
                update={this.updateActive.bind(null,'series')}
              />
              <UnitMenuItem
                unit="Books"
                total={this.state.save.books.total}
                update={this.updateActive.bind(null,'books')}
              />
              <UnitMenuItem
                unit="Chapters"
                total={this.state.save.chapters.total}
                update={this.updateActive.bind(null,'chapters')}
              />
              <UnitMenuItem
                unit="Pages"
                total={this.state.save.pages.total}
                update={this.updateActive.bind(null,'pages')}
              />
              <UnitMenuItem
                unit="Sentences"
                total={this.state.save.sentences.total}
                update={this.updateActive.bind(null,'sentences')}
              />
              <UnitMenuItem
                unit="Words"
                total={this.state.save.words.total}
                update={this.updateActive.bind(null,'words')}
              />
              <UnitMenuItem
                unit="Letters"
                total={this.state.save.letters.total}
                update={this.updateActive.bind(null,'letters')}
              />
            </ul>
          </div>
          <div className="col-sm-9">
            <UnitDetailsPanel
              activeUnit={this.state.activeUnit}
              write={this.write.bind(null, this.state.activeUnit.unit)}
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
      <li role="presentation">
        <a href="#" role="tab" data-toggle="tab" onClick={this.props.update}>
          <div className="row">
            <div className="col-sm-2">
              <span id={this.props.unit + 'UpgradeAvailable'} className="glyphicon glyphicon-circle-arrow-up">
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
        <div role="tabpanel" className="tab-pane active fade in">
          <div className="row">
            <div className="col-sm-8">
              <p>You have {prettify(this.props.activeUnit.total)} {this.props.activeUnit.unit}.</p>
              <p>You are generating {prettify(this.props.activeUnit.generating, 2)} total {this.props.activeUnit.unit} per second.</p>
              <p>You are using {prettify(this.props.activeUnit.using, 2)} {this.props.activeUnit.unit} per second.</p>
            </div>
          <div className="col-sm-4">
            <UnitPanelUpgrade />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-12">
            <p>Writing {this.props.activeUnit.unit} by hand takes {prettify(this.props.activeUnit.timer, 1)} seconds.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <UnitPanelProgress
              unit={this.props.activeUnit.unit}
            />
            <button className="btn btn-lg btn-info" onClick={this.props.write}>
              Write {this.props.activeUnit.unit}
            </button>
          </div>
        </div>
      </div>
    )
  }
})

let UnitPanelUpgrade = React.createClass({
  render: () => {
    return (
      <div>Upgrades</div>
    )
  }
})

let UnitPanelProgress = React.createClass({
  render: function() {
    return (
      <div className="progress">
        <div className="progress-bar progress-bar-info"
            id={'writing' + this.props.unit + 'progress'}
            role="progressbar"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100">
        </div>
      </div>
    )
  }
})

let StaffPanel = React.createClass({
  getInitialState: function() {
    return {
      letterGen: save['letters']['generating'],
      staff: save['staff'],
      monkeys: save['monkeys']
    }
  },
  updateState: function() {
    this.setState({
      monkeys: save['monkeys'],
      letterGen: save['letters']['generating'],
      staff: save['staff']
    })
  },
  componentDidMount: function() {
    setInterval(this.updateState, 500)
  },
  render: function() {
    return (
      <div role="tabpanel" className="tab-pane fade" id="staff">

  			<div className="row">
  				<div className="col-sm-3">
  					<h4>Monkeys : {this.state.monkeys.total}</h4>
  				</div>
          <div className="col-sm-3">
            <h4>Letters per Second: {prettify(this.state.letterGen, 2)}</h4>
          </div>
        </div>

        <div className="row">
          <button className="btn btn-primary staff-hire"
            data-toggle="tooltip"
            data-placement="top"
            title="Writes 1 letter per second">
              <p>Buy Monkey</p>
              <p>{this.state.monkeys.cost} Words</p>
          </button>
					<button id="buyStaff1" className="btn btn-info staff-hire"
            data-toggle="tooltip"
            data-placement="top"
            title="Writes words. Prestige unlocks higher units to write.">
              <p>Hire Staff</p>
              <p><span id="staffCost">50</span> Words</p>
          </button>
  			</div>

        <div className="row">
          <StaffSlot
            staff={this.state.staff.s1}
          />
          <StaffSlot
            staff={this.state.staff.s2}
          />
          <StaffSlot
            staff={this.state.staff.s3}
          />
          <StaffSlot
            staff={this.state.staff.s4}
          />
          <StaffSlot
            staff={this.state.staff.s5}
          />
          <StaffSlot
            staff={this.state.staff.s6}
          />
          <StaffSlot
            staff={this.state.staff.s7}
          />
          <StaffSlot
            staff={this.state.staff.s8}
          />
          <StaffSlot
            staff={this.state.staff.s9}
          />
        </div>
      </div>
    )
  }
})

let StaffSlot = React.createClass({
  render: function() {

    let expBar = {
      width: (this.props.staff.exp / this.props.staff.nextExp * 100) + '%'
    }

    return (
      <div className="col-sm-4 staff-stat">
        <div className="row">
          <div className="col-sm-9">
            <h4>{this.props.staff.name}</h4>
          </div>
          <div className="col-sm-3">
            <button className="btn btn-info">
              Skills
            </button>
          </div>
          <div className="col-sm-12">
            <strong>Education:</strong> {this.props.staff.prestige}
          </div>
          <div className="col-sm-6">
            <span data-toggle="tooltip" data-placement="top" title="Uses X% fewer resources.">
              <strong>Efficiency:</strong> {this.props.staff.eff}
            </span>
          </div>
          <div className="col-sm-6">
            <span data-toggle="tooltip" data-placement="top" title="Is X% faster at writing.">
              <strong>Speed:</strong> {this.props.staff.speed}
            </span>
          </div>
          <div className="col-sm-3">
            <strong>Level:</strong> {this.props.staff.level}
          </div>
          <div className="col-sm-9">
            <div className="progress">
              <div className="progress-bar progress-bar-warning" id="staffExpBar1" role="progressbar" aria-valuenow="50" aria-valuemin="10" aria-valuemax="100">
                {this.props.staff.exp} / {this.props.staff.nextExp}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-sm-8 col-sm-offset-2 col-centered">
          <button id="words1" type="button" className="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top" title="Write Words">W</button>
          <button id="sentences1" type="button" className="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top" title="Write Sentences">S</button>
          <button id="pages1" type="button" className="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top" title="Write Pages">P</button>
          <button id="chapters1" type="button" className="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top" title="Write Chapters">C</button>
          <button id="books1" type="button" className="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top" title="Write Books">B</button>
          <button id="research1" type="button" className="btn btn-info btn-sm" data-toggle="tooltip" data-placement="top" title="Research">R</button>
        </div>
        <div className="col-sm-10 col-sm-offset-1">
          <div className="progress">
            <div className="progress-bar progress-bar-striped active" id="staffProgressBar1" role="progressbar" aria-valuenow="50" aria-valuemin="10" aria-valuemax="100">
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
})

let ConfirmWindow = React.createClass({
  render: () => {
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
  render: () => {
    return (
      <div className="row">
    	<div className="col-md-12">
    		<div id="achieve" className="alert alert-dismissible alert-info fade" role="alert">
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
