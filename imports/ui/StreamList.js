import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Streams } from '../api/streams';
import StreamListHeader from './StreamListHeader';
import StreamListItem from './StreamListItem';
import StreamListEmptyItem from './StreamListEmptyItem';



export const StreamList = (props) => {
  return (
    <div>
      <StreamListHeader />
      { props.streams.length === 0 ?  props.Session.set('streamCount', undefined) : props.Session.set('streamCount', props.streams.length) }
      { props.streams.length === 0 ?  <StreamListEmptyItem /> : undefined }
      {props.streams.map((stream) => {
        return <StreamListItem key={stream._id} stream={stream}/>
      })}

    </div>
  );
};

StreamList.propTypes = {
  streams: React.PropTypes.array.isRequired,
  Session: React.PropTypes.object.isRequired
}

export default createContainer(() => {
  const selectedStreamLink = Session.get('selectedStreamLink');
  const selectedStreamId = Session.get('selectedStreamId');
  const streamCount = Session.get('streamCount');
  Meteor.subscribe('streams');
  return {
    Session,
    streams: Streams.find().fetch().map((stream) => {
      return {
        ...stream,
        selected: stream._id === selectedStreamId,
        streaming: stream.link === selectedStreamLink
      };
    })
  };
}, StreamList);
