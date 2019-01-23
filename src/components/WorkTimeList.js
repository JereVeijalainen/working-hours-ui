import React, { Component } from 'react';
import WorkTimeRow from './WorkTimeRow';

class WorkTimeList extends Component {
	render() {
		const { workTimes } = this.props;
		return (
			<section>
				<table>
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
						{workTimes.map((data, i) =>
							<WorkTimeRow key={i} {...data} />
						)}
					</tbody>
				</table>
			</section>
		);
	}
}

export default WorkTimeList;
