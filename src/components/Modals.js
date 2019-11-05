import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as routes from '../utils/routes';
import ErrorIcon from '../assets/ErrorIcon.svg'
import Loading from '../assets/Loading.svg';
import LoadingWhite from '../assets/LoadingWhite.svg'
import TwitterIcon from '../assets/twitterGrey.svg';
import Wallet from '../assets/Wallet.svg';

export const ModalBackground = () => <div className="modal__overlay" />;

export const SwitchedNetworksModal = ({
  prevNetwork,
  currentNetwork,
  handleSwitchedNetworkModal,
}) => (
    <div className="modal__container">
      <div className="modal">

        <div>
          <h3>
            Network Change Detected
            </h3>
          <p>
            Your profile will stay the same, but your Ethereum activity will update
            </p>
          <p id="modal__switchBack">
            <b>
              {`Switch back to ${prevNetwork} in your Web3 Wallet or continue on ${currentNetwork}`}
            </b>
          </p>
        </div>

        <button onClick={() => { handleSwitchedNetworkModal(); window.localStorage.setItem('shouldShowSwitchNetwork', true); }} type="button">
          {`Continue on ${currentNetwork}`}
        </button>

      </div>
    </div>
  );

SwitchedNetworksModal.propTypes = {
  prevNetwork: PropTypes.string,
  currentNetwork: PropTypes.string.isRequired,
  handleSwitchedNetworkModal: PropTypes.func.isRequired,
};

SwitchedNetworksModal.defaultProps = {
  prevNetwork: '',
};

export const LoggedOutModal = ({
  handleLoggedOutModal,
  handleSignOut,
}) => (
    <div className="modal__container">
      <div className="modal">
        <div>
          <h3>
            Logged out
          </h3>

          <p>Sign back in to your Web3 wallet or exit 3Box</p>
        </div>

        <Link to={routes.LANDING}>
          <button onClick={() => { handleLoggedOutModal(); handleSignOut(); }} type="button">Exit</button>
        </Link>
      </div>
    </div>
  );

LoggedOutModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleLoggedOutModal: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};

export const SwitchedAddressModal = ({
  handleSwitchedAddressModal, handleSignOut, prevAddress,
}) => (
    <div className="modal__container">
      <div className="modal standardModal">

        <div>
          <h3>
            Address change detected
          </h3>
          <p>
            {`Revert to the previous address ${prevAddress} in your Web3 wallet or sign back in with the new address`}
          </p>
        </div>

        <button
          onClick={() => {
            const signInAgain = true;
            handleSwitchedAddressModal();
            handleSignOut(signInAgain);
          }}
          type="button"
        >
          Sign in with new address
        </button>
      </div>
    </div>
  );

SwitchedAddressModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleSwitchedAddressModal: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  prevAddress: PropTypes.string,
};

SwitchedAddressModal.defaultProps = {
  prevAddress: '',
};

// Landing Page Modals
export const ProvideConsentModal = ({
  handleConsentModal,
}) => (
    <div className="modal__container">
      <div className="modal standardModal">
        <img src={Wallet} className="modal_wallet" alt="Partners background" />
        <div id="modal__copy__card">
          <h3>Log in to 3Box</h3>
          <p>Approve the message in your <br /> Web3 wallet to continue</p>
        </div>

        <button onClick={handleConsentModal} type="button" className="tertiaryButton">Close</button>
      </div>
    </div>
  );

ProvideConsentModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleConsentModal: PropTypes.func.isRequired,
};

export const UnsupportedBrowserModal = ({
  handleUnsupportedBrowserModal,
}) => (
    <div className="modal__container">
      <div className="modal standardModal">
        <div id="modal__copy__card">
          <h3>You must use Safari version 11.1 or higher</h3>
        </div>

        <button onClick={handleUnsupportedBrowserModal} type="button" className="tertiaryButton">Close</button>
      </div>
    </div>
  );

UnsupportedBrowserModal.propTypes = {
  handleUnsupportedBrowserModal: PropTypes.func.isRequired,
};

export const ProvideAccessModal = ({
  handleAccessModal, directLogin,
}) => (
    <div className="modal__container">
      <div className="modal standardModal">
        <img src={Wallet} className="modal_wallet" alt="Partners background" />
        <div id="modal__copy__card">
          <h3>Share Your Account</h3>
          <p>To allow 3Box to read your Ethereum address, make sure you are logged in to your Web3 wallet.</p>
        </div>

        {!directLogin
          && <button onClick={handleAccessModal} type="button" className="tertiaryButton">Close</button>}
      </div>
    </div>
  );

ProvideAccessModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleAccessModal: PropTypes.func.isRequired,
  directLogin: PropTypes.string,
};

ProvideAccessModal.defaultProps = {
  directLogin: '',
};

