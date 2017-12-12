import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteStudent} from '../reducers/students';
import {fetchStudent} from '../reducers/singleStudent';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

function Students (props) {
  const students = props.students;
  const handleButtonClick = props.handleButtonClick;
  const handleLinkClick = props.handleLinkClick;
  return (
    <div>
      <Table >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>First Name</TableHeaderColumn>
            <TableHeaderColumn>Last Name</TableHeaderColumn>
            <TableHeaderColumn>E-Mail</TableHeaderColumn>
            <TableHeaderColumn>GPA</TableHeaderColumn>
            <TableHeaderColumn>Campus</TableHeaderColumn>
            <TableHeaderColumn>Remove</TableHeaderColumn>
            <TableHeaderColumn>Edit</TableHeaderColumn>
          </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {students.map(student => {
              return (
                <TableRow key={student.id}>
                  <TableRowColumn>{student.id}</TableRowColumn>
                  <TableRowColumn>{student.firstName}</TableRowColumn>
                  <TableRowColumn>{student.lastName}</TableRowColumn>
                  <TableRowColumn>{student.email}</TableRowColumn>
                  <TableRowColumn>{student.gpa}</TableRowColumn>
                  <TableRowColumn ><button type="button" onClick={() => location.hash = `/campuses/${student.campusId}`}>{student.campus && student.campus.name}</button>
                  </TableRowColumn>
                  <TableRowColumn>
                    <button name={student.id} onClick={handleButtonClick}>Remove</button>
                  </TableRowColumn>
                  <TableRowColumn>
                    <button name={student.id} onClick={handleLinkClick}>Edit</button>
                  </TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>

      </Table>
      <div>
        <FloatingActionButton onClick={() => location.hash='/new-student'}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    </div>
  )
}


class StudentsLoader extends Component {
  render() {
    return (
      <Students {...this.props} />
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    students: state.students
  }
}
const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleButtonClick (event) {
      event.preventDefault();
      const studentId = event.target.name;
      dispatch(deleteStudent(studentId));
      },

    handleLinkClick (event) {
      const studentId = event.target.name;
      dispatch(fetchStudent(studentId, ownProps))
        .then(() => {
          location.hash = `/students/${studentId}`;
        })
    }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(StudentsLoader)
