import React from 'react';
import PropTypes from 'prop-types';

const WorkingTimeRow = ({project, worker, date, hours, description}) => {
	return (
		<tr>
			<td>{project}</td>
			<td>{worker}</td>
			<td>{date}</td>
			<td>{hours}</td>
			<td>{description}</td>
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
