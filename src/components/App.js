import React, { Component } from 'react';
import { FaBusinessTime } from 'react-icons/fa'
import WorkingTimeList from './WorkingTimeList';
import AddWorkingTimeForm from './AddWorkingTimeForm';

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

  render() {
		const location = this.props.location;
		
		return (
      <div className="App">
        <header>
          <FaBusinessTime/>
					<h1>Work Timer</h1>
        </header>
				{location.pathname === '/add' ?
					<AddWorkingTimeForm onNewWorkingTime={this.addWorkingTime} /> : location.pathname === '/list' ?
					<WorkingTimeList workingTimes={this.state.allWorkingTimes} />:
					null					
				}
      </div>
    );
  }
}

export default App;
