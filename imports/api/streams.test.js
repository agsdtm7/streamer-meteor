import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Streams } from './streams';

if(Meteor.isServer){
  describe('streams', function(){
    const chOne = {
      _id: 'testIdOne',
      title: 'My title',
      link: 'My link',
      description: 'Description for the link',
      underTopic: 'My topic One',
      userId: 'testUserOne',
      updatedAt: '0'
    };
    const chTwo = {
      _id: 'testIdTwo',
      title: 'My title two',
      link: 'My second link',
      description: 'Description for the link',
      underTopic: 'My topic Two',
      userId: 'testUserTwo',
      updatedAt: '0'
    };
    beforeEach(function(){
      Streams.remove({});
      Streams.insert( chOne );
    });

    it('should remove note', function(){
      Meteor.server.method_handlers['streams.remove'].apply({userId: chOne.userId}, [ chOne._id ]);
      expect(Streams.findOne({ _id: chOne._id })).toNotExist();
    });

    it('should insert new stream', function(){
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['streams.insert'].apply({ userId });

      expect(Streams.findOne({ _id, userId })).toExist();
    });

    it('should not insert stream if not authenticated', function(){
      expect(() => {
        Meteor.server.method_handlers['streams.insert']();
      }).toThrow();
    });

    it('should update the stream channel', function(){
      const title = 'This is an updated title';
      const link = 'This is an updated link';
      Meteor.server.method_handlers['streams.update'].apply({
        userId: chOne.userId
      }, [ // followed by 2 arguments
        chOne._id,
        { title },
      ]);

      const stream = Streams.findOne(chOne._id);

      expect(stream.updatedAt).toBeGreaterThan(0);
      expect(stream).toInclude({
        title,
        description: chOne.description
      });
    });

    it('should not update because there are extra updates', function(){
      expect(() => {
        Meteor.server.method_handlers['streams.update'].apply({
          userId: chOne.userId
        }, [ // followed by 2 arguments
          chOne._id,
          { title: 'new title', name: 'Whatever' },
        ]);
      }).toThrow();
    });

    it('should not update if if user was not creator', function(){
      expect(() => {
        Meteor.server.method_handlers['streams.update'].apply({
          userId: 'testid'
        }, [ // followed by 2 arguments
          chOne._id,
          { title },
        ]);
        const stream = Streams.findOne(chOne._id);

        expect(stream).toInclude(chOne);
    });
  });

  it('should return a stream list', function(){
    const res = Meteor.server.publish_handlers.streams.apply({ userId : chOne.userId });
    const streams = res.fetch();

    expect(streams.length).toBe(1);
    expect(streams[0]).toEqual(chOne);
  });

  });
}
