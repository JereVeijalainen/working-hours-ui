import React, { useState, useEffect } from 'react';
import { FaBusinessTime } from 'react-icons/fa'
import WorkingTimeList from './WorkingTimeList';
import AddWorkingTimeForm from './AddWorkingTimeForm';
import Summary from './Summary';
import Home from './Home';
// import ApiExample from './ApiExample'; // TODO: Poista kun esimerkki ei enää tarpeen.
import { remove } from '../utils/array';
import { projects, workers } from '../data/testData'; // Poista importit ja testidatat kun eivät enää ole käytössä.
import axios from 'axios';

// TODO: Poista kaikki turhat kommentoidut koodit!

const App = () => {

  // const [allWorkingTimes, setAllWorkingTimes] = useState([]);
  const [allWorkingTimesData, setAllWorkingTimesData] = useState(null);
  // const [filteredWorkingTimes, setAllFilteredWorkingTimes] = useState([]); // TURHA?

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/workTimeRecord/all');

        setAllWorkingTimesData(response.data);
        // setAllWorkingTimesData(null);

        // setAllFilteredWorkingTimes(response.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching the data. Please try again later.')
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // TODO: Voisi siirtää näitä funktioita omiin komponentteihinsa, joihin välitetään vain päivittynyt data (allWorkingTimesData).

  const addWorkingTime = newWorkingTime => {

    // TODO: Tässä pitää vielä huomioida varsinainen tallennus apin kautta, jotta listaan tulisi uusi rivi.

    if (allWorkingTimesData) {
      setAllWorkingTimesData(allWorkingTimesData);
      // setAllWorkingTimes([...allWorkingTimesData, newWorkingTime]);
    }
  }
	
  // At the moment this is used only in summary component.
  const sumWorkingHours = (filterBy, filterItem) => {

    if (allWorkingTimesData) {
      const filteredWorkingTimes = filterBy === 'worker' ? allWorkingTimesData.data.filter(timeItem => timeItem.worker === filterItem) :
                                  filterBy === 'project' ? allWorkingTimesData.data.filter(timeItem => timeItem.project === filterItem) :
                                  allWorkingTimesData.data;
      const countedHours = filteredWorkingTimes.map(timeItem => timeItem.hours);
      return countedHours.length > 0 ? countedHours.reduce((accumulator, currentValue) => accumulator + currentValue) : 0;
    }
    
    return 0;
  }

  const removeWorkingTime = timeItem => {
    // TODO: Poisto apin kautta, ja lista päivittymään uuden haun myötä.

    if (allWorkingTimesData) {
      var timeItemList = allWorkingTimesData.data;
      remove(timeItemList, timeItem);

      setAllWorkingTimesData(allWorkingTimesData); // TODO: Onko tarpeen?

      // setAllWorkingTimes(timeItemList);
    }
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
                              workers={workerNames} />
        : pathname === '/list' ?
          
          loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            allWorkingTimesData ?
              allWorkingTimesData.data.length === 0 ? <p>No working times added yet.</p>
              : <WorkingTimeList workingTimes={allWorkingTimesData.data}
                                  projects={projects}
                                  workers={workerNames}
                                  onDeleteWorkingTime={removeWorkingTime} />
              : <p>Loading...</p>
          )
        : pathname === '/summary' ?
          allWorkingTimesData ?
            <Summary total={sumWorkingHours('worker', 'Jere Veijalainen')} />
            : <p>Loading...</p>
        : pathname === '/api' ?
          {/* <ApiExample /> TODO: Poista kun ei enää tarpeen. */}
        : <Home />
      }
    </div>
  );
}

export default App;
