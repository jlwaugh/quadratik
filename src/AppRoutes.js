import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';

import * as routes from './utils/routes';

import Landing from './views/Landing/Landing';
import Login from './views/Profile/Login';
import {
  MyProfile,
  Profile
} from './DynamicImports';

const AppRoutes = props => (
  <Switch>
    <Route
      exact
      path={routes.LANDING}
      render={() => (
        <Landing
          handleSignInUp={props.handleSignInUp}
          isLoggedIn={props.isLoggedIn}
          errorMessage={props.errorMessage}
          showErrorModal={props.showErrorModal}
        />
      )}
    />

    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)/details"
      render={() => <MyProfile handleSignInUp={props.handleSignInUp} />}
    />
    <Route
      exact
      path={routes.LOGIN}
      render={() => (
        <Login
          handleSignInUp={props.handleSignInUp}
        />
      )}
    />

    <Route
      exact
      path="(^[/][0][xX]\w{40}\b)"
      component={Profile}
    />

    <Route render={() => <Redirect to={routes.LANDING} />} />
  </Switch>
);
AppRoutes.propTypes = {
  verifiedTwitter: PropTypes.string,
};
AppRoutes.defaultProps = {
  verifiedTwitter: '',
};
function mapState(state) {
  return {
    verifiedTwitter: state.myData.verifiedTwitter,
    onOtherProfilePage: state.uiState.onOtherProfilePage,
    currentAddress: state.userState.currentAddress,
  };
}
export default withRouter(connect(mapState)(AppRoutes));