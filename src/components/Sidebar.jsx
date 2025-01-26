import React, { useState } from 'react'
import { layoutLogo, logoutLogo, promanageLogo, settingsLogo } from '../utils/export'
import '../CSS/Sidebar.css'
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import LogoutConfirmation from './LogoutConfirmation';

function SideNavbar() {

  const [isExpanded, setIsExpanded] = useState(false)
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();


  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("user-token");
    navigate('/login');
    setShowLogoutConfirmation(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <nav
      className={`nav-main ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}
    >
      <div className='nav-head' >
        <img src={promanageLogo} alt="" />
        {isExpanded && <h2 >Pro Manage</h2>}
      </div>

      <div className='nav-btn' >
        <button 
         onClick={() => navigate('/')}
         style={{ color: theme.textColor, backgroundColor: "transparent", border: `2px solid ${theme.lightColor}` }}
        >
          <img src={layoutLogo} alt="" />
          {isExpanded && 'Board'}
        </button>
        <button 
         style={{ color: theme.textColor, backgroundColor: "transparent", border: `2px solid ${theme.lightColor}` }}
         onClick={() => navigate('/settings')}
        >
          <img src={settingsLogo} alt="" />
          {isExpanded && 'Settings'}
        </button>
      </div>

      <button
       className='logout-btn' 
       onClick={handleLogoutClick} 
       style={{ color: theme.textColor, backgroundColor: "transparent", border: `2px solid ${theme.lightColor}`}}
      >
        <img src={logoutLogo} alt="" />
        {isExpanded && 'Logout'}
      </button>
      <LogoutConfirmation 
        isOpen={showLogoutConfirmation}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </nav>
  )
}

export default SideNavbar
