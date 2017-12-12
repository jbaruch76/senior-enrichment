import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


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
    return (
      <form onSubmit={(event) => {
        console.log(event.target)
      }} >
      <div>
        <TextField ref="firstName"
          defaultValue={student.firstName}
          floatingLabelText="First Name"
        /><br />
      <TextField
        defaultValue={student.lastName}
        floatingLabelText="Last Name"
      /><br />
      <TextField
      defaultValue={student.email}
      floatingLabelText="E-Mail Address"
    /><br />
    <TextField
      defaultValue={student.gpa}
      floatingLabelText="GPA"
    /><br />
    <SelectField
          floatingLabelText="Campus"
          value={student.campusId}
        >
        {campuses.map(campus => {
          return (
            <MenuItem value={campus.id} primaryText={campus.name} />
          )
        })}
        </SelectField>
        <button type="submit">Update Student</button>

      </div>
      </form>
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    student: state.singleStudent,
    campuses: state.campuses
  }
}

export default connect(mapStateToProps)(SingleStudent);
