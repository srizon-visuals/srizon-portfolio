import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Pages with dark hero sections that need light text in the header
  const darkBackgroundPages = [
    '/', // Add home page to dark background pages list
    '/creative-pursuits', 
    '/contact', 
    '/works',
    '/experience',
    '/services'
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Check if the current page has a dark background
  const isDarkBackground = darkBackgroundPages.includes(location.pathname);
  
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isDarkBackground ? 'on-dark-bg' : ''}`}>
      <div className="header-inner">
        <div className="header-container">
          <motion.div 
            className="logo"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <Link to="/">SV</Link>
        </motion.div>
        
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <nav 
          className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}
        >
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className={location.pathname === '/services' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                to="/works" 
                className={location.pathname === '/works' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Works
              </Link>
            </li>
            <li>
              <Link 
                to="/experience" 
                className={location.pathname === '/experience' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Experience
              </Link>
            </li>
            <li>
              <Link 
                to="/creative-pursuits" 
                className={location.pathname === '/creative-pursuits' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Creative Pursuits
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={location.pathname === '/contact' ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
