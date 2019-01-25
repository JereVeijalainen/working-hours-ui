import React, { Component } from 'react';
import WorkingTimeRow from './WorkingTimeRow';

class WorkingTimeList extends Component {
	render() {
		const { workingTimes } = this.props;
		return (
			<section>
				<table className="table-list">
					<thead>
						<tr>
							<th>Project</th>
							<th>Worker</th>
							<th>Date</th>
							<th>Hours</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{workingTimes.map((data, i) =>
							<WorkingTimeRow key={i} {...data} />
						)}
					</tbody>
				</table>
			</section>
		);
	}
}

export default WorkingTimeList;
