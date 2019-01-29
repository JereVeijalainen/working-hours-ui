import React, { Component } from 'react';
import { FaBusinessTime } from 'react-icons/fa'
import WorkingTimeList from './WorkingTimeList';
import AddWorkingTimeForm from './AddWorkingTimeForm';
import Summary from './Summary';

const workingTimes = [
	{
		project: 'Rio Working Hours',
		worker: 'Jere Veijalainen',
		date: '2019-01-01',
		hours: 7.5,
		description: 'Planning and stuff...'
	},
	{
		project: 'Rio Working Hours',
		worker: 'Mikko Mallikas',
		date: '2019-01-02',
		hours: 8,
		description: 'Designing the UI'
	},
	{
		project: 'Test Project',
		worker: 'Börje Börgelsson',
		date: '2019-01-24',
		hours: 6,
		description: 'Coding UI'
	}
];

const projects = [
	'Rio Working Hours',
	'Test Project',
	'Project X'
];

const workers = [
	{ firstName: 'Jere', lastName: 'Veijalainen' },
	{ firstName: 'Mikko', lastName: 'Mallikas' },
	{ firstName: 'Maija', lastName: 'Meikäläinen' },
	{ firstName: 'Börje', lastName: 'Börgelsson' }
];

class App extends Component {

	state = {
		allWorkingTimes: workingTimes,
		filteredWorkingTimes: workingTimes
	};

	addWorkingTime = newWorkingTime => {
		this.setState({
			allWorkingTimes: [...this.state.allWorkingTimes, newWorkingTime]
		});
	}
	
	// At the moment this is used only in summary component.
	sumWorkingHours = (filterBy, filterItem) => {
		const allWorkingTimes = this.state.allWorkingTimes;
		const filteredWorkingTimes = filterBy === 'worker' ? allWorkingTimes.filter(time => time.worker === filterItem) :
																 filterBy === 'project' ? allWorkingTimes.filter(time => time.project === filterItem) :
		allWorkingTimes;
		const countedHours = filteredWorkingTimes.map(time => time.hours);
		return countedHours.reduce((accumulator, currentValue) => accumulator + currentValue);
	}
	
  render() {
		const location = this.props.location;
		const workerNames = workers.map(worker => worker.firstName + ' ' + worker.lastName);
		
		return (
      <div className="App">
        <header>
          <FaBusinessTime size={50} />
					<h1>Work Timer</h1>
        </header>
				{	location.pathname === '/add' ?
						<AddWorkingTimeForm onNewWorkingTime={this.addWorkingTime}
																projects={projects}
																workers={workerNames} />: 
					location.pathname === '/list' ?
						<WorkingTimeList workingTimes={this.state.allWorkingTimes}
														 projects={projects}
														 workers={workerNames}  />:
					location.pathname === '/summary' ?
						<Summary total={this.sumWorkingHours('worker', 'Jere Veijalainen')} />:
						// <Summary total={this.sumWorkingHours('project', 'Test Project')} />:
					null					
				}
      </div>
    );
  }
}

export default App;
