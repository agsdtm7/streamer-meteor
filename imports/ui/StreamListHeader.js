import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const StreamListHeader = (props) => {
  const selectedPrivateDashboard = Session.get('selectedPrivateDashboard');
  if(selectedPrivateDashboard){
  return (
    <div>
      <button onClick= {() => {
          props.meteorCall('streams.insert');
      }}>Create a Stream</button>
    </div>
    );
  }else{
    return(
      <div>
        <p>Select a stream to view</p>
      </div>
    );
  }
};

StreamListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
      meteorCall: Meteor.call,
      Session
  };
}, StreamListHeader);
