import React, { Component } from 'react';
import Header from './Header';
import Campuses from './Campuses';
import Students from './Students';
import AddNewPerson from './AddNewPerson';
import AddNewCampus from './AddNewCampus';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';

import store from '../store';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {fetchCampuses} from '/home/josh/senior-enrichment/app/reducers/campuses.js';
import {fetchStudents} from '/home/josh/senior-enrichment/app/reducers/students.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const campusesThunk = fetchCampuses();
    const studentsThunk = fetchStudents();
    store.dispatch(campusesThunk);
    store.dispatch(studentsThunk);
  }
  render () {
    return (
      <div>
        <Header />
        <main>
          <HashRouter>
            <Switch>
              <Route exact path="/campuses" component={Campuses} />
              <Route exact path="/students" component={Students} />
              <Route exact path="/new-campus" component={AddNewCampus} />
              <Route exact path="/new-student" component={AddNewPerson} />
              <Route exact path="/campuses/:campusId" component={SingleCampus} />
              <Route exact path="/students/:studentId" component={SingleStudent} />
              <Route path="/" render={() => (<div>This is the boring default start page. Click "Students" or "Campuses" to get started</div>)} />
            </Switch>
          </HashRouter>
        </main>
      </div>
    )
  }
}
