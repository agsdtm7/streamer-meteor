import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

// import  PrivateHeader from './PrivateHeader'; before using createContainer, we use this one
import { PrivateHeader } from './PrivateHeader';

// Enzyme documentation: http://airbnb.io/enzyme/docs/api/
// Expect documentation: https://github.com/mjackson/expect
if(Meteor.isClient){
  describe('PrivateHeader', function(){
    it('should set button text to logout', function(){
      //
      const wrapper = mount( <PrivateHeader title="test title" handleLogout={()=>{}}/> );
      const buttonText = wrapper.find('.button').text();
      expect(buttonText).toBe('Logout');
    });

    it('should use title props as h1 text', function(){
      const title = 'Test title here';
      // use mount to render PrivateHeader with title
      // use find to find the h1 and get its text value store in variable

      const wrapper = mount(<PrivateHeader title= {title} handleLogout={()=>{}} />);
      const titleText = wrapper.find('h1').text();
      expect(titleText).toBe('Test title here');
    });

    it('should call the function', function(){
      const spy = expect.createSpy();
      spy(3,4,123);
      spy('Agus');
      expect(spy).toHaveBeenCalledWith(3,4,123);
    });

    it('should call handleLogout on click', function(){
        const spy = expect.createSpy();
        const wrapper = mount(< PrivateHeader title="title" handleLogout={spy}/>);

        wrapper.find('button').simulate('click');

        expect(spy).toHaveBeenCalled();
    });






  });
}
