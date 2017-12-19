import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  // returning truthy or falsy value, when userId is null or empty string it will return false, otherwise true
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

// sample usage how to use Session
// Tracker.autorun(()=> {
//   //Session.set('name', 'value')
//   const name = Session.get('name');
//   console.log(name);
// })
//
// Session.set('name', 'Agus');

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
