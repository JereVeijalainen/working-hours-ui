import React from 'react';
import PropTypes from 'prop-types';

const WorkingTimeRow = ({timeItem, onDeleteWorkingTime}) => {

  const { project, worker, date, hours, description } = timeItem;

  return (
    <tr>
      <td>{project}</td>
      <td>{worker}</td>
      <td>{date}</td>
      <td>{hours}</td>
      <td>{description}</td>
      <td><button onClick={() => onDeleteWorkingTime(timeItem)}>Delete</button></td>
    </tr>
  )
}

WorkingTimeRow.propTypes = {
  project: PropTypes.string,
  worker: PropTypes.string,
  date: PropTypes.string,
  hours: PropTypes.number,
  description: PropTypes.string
}

export default WorkingTimeRow;
