import React, { useState, useEffect } from 'react';
import { FaBusinessTime } from 'react-icons/fa'
import WorkingTimeList from './WorkingTimeList';
import AddWorkingTimeForm from './AddWorkingTimeForm';
import Summary from './Summary';
import Home from './Home';
import { remove } from '../utils/array';
import { workingTimes, projects, workers } from '../data/testData';

const App = () => {

  const [allWorkingTimes, setAllWorkingTimes] = useState(workingTimes);
  const [filteredWorkingTimes, setAllFilteredWorkingTimes] = useState(workingTimes); // TURHA?
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/workTimeRecord/all');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setAllWorkingTimes(result.data);
        setAllFilteredWorkingTimes(result.data);

      } catch (error) {
        console.error('Error fetching data:', error);
        // TODO: Add error handling
      }
    };

    fetchData();
  }, []);

  const addWorkingTime = newWorkingTime => {
    setAllWorkingTimes([...allWorkingTimes, newWorkingTime]);
  }
	
  // At the moment this is used only in summary component.
  const sumWorkingHours = (filterBy, filterItem) => {
    const filteredWorkingTimes = filterBy === 'worker' ? allWorkingTimes.filter(timeItem => timeItem.worker === filterItem) :
                                 filterBy === 'project' ? allWorkingTimes.filter(timeItem => timeItem.project === filterItem) :
                                 allWorkingTimes;
    const countedHours = filteredWorkingTimes.map(timeItem => timeItem.hours);
    return countedHours.length > 0 ? countedHours.reduce((accumulator, currentValue) => accumulator + currentValue) : 0;
  }

  const removeWorkingTime = timeItem => {
    var timeItemList = allWorkingTimes;
    remove(timeItemList, timeItem);

    setAllWorkingTimes(timeItemList);
  }

  const pathname = window.location.pathname;
  const workerNames = workers.map(worker => worker.firstName + ' ' + worker.lastName);
  
  return (
    <div className="App">
      <header>
        <FaBusinessTime size={50} />
        <h1>Work Timer</h1>
      </header>
      { pathname === '/add' ?
          <AddWorkingTimeForm onNewWorkingTime={addWorkingTime}
                              projects={projects}
                              workers={workerNames} />: 
        pathname === '/list' ?
          <WorkingTimeList workingTimes={allWorkingTimes}
                            projects={projects}
                            workers={workerNames}
                            onDeleteWorkingTime={removeWorkingTime} />:
        pathname === '/summary' ?
          <Summary total={sumWorkingHours('worker', 'Jere Veijalainen')} />:
        <Home />
      }
    </div>
  );
}

export default App;
