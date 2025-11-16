import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Logo = () => (
  <img 
    src="/src/assets/pic/BHQ-Logo3.png" 
    alt="Logo" 
    className="logo-image"
  />
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'หน้าแรก', href: '#home' },
    { name: 'เกี่ยวกับเรา', href: '#about' },
    { name: 'จองคิวพบแพทย์', href: '#appointment' },
    { name: 'ติดต่อเรา', href: '#contact' }
  ];

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="nav-wrapper">
          {/* Logo */}
          <div className="logo-container">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            {menuItems.map((item, index) => (
              <div key={index} className="menu-item-wrapper">
                <a href={item.href} className="menu-link">
                  {item.name}
                </a>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <a href="#login" className="login-link">
              เข้าสู่ระบบ
            </a>
            <a href="#signup" className="signup-button">
              สมัครสมาชิก
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-button"
          >
            {isMenuOpen ? (
              <X className="menu-icon" />
            ) : (
              <Menu className="menu-icon" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-items">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <a href={item.href} className="mobile-menu-link">
                    {item.name}
                  </a>
                </div>
              ))}
              <div className="mobile-cta-buttons">
                <a href="#login" className="mobile-login-link">
                  เข้าสู่ระบบ
                </a>
                <a href="#signup" className="mobile-signup-button">
                  สมัครสมาชิก
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}