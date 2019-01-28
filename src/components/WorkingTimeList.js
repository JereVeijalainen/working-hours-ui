import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import WorkingTimeRow from './WorkingTimeRow';

class WorkingTimeList extends Component {
	constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
			dropdownOpen: false,
			filteredWorkingTimes: this.props.workingTimes
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
	}
	
	noWorkerFilter = () => {
		this.setState({
			filteredWorkingTimes: this.props.workingTimes
		}); 
	}
	
	filterByWorker = worker => {
		const filteredRows = this.props.workingTimes.filter(time => time.worker === worker);

		this.setState({
			filteredWorkingTimes: filteredRows
		}); 
	}

	
	sumWorkingHours = () => {
		return this.state.filteredWorkingTimes.map(time => time.hours).reduce((accumulator, currentValue) => accumulator + currentValue);
	}

	render() {
		const { workingTimes } = this.props;
		const filteredWorkingTimes = this.state.filteredWorkingTimes;
		
		return (
			<div>
				<section>
					<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
						<DropdownToggle caret>
							Worker
						</DropdownToggle>
						<DropdownMenu>
						<DropdownItem key={0} onClick={() => this.noWorkerFilter()}>All</DropdownItem>
						{workingTimes.map((data, i) =>
							<DropdownItem key={i + 1} onClick={() => this.filterByWorker(data.worker)}>{data.worker}</DropdownItem>
						)}
						</DropdownMenu>
					</ButtonDropdown>
				</section>
				<section>
					<span>Total {this.sumWorkingHours()} hours</span>
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
							{filteredWorkingTimes.map((data, i) =>
								<WorkingTimeRow key={i} {...data} />
							)}
						</tbody>
					</table>
				</section>
			</div>
		);
	}
}

export default WorkingTimeList;
