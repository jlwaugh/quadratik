import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Votes from '../../components/Votes';

const ProfileContent = ({ showSignInBanner, onOtherProfilePage, isLoggedIn }) => (
  <div className={` 
  ${onOtherProfilePage ? 'publicStatusUpdate' : ''}
  ${showSignInBanner ? 'publicStatusUpdate--bannerMargin' : ''} 
  ${isLoggedIn ? 'publicStatusUpdate-isLoggedIn' : ''} 
  ${(onOtherProfilePage && showSignInBanner) ? 'publicStatusUpdate--bannerMargin' : ''} 
  profileContent`}
  >
    <Votes />
  </div>
);

ProfileContent.propTypes = {
  showSignInBanner: PropTypes.bool,
  onOtherProfilePage: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

ProfileContent.defaultProps = {
  showSignInBanner: false,
  onOtherProfilePage: false,
  isLoggedIn: false,
};

function mapState(state) {
  return {
    showSignInBanner: state.uiState.showSignInBanner,
    onOtherProfilePage: state.uiState.onOtherProfilePage,

    isLoggedIn: state.userState.isLoggedIn,
  };
}

export default withRouter(connect(mapState)(ProfileContent));