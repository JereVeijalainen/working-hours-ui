import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import WorkingTimeRow from './WorkingTimeRow';

const FilterDropdown = ({title, selectedItem, itemList, isOpen, toggle, filterFunction}) => {

	return (
		<ButtonDropdown isOpen={isOpen} toggle={toggle} className="filter-dropdown">
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

class WorkingTimeList extends Component {
	constructor(props) {
    super(props);

    this.toggleWorker = this.toggleWorker.bind(this);
		this.toggleProject = this.toggleProject.bind(this);
		
    this.state = {
			filteredWorkingTimes: this.props.workingTimes,
			workerDropdownOpen: false,
			projectDropdownOpen: false,
			selectedWorker: '',			
			selectedProject: ''
    };
  }

  toggleWorker() {
    this.setState({
      workerDropdownOpen: !this.state.workerDropdownOpen
    });
	}

  toggleProject() {
    this.setState({
      projectDropdownOpen: !this.state.projectDropdownOpen
    });
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
													isOpen={this.state.workerDropdownOpen}
													toggle={this.toggleWorker}
													filterFunction={this.filterByWorker} />

					<FilterDropdown title="Project"
													selectedItem={this.state.selectedProject}
													itemList={projectsInWorkingTimes}
													isOpen={this.state.projectDropdownOpen}
													toggle={this.toggleProject}
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
