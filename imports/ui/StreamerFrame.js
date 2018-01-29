import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import Iframe from 'react-iframe';

export const StreamerFrame = () => {
  if(Session.get('selectedStreamLink') === undefined){
    return (
      <p>There is no link to be found, try to select another</p>
    );
  }else{
    return (
      <Iframe url= { Session.get('selectedStreamLink') }
      width="450px"
      height="450px"
      id="myId"
      className="myClassname"
      display="initial"
      position="relative"
      allowFullScreen/>
    );
  }
}

StreamerFrame.propTypes = {
  Session: React.PropTypes.object.isRequired
}

export default createContainer(() => {
  const selectedStreamLink = Session.get('selectedStreamLink');
  return {
    Session
  };
}, StreamerFrame);
