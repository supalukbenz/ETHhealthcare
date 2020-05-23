import React, { Component } from 'react';
import nav_logo from '../images/nav-logo.png';

class Navbar extends Component {
  render() {   
    return (
      <div>
        <nav className="navbar navbar-menu fixed-top flex-md-nowrap p-0 shadow">
          <div></div>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.props.account}</span></small>
            </li>
          </ul>
          <a href="/" className="navbar-item">Home</a>
        </nav>
      </div>
    );
  }
}

export default Navbar;
