import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar-main'>
      <div className='first-link'>
        <Link to='/' className='text-decoration-none links'>
          Read Excel
        </Link>
      </div>
      <div className='second-link'>
        <Link to='/createpdf' className='text-decoration-none links'>
          Create Student Pdf
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
