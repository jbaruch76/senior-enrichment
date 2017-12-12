import React, { Component } from 'react';
import { connect } from 'react-redux';
import {postCampus} from '../reducers/campuses';

const AddNewCampus = (props) => {
  const handleSubmit = props.handleSubmit;
  return (
    <div className="newCampusDiv">
      <h3>Add New Campus</h3>
      <form onSubmit={handleSubmit}>
        <div className="newCampusFormDiv">
          <label htmlFor="campusName">Campus Name:</label>
          <input name="campusName" id="campusName" type="text" /><br />
          <label htmlFor="imageUrl">Campus Image URL:</label>
          <input name="imageUrl" id="imageUrl" type="text" /><br />
          <label htmlFor="campusDescription">Description:</label>
          <input name="campusDescription" id="campusDescription" type="text" /><br />
          <button id="newCampusButton" type="submit">Add New Campus</button>
        </div>
      </form>
    </div>
  )
}

class AddNewCampusLoader extends Component {
  render () {
    return (
      <AddNewCampus {...this.props} />
    )
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleSubmit (event) {
      event.preventDefault();
      const campus = {
        name: event.target.campusName.value,
        imageUrl: event.target.imageUrl.value,
        description: event.target.campusDescription.value
      }
      dispatch(postCampus(campus, ownProps.history))
        .then(() => location.hash = '/campuses/');
    }
  }
}

export default connect(null, mapDispatchToProps)(AddNewCampusLoader);
