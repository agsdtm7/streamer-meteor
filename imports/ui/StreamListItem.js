import React from 'react';
import moment from 'moment';

const StreamListItem =  (props) => {
  return(
    <div>
      <h5>{ props.stream.title || 'untitled stream' }</h5>
      <p> { moment(props.stream.updatedAt).format('M/DD/YY') } </p>
    </div>
  );
};

StreamListItem.propTypes = {
  stream: React.PropTypes.object.isRequired
};

export default StreamListItem;
