import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import PrivateHeader from './PrivateHeader';
import StreamList from './StreamList';
import StreamEditor from './StreamEditor';
/*
export const PrivateDashboard = () => {
  return (
    <div>
      <PrivateHeader title="Private Dashboard" />
    <div className="page-content">
      Dashboard page content
      <StreamList />
      <StreamEditor />
    </div>
  </div>
  );
}

export default createContainer(() => {

}, PrivateDashboard);
*/

const PrivateDashboard = () => {
  return (
    <div>
      <PrivateHeader title="Private" />
    <div className="page-content">
      Private Dashboard page content
      <StreamList />
      <StreamEditor />
    </div>
  </div>
  );
};

export default PrivateDashboard;
