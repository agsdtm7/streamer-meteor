import React from 'react';
import { Link } from 'react-router';

export default class NotFound extends React.Component{
  render(){
      return (
      <div className="boxed-view">
        <div className="boxed-view__box">
            <h1>404 - Page Not Found</h1>
            <p>We cannot locate that page</p>
            <Link to="/" className="button button--link">Back to Home</Link>
        </div>
      </div>
    );
  }
}



// export default () => {
//   return
//   (<div>
//     <div className="boxed-view__box">
//         <p>NotFound component here (stateless functional component)</p>
//     </div>
//   </div>);
//
// };


// export default class NotFound extends React.Component{
//   render(){
//     return(
//         <p>NOT FOUND HERE</p>
//     );
//   }
// }
