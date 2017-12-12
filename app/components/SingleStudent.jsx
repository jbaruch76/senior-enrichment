import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { putStudent } from '../reducers/students'


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';




class SingleStudent extends Component {


  render () {
    const student = this.props.student;
    const campuses = this.props.campuses;
    const handleSubmit = this.props.handleSubmit;
    return (
      <div className="formDiv">

      <form onSubmit={handleSubmit}>
        <div className="fieldsDiv">
          <label>First Name: </label>
          <input type="text" name="firstName" defaultValue={student.firstName}/>
        </div>
        <div className="fieldsDiv">
          <label>Last Name:</label>
          <input type="text" name="lastName" defaultValue={student.lastName}/>
        </div>
        <div className="fieldsDiv">
          <label>E-Mail Address:</label>
          <input type="text" name="email" defaultValue={student.email}/>
        </div>
        <div className="fieldsDiv">
          <label>GPA:</label>
          <input type="text" name="gpa" defaultValue={student.gpa}/>
        </div>
        <div className="fieldsDiv">
          <label>Campus: </label>
          <select name="campusSelect"defaultValue={student.campusId}>
            {campuses.map(campus => {
              return (
                <option key={campus.id} value={campus.id}>{campus.name}</option>
              )
            })}
          </select>
          <button type="button" onClick={() => {
            location.hash = `/campuses/${student.campusId}`;
          }}>View Student's Campus</button>
        </div>
        <div className="fieldsDiv">
          <button type="submit">Update Student</button>
        </div>
      </form>
      </div>

    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    student: state.singleStudent,
    campuses: state.campuses
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit (event) {
      event.preventDefault();
      const studentId = ownProps.match.params.studentId;
      const student = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        gpa: event.target.gpa.value,
        campusId: event.target.campusSelect.value
      };
      dispatch(putStudent(student, studentId))
        .then(() => {
          location.hash = '/students/';
        });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
