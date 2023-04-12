import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className='container'>
      <div className="navbar-brand">
        <button
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <NavLink to='/' className="navbar-item">
            Home
          </NavLink>

          <NavLink to='/products' className="navbar-item">
            Products
          </NavLink>
        </div>
      </div>
    </div>
  </nav>
);
