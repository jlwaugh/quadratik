import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Details = ({
  verifiedTwitter,
  currentAddress,
}) => (
    <div className="profile__details" id="myFeed">
      <div className="profile__details__category">

        <div className="profile__category__header">
          <h5>About</h5>
        </div>

      </div>

      <div className="profile__details__category">
        <div className="profile__category__header">
          <h5>Verified Accounts</h5>
        </div>

        <div className="profile__category__divider" />

        <div className="profile__category__field" title="Github">
          <React.Fragment>
            <a href={`https://www.twitter.com/${verifiedTwitter}`} className="profile__category__field__verified" target="_blank" rel="noopener noreferrer">{verifiedTwitter}</a>
          </React.Fragment>
        </div>
      </div>
    </div>
  );

Details.propTypes = {
  verifiedTwitter: PropTypes.string,
  currentAddress: PropTypes.string,
};

Details.defaultProps = {
  verifiedTwitter: '',
  currentAddress: '',
};

function mapState(state) {
  return {
    verifiedTwitter: state.myData.verifiedTwitter,
    currentAddress: state.userState.currentAddress,
  };
}

export default withRouter(connect(mapState)(Details));