import React from 'react';

import PrivateHeader from './PrivateHeader';
import StreamList from './StreamList';
import StreamEditor from './StreamEditor';


const Dashboard = () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
    <div className="page-content">
      Dashboard page content
      <StreamList />
    </div>
  </div>
  );
};

export default Dashboard;
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
