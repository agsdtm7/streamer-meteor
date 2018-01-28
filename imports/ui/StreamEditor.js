import React from 'react';
import { Session } from 'meteor/session'; // we want to get the Session value
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Streams } from '../api/streams';
// for the iframe
import  Iframe  from 'react-iframe';

export class StreamEditor extends React.Component {
  handleTitleChange(e){
    this.props.call('streams.update', this.props.stream._id, {
        title: e.target.value
    });
  }
  handleLinkChange(e){
    this.props.call('streams.update', this.props.stream._id, {
        link: e.target.value
    });
  }
  handleDescriptionChange(e){
    this.props.call('streams.update', this.props.stream._id, {
        description: e.target.value
    });
  }

  render(){
    if(this.props.stream){
      return(
        <div>
          <input value={this.props.stream.title} placeholder="Your title here" onChange={this.handleTitleChange.bind(this)}/>
          <input value={this.props.stream.link} placeholder="place youtube link here" onChange={this.handleLinkChange.bind(this)}/>
          <textarea value= {this.props.stream.description} placeholder="Stream Description" onChange={this.handleDescriptionChange.bind(this)}></textarea>
          <button>Delete Stream</button>
        </div>
      );
    }else{
      return(
        <p>{ this.props.selectedStreamId ? 'Note not found' : 'Create your stream to get started' }</p>
      );
    }
  }
};

StreamEditor.propTypes = {
  stream: React.PropTypes.object,
  selectedStreamId: React.PropTypes.string
}

export default createContainer(() => {
    const selectedStreamId = Session.get('selectedStreamId');

    return {
        selectedStreamId,
        stream: Streams.findOne(selectedStreamId),
        call: Meteor.call
    };
}, StreamEditor);
