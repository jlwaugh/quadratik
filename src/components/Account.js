import React from 'react';
import { shortenEthAddr } from '../utils/funcs';

const Account = props => (
    <div
      className={`
      nav__dropdown 
      mobileDropDown
      `}
      onClick={props.handleMobileSideBar}
      onKeyPress={props.handleMobileSideBar}
      role="button"
      tabIndex={0}
    >
      <div className="sideDrawer_wrapper">
        {props.isProfile && (
          <div className="nav_account">
            <div className="nav_account_top">
              <div className="nav_account_user">
                <div className="nav_account_user_name">
                  <h4>{props.name}</h4>
                  <p>{shortenEthAddr(props.currentAddress)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
export default Account;