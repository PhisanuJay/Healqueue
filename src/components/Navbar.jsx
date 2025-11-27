import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const normalMenuItems = [
    { name: 'Home', path: '/' },
    { name: 'Find Doctor', path: '/find-doctor' },
    { name: 'Appointment', path: '/appointment' },
    { name: 'Login', path: '/login' }
  ];
  
  const miniMenuItems = [
    { name: 'Home', path: '/' },
    { name: 'Find Doctor', path: '/find-doctor' },
    { name: 'Appointment', path: '/appointment' }
  ];

  const menuItems = isScrolled ? miniMenuItems : normalMenuItems;

  const isFindDoctorPage = location.pathname === '/find-doctor';
  const isAppointmentPage = location.pathname === '/appointment';
  const isSpecialPage = isFindDoctorPage || isAppointmentPage;
  const logoSrc = isSpecialPage 
    ? '/src/assets/pic/BHQ-Logo23.png' 
    : '/src/assets/footer/sdfdsf 2.png';

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-mini' : ''} ${isSpecialPage ? 'find-doctor-nav' : ''}`}>
      <div className="navbar-container">
        {!isScrolled && (
          <Link to="/" className="navbar-logo">
            <img src={logoSrc} alt="Logo" className="logo-image" />
          </Link>
        )}
        
        <ul className="navbar-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="navbar-item">
              <Link 
                to={item.path} 
                className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;