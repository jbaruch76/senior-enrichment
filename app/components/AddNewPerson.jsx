import React, { Component } from 'react';
import { connect } from 'react-redux';
import {postStudent} from '../reducers/students';


const AddNewPerson = (props) => {
  const campuses = props.campuses;
  const handleSubmit = props.handleSubmit;
  return (
      <div className="newStudentDiv">
        <h3>Add New Student</h3>
        <form onSubmit={handleSubmit}>
        <div className="newStudentFormDiv">
        <label htmlFor="firstName">First Name: </label>
        <input name="firstName" id="firstName" type="text" /><br />
        <label htmlFor="lastName">Last Name: </label>
        <input name="lastName" id="lastName" type="text" /><br />
        <label htmlFor="email">E-mail: </label>
        <input name="email" id="email" type="text" /><br />
        <label htmlFor="gpa">GPA: </label>
        <input name="gpa" id="gpa" type="text" /><br />
        <label htmlFor="campusesSelect">Campus: </label>
        <select id="campusesSelect" name="campusSelect">
            {campuses.map(campus => {
              return <option key={campus.id} value={campus.id}>{campus.name}</option>
            })}
        </select><br />
        <button type="submit">Add New Student</button>
        </div>
    </form>
      </div>
  );
};

class AddNewPersonLoader extends Component {
  render() {
    return (
      <AddNewPerson {...this.props} />
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    campuses: state.campuses,
    newStudentEntry: state.newStudentEntry
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit (event) {
      event.preventDefault();
      const student = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        gpa: event.target.gpa.value,
        campusId: event.target.campusSelect.value
      };
      dispatch(postStudent(student, ownProps.history))
        .then(location.hash = '/students/')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPersonLoader)
