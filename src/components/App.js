import React, { Component } from 'react';
import { FaBusinessTime } from 'react-icons/fa'
import WorkingTimeList from './WorkingTimeList';
import AddWorkingTimeForm from './AddWorkingTimeForm';
import Summary from './Summary';
import Home from './Home';
import { remove } from '../utils/array';
import { workingTimes, projects, workers } from '../data/testData';

class App extends Component {

  state = {
    allWorkingTimes: workingTimes,
    filteredWorkingTimes: workingTimes
  };

  // componentDidMount() {
  //   // When fetching data from api it will be done here

  //   this.setState({
  //     allWorkingTimes: workingTimes,
  //     filteredWorkingTimes: workingTimes
  //   });
  // }

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
    const pathname = window.location.pathname;
    const workerNames = workers.map(worker => worker.firstName + ' ' + worker.lastName);
    
    return (
      <div className="App">
        <header>
          <FaBusinessTime size={50} />
          <h1>Work Timer</h1>
        </header>
        { pathname === '/add' ?
            <AddWorkingTimeForm onNewWorkingTime={this.addWorkingTime}
                                projects={projects}
                                workers={workerNames} />: 
          pathname === '/list' ?
            <WorkingTimeList workingTimes={this.state.allWorkingTimes}
                             projects={projects}
                             workers={workerNames}
                             onDeleteWorkingTime={this.removeWorkingTime} />:
          pathname === '/summary' ?
            <Summary total={this.sumWorkingHours('worker', 'Jere Veijalainen')} />:
          <Home />
        }
      </div>
    );
  }
}

export default App;
