import axios from 'axios';

// ACTION TYPES

const GET_CAMPUSES = 'GET_CAMPUSES';
const NEW_CAMPUS = 'NEW_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

// ACTION CREATORS

export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses};
  return action;
}

export function newCampus (campusToAdd) {
  const action = { type: NEW_CAMPUS, campusToAdd};
  return action;
}

export function updateCampus (updatedCampus) {
  const action = { type: UPDATE_CAMPUS, updatedCampus };
  return action;
}

// THUNK CREATORS

export function fetchCampuses () {
  return function thunk (dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  };
}

export function postCampus (campus, history) {
  return function thunk (dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(campus => {
        const action = newCampus(campus);
        dispatch(action);
      });
  };
}

export function deleteCampus (campusId) {
  return function thunk (dispatch) {
    return axios.delete('/api/campuses/' + campusId)
      .then(() => {
        dispatch(fetchCampuses());
      });
  };
}

export function putCampus (updatedCampus, campusId) {
  return function thunk (dispatch) {
    console.log(updatedCampus, campusId)
    return axios.put('/api/campuses/' + campusId, updatedCampus)
      .then(() => {
        console.log('should hit fetchcampuses')
        dispatch(fetchCampuses());
      });
  };
}

export default function reducer (state = [], action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    case NEW_CAMPUS:
      return [...state, action.campusToAdd];
    case UPDATE_CAMPUS:
      return state.map(campus => {
        if (campus.id === action.campus.id) {
          return action.campus;
        }
        else return campus
      });
    default:
      return state;
  }
}
