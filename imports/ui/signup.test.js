import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from './Signup';

if(Meteor.isClient) {
  describe('Signup', function(){
    it('should show error messages', function(){
      const error = 'This is not working';
      const wrapper = mount(<Signup createUser={() => {}}/>)

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('shoudl call createUser with the form data', function(){
      const email = 'agus@test.com';
      const password = '123456789';
      const spy = expect.createSpy();

      const wrapper = mount(<Signup createUser={spy}/>)
      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password }); // email: email

    });

    it('shoudl set error if short password', function(){
      const email = 'agus@test.com';
      const password = '123456               ';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toNotBe(0);
    });
  });
}
