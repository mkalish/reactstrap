import React from 'react';
import { warnOnce } from './utils';
import Alert from './Alert';
import ButtonDropdown from './ButtonDropdown';
import Dropdown from './Dropdown';
import NavDropdown from './NavDropdown';
import Tooltip from './Tooltip';

const { Component } = React;
const components = {
  UncontrolledAlert: Alert,
  UncontrolledButtonDropdown: ButtonDropdown,
  UncontrolledDropdown: Dropdown,
  UncontrolledNavDropdown: NavDropdown,
  UncontrolledTooltip: Tooltip,
};

Object.keys(components).forEach((key) => {
  const Tag = components[key];
  const defaultValue = Tag === Alert;

  class Uncontrolled extends Component {
    constructor(props) {
      super(props);

      this.state = { isOpen: defaultValue };

      this.toggle = this.toggle.bind(this);
    }

    toggle() {
      this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
      if (key === 'UncontrolledNavDropdown') {
        warnOnce('The "UncontrolledNavDropdown" component has been deprecated.\nPlease use component "UncontrolledDropdown" with nav prop.');
      }
      return <Tag isOpen={this.state.isOpen} toggle={this.toggle} {...this.props} />;
    }
  }

  Uncontrolled.displayName = key;

  components[key] = Uncontrolled;
});

const UncontrolledAlert = components.UncontrolledAlert;
const UncontrolledButtonDropdown = components.UncontrolledButtonDropdown;
const UncontrolledDropdown = components.UncontrolledDropdown;
const UncontrolledNavDropdown = components.UncontrolledNavDropdown;
const UncontrolledTooltip = components.UncontrolledTooltip;

export {
  UncontrolledAlert,
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  UncontrolledNavDropdown,
  UncontrolledTooltip,
};
