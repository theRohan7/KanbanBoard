import React from 'react'
import { useTheme } from '../contexts/ThemeContext';

function LogoutConfirmation({ isOpen, onConfirm, onCancel }) {
    if (!isOpen) return null;
    const { theme } = useTheme();

    return (
        <div className="logout-overlay">
        <div className="logout-box"
         style={{backgroundColor: theme.secondaryColor, color: theme.textColor}}
        >
          <h3 className="logout-title">Are you sure you want to Logout?</h3>
          <div className="logout-buttons">
            <button className="logout-confirm-btn" onClick={onConfirm}
             style={{backgroundColor: theme.lightColor, color: theme.textColor, border: `3px solid ${theme.lightColor}`}}
            >
              Yes, Logout
            </button>
            <button className="logout-cancel-btn" onClick={onCancel}
             style={{backgroundColor: theme.lightColor, color:'#CF3659'}}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

    );
   
}

export default LogoutConfirmation
