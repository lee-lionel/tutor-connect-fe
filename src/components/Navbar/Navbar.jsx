import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { logOut } from '../../utilities/users-service';

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {setUser} = props
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    logOut()
    setUser(null)
    navigate('/', {replace: true})
  }

  const linkClass = ({ isActive }) =>
    isActive ? 'hyperlink hyperlink-active' : 'hyperlink';

  const mobileLinkClass = ({ isActive }) =>
    isActive ? 'hyperlink-m hyperlink-m-active' : 'hyperlink-m';

  return (

    <nav className='navbar'>
      <div className='navbar-container'>
        <NavLink to='/' className='navbar-brand'>
          <span className='navbar-brand-mark'>TC</span>
          Tutors Connect
        </NavLink>
        <div className='navbar-links'>
          <NavLink to='/' className={linkClass} end>Home</NavLink>
          <NavLink to='/view' className={linkClass}>View</NavLink>
          <NavLink to='/profile' className={linkClass}>Profile</NavLink>
          <button type='button' className='hyperlink hyperlink-logout' onClick={handleLogOut}>Log Out</button>
        </div>
        <button
          type='button'
          className={`hamburger-menu ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label='Toggle navigation menu'
          aria-expanded={isOpen}
        >
          &#9776; {/* Hamburger menu icon */}
        </button>
      </div>
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <NavLink to='/' className={mobileLinkClass} onClick={toggleMenu} end>Home</NavLink>
        <NavLink to='/view' className={mobileLinkClass} onClick={toggleMenu}>View</NavLink>
        <NavLink to='/profile' className={mobileLinkClass} onClick={toggleMenu}>Profile</NavLink>
        <button type='button' className='hyperlink-m hyperlink-m-logout' onClick={handleLogOut}>Log Out</button>
      </div>
    </nav>

  );
};

export default Navbar;
