import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  //console.log('this is the user', user);
  // Note that the validation doesn't use try catch after we configure the simple schema error
  //try{
  new SimpleSchema({
    email:{
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email });
  //}catch(e){
  // using try - catch, if there is an error, meteor system will throw an error coming out from the simple schema
  //  throw new Meteor.Error(400, e.message)
  //}
  return true;
});
