import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import Ballot from '../../components/Ballot';
import Account from '../../components/Account';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false
    };
  }
  toggle() {
    this.setState({
        isOpen: !this.state.isOpen
    });
  }
  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (

      <div className="landing_page">
        <Navbar color="inverse" light expand="md">
          <NavbarBrand href="/">Quadratik</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/polls">Polls</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/marble-protocol/humanity">Code</NavLink>
              </NavItem>
              <NavItem>
                <Account></Account>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1>Welcome to Quadratik</h1>
                <p>
                  <Button
                      tag="a"
                      color="success"
                      size="large"
                      href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2003531"
                      target="_blank"
                  >
                    Learn About Quadratic Voting
                  </Button>
                </p>
                <p>
                  <Button
                      tag="a"
                      color="success"
                      size="large"
                      href="https://humanitydao.org"
                      target="_blank"
                  >
                    Join HumanityDAO
                  </Button>
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Ballot align="center" />
      </div>
    );
  }
}

Landing.propTypes = {
  /* handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool, */
};

Landing.defaultProps = {
  /* isLoggedIn: false, */
};

const mapState = state => ({
  isLoggedIn: state.userState.isLoggedIn,
});

export default withRouter(connect(mapState)(Landing));