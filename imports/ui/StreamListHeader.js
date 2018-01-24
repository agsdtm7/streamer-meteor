import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export const StreamListHeader = (props) => {
  return (
    <div>
      <button onClick= {() => {
          props.meteorCall('streams.insert');
      }}>Create a Stream</button>
    </div>
  );
};

StreamListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
      meteorCall: Meteor.call
  };
}, StreamListHeader);
