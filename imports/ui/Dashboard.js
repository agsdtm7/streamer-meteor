import React from 'react';

// import { Links } from '../api/links';
import PrivateHeader from './PrivateHeader';

import StreamList from './StreamList';

export default () => {
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
