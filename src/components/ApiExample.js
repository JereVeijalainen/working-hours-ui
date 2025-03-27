import React, { useState, useEffect } from 'react';

//TODO: Poista koko ApiExample kun ei enää tarpeen.

const ApiExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/workTimeRecord/all');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching the data. Please try again later.')
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h1>API Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {data.data.map((item) => (
            <li key={item.id}>Project: {item.project}, Hours: {item.hours}, Worker: {item.worker}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApiExample;
