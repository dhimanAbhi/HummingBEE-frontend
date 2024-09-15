import React, { useState } from 'react';
import '../styles/hrpanel.css'; // CSS file for styling
import HRDashboard from './HRDashboard';
import HRLeavesAndAttendance from './HRLeavesAndAttendance';

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState('HRDashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const loadComponent = (component) => {
    setActiveComponent(component);
    setSidebarOpen(false); // Close sidebar when a new component is loaded
  };
 
  return (
    <div className="app-container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className='sidebar-content'>
            <div className='sidebar-topcontent'>
                <div className='sidebar-title'>HummingBEE</div>
                <div className='sidebar-links' style={{cursor:"default"}}>Menu</div>
                <div className={`sidebar-links ${activeComponent=="HRDashboard"?'active-compo':''}`} onClick={() => loadComponent('HRDashboard')}>Dashboard</div>
                <div className={`sidebar-links ${activeComponent=="HRLeavesAndAttendance"?'active-compo':''}`} onClick={() => loadComponent('HRLeavesAndAttendance')}>Leave & Attendance</div>
            </div>
            <div className='sidebar-logout'>Logout</div>
        </div>
      </div>

      <div className="main-content">
        <div className="toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? '<' : '>'}
        </div>

        {activeComponent === 'HRDashboard' && <HRDashboard />}
        {activeComponent === 'HRLeavesAndAttendance' && <HRLeavesAndAttendance />}
      </div>
    </div>
  );
};


export default Sidebar;
