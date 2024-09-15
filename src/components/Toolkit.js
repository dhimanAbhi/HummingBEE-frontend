import React, { useState } from 'react';
import '../styles/toolkit.css'; // Assuming your CSS is in sidebar.css
import Positivity from './Positivity';
import Engagement from './Engagement';
import Relationship from './Relationship';
import Meaning from './Meaning';
import Graphs from './Graphs'


const Dashboard = () => <div className="content">Dashboard Component</div>;

const Toolkit = () => {
  const [activeComponent, setActiveComponent] = useState('Graphs');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const loadComponent = (component) => {
    setActiveComponent(component);
    setSidebarOpen(false); // Optional: Auto close sidebar after selecting
  };

  return (
    <div className="app-container">
      <div className={`toolkit-sidebar ${isSidebarOpen ? 'toolkit-open' : ''}`}>
        <div className="toolkit-sidebar-content">
          <img src="../images/humming-bee-logo.svg" className="toolkit-sidebar-title" />
          <div className={`toolkit-sidebar-link `}  style={{ cursor: "default", paddingBottom:"10px" }}>Menu</div>
          
          {/* Buttons to switch between components */}
          <div className={`toolkit-sidebar-link ${activeComponent === 'Dashboard' ? 'active' : ''}`} onClick={() => loadComponent('Graphs')}>Dashboard</div>
          <div className={`toolkit-sidebar-link ${activeComponent === 'Positivity' ? 'active' : ''}`} onClick={() => loadComponent('Positivity')}>Positivity</div>
          <div className={`toolkit-sidebar-link ${activeComponent === 'Engagement' ? 'active' : ''}`} onClick={() => loadComponent('Engagement')}>Engagement</div>
          <div className={`toolkit-sidebar-link ${activeComponent === 'Relationship' ? 'active' : ''}`} onClick={() => loadComponent('Relationship')}>Relationship</div>
          <div className={`toolkit-sidebar-link ${activeComponent === 'Meaning' ? 'active' : ''}`} onClick={() => loadComponent('Meaning')}>Meaning</div>
        </div>
        <div className="sidebar-logout">Logout</div>
      </div>

      <div className="main-toolkit-content" style={{marginLeft: isSidebarOpen?'250px':''}}>
        <div className="toggle-button" onClick={toggleSidebar}>
          {isSidebarOpen ? '<' : '>'}
        </div>

        {/* Rendering components based on the activeComponent state */}
        {activeComponent === 'Dashboard' && <Graphs />}
        {activeComponent === 'Positivity' && <Positivity />}
        {activeComponent === 'Engagement' && <Engagement />}
        {activeComponent === 'Relationship' && <Relationship />}
        {activeComponent === 'Meaning' && <Meaning />}
      </div>
    </div>
  );
};

export default Toolkit;
