import React, { useContext, useEffect, useState } from "react";
import {
  collapseAllLogo,
  users
} from "../utils/export.js";
import '../CSS/Dashboard.css';
import { AuthContext } from "../contexts/AuthContext.jsx";
import { TaskContext } from "../contexts/TaskContext.jsx";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import moment from "moment";
import LogoutConfirmation from "../components/LogoutConfirmation.jsx";
import SideNavbar from "../components/Sidebar.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { userDetails } = useContext(AuthContext);
  const { fetchTasks, tasks } = useContext(TaskContext);
  const [selectedCategory, setSelectedCategory] = useState("Backlog");
  const [filter, setFilter] = useState("This Month");
  const [addTask, setAddTask] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState({
    Backlog: false,
    Todo: false,
    'In Progress': false,
    Done: false
  });
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  useEffect(() => {
    if (userDetails) {
      fetchTasks(filter);
    } else {
      navigate('/login');
    }

  }, [userDetails, filter, navigate, fetchTasks]);

  const getDate = () => {
    return moment().format(' Do MMM YYYY');
  }

  const handleAddTask = () => {
    setAddTask(true);
  }

  const handleCloseAddTask = () => {
    setAddTask(false);
  }

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

  const handleCollapseCategory = (category) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  }

  const categories = ['Backlog', 'Todo', 'In Progress', 'Done'];

  return (
    <main className="home-main">
      <SideNavbar handleLogoutClick={handleLogoutClick} />
      <div className="main-section">
        <div className="mobile-nav" style={{backgroundColor: theme.primaryColor}}>
          <span>{userDetails?.name}</span>
          <img src="./assets/logo.png" alt="Logo" />
          <span>Menu</span>
        </div>
        <div className="add-task-mobile" onClick={handleAddTask}>+</div>
        <div 
         className="main-section-head" 
         style={{color: theme.textColor, backgroundColor: theme.primaryColor, boxShadow: `0px 0px 5px ${theme.primaryColor}`}}
        >
          <span>Welcome! {userDetails?.name}</span>
          <span>{getDate()}</span>
        </div>
        <div className="main-section-filter" 
         style={{backgroundColor: theme.lightColor, color: theme.textColor}}
        >
          <div className="main-section-filter-head"
          >
            <h3>Borad</h3>
            <div className="main-section-filter-head-img">
            {users.map(user=> (
              <img src={user.profileImage} alt="user" className="avatar" />
            ))}
            </div>
            
            <span>Add people</span>
          </div>
          <div className="main-section-filter-box">
            <select 
             value={filter} 
             onChange={(e) => setFilter(e.target.value)}
             style={{backgroundColor: theme.secondaryColor, color: theme.textColor, fontWeight: 600}} 
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
          </div>
          <div className="mobile-category-switch">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{backgroundColor: theme.secondaryColor, color: theme.textColor, fontWeight: 600}}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
        </div>

        <div className="main-section-category">
          {categories.map((category, idx) => (
            <div
              key={category}
              className={`category ${selectedCategory === category ? 'active-category' : 'hidden-category'}`}
              style={{backgroundColor: theme.secondaryColor, boxShadow: `0px 0px 5px ${theme.lightColor}`, color: theme.textColor}}
            >
              <div 
               className="category-header" 
               style={{color: theme.textColor, fontFamily: "Inter"}}
              >
                <h2>{category}</h2>
                <div className="collapse-add">
                  {category === "Todo" && <i className="ri-add-large-line" onClick={handleAddTask}></i>}
                  <img src={collapseAllLogo} alt="collapse" onClick={() => handleCollapseCategory(category)} />
                </div>

              </div>
              <div className="category-body">
                {tasks.map(
                  (task) =>
                    task.status === category && (
                      <TaskCard task={task} key={task._id} isCollapsed={collapsedCategories[category]} />
                    )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {addTask && <TaskForm onClose={handleCloseAddTask} />}
      <LogoutConfirmation
        isOpen={showLogoutConfirmation}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </main>
  );
}

export default Dashboard;


