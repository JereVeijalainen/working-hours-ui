import React, { Component } from 'react';
import { FaBusinessTime } from 'react-icons/fa'
import WorkingTimeList from './WorkingTimeList';
import AddWorkingTimeForm from './AddWorkingTimeForm';
import Summary from './Summary';
import { remove } from '../utils/array';

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

/* TODO:
	- Testidatat omaan tiedostoonsa
	- Miksi componentDidMount ei päivitä tilaa listaan?
*/

class App extends Component {

	state = {
		allWorkingTimes: [],
		filteredWorkingTimes: []
	};

	componentDidMount() {
		// When fetching data from api it will be done here
		
		this.setState({
			allWorkingTimes: workingTimes,
			filteredWorkingTimes: workingTimes
		});
	}

	addWorkingTime = newWorkingTime => {
		this.setState({
			allWorkingTimes: [...this.state.allWorkingTimes, newWorkingTime]
		});
	}
	
	// At the moment this is used only in summary component.
	sumWorkingHours = (filterBy, filterItem) => {
		const allWorkingTimes = this.state.allWorkingTimes;
		const filteredWorkingTimes = filterBy === 'worker' ? allWorkingTimes.filter(timeItem => timeItem.worker === filterItem) :
																 filterBy === 'project' ? allWorkingTimes.filter(timeItem => timeItem.project === filterItem) :
		allWorkingTimes;
		const countedHours = filteredWorkingTimes.map(timeItem => timeItem.hours);
		return countedHours.length > 0 ? countedHours.reduce((accumulator, currentValue) => accumulator + currentValue) : 0;
	}

	removeWorkingTime = timeItem => {		
		var timeItemList = this.state.allWorkingTimes;
		remove(timeItemList, timeItem);

		this.setState({
			allWorkingTimes: timeItemList
		});
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
														 workers={workerNames}
														 onDeleteWorkingTime={this.removeWorkingTime} />:
					location.pathname === '/summary' ?
						<Summary total={this.sumWorkingHours('worker', 'Jere Veijalainen')} />:
					null					
				}
      </div>
    );
  }
}

export default App;
