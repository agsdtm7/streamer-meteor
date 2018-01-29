// CHECK ON NOTES/fromUI/LinkBeforeLecture79.
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import HeaderButtonToPrivate from './HeaderButtonToPrivate';
import HeaderButtonToDashboard from './HeaderButtonToDashboard';

export const PrivateHeader = (props) => {

  return(
      <div className="header">
        <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        {/* if session selectedPrivateDashboard equal undefined then show HeaderButtonToPrivate, else the other way */}
        {Session.get('selectedPrivateDashboard') === undefined ? <HeaderButtonToPrivate /> : <HeaderButtonToDashboard /> }
          <button className="button button--link-text" onClick= {() => props.handleLogout()}>Logout</button>
        </div>
      </div>
  );
};


PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer (() => {
  return {
  Session,
  handleLogout: () => Accounts.logout(),
  Accounts: Accounts
  };
}, PrivateHeader);
