import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import PrivateDashboard from '../ui/PrivateDashboard';


const onEnterStreamPage = (nextState) => {
    Session.set('selectedStreamId', nextState.params.id); // params is from the next state
};

const onLeaveStreamPage = () => {
    Session.set('selectedStreamId', undefined);
};

const onEnterEditorPage = (nextState) => {
  if(!Meteor.userId()){
    browserHistory.replace('/');
  }else{
    Session.set('selectedStreamId', nextState.params.id); // params is from the next state
  }
};


export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const IsUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';
  console.log('onAuthChange');
  if(IsUnauthenticatedPage && isAuthenticated){
    browserHistory.replace('/dashboard');
  }else if(isAuthenticatedPage && !isAuthenticated) {
    console.log('onAuthChange part 2');
    browserHistory.replace('/');
  }
};

export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};

export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth"/>
      <Route path="/signup" component={Signup} privacy="unauth"/>
      <Route path="/dashboard" component={Dashboard} privacy="auth"/>
      <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter ={onEnterStreamPage}/>

      <Route path="/private_dashboard" component={PrivateDashboard} privacy="auth"/>
      <Route path="/private_dashboard/:id" component={PrivateDashboard} privacy="auth" onEnter ={onEnterEditorPage}/>
      <Route path="/login" component={Login}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
