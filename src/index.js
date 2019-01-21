import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import PropTypes from 'prop-types'


const worksTimes = [
	{
		project: 'Rio Working Hours',
		person: 'Jere Veijalainen',
		date: '2019-01-01',
		hours: 75,
		description: 'Planning and stuff...'
	},
	{
		project: 'Rio Working Hours',
		person: 'Mikko Mallikas',
		date: '2019-01-02',
		hours: 8,
		description: 'Designing the UI'
	}
];

const WorkTimeRow = ({project, person, date, hours, description}) => {
	return (
		<tr>
			<td>{project}</td>
			<td>{person}</td>
			<td>{date}</td>
			<td>{hours}</td>
			<td>{description}</td>
		</tr>
	)
}

WorkTimeRow.propTypes = {
	project: PropTypes.string,
	person: PropTypes.string,
	date: PropTypes.string,
	hours: PropTypes.number,
	description: PropTypes.string
}


class WorkTimeList extends Component {
	render() {
		const { workTimes } = this.props;
		return (
			<section>
				<table>
					<thead>
						<tr>
							<th>Project</th>
							<th>Person</th>
							<th>Date</th>
							<th>Hours</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{workTimes.map((data, i) =>
							<WorkTimeRow key={i} {...data} />
						)}
					</tbody>
				</table>
			</section>
		);
	}
}



ReactDOM.render(<WorkTimeList workTimes={worksTimes} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
