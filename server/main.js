import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp'; // this is middleware

import '../imports/api/users';
import '../imports/api/streams';

import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {

});
