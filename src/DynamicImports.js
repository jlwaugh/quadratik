import React, { Component } from 'react';

class DynamicImports extends Component {
  state = {
    component: null,
  }

  componentWillMount() {
    const { load } = this.props;
    load().then(mod => this.setState(() => ({
      component: mod.default,
    })));
  }

  render() {
    return this.props.children(this.state.component);
  }
}

export const Nav = props => (
  <DynamicImports load={() => import('./components/Nav/Nav')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const MyProfile = props => (
  <DynamicImports load={() => import('./views/Profile/MyProfile')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const Profile = props => (
  <DynamicImports load={() => import('./views/Profile/Profile')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const AppModals = props => (
  <DynamicImports load={() => import('./components/AppModals')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);

export const NavLanding = props => (
  <DynamicImports load={() => import('./components/NavLanding/NavLanding')}>
    {Component => Component !== null
      && <Component {...props} />}
  </DynamicImports>
);