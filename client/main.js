import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { browserHistory } from 'react-router';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');

  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedStreamId = Session.get('selectedStreamId');

  if(selectedStreamId){
    const selectedPrivateDashboard = Session.get('selectedPrivateDashboard');
    if(!selectedPrivateDashboard){
      browserHistory.replace(`/private_dashboard/${selectedStreamId}`);
    }else{
      browserHistory.replace(`/dashboard/${selectedStreamId}`);
    }
  }
});

Tracker.autorun(() => {
  const selectedPrivateDashboard = Session.get('selectedPrivateDashboard');
  const selectedStreamId = Session.get('selectedStreamId');

  if(selectedPrivateDashboard){
    if(selectedStreamId){
      console.log('a');
      browserHistory.replace(`/private_dashboard/${selectedStreamId}`);
    }else{
      console.log('b');
      browserHistory.replace(`/private_dashboard`);
    }
  }else{
    if(selectedStreamId){
      console.log('c');
      browserHistory.replace(`/dashboard/${selectedStreamId}`);
    }else{
      console.log('d');
      browserHistory.replace(`/dashboard`);
    }
  }
});

// Tracker.autorun(() => {
//   const selectedStreamVideoId = Session.get('selectedStreamVideoId');
//
//   //if(selectedStreamVideoId){
//   //  browserHistory.replace(`/dashboard/${selectedStreamVideoId}`);
//   //}
// });

Meteor.startup(() => {
  Session.set('selectedStreamId', undefined);
  Session.set('selectedPrivateDashboard', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});
