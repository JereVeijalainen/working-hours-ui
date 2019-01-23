import React, { Component } from 'react';

const projects = [
	'Rio Working Hours',
	'Test Project'
];

const workers = [
	{ firstName: 'Jere', lastName: 'Veijalainen' },
	{ firstName: 'Mikko', lastName: 'Mallikas' },
	{ firstName: 'Maija', lastName: 'Meikäläinen' }
];

class Autocomplete extends Component {

	constructor(props) {
		super(props);
		this.inputField = React.createRef();
	}

	get value() {
		return this.inputField.current.value;
	}

	set value (inputValue) {
		this.inputField.current.value = inputValue;
	}

	render() {
		const listId = this.props.id;

		return (
			<div>
					<input ref={this.inputField} 
								 type="text" 
								 list={listId} />
					<datalist id={listId}>
						{this.props.options.map(
							(opt, i) => 
							<option key={i}>{opt}</option>)}
					</datalist>
			</div>
		)
	}
}

const AddWorkTimeForm = ({project, worker, date, hours, description}) => {

	const workerNames = workers.map(worker => worker.firstName + ' ' + worker.lastName);
	
	let _worker, _project;

	const submit = e => {
		e.preventDefault();
		console.log (_project.value);
		console.log (_worker.value);
		_project.value = '';
		_worker.value = '';
	}
		
	return (
		<form onSubmit={submit} className="add-work-time-form">
			<label htmlFor="project">Project</label>
			<Autocomplete key={1}
										id="project-list"
										options={projects}
										ref={input => _project = input}/>
			<label htmlFor="worker">Worker</label>
			<Autocomplete key={2}
										id="worker-list"
										options={workerNames}
										ref={input => _worker = input}/>
			<button>Add work time</button>
		</form>
	);
}

export default AddWorkTimeForm;
