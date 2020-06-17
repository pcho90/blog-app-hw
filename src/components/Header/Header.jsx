import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

import { AuthContext } from '../../contexts/auth';

const Nav = () => {
  const { currentUser, toggleSignIn } = useContext(AuthContext);
  let links;
  if (currentUser) {
    links = (
      <>
        <NavLink to='/create'>Add Post</NavLink>
        <NavLink to='/profile'>My Profile</NavLink>
        <NavLink to='/' onClick={() => toggleSignIn(null)}>
          Sign Out
        </NavLink>
      </>
    );
  } else {
    links = <NavLink to='/signin'>Sign In</NavLink>;
  }
  return (
    <nav>
      <div className='nav'>
        <NavLink to='/' className='nav-logo'>
          PWOKE.Blog
        </NavLink>
        <div className='nav-links'>{links}</div>
      </div>
    </nav>
  );
};

export default Nav;
