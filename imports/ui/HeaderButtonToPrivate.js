import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';

export const HeaderButtonToPrivate =  (props) => {
    return(
      <button className="button button--link-text"
        onClick= {() => {
          props.Session.set('selectedPrivateDashboard', Accounts.userId());
          // props.Session.set('selectedStreamId', undefined);
          //console.log('helllooooo');
      }}>Go to Editor</button>

    );
  };

HeaderButtonToPrivate.propTypes = {
  Session: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  return { Session,
  Accounts: Accounts };
}, HeaderButtonToPrivate);
