import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Streams } from '../api/streams';
import StreamListHeader from './StreamListHeader';
import StreamListItem from './StreamListItem';
import StreamListEmptyItem from './StreamListEmptyItem';



export const StreamList = (props) => {
  return (
    <div>
      <StreamListHeader />
      { props.streams.length === 0 ?  <StreamListEmptyItem /> : undefined }
      {props.streams.map((stream) => {
        return <StreamListItem key={stream._id} stream={stream}/>
      })}

    </div>
  );
};

StreamList.propTypes = {
  streams: React.PropTypes.array.isRequired
}

export default createContainer(() => {
  Meteor.subscribe('streams');
  return {
    streams: Streams.find().fetch()
  };
}, StreamList);
