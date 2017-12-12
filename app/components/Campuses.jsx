import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus } from '../reducers/campuses';
import { fetchCampus } from '../reducers/singleCampus';
import RaisedButton from 'material-ui/RaisedButton';

function Campuses (props) {
  const campuses = props.campuses;
  const handleButtonClick = props.handleButtonClick;
  const handleLinkClick = props.handleLinkClick;
  const handleViewClick = props.handleViewClick;
  const handleEditClick = props.handleEditClick;
  return (
    <div>
      <div className="addCampusDiv">
        <button label="Add Campus" onClick={() => {
          location.hash = '/new-campus';
        }}>Add Campus</button>
      </div>
      <div className="campuses container">
      { campuses.map(campus => {
        return (
          <div key={campus.id}>
      <Link to={`/campuses/${campus.id}`} key={campus.id} onClick={handleLinkClick}>
          <div className="campus container" id={campus.id} key={campus.id}>
            <img src={campus.imageUrl} id={campus.id}/>
            <h2 className="campusTitle"><span>{campus.name}</span></h2>
          </div>
        </Link>
        <div className="campusButtonsDiv">
          <button key={'remove' + campus.id}
          name={campus.id}
          type="button"
          onClick={handleButtonClick}>Remove Campus</button>
          <button key={'view' + campus.id}
          name={campus.id}
          type="button"
          onClick={handleViewClick}>View Students</button>
        </div>
          </div>
        )
      })}
      </div>
      </div>
  )
}


class CampusesLoader extends Component {
  render() {
    return (
      <Campuses {...this.props} />
    )
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    handleButtonClick (event) {
      event.preventDefault();
      const campusId = event.target.name;
      dispatch(deleteCampus(campusId));
    },

    handleViewClick (event) {
      event.preventDefault();
      const campusId = event.target.name;
      dispatch(fetchCampus(campusId, ownProps))
        .then(() => {
          location.hash = `/campuses/${campusId}`;
        })
    },
    handleLinkClick (event) {
      event.preventDefault();
      const campusId = event.target.id;
      dispatch(fetchCampus(campusId, ownProps))
        .then(() => {
          location.hash = `/campuses/${campusId}`;
        });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusesLoader)
