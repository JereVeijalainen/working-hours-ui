import React, { Component } from 'react';

const getCurrentDate = () => {

  const addLeadingZero = (number) => {
    return number > 9 ? parseInt(number).toString() : '0' + number;
  }

  var today = new Date();
  return today.getFullYear() + "-" + addLeadingZero(today.getMonth()+1) + "-" + addLeadingZero(today.getDate());
}

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
    const { id, options, required } = this.props;

    return (
      <div>
          <input ref={this.inputField} 
                  type="text"
                  list={id}
                  required={required} />
          <datalist id={id}>
            {options.map(
              (opt, i) => 
              <option key={i}>{opt}</option>)}
          </datalist>
      </div>
    );
  }
}

const AddWorkingTimeForm = ({date, onNewWorkingTime, projects, workers}) => {
	
  let _worker, _project, _date, _hours, _description;

  const submit = e => {
    e.preventDefault();

    onNewWorkingTime({
      project: _project.value,
      worker: _worker.value,
      date: _date.value,
      hours: parseFloat(_hours.value),
      description: _description.value
    });

    _project.value = '';
    _worker.value = '';
    _date.value = '';
    _hours.value = '';
    _description.value = '';
  }
    
  return (
    <section>
      <h3>Add new working time</h3>
      <form className="add-form" onSubmit={submit}>
        <label htmlFor="project-list">Project</label>
        <Autocomplete id="project-list"
                      options={projects}
                      required
                      ref={input => _project = input}/>
        <label htmlFor="worker-list">Worker</label>
        <Autocomplete id="worker-list"
                      options={workers}
                      required
                      ref={input => _worker = input}/>
        
        <label htmlFor="date">Date</label>
        <div>
          <input id="date"
                type="date"
                required
                defaultValue={date}
                ref={input => _date = input}></input>
        </div>
        <label htmlFor="hours">Hours</label>
        <div>
          <input id="hours"
                type="number"
                step="any"
                required
                ref={input => _hours = input}></input>
        </div>
        <label htmlFor="description">Description</label>
        <div>
          <textarea id="description"
                type="textarea"
                rows="3"
                required
                ref={input => _description = input} />
        </div>
        
        <button>Add work time</button>
      </form>
    </section>
  );
}

AddWorkingTimeForm.defaultProps = {
  date: getCurrentDate()
}

export default AddWorkingTimeForm;
