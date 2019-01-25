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

class App extends Component {

	state = {
		allWorkingTimes: workingTimes
	};

	addWorkingTime = newWorkingTime => {
		this.setState({
			allWorkingTimes: [...this.state.allWorkingTimes, newWorkingTime]
		});
	}

	/*
		IDEA: Parempi olisi filtteröidä suoraan listanäkymää ja näyttää sen yhteydessä yhteensä-tuntimäärä.
		Tehdään oma filterWorkingHours-toiminto, jossa voisi filtteröidä usealla eri tavalla. Esim henkilön, projektin tai molempien mukaan. Tai kuukauden tai vuoden...
		Se palauttaa arrayna ehtojen mukaiset rivit, joista voi sitten laskea tuntisumman.
	*/

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
		
		return (
      <div className="App">
        <header>
          <FaBusinessTime/>
					<h1>Work Timer</h1>
        </header>
				{	location.pathname === '/add' ?
						<AddWorkingTimeForm onNewWorkingTime={this.addWorkingTime} />: 
					location.pathname === '/list' ?
						<WorkingTimeList workingTimes={this.state.allWorkingTimes} />:
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
