/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux';
import campuses from '../reducers/campuses';
import students from '../reducers/students';
import singleCampus from './singleCampus';
import singleStudent from './singleStudent';

const rootReducer = combineReducers({
  campuses,
  students,
  singleCampus,
  singleStudent
});


export default rootReducer;
