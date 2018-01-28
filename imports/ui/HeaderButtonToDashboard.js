import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';

export const HeaderButtonToDashboard =  (props) => {
    return(
      <button className="button button--link-text"
        onClick= {() => {
          props.Session.set('selectedPrivateDashboard', props.Accounts.userId());
      }}>Main Dashboard</button>
    );
  };

HeaderButtonToDashboard.propTypes = {
  Session: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  return { Session,
  Accounts: Accounts };
}, HeaderButtonToDashboard);
