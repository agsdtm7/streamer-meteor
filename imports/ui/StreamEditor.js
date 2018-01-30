import React from 'react';
import { Session } from 'meteor/session'; // we want to get the Session value
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Streams } from '../api/streams';
// for the iframe


export class StreamEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      link: '',
      description: ''
    };
  }
  handleTitleChange(e){
    const title = e.target.value;
    this.setState({ title });
    this.props.call('streams.update', this.props.stream._id, { title });
  }
  handleLinkChange(e){
    const link = e.target.value;
    this.setState({ link });
    this.props.call('streams.update', this.props.stream._id, { link });
  }
  handleDescriptionChange(e){
    const description = e.target.value;
    this.setState({ description });
    this.props.call('streams.update', this.props.stream._id, { description });
  }

  componentDidUpdate(prevProps, prevState){
    const currentStreamId = this.props.stream ? this.props.stream._id : undefined;
    const prevStreamId = prevProps.stream ? prevProps.stream._id : undefined;

    if(currentStreamId && currentStreamId !== prevStreamId) {
      this.setState({
        title: this.props.stream.title,
        link: this.props.stream.link,
        description: this.props.stream.description
      });
    }
  }

  render(){
    if(this.props.stream){
      return(
        <div>
          <input value={this.state.title} placeholder="Your title here" onChange={this.handleTitleChange.bind(this)}/>
          copy this https://www.youtube.com/embed/ and add 11 letters of your youtube link
          <input value={this.state.link} placeholder="place youtube link here" onChange={this.handleLinkChange.bind(this)}/>
          <textarea value= {this.state.description} placeholder="Stream Description" onChange={this.handleDescriptionChange.bind(this)}></textarea>
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
