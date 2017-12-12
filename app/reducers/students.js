import axios from 'axios';

// ACTION TYPES

const GET_STUDENTS = 'GET_STUDENTS';
const NEW_STUDENT = 'NEW_STUDENT';
const UPDATE_STUDENT = 'UDPATE_STUDENT'

// ACTION CREATORS

export function getStudents (students) {
  const action = { type: GET_STUDENTS, students};
  return action;
}

export function newStudent (studentToAdd) {
  const action = { type: NEW_STUDENT, studentToAdd};
  return action;
}

export function updateStudent(updatedStudent) {
  const action = { type: UPDATE_STUDENT, updatedStudent };
  return action;
}


// THUNK CREATORS

export function fetchStudents () {
  return function thunk (dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  };
}

export function postStudent (student, history) {
  return function thunk (dispatch) {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(student => {
        const action = newStudent(student);
        dispatch(action);
      });
  };
}

export function deleteStudent (studentId) {
  return function thunk (dispatch) {
    return axios.delete('/api/students/' + studentId)
      .then(() => {
        dispatch(fetchStudents());
      });
  };
}

export function putStudent (updatedStudent, studentId) {
  return function thunk (dispatch) {
    return axios.put('/api/students/' + studentId, updatedStudent)
      .then(() => {
        dispatch(fetchStudents());
      });
  };
}

export default function reducer (state = [], action) {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    case NEW_STUDENT:
      return [...state, action.studentToAdd];
    case UPDATE_STUDENT:
      return state.map(student => {
        if (student.id === action.student.id) {
          return action.student;
        }
        else return student;
      });
    default:
      return state;
  }
}
