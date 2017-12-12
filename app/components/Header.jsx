import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class Header extends Component {



  render () {
    return (
      <header>
        <div className="headerButtons">
          <button type="button" onClick={() => {
            location.hash='/campuses'
          }}>Campuses</button>
          <button type="button" onClick={() => {
            location.hash='/students'
          }}>Students</button>
        </div>
      </header>
    )
  }
}
