import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { browserHistory } from 'react-router';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  // returning truthy or falsy value, when userId is null or empty string it will return false, otherwise true
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedStreamId = Session.get('selectedStreamId');

  if(selectedStreamId){
    browserHistory.replace(`/dashboard/${selectedStreamId}`);
  }
});

Meteor.startup(() => {
  Session.set('selectedStreamId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});
