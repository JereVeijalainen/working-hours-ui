import React, { Component } from 'react';
import { FaBusinessTime } from 'react-icons/fa'
import WorkTimeList from './WorkTimeList';
import AddWorkTimeForm from './AddWorkTimeRow';

const worksTimes = [
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
  render() {

		const location = this.props.location;

		console.log(location.pathname);
    return (
      <div className="App">
        <header>
          <FaBusinessTime/>
					<h1>Work Timer</h1>
        </header>
				{location.pathname === '/add' ?
					<AddWorkTimeForm /> : location.pathname === '/list' ?
					<WorkTimeList workTimes={worksTimes} />:
					null					
				}
      </div>
    );
  }
}

export default App;
