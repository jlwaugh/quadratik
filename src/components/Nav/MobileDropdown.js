import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../utils/routes';

const MobileDropdown = props => (
  <div
    className={`
      ${props.showProfileModal ? 'sideDrawer' : undefined} 
      nav__dropdown 
      mobileDropDown
    `}
    onClick={props.handleDropdown}
    onKeyPress={props.handleDropdown}
    role="button"
    tabIndex={0}
  >
    <div className="sideDrawer_wrapper">

      <ul>

        <Link to={`/${props.currentAddress}/${routes.PROFILE}`}>
          <li className={props.normalizedPath === `/${props.currentAddress}/${routes.PROFILE}` ? 'nav__activePage' : ''}>
            <p>
              Profile
            </p>
          </li>
        </Link>

        <Link to={`/${props.currentAddress}/${routes.DETAILS}`}>
          <li className={props.normalizedPath === `/${props.currentAddress}/${routes.DETAILS}` ? 'nav__activePage' : ''}>
            <p>
              Details
            </p>
          </li>
        </Link>

        <li
          className="nav__dropdown__wrapper"
          onClick={(e) => { props.handleSignInUp(true, true, e); props.handleDropdown(); }}
          onKeyPress={(e) => { props.handleSignInUp(true, true, e); props.handleDropdown(); }}
          role="button"
        >
          <p>
            Wallet
      </p>
          <img
            src={props.currentWalletLogo}
            className="nav__dropdown__icon nav_dropdown_walletIcon"
            alt="profile"
          />
        </li>

        <li
          id="mobileNav__signout"
          onClick={() => props.handleSignOut()}
          tabIndex={0}
          onKeyPress={() => props.handleSignOut()}
          role="button"
        >
          <p>
            Sign Out
          </p>
        </li>
      </ul>
    </div>
  </div>
);

export default MobileDropdown;