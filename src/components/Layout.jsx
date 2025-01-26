import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavbar from './Sidebar';
import { useTheme } from '../contexts/ThemeContext';

function Layout() {
  const { theme } = useTheme();
  
  return (
    <div className="layout" style={{ display: 'flex' }}>
      <SideNavbar />
      <div className="content" style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout; 