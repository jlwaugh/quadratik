import React from 'react';
import {
  NavLink, Route, Switch, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as routes from '../../utils/routes';
import Profile from './Profile';
import Details from './Details';

const Content = ({ currentAddress }) => (
  <div>
    <div className="profile__category--mobile">
      <div className="profile__category__sectionWrapper">
        <NavLink
          exact
          to={`/${currentAddress}/${routes.PROFILE}`}
          className="profile__category__section"
        >
          Profile
        </NavLink>

        <NavLink
          exact
          to={`/${currentAddress}/${routes.DETAILS}`}
          className="profile__category__section "
        >
          Details
        </NavLink>

        {/* <NavLink
          exact
          to={`/${currentAddress}/${routes.FOLLOWING}`}
          className="profile__category__section "
        >
          <img src={ContactsIcon} alt="Following" className="profile__category__tabIcon--collectibles--mobile" />
          Following
        </NavLink> */}
      </div>
    </div>

    <Switch>
      <Route
        exact
        path={routes.FORMAT_PROFILE}
        component={Profile}
      />

      <Route
        exact
        path={routes.FORMAT_PROFILE_ABOUT}
        component={Details}
      />

    </Switch>


  </div>
);

Content.propTypes = {
  currentAddress: PropTypes.string,
};

Content.defaultProps = {
  currentAddress: '',
};

const mapState = state => ({
  currentAddress: state.userState.currentAddress,
});

export default withRouter(connect(mapState)(Content));