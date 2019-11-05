import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import * as routes from '../../utils/routes';

const SideBarContent = ({
  name,
  coverPhoto,
  description,
  emoji,
  location,
  showSignInBanner,
  currentAddress,
  isLoggedIn,
  isMe,
}) => (
    <div>
      {(
        coverPhoto && coverPhoto.length > 0 && coverPhoto[0].contentUrl
          ? <img src={`https://ipfs.infura.io/ipfs/${coverPhoto[0].contentUrl['/']}`} className="profile__coverPhoto clearProfPic" alt="profile" />
          : <div className="profile__coverPhoto" />
      )}

      <div id="profile" className={ 'onMyProfile' }>
        <div id="profile__fixed">

          <div className={`
            ${showSignInBanner ? 'showSignInBanner' : ''}  
            profile__user__info
          `}
          >

            <div className="profile__category">
              <div className="profile__category__sectionWrapper">
                  <React.Fragment>
                    <NavLink exact to={`/${currentAddress}/${routes.PROFILE}`} className="profile__category__section">
                      Profile
                    </NavLink>
                    <NavLink exact to={`/${currentAddress}/${routes.DETAILS}`} className="profile__category__section ">
                      Details
                    </NavLink>
                  </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

SideBarContent.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  emoji: PropTypes.string,
  currentAddress: PropTypes.string,
  image: PropTypes.array,
  coverPhoto: PropTypes.array,
  location: PropTypes.object.isRequired,
  showSignInBanner: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  isMe: PropTypes.bool.isRequired,
};

SideBarContent.defaultProps = {
  name: '',
  otherName: '',
  description: '',
  currentAddress: '',
  image: [],
  coverPhoto: [],
  emoji: '',
  showSignInBanner: false,
  isLoggedIn: false,
};

function mapState(state) {
  return {
    name: state.myData.name,
    image: state.myData.image,
    coverPhoto: state.myData.coverPhoto,
    emoji: state.myData.emoji,
    description: state.myData.description,

    currentAddress: state.userState.currentAddress,
    showSignInBanner: state.uiState.showSignInBanner,

    isLoggedIn: state.userState.isLoggedIn,
  };
}

export default withRouter(connect(mapState)(SideBarContent));