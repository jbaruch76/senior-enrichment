import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchCampus} from '../reducers/singleCampus';
import {putCampus} from '../reducers/campuses';
import {fetchStudent} from '../reducers/singleStudent';
import { Link } from 'react-router-dom';


class SingleCampus extends Component {

  componentDidMount() {
    this.props.getStudent(this.props.match.params.campusId);
  }

  render () {
    const handleSubmit = this.props.handleSubmit;
    if (!this.props.campus.length) {
      return (
        <div>
        <div>No Students Enrolled</div>
        <div className="singleCampusEditDiv">
        <form onSubmit={handleSubmit}>
        <div className="fieldsDiv">
          <label>Campus Name: </label>
          <input type="text" name="campusName" />
        </div>
        <div className="fieldsDiv">
          <label>Image URL: </label>
          <input type="text" name="imageUrl" />
        </div>
        <div className="fieldsDiv">
          <label>Description: </label>
          <input type="text" name="description"/>
        </div>
        <div className="fieldsDiv">
          <button type="submit">Update Campus</button>
        </div>
        </form>
      </div>
        </div>
      )
    }
    else {
      const students = this.props.campus;
      const campus = students[0].campus;
      const handleLinkClick = this.props.handleLinkClick;
      console.log(campus)
      return (
        <div>
          <div className="singleCampusDiv">
            <div className="singleCampusHeadingDiv">
              <h2>{campus.name}</h2>
            </div>
            <div id="studentList">
              <ul>
                {students.map(student => {
                  return (
                    <Link to={"/students/" + student.id} onClick={handleLinkClick}>
                    <li key={student.id} id={student.id}>
                      {student.name}
                    </li>
                    </Link>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="singleCampusEditDiv">
            <form onSubmit={handleSubmit}>
            <div className="fieldsDiv">
              <label>Campus Name: </label>
              <input type="text" name="campusName" defaultValue={campus.name}/>
            </div>
            <div className="fieldsDiv">
              <label>Image URL: </label>
              <input type="text" name="imageUrl" defaultValue={campus.imageUrl}/>
            </div>
            <div className="fieldsDiv">
              <label>Description: </label>
              <input type="text" name="description" defaultValue={campus.description}/>
            </div>
            <div className="fieldsDiv">
              <button type="submit">Update Campus</button>
            </div>
            </form>
          </div>
        </div>
      )

    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    campus: state.singleCampus
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    getStudent(campusId) {
      dispatch(fetchCampus(campusId))
        .then(() => {location.hash= `/campuses/${campusId}`})
    },
    handleSubmit (event) {
      event.preventDefault();
      const campusId = ownProps.match.params.campusId;
      const campus = {
        name: event.target.campusName.value,
        imageUrl: event.target.imageUrl.value,
        description: event.target.description.value
      }
      dispatch(putCampus(campus, campusId))
        .then(() => {
          location.hash = '/campuses/'
        });
    },
    handleLinkClick (event) {
      const studentId = event.target.id;
      console.log(studentId);
      dispatch(fetchStudent(studentId, ownProps))
        .then(() => {
          location.hash = `/students/${studentId}`;
        })
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
