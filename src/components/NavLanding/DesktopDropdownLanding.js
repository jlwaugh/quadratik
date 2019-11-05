import React from 'react';

import { shortenEthAddr } from '../../utils/funcs';

const DesktopDropdownLanding = props => (
  <React.Fragment>
    <div
      className={`
      ${props.showDropdown ? 'nav__dropdown--visible' : undefined} 
        nav__dropdown nav__dropdown--desktop nav__dropdown--desktop-landing
      `}
      tabIndex={0}
      role="button"
    >
      <div className="nav_account">
        <div className="nav_account_top">
          {props.currentAddress ? (
            <React.Fragment>
              <div className="nav_account_user">
                <div className="nav_account_user_name">
                  <h4>{props.name}</h4>
                  <p>{props.currentAddress}</p>
                </div>
              </div>
            </React.Fragment>
          ) : <h4>No previous account saved</h4>}
        </div>
      </div>
    </div>


    {props.showDropdown && (
      <div
        className="onClickOutside"
        onClick={props.handleDropdown}
        onKeyPress={props.handleDropdown}
        tabIndex={0}
        role="button"
      />
    )}
  </React.Fragment>
);

export default DesktopDropdownLanding;