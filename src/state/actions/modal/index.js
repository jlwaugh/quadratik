import {
  store,
} from '../../store';

export const handleContactsModal = () => async (dispatch) => {
    dispatch({
      type: 'UI_HANDLE_CONTACTS_MODAL',
      showContactsModal: !store.getState().uiState.showContactsModal,
    });
  };
  
export const handleSignInModal = () => async (dispatch) => {
    dispatch({
      type: 'UI_HANDLE_SIGNIN_MODAL',
      errorMessage: store.getState().uiState.errorMessage,
      signInModal: !store.getState().uiState.signInModal,
    });
  };
  
export const handleConsentModal = () => async (dispatch) => {
    dispatch({
      type: 'UI_HANDLE_CONSENT_MODAL',
      provideConsent: false,
    });
  };
  
export const handleUnsupportedBrowserModal = () => async (dispatch) => {
    dispatch({
      type: 'UI_UNSUPPORTED_BROWSER_MODAL',
      showUnsupportedBrowser: false,
    });
  };
  
export const handleLoggedOutModal = () => async (dispatch) => {
    dispatch({
      type: 'UI_HANDLE_LOGGEDOUT_MODAL',
      loggedOutModal: !store.getState().uiState.loggedOutModal,
    });
  };
  
export const handleSwitchedAddressModal = () => async (dispatch) => {
    dispatch({
      type: 'UI_HANDLE_SWITCHED_ADDRESS_MODAL',
      switchedAddressModal: !store.getState().uiState.switchedAddressModal,
    });
  };
  
export const handleSwitchedNetworkModal = () => async (dispatch) => {
    dispatch({
      type: 'UI_HANDLE_SWITCHED_NETWORK_MODAL',
      showDifferentNetworkModal: false,
    });
  };
  
export const handleGithubVerificationModal = () => async (dispatch) => {
    dispatch({
      type: 'UI_HANDLE_GITHUB_MODAL',
      showGithubVerificationModal: !store.getState().uiState.showGithubVerificationModal,
    });
  };
  
export const handleTwitterVerificationModal = () => async (dispatch) => {
    dispatch({
      type: 'UI_HANDLE_TWITTER_MODAL',
      showTwitterVerificationModal: !store.getState().uiState.showTwitterVerificationModal,
    });
  };
  
export const handleEmailVerificationModal = () => async (dispatch) => {
    dispatch({
      type: 'UI_HANDLE_EMAIL_MODAL',
      showEmailVerificationModal: !store.getState().uiState.showEmailVerificationModal,
    });
  };
  
export const handleOnboardingModal = mobile => async (dispatch) => {
    if (mobile) {
      dispatch({
        type: 'UI_HANDLE_ONBOARDING_MODAL2',
        onBoardingModal: false,
      });
    } else {
      dispatch({
        type: 'UI_HANDLE_ONBOARDING_MODAL2',
        onBoardingModalTwo: !store.getState().uiState.onBoardingModalTwo,
        onBoardingModal: false,
      });
    }
  };
  
export const handleAccessModal = () => async (dispatch) => {
    dispatch({
      type: 'UI_HANDLE_ACCESS_MODAL',
      allowAccessModal: !store.getState().uiState.allowAccessModal,
    });
  };
  
export const handleDeniedAccessModal = () => async (dispatch) => {
    dispatch({
      type: 'UI_HANDLE_DENIED_ACCESS_MODAL',
      accessDeniedModal: !store.getState().uiState.accessDeniedModal,
    });
  };
  
export const handleSignInBanner = () => async (dispatch) => {
    dispatch({
      type: 'UI_HANDLE_SIGNIN_BANNER',
      showSignInBanner: !store.getState().uiState.showSignInBanner,
    });
  };