import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Streams = new Mongo.Collection('streams');

if(Meteor.isServer){
  Meteor.publish('streams', function(){
    return Streams.find({ userId: this.userId });
  });
}

Meteor.methods({
  'streams.insert'() {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Streams.insert({
      title: '',
      link: '', // take the last 11 characters of string from the YOUTUBE link using string.splice(-11)
      description: '',
      underTopic: '',
      userId: this.userId,
      updatedAt: moment().valueOf() // new Date().getTime()
    });
  },
  'streams.remove'(_id){
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Streams.remove({ _id, userId: this.userId });
  },
  'streams.update'(_id, updates){
    if(!this.userId){
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      link: {
        type: String,
        min: 10,
        optional: true
      },
      description: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });

    Streams.update({
      _id,
      userId: this.userId
      // making sure that the person updating is the creator
    },{
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});
