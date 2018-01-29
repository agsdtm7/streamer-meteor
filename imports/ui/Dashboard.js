import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import PrivateHeader from './PrivateHeader';
import StreamList from './StreamList';
import StreamEditor from './StreamEditor';
import StreamerFrame from './StreamerFrame';

export const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
    <div className="page-content">
      Dashboard page content
      <StreamList />
      <StreamerFrame />

    </div>
  </div>
  );
};

Dashboard.propTypes = {
  Session: React.PropTypes.object.isRequired
}

export default createContainer(() => {
  return{
    Session
  };
}, Dashboard);
// set max width equal to our config value
// set margin to auto on sides to center
// padding equal to our space value

// export default class Link extends React.Component{
//   render(){
//     return(
//       <div>
//         <PrivateHeader title="Your Links"/>
//         <LinksList/>
//         <AddLink/>
//       </div>
//     );
//   }
// }
