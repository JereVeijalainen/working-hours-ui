import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import WorkingTimeRow from './WorkingTimeRow';

/* TODO:
	- Rivin poisto listalta
	- Filttereiden toimiminen yhtäaikasesti
	- Onko kaikki state-tasot järkevästi?
*/

class FilterDropdown extends Component {

	constructor(props) {
    super(props);

    this.toggle= this.toggle.bind(this);		
    this.state = {
			dropdownOpen: false,
    };
	}
	
	toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
	}

	render () {
		const {title, selectedItem, itemList, filterFunction} = this.props;

		return (
			<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="filter-dropdown">
				<DropdownToggle caret>
					{selectedItem ? selectedItem : title}
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem key={0} onClick={() => filterFunction('All')}>All</DropdownItem>
				{itemList.map((item, i) =>
					<DropdownItem key={i + 1} onClick={() => filterFunction(item)}>{item}</DropdownItem>
				)}
				</DropdownMenu>
			</ButtonDropdown>
		);
	}
}

class WorkingTimeList extends Component {
	constructor(props) {
		super(props);
		
    this.state = {
			filteredWorkingTimes: this.props.workingTimes,
			selectedWorker: '',			
			selectedProject: ''
    };
  }

	filterByWorker = worker => {
		const filteredRows = worker && worker !== "All"  ? this.props.workingTimes.filter(time => time.worker === worker) : this.props.workingTimes;

		this.setState({
			filteredWorkingTimes: filteredRows,
			selectedWorker: worker,
			selectedProject: ''
		}); 
	}

	filterByProject = project => {
		const filteredRows = project && project !== "All" ? this.props.workingTimes.filter(time => time.project === project) : this.props.workingTimes;

		this.setState({
			filteredWorkingTimes: filteredRows,
			selectedProject: project,
			selectedWorker: ''
		}); 
	}
	
	sumWorkingHours = () => {
		return this.state.filteredWorkingTimes.map(time => time.hours).reduce((accumulator, currentValue) => accumulator + currentValue);
	}

	render() {
		const { workingTimes, projects, workers } = this.props;
		const filteredWorkingTimes = this.state.filteredWorkingTimes;
		const projectsInWorkingTimes = projects.filter(project => workingTimes.map(time => time.project).indexOf(project) > -1);
		const workersInWorkingTimes = workers.filter(worker => workingTimes.map(time => time.worker).indexOf(worker) > -1);
		
		return (
			<div>
				<section>					
					<FilterDropdown title="Worker"
													selectedItem={this.state.selectedWorker}
													itemList={workersInWorkingTimes}
													filterFunction={this.filterByWorker} />

					<FilterDropdown title="Project"
													selectedItem={this.state.selectedProject}
													itemList={projectsInWorkingTimes}
													filterFunction={this.filterByProject} />
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
