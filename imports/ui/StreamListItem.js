import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const StreamListItem =  (props) => {
  return(
    <div onClick = {() => {
      props.Session.set('selectedStreamId', props.stream._id);
    }}>
      <h5>{ props.stream.title || 'untitled stream' }</h5>
      { props.stream.selected ? 'selected' : undefined }
      <p> { moment(props.stream.updatedAt).format('M/DD/YY') } </p>
    </div>
  );
};

StreamListItem.propTypes = {
  stream: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session };
}, StreamListItem);
