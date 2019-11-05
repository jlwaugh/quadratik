import React from 'react';

const DesktopDropdown = props => (
  <div
    className={`${props.showProfileModal ? 'nav__dropdown--visible' : undefined} nav__dropdown nav__dropdown--desktop`}
    tabIndex={0}
    role="button"
  >
    <ul>
      <div className="nav__divide" />
      <li
        onClick={() => { props.handleSignOut(); props.handleDropdown(); }}
        onKeyPress={() => { props.handleSignOut(); props.handleDropdown(); }}
        tabIndex={0}
        className="nav__dropdown__wrapper"
        role="button"
      >
        <p>
          Sign Out
        </p>
      </li>
      <div className="nav__divide" />
      <li
        className="nav__dropdown__wrapper--extra"
        onClick={(e) => { props.handleSignInUp(true, true, e); props.handleDropdown(); }}
        onKeyPress={(e) => { props.handleSignInUp(true, true, e); props.handleDropdown(); }}
        role="button"
      >
        <p>
          Wallet
        </p>
        <img
          src={props.currentWalletLogo}
          className="nav__dropdown__icon"
          alt="profile"
        />
      </li>
    </ul>
  </div>
);

export default DesktopDropdown;