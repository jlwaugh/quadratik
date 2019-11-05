import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import * as routes from './utils/routes';
import { pollNetworkAndAddress, initialAddress, startPollFlag } from './utils/address';
import {
  normalizeURL,
  matchProtectedRoutes,
  checkIsEthAddress,
  checkRequestRoute,
} from './utils/funcs';
import { store } from './state/store';
import history from './utils/history';
import AppRoutes from './AppRoutes';

import {
  AppModals,
  NavLanding,
  Nav,
} from './DynamicImports';
import actions from './state/actions';
import './index.css';

const {
  handleSignInModal,
  closeErrorModal,
  handleSwitchedNetworkModal,
  handleAccessModal,
  handleConsentModal,
  handleDeniedAccessModal,
  handleLoggedOutModal,
  handleSwitchedAddressModal,
  handleOnboardingModal,
  handleUnsupportedBrowserModal,
} = actions.modal;

const {
  getMyDID,
  getVerifiedPublicTwitter,
} = actions.profile;

const {
  openBox,
  handleSignOut,
  injectWeb3,
  clearReduxState,
} = actions.auth;

const {
  checkMobileWeb3,
  checkNetwork,
} = actions.land;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onBoardingModalMobileOne: false,
      onBoardingModalMobileTwo: false,
      onBoardingModalMobileThree: false,
    };
  }

  async componentDidMount() {
    try {
      const { location: { pathname, search } } = this.props;
      const normalizedPath = normalizeURL(pathname);
      const splitRoute = normalizedPath.split('/');
      const firstParam = splitRoute[1] && splitRoute[1].toLowerCase();
      const isProtectedRoute = matchProtectedRoutes(splitRoute[2]);
      const queryParams = queryString.parse(search);
      const isRequest = checkRequestRoute(splitRoute);
      if (isRequest) return;

      const currentEthAddress = await initialAddress(); // Initial get address
      const isEthAddr = checkIsEthAddress(firstParam);
      const isMyAddr = firstParam === currentEthAddress;
      const onProfilePage = isEthAddr;
      const isWalletConnectDefault = window.localStorage.getItem('defaultWallet') === 'WalletConnect';

      const allowDirectSignIn = (
        (isEthAddr // Lands on profile page
          && isProtectedRoute // Lands on protected page
          && isMyAddr)
        || !!queryParams.wallet
      );

      if (isWalletConnectDefault && allowDirectSignIn) {
        history.push('/login');
        return;
      }

      if (allowDirectSignIn) { // Begin signin
        this.directSignIn(queryParams.wallet);
      } else if (onProfilePage) { // Lands on profile page
        const userEth = window.localStorage.getItem('userEthAddress');
        // if (userEth) this.props.getPublicFollowing(userEth);
        if (isProtectedRoute) history.push(`/${firstParam}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  componentWillReceiveProps(nextProps) {
    const onSyncDoneToTrigger = nextProps.onSyncFinished && nextProps.isSyncing;
    const { location: { search } } = nextProps;
    const queryParams = queryString.parse(search);
    const { location } = this.props;
    const isNewPath = nextProps.location.pathname !== location.pathname;

    if (queryParams.wallet && isNewPath) this.directSignIn(queryParams.wallet, nextProps);

    if (onSyncDoneToTrigger) { // get profile data again only when onSyncDone
      store.dispatch({ // end onSyncDone animation
        type: 'UI_APP_SYNC',
        onSyncFinished: true,
        isSyncing: false,
      });
      this.getMyData();
    }
  }

  getMyData = async () => {
    const { currentAddress } = this.props;
    store.dispatch({
      type: 'UI_SPACES_LOADING',
      isSpacesLoading: true,
    });
    startPollFlag();
    pollNetworkAndAddress(); // Start polling for address change

    try {
      this.props.getVerifiedPublicTwitter(); // eslint-disable-line
      this.props.getMyDID(); // eslint-disable-line
    } catch (err) {
      console.error(err);
    }
  }

  handleNextMobileModal = (thisModal, nextModal) => {
    this.setState({
      [`onBoardingModalMobile${thisModal}`]: false,
      [`onBoardingModalMobile${nextModal}`]: true,
    });
  }

  directSignIn = async (wallet, nextProps) => {
    try {
      store.dispatch({
        type: 'UI_3BOX_LOADING',
        isFetchingThreeBox: true,
      });

      const { location: { pathname } } = this.props;
      const pathToUse = nextProps ? nextProps.location.pathname : pathname;
      const normalizedPath = normalizeURL(pathToUse);
      const currentUrlEthAddr = normalizedPath.split('/')[1];
      const profilePage = normalizedPath.split('/')[2];
      const doesEthAddrMatch = currentUrlEthAddr === this.props.currentAddress;
      await this.props.checkMobileWeb3(); // eslint-disable-line
      await this.props.injectWeb3('directLogin', false, wallet); // eslint-disable-line
      await this.props.checkNetwork(); // eslint-disable-line

      if (!doesEthAddrMatch) history.push(`/${this.props.currentAddress}/${profilePage || routes.PROFILE}`);

      await this.props.openBox(); // eslint-disable-line
      if (!this.props.showErrorModal) this.getMyData(); // eslint-disable-line
    } catch (err) {
      console.error(err); // eslint-disable-line
      store.dispatch({
        type: 'UI_3BOX_LOADING',
        isFetchingThreeBox: false,
      });
    }
  }

  handleSignInUp = async (chooseWallet, shouldSignOut, e) => {
    try {
      if (e) e.stopPropagation();
      await this.props.checkMobileWeb3(); // eslint-disable-line
      await this.props.injectWeb3(null, chooseWallet, false, shouldSignOut); // eslint-disable-line
      await this.props.checkNetwork(); // eslint-disable-line
      await this.props.openBox(x); // eslint-disable-line
      if (!this.props.showErrorModal) this.getMyData(); // eslint-disable-line
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      showDifferentNetworkModal,
      accessDeniedModal,
      errorMessage,
      allowAccessModal,
      provideConsent,
      signInModal,
      directLogin,
      loggedOutModal,
      switchedAddressModal,
      prevNetwork,
      currentNetwork,
      onBoardingModal,
      isFetchingThreeBox,
      prevAddress,
      showErrorModal,
      isLoggedIn,
      location: { pathname },
      onSyncFinished,
      isSyncing,
      hasSignedOut,
      onOtherProfilePage,
      fixBody,
      showUnsupportedBrowser,
    } = this.props;

    const normalizedPath = normalizeURL(pathname);
    const mustConsentError = errorMessage && errorMessage.message && errorMessage.message.substring(0, 65) === 'Error: Web3 Wallet Message Signature: User denied message signature.';
    const landing = pathname === routes.LANDING ? 'landing' : '';
    const isMyProfilePath = matchProtectedRoutes(normalizedPath.split('/')[2]);

    const splitRoute = normalizedPath.split('/');
    const isRequestRoute = checkRequestRoute(splitRoute);
    const isNotLoginPage = splitRoute[1] !== 'login';

    return (
      <div className={`App ${(fixBody && isNotLoginPage) ? 'fixBody' : ''}`}>

        {(!isMyProfilePath && !isLoggedIn) // show landing nav when user is not logged in, 3box is not fetching, and when route is not a protected route
          && (
            <NavLanding
              handleSignInUp={this.handleSignInUp}
              onOtherProfilePage={onOtherProfilePage}
              landing={landing}
              pathname={normalizedPath}
            />
          )}

        {(!isMyProfilePath && isLoggedIn) && <Nav />}

        <AppModals
          isFetchingThreeBox={isFetchingThreeBox}
          onSyncFinished={onSyncFinished}
          isSyncing={isSyncing}
          hasSignedOut={hasSignedOut}
          allowAccessModal={allowAccessModal}
          directLogin={directLogin}
          isMyProfilePath={isMyProfilePath}
          accessDeniedModal={accessDeniedModal}
          signInModal={signInModal}
          errorMessage={errorMessage}
          mustConsentError={mustConsentError}
          showErrorModal={showErrorModal}
          prevNetwork={prevNetwork}
          currentNetwork={currentNetwork}
          showDifferentNetworkModal={showDifferentNetworkModal}
          loggedOutModal={loggedOutModal}
          switchedAddressModal={switchedAddressModal}
          prevAddress={prevAddress}
          onBoardingModal={onBoardingModal}
          provideConsent={provideConsent}
          showUnsupportedBrowser={showUnsupportedBrowser}
          handleContactsModal={this.props.handleContactsModal}
          handleSignInModal={this.props.handleSignInModal}
          handleConsentModal={this.props.handleConsentModal}
          handleDeniedAccessModal={this.props.handleDeniedAccessModal}
          closeErrorModal={this.props.closeErrorModal}
          handleSwitchedNetworkModal={this.props.handleSwitchedNetworkModal}
          handleLoggedOutModal={this.props.handleLoggedOutModal}
          handleSignOut={this.props.handleSignOut}
          handleSwitchedAddressModal={this.props.handleSwitchedAddressModal}
          handleOnboardingModal={this.props.handleOnboardingModal}
          handleAccessModal={this.props.handleAccessModal}
          handleNextMobileModal={this.handleNextMobileModal}
          handleUnsupportedBrowserModal={this.props.handleUnsupportedBrowserModal}
        />

        <AppRoutes
          handleSignInUp={this.handleSignInUp}
          isLoggedIn={isLoggedIn}
          errorMessage={errorMessage}
          showErrorModal={showErrorModal}
        />
      </div>
    );
  }
}

App.propTypes = {
  openBox: PropTypes.func.isRequired,
  injectWeb3: PropTypes.func.isRequired,
  getMyProfileValue: PropTypes.func.isRequired,
  checkMobileWeb3: PropTypes.func.isRequired,
  // getMyFollowing: PropTypes.func.isRequired,
  // getPublicFollowing: PropTypes.func.isRequired,
  getMyDID: PropTypes.func.isRequired,
  getCollectibles: PropTypes.func.isRequired,
  getMyMemberSince: PropTypes.func.isRequired,
  getVerifiedPublicGithub: PropTypes.func.isRequired,
  getVerifiedPublicTwitter: PropTypes.func.isRequired,
  getVerifiedPrivateEmail: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleSwitchedNetworkModal: PropTypes.func.isRequired,
  handleAccessModal: PropTypes.func.isRequired,
  handleConsentModal: PropTypes.func.isRequired,
  handleDeniedAccessModal: PropTypes.func.isRequired,
  handleSignInModal: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func,
  checkNetwork: PropTypes.func.isRequired,
  closeErrorModal: PropTypes.func.isRequired,
  handleLoggedOutModal: PropTypes.func.isRequired,
  handleSwitchedAddressModal: PropTypes.func.isRequired,
  handleOnboardingModal: PropTypes.func.isRequired,
  saveFollowing: PropTypes.func.isRequired,

  showDifferentNetworkModal: PropTypes.bool,
  showFollowingPublicModal: PropTypes.bool,
  showUnsupportedBrowser: PropTypes.bool,
  onSyncFinished: PropTypes.bool,
  hasSignedOut: PropTypes.bool,
  isSyncing: PropTypes.bool,
  accessDeniedModal: PropTypes.bool,
  errorMessage: PropTypes.string,
  allowAccessModal: PropTypes.bool,
  provideConsent: PropTypes.bool,
  signInModal: PropTypes.bool,
  fixBody: PropTypes.bool,
  showErrorModal: PropTypes.bool,
  directLogin: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  loggedOutModal: PropTypes.bool,
  switchedAddressModal: PropTypes.bool,
  onBoardingModal: PropTypes.bool,
  onBoardingModalTwo: PropTypes.bool,
  isFetchingThreeBox: PropTypes.bool,
  showContactsModal: PropTypes.bool,
  onOtherProfilePage: PropTypes.bool,
  prevNetwork: PropTypes.string,
  currentNetwork: PropTypes.string,
  currentAddress: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  prevAddress: PropTypes.string,
  otherAddressToFollow: PropTypes.string,
  otherName: PropTypes.string,
  otherProfileAddress: PropTypes.string,
  following: PropTypes.array,
  otherFollowing: PropTypes.array,
};

App.defaultProps = {
  showDifferentNetworkModal: false,
  fixBody: false,
  handleSignOut,
  accessDeniedModal: false,
  showUnsupportedBrowser: false,
  onSyncFinished: false,
  hasSignedOut: false,
  isSyncing: false,
  errorMessage: '',
  allowAccessModal: false,
  provideConsent: false,
  signInModal: false,
  showErrorModal: false,
  loggedOutModal: false,
  switchedAddressModal: false,
  onBoardingModal: false,
  isFetchingThreeBox: false,
  isLoggedIn: false,
  prevNetwork: '',
  currentNetwork: '',
  prevAddress: '',
  directLogin: '',
  currentAddress: '',
};

const mapState = state => ({
  showDifferentNetworkModal: state.uiState.showDifferentNetworkModal,
  allowAccessModal: state.uiState.allowAccessModal,
  provideConsent: state.uiState.provideConsent,
  signInModal: state.uiState.signInModal,
  directLogin: state.uiState.directLogin,
  loggedOutModal: state.uiState.loggedOutModal,
  switchedAddressModal: state.uiState.switchedAddressModal,
  onBoardingModal: state.uiState.onBoardingModal,
  isFetchingThreeBox: state.uiState.isFetchingThreeBox,
  errorMessage: state.uiState.errorMessage,
  prevAddress: state.uiState.prevAddress,
  showErrorModal: state.uiState.showErrorModal,
  accessDeniedModal: state.uiState.accessDeniedModal,
  showUnsupportedBrowser: state.uiState.showUnsupportedBrowser,
  fixBody: state.uiState.fixBody,

  onSyncFinished: state.uiState.onSyncFinished,
  isSyncing: state.uiState.isSyncing,

  hasSignedOut: state.userState.hasSignedOut,
  prevNetwork: state.userState.prevNetwork,
  currentNetwork: state.userState.currentNetwork,
  isLoggedIn: state.userState.isLoggedIn,
  currentAddress: state.userState.currentAddress,
  isMobile: state.userState.isMobile,

});

export default withRouter(connect(mapState,
  {
    openBox,
    injectWeb3,
    checkMobileWeb3,
    checkNetwork,
    getMyDID,
    getVerifiedPublicTwitter,
    handleSignInModal,
    handleSwitchedNetworkModal,
    handleAccessModal,
    handleConsentModal,
    handleDeniedAccessModal,
    handleLoggedOutModal,
    handleSignOut,
    handleSwitchedAddressModal,
    handleOnboardingModal,
    closeErrorModal,
    clearReduxState,
    handleUnsupportedBrowserModal,
  })(App));