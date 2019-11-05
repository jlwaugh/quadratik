import React from 'react';
import { NavLink } from 'react-router-dom';

import * as routes from '../../utils/routes';

const MobileDropdown = props => (
  <React.Fragment>
    <span className="nav__tabs">
      <NavLink
        to={`/${props.currentAddress}/${routes.PROFILE}`}
        className="nav__profile"
        activeClassName="activeNav"
      >
        Profile
      </NavLink>

      <NavLink
        to={`/${props.currentAddress}/${routes.DETAILS}`}
        className="nav__details"
        activeClassName="activeNav"
      >
        Details
      </NavLink>
    </span>
  </React.Fragment>
);

export default MobileDropdown;