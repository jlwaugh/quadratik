import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import List from '../../assets/List.svg';

const NavLinks = props => (
  <div id="landing__nav__logo--marginLeft">
    <div className="landing_nav_hamburger-mobile">
      <button
        className="landing_nav_hamburger_button clearButton"
        onClick={props.handleMobileSideBar}
        type="button"
      >
        <img src={List} alt="List" />
      </button>
    </div>


  </div>
);

export default NavLinks;