export const TwitterVerificationModal = ({
  handleTwitterVerificationModal,
  did,
  message,
  verifyTwitter,
  isTwitterVerified,
  twitterVerifiedFailed,
  verificationLoading,
  resetVerification,
}) => (
    <div>
      <div className="modal__container">
        <div className="modal githubModal">

          <div className="modal__github__description">
            <div className="modal__github__description__copy">
              <div className="modal__github__description__copy__header">
                <img src={TwitterIcon} className="modal__github__description__githubIcon" alt="Github icon" />
                <h2>Verify your Twitter account</h2>
              </div>
              <p className="modal__github__description__copy__text">
                Linking your Twitter account to your 3Box profile
                allows your friends and apps to trust you more.
              </p>
            </div>
            <button
              className="modal__github__description__copy__button"
              type="button"
              onClick={() => {
                handleTwitterVerificationModal();
                resetVerification('Twitter');
              }}
            >
              Cancel
            </button>
          </div>

          <div className="modal__github__steps">
            <div className="modal__twitter__steps__step">
              <div>
                <div className="modal__twitter__steps__instructions">
                  <div className="modal__github__steps__number">1</div>
                  <p className="modal__github__steps__text">
                    Tweet a unique key from the account you want to connect
                  </p>
                </div>
                <p className="modal__github__description__copy__input blueFont" id="muportDID">{did}</p>
              </div>
              <button type="button">
                <a
                  href={`https://twitter.com/intent/tweet?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal__github__description__copy__tweet"
                >
                  Tweet this
                </a>
              </button>
            </div>

            <div className="modal__twitter__steps__step">
              <div>
                <div className="modal____steps__instructions">
                  <div className="modal__github__steps__number">2</div>
                  <p className="modal__github__steps__text">
                    Check if your Twitter account was successfully verified below!
                  </p>
                </div>
                <p className="modal__github__description__copy__input--github blueFont">
                  {isTwitterVerified
                    ? 'Your Twitter is verified!'
                    : twitterVerifiedFailed
                      ? 'Verification failed'
                      : verificationLoading
                        ? (
                          <img src={Loading} alt="Loading" id="modal__loadingGraphic--noMargin" />
                        )
                        : 'Twitter not yet verified'}
                </p>
              </div>
              <button
                type="button"
                onClick={verifyTwitter}
              >
                Verify
              </button>
            </div>
          </div>

          <div className="modal__github__done">
            <button
              type="button"
              disabled={!isTwitterVerified}
              onClick={() => {
                handleTwitterVerificationModal();
              }}
            >
              Done
            </button>
            <button
              className="modal__github__description__copy__button--mobile"
              type="button"
              onClick={() => {
                handleTwitterVerificationModal();
                resetVerification('Twitter');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

TwitterVerificationModal.propTypes = {
  did: PropTypes.string,
  handleTwitterVerificationModal: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  verifyTwitter: PropTypes.func.isRequired,
  resetVerification: PropTypes.func.isRequired,
  isTwitterVerified: PropTypes.bool.isRequired,
  twitterVerifiedFailed: PropTypes.bool.isRequired,
  verificationLoading: PropTypes.bool.isRequired,
};

TwitterVerificationModal.defaultProps = {
  did: '',
};

export const AccessDeniedModal = ({
  handleDeniedAccessModal, isMobile,
}) => (
    <div>
      <div className="modal__container">
        <div className="modal standardModal">
          <img src={Wallet} className="modal_wallet" alt="Partners background" />

          <div id="modal__copy__card">
            <h3>Access Denied to 3Box</h3>
            {isMobile
              ? <p>3Box cannot proceed without access to the address associated to your account</p>
              : <p>3Box cannot proceed without access to the address associated to your account</p>
            }
          </div>

          <button onClick={handleDeniedAccessModal} type="button" className="tertiaryButton">Close</button>
        </div>
      </div>
    </div>
  );

AccessDeniedModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleDeniedAccessModal: PropTypes.func.isRequired,
};

export const LoadingProfileModal = () => (
  <div className="modal__container">
    <div className="modal standardModal">
      <img src={Loading} alt="Loading" id="modal__loadingGraphic" />
    </div>
  </div>
);

export const FileSizeModal = ({ closeFileSizeModal }) => (
  <div className="modal__container">
    <div className="modal">

      <div>
        <p>Profile pictures must be less than 2.5 MB</p>
      </div>

      <button onClick={closeFileSizeModal} type="button" className="tertiaryButton">Close</button>
    </div>
  </div>
);

FileSizeModal.propTypes = {
  closeFileSizeModal: PropTypes.func.isRequired,
};


export const SyncingModal = () => (
  <div className="modal__container--sync">
    <div className="modal--sync ">
      <div className="modal--sync__wrapper">
        <img src={LoadingWhite} alt="Loading" id="modal__loadingGraphic" />

        <div>
          <p>SYNCING DATA</p>
        </div>
      </div>
    </div>
  </div>
);

export const ProfileLoading = () => (
  <div className="modal__container--sync">
    <div className="modal--sync ">
      <div className="modal--sync__wrapper">
        <img src={LoadingWhite} alt="Loading" id="modal__loadingGraphic" />

        <div>
          <p>LOADING PROFILE</p>
        </div>
      </div>
    </div>
  </div>
);

export const SignInThroughProfileBanner = ({ show, handleHideSignInBanner }) => (
  <React.Fragment>
    <div className={`${show ? '' : 'hideBanner'} signInFromProfileBanner`}>
      <div className="signInFromProfileBanner__wrapper">
        <p>
          This is your profile.
        </p>
        <p
          onClick={handleHideSignInBanner}
          onKeyPress={handleHideSignInBanner}
          role="button"
          className="webThreeBanner__close"
        >
          &#10005;
        </p>
      </div>
    </div>
  </React.Fragment>
);

export const UnsupportedBrowserBanner = ({ show, handleShowSafariBanner }) => (
  <React.Fragment>
    <div className={`${show ? '' : 'hideBanner'} signInFromProfileBanner`}>
      <div className="signInFromProfileBanner__wrapper">
        <p>
          You must user Safari version 11.1 or higher.
        </p>
        <p
          onClick={handleShowSafariBanner}
          onKeyPress={handleShowSafariBanner}
          role="button"
          className="webThreeBanner__close"
        >
          &#10005;
        </p>
      </div>
    </div>
  </React.Fragment>
);

SignInThroughProfileBanner.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHideSignInBanner: PropTypes.func.isRequired,
};

export const ErrorModal = ({ closeErrorModal, error }) => {
  let isMetaMaskSignError;
  let isMetaMaskFromError;
  let isMozillaError;
  let errorString;

  const errorMsg = error.message;
  if (errorMsg) {
    isMetaMaskSignError = errorMsg.substring(0, 65) === 'Web3 Wallet Signature Error: User denied message signature.';
    isMetaMaskFromError = errorMsg.substring(0, 58) === 'Web3 Wallet Signature Error: from field is required.';
    isMozillaError = errorMsg.substring(0, 26) === 'value/</<@moz-extension://';
    errorString = errorMsg.substring(0, 200);
  }

  errorString = errorString || 'There was an error logging in.';

  return (
    <div className="modal__container">
      <div className="modal standardModal">
        {(isMetaMaskSignError || isMozillaError)
          ? <img src={Wallet} alt="Wallet signature required" />
          : <img src={ErrorIcon} alt="Error" id="modal__switchedNetworks" />}

        <div id={(isMetaMaskSignError || isMetaMaskFromError || isMozillaError) ? 'modal__copy__card' : ''}>
          {isMetaMaskSignError
            || (isMozillaError)
            ? <h3>Log in to 3Box</h3>
            : <h3>Error</h3>}

          {(isMetaMaskSignError || isMozillaError)
            ? <p>You must provide consent to 3Box in your Web3 wallet to sign in or create a profile, please try again</p>
            : (
              <React.Fragment>
                <p>{errorString}</p>
                <br />
                <p>
                  Please refresh the page and try again
                  </p>
              </React.Fragment>
            )}
        </div>
      </div>
    </div>
  );
};

ErrorModal.propTypes = {
  error: PropTypes.string,
  closeErrorModal: PropTypes.func.isRequired,
};

ErrorModal.defaultProps = {
  error: '',
};

export const MustConsentModal = ({ closeErrorModal }) => (
  <div>
    <div className="modal__container">
      <div className="modal standardModal">
        <img src={Wallet} className="modal_wallet" alt="Partners background" />
        <div id="modal__copy__card">
          <h3>Sign in to 3Box</h3>
          <p>You must provide consent to 3Box in your Web3 wallet to sign in or create a profile, please try again</p>
        </div>
        <button onClick={closeErrorModal} type="button" className="tertiaryButton">Close</button>
      </div>
    </div>
  </div>
);

MustConsentModal.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  closeErrorModal: PropTypes.func.isRequired,
};

export const SignInToThreeBox = ({ handleSignInModal }) => (
  <div>
    <div className="modal__container">
      <div className="modal">

        <div id="modal__copy__card">
          <h3>
            Sign in
          </h3>
          <p>You must be signed in to 3Box to go to that page</p>
        </div>

        <button onClick={handleSignInModal} type="button" className="tertiaryButton">Close</button>
      </div>
    </div>
  </div>
);

SignInToThreeBox.propTypes = {
  handleSignInModal: PropTypes.func.isRequired,
};